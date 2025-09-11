module.exports = {
  apps: [
    {
      name: 'student-records-backend-samsidev',
      script: './backend/server.js',
      cwd: '/home/testatozas-atozascollegesamsi/htdocs/atozascollegesamsi.testatozas.in',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 5001, // Different port for samsidev branch
        DEPLOY_PATH: '/home/testatozas-atozascollegesamsi/htdocs/atozascollegesamsi.testatozas.in'
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true
    }
  ]
};
