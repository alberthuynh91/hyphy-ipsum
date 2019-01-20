module.exports = {
  apps: [{
    name: 'hyphy-ipsum',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: '172.31.15.43',
      key: '~/.ssh/id_rsa.pub',
      ref: 'origin/master',
      repo: 'https://github.com/alberthuynh91/hyphy-ipsum.git',
      path: '/home/ubuntu/www/hyphy-ipsum',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
