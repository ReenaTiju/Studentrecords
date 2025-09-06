#!/bin/bash

# Student Records MERN Stack Deployment Script
# Usage: ./scripts/deploy.sh [environment]

set -e

# Configuration
ENVIRONMENT=${1:-production}
PROJECT_NAME="studentrecords"
DEPLOY_PATH="/var/www/$PROJECT_NAME"
BACKUP_PATH="/var/backups/$PROJECT_NAME"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

# Check if running as root
check_permissions() {
    if [[ $EUID -eq 0 ]]; then
        warning "Running as root. Consider using a non-root user with sudo privileges."
    fi
}

# Install system dependencies
install_dependencies() {
    log "Installing system dependencies..."
    
    # Update package list
    sudo apt update
    
    # Install Node.js and npm if not present
    if ! command -v node &> /dev/null; then
        log "Installing Node.js..."
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
    
    # Install PM2 globally if not present
    if ! command -v pm2 &> /dev/null; then
        log "Installing PM2..."
        sudo npm install -g pm2
    fi
    
    # Install Nginx if not present
    if ! command -v nginx &> /dev/null; then
        log "Installing Nginx..."
        sudo apt install -y nginx
    fi
    
    # Install MongoDB if not present
    if ! command -v mongod &> /dev/null; then
        log "Installing MongoDB..."
        wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
        echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
        sudo apt update
        sudo apt install -y mongodb-org
        sudo systemctl enable mongod
        sudo systemctl start mongod
    fi
    
    success "System dependencies installed successfully"
}

# Create backup
create_backup() {
    if [ -d "$DEPLOY_PATH" ]; then
        log "Creating backup..."
        sudo mkdir -p "$BACKUP_PATH"
        BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
        sudo cp -r "$DEPLOY_PATH" "$BACKUP_PATH/$BACKUP_NAME"
        success "Backup created: $BACKUP_PATH/$BACKUP_NAME"
    fi
}

# Deploy application
deploy_application() {
    log "Deploying application..."
    
    # Create deployment directory
    sudo mkdir -p "$DEPLOY_PATH"
    sudo chown $USER:$USER "$DEPLOY_PATH"
    
    # Copy application files
    log "Copying application files..."
    cp -r backend "$DEPLOY_PATH/"
    cp -r frontend/build "$DEPLOY_PATH/frontend"
    cp package.json "$DEPLOY_PATH/"
    cp ecosystem.config.js "$DEPLOY_PATH/"
    
    # Install backend dependencies
    log "Installing backend dependencies..."
    cd "$DEPLOY_PATH/backend"
    npm install --production
    
    # Set up environment variables
    if [ ! -f "$DEPLOY_PATH/backend/.env" ]; then
        log "Setting up environment variables..."
        cat > "$DEPLOY_PATH/backend/.env" << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/studentrecords
NODE_ENV=production
EOF
        warning "Please update the .env file with your actual configuration"
    fi
    
    success "Application deployed successfully"
}

# Configure Nginx
configure_nginx() {
    log "Configuring Nginx..."
    
    # Copy Nginx configuration
    sudo cp nginx.conf /etc/nginx/sites-available/$PROJECT_NAME
    sudo ln -sf /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/
    
    # Remove default site if it exists
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Test Nginx configuration
    sudo nginx -t
    
    # Reload Nginx
    sudo systemctl reload nginx
    
    success "Nginx configured successfully"
}

# Start application with PM2
start_application() {
    log "Starting application with PM2..."
    
    cd "$DEPLOY_PATH"
    
    # Stop existing processes
    pm2 delete all 2>/dev/null || true
    
    # Start new processes
    pm2 start ecosystem.config.js --env production
    
    # Save PM2 configuration
    pm2 save
    
    # Setup PM2 startup script
    sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME
    
    success "Application started successfully"
}

# Health check
health_check() {
    log "Performing health check..."
    
    sleep 5
    
    if curl -f http://localhost:5000/api/health; then
        success "Health check passed - Backend is running"
    else
        error "Health check failed - Backend is not responding"
    fi
    
    if curl -f http://localhost; then
        success "Health check passed - Frontend is accessible"
    else
        error "Health check failed - Frontend is not accessible"
    fi
}

# Setup SSL (optional)
setup_ssl() {
    read -p "Do you want to set up SSL with Let's Encrypt? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log "Setting up SSL with Let's Encrypt..."
        
        # Install Certbot
        sudo apt install -y certbot python3-certbot-nginx
        
        read -p "Enter your domain name: " DOMAIN
        
        # Get SSL certificate
        sudo certbot --nginx -d $DOMAIN
        
        success "SSL configured successfully"
    fi
}

# Main deployment function
main() {
    log "Starting deployment for environment: $ENVIRONMENT"
    
    check_permissions
    install_dependencies
    create_backup
    
    # Build frontend
    log "Building frontend..."
    cd frontend
    npm install
    npm run build
    cd ..
    
    deploy_application
    configure_nginx
    start_application
    health_check
    
    setup_ssl
    
    success "Deployment completed successfully!"
    log "Your application is now running at:"
    log "Frontend: http://your-domain.com"
    log "Backend API: http://your-domain.com/api"
    log "Health Check: http://your-domain.com/api/health"
}

# Run main function
main "$@" 