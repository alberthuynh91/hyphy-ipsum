module.exports = {
  apps: [{
    name: 'hyphy-ipsum',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ahuynh',
      host: 'ec2-54-215-240-23.us-west-1.compute.amazonaws.com',
      key: '~/.ssh/hyphy-ipsum.pem',
      ref: 'origin/master',
      repo: 'https://github.com/alberthuynh91/hyphy-ipsum.git',
      path: '/home/ubuntu/www/hyphy-ipsum',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
