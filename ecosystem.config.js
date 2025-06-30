module.exports = {
  apps: [{
    name: 'rfx-audit',
    script: 'server.js',
    env: {
      PORT: process.env.PORT || 3001,
    },
    out_file: '/var/log/rfx-audit/out.log',
    error_file: '/var/log/rfx-audit/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm Z'
  }]
};
