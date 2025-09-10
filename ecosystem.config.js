module.exports = {
  apps: [
    {
      name: 'student-records-backend',
      script: './backend/server.js',
      cwd: process.env.DEPLOY_PATH || process.cwd(),
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 5000,
      }
    }
  ]
}; 