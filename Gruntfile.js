module.exports = function(grunt) {

  grunt.initConfig(require('./config/grunt_index'));
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });
  grunt.registerTask('dev', ['exec:build', 'express:dev', 'watch:express'])

};
