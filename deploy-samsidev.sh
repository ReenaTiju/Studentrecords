#!/bin/bash

# Deployment script for samsidev branch
# Target: /home/testatozas-atozascollegesamsi/htdocs/atozascollegesamsi.testatozas.in

echo "Starting deployment for samsidev branch..."

# Set deployment variables
DEPLOY_PATH_SAMSIDEV="/home/testatozas-atozascollegesamsi/htdocs/atozascollegesamsi.testatozas.in"
BRANCH="samsidev"
REPO_URL="git@github.com:yourusername/Studentrecords.git"

# Create deployment directory if it doesn't exist
mkdir -p $DEPLOY_PATH_SAMSIDEV

# Navigate to deployment directory
cd $DEPLOY_PATH_SAMSIDEV

# Clone or pull the repository
if [ -d ".git" ]; then
    echo "Repository exists, pulling latest changes..."
    git fetch origin
    git checkout $BRANCH
    git pull origin $BRANCH
else
    echo "Cloning repository..."
    git clone -b $BRANCH $REPO_URL .
fi

# Install dependencies
echo "Installing backend dependencies..."
cd backend
npm install --production

echo "Installing frontend dependencies..."
cd ../frontend
npm install

echo "Building frontend..."
npm run build

# Go back to root
cd ..

# Set up PM2 ecosystem
echo "Setting up PM2..."
pm2 delete student-records-backend-samsidev 2>/dev/null || true
pm2 start ecosystem.config.js --env production

echo "Deployment completed successfully!"
echo "Application is running on branch: $BRANCH"
echo "Deployment path: $DEPLOY_PATH_SAMSIDEV"
