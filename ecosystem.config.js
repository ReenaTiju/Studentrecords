module.exports = {
  apps: [
    {
      name: 'student-records-backend',
      script: './backend/server.js',
      cwd: '/var/www/studentrecords',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 5000,
        MONGODB_URI: process.env.MONGODB_URI
      },
      // Logging
      log_file: '/var/log/pm2/student-records.log',
      out_file: '/var/log/pm2/student-records-out.log',
      error_file: '/var/log/pm2/student-records-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Auto restart configuration
      watch: false,
      ignore_watch: ['node_modules', 'logs', '.git'],
      max_memory_restart: '1G',
      
      // Advanced PM2 features
      min_uptime: '10s',
      max_restarts: 10,
      autorestart: true,
      
      // Health monitoring
      health_check_url: `http://localhost:${process.env.PORT || 5000}/api/health`,
      health_check_grace_period: 3000,
      
      // Process management
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000
    }
  ],

  deploy: {
    production: {
      user: process.env.VPS_USERNAME || 'root',
      host: process.env.VPS_HOST,
      ref: 'origin/main',
      repo: 'https://github.com/yourusername/studentrecords.git',
      path: '/var/www/studentrecords',
      'post-deploy': 'npm install && cd backend && npm install --production && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'apt update && apt install git -y'
    }
  }
}; 