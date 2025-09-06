# 🚀 MERN Stack Student Records - CI/CD Deployment Guide

This guide explains how to set up CI/CD for the Student Records Management System using GitHub Actions and deploy to a Hostinger KVM2 VPS.

## 📋 Prerequisites

### VPS Requirements
- **Hostinger KVM2 VPS** with Ubuntu 20.04+ 
- **Minimum 2GB RAM** and 20GB storage
- **Root or sudo access**
- **Public IP address**
- **Domain name** (optional but recommended)

### Development Requirements
- **Node.js 18+**
- **MongoDB** (local or Atlas)
- **Git** and **GitHub account**
- **SSH key pair** for VPS access

## 🔧 Initial VPS Setup

### 1. Connect to Your VPS
```bash
ssh root@your-vps-ip
# or
ssh your-username@your-vps-ip
```

### 2. Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 3. Install Required Software
```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org

# Start and enable services
sudo systemctl enable mongod nginx
sudo systemctl start mongod nginx
```

### 4. Configure Firewall
```bash
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw allow 5000  # Backend port
```

### 5. Create Application User (Optional but Recommended)
```bash
sudo adduser studentrecords
sudo usermod -aG sudo studentrecords
sudo mkdir -p /var/www/studentrecords
sudo chown studentrecords:studentrecords /var/www/studentrecords
```

## 🔐 GitHub Secrets Configuration

Go to your GitHub repository → Settings → Secrets and Variables → Actions, and add these secrets:

### Required Secrets
```
VPS_HOST=your-vps-ip-address
VPS_USERNAME=your-username
VPS_SSH_KEY=your-private-ssh-key-content
VPS_PORT=22
MONGODB_URI=mongodb://localhost:27017/studentrecords
BACKEND_PORT=5000
```

### How to Get SSH Key
```bash
# On your local machine, generate SSH key pair
ssh-keygen -t rsa -b 4096 -C "your-email@domain.com"

# Copy public key to VPS
ssh-copy-id your-username@your-vps-ip

# Copy private key content for GitHub secret
cat ~/.ssh/id_rsa
```

## 🚀 Deployment Methods

### Method 1: Automatic Deployment (GitHub Actions)

1. **Push to Main Branch**: Every push to `main` or `master` triggers deployment
2. **Workflow Steps**:
   - ✅ Run tests for backend and frontend
   - ✅ Build React application
   - ✅ Create deployment package
   - ✅ Deploy to VPS via SSH
   - ✅ Start/restart application with PM2
   - ✅ Configure Nginx
   - ✅ Health check

### Method 2: Manual Deployment Script

```bash
# Make script executable
chmod +x scripts/deploy.sh

# Run deployment
./scripts/deploy.sh production
```

### Method 3: Docker Deployment

```bash
# Development environment
docker-compose up -d

# Production environment
docker-compose --profile production up -d
```

## 📁 Project Structure After Deployment

```
/var/www/studentrecords/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── ... (backend files)
├── frontend/
│   └── ... (built React files)
├── package.json
├── ecosystem.config.js
└── start.sh
```

## 🔧 Configuration Files Explained

### 1. `.github/workflows/deploy.yml`
- **GitHub Actions workflow**
- Runs tests and deploys on push to main
- Uses SSH to connect to VPS
- Handles build, deployment, and health checks

### 2. `ecosystem.config.js`
- **PM2 configuration** for process management
- Cluster mode for better performance
- Health monitoring and auto-restart
- Logging configuration

### 3. `nginx.conf`
- **Nginx configuration** for reverse proxy
- Serves React static files
- Proxies API requests to Node.js backend
- Security headers and caching

### 4. `docker-compose.yml`
- **Docker configuration** for containerized deployment
- Includes MongoDB, Backend, Frontend, and Nginx
- Separate profiles for development and production

## 🌐 Domain and SSL Setup

### 1. Point Domain to VPS
```
# Add A record in your domain DNS settings
Type: A
Name: @ (or your subdomain)
Value: your-vps-ip-address
TTL: 3600
```

### 2. Update Nginx Configuration
```bash
# Edit nginx.conf
sudo nano /etc/nginx/sites-available/studentrecords

# Replace 'your-domain.com' with your actual domain
server_name yourdomain.com www.yourdomain.com;
```

### 3. Setup SSL with Let's Encrypt
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (already configured)
sudo certbot renew --dry-run
```

## 📊 Monitoring and Maintenance

### PM2 Commands
```bash
# Check application status
pm2 status

# View logs
pm2 logs student-records-backend

# Restart application
pm2 restart student-records-backend

# Monitor resources
pm2 monit
```

### Nginx Commands
```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Check status
sudo systemctl status nginx
```

### MongoDB Commands
```bash
# Check status
sudo systemctl status mongod

# Connect to database
mongosh

# Backup database
mongodump --db studentrecords --out /backup/
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Deployment Fails
```bash
# Check GitHub Actions logs
# Verify SSH connection
ssh your-username@your-vps-ip

# Check VPS disk space
df -h

# Check memory usage
free -h
```

#### 2. Application Not Starting
```bash
# Check PM2 logs
pm2 logs

# Check backend logs
cd /var/www/studentrecords/backend
npm start

# Verify MongoDB is running
sudo systemctl status mongod
```

#### 3. Frontend Not Loading
```bash
# Check Nginx configuration
sudo nginx -t

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Verify build files exist
ls -la /var/www/studentrecords/frontend/
```

#### 4. API Requests Failing
```bash
# Test backend health
curl http://localhost:5000/api/health

# Check backend process
pm2 status

# Verify environment variables
cat /var/www/studentrecords/backend/.env
```

## 🔄 Manual Deployment Steps

If you need to deploy manually:

```bash
# 1. Build frontend locally
cd frontend
npm install
npm run build

# 2. Copy files to VPS
scp -r backend/ your-username@your-vps-ip:/var/www/studentrecords/
scp -r frontend/build/ your-username@your-vps-ip:/var/www/studentrecords/frontend/
scp ecosystem.config.js your-username@your-vps-ip:/var/www/studentrecords/

# 3. SSH to VPS and start application
ssh your-username@your-vps-ip
cd /var/www/studentrecords
pm2 start ecosystem.config.js --env production
```

## 📈 Performance Optimization

### 1. Enable Gzip Compression
Already configured in `nginx.conf`

### 2. PM2 Cluster Mode
Already configured in `ecosystem.config.js`

### 3. MongoDB Optimization
```bash
# Create indexes for better performance
mongosh
use studentrecords
db.students.createIndex({ "studentId": 1 })
db.students.createIndex({ "email": 1 })
db.students.createIndex({ "name": "text", "email": "text" })
```

### 4. Nginx Caching
Already configured for static assets in `nginx.conf`

## 🛡️ Security Best Practices

### 1. Regular Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Node.js packages
cd /var/www/studentrecords/backend
npm audit fix
```

### 2. Firewall Configuration
```bash
# Check firewall status
sudo ufw status

# Only allow necessary ports
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
```

### 3. MongoDB Security
```bash
# Create admin user
mongosh
use admin
db.createUser({
  user: "admin",
  pwd: "secure-password",
  roles: ["userAdminAnyDatabase"]
})
```

### 4. Environment Variables
- Never commit `.env` files to Git
- Use strong passwords
- Regularly rotate secrets

## 📞 Support

If you encounter issues:

1. **Check logs**: PM2, Nginx, and application logs
2. **Verify configuration**: Environment variables and config files
3. **Test connectivity**: SSH, database, and network connections
4. **Monitor resources**: CPU, memory, and disk usage

## 🎉 Success!

After successful deployment, your application will be available at:

- **Frontend**: `https://yourdomain.com`
- **API**: `https://yourdomain.com/api`
- **Health Check**: `https://yourdomain.com/api/health`

The CI/CD pipeline will automatically deploy any changes pushed to the main branch! 🚀 