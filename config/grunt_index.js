module.exports = {

  watch: {
    express: {
      files: ['src/app/*.ts', 'server/routes/*.js', 'src/app/*.html', 'src/app/**/*.ts', 'src/app/**/*.html'],
      tasks: ['exec:build', 'express:dev'],
      options: {
        spawn: false,
        debounceDelay: 250
      }
    },
    ts: {
      files: ['src/app/*.ts'],
      tasks: ['exec:build']
    },
    js: {
      files: ['server/routes/*.js'],
      tasks: ['exec:build', 'express:dev']
    }
  },
  exec: {
    build: {
      cmd: 'ng build'
    }
  },
  express: {
    dev: {
      options: {
        script: './server.js'
      }
    }
  }
};
