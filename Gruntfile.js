module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		assemble: {
			options: {
				layout: 'page.hbs',
				layoutdir: './source/assemble/templates/layouts/',
				partials: './source/assemble/templates/partials/**/*.hbs',
				helpers: './source/assemble/templates/helpers/**/*.js'
			},
			dev: {
				files: [
					{
						cwd: 'source/assemble/content/_pages/',
						dest: 'build/',
						expand: true,
						flatten: true,
						src: ['**/*.hbs']
					}
				]
			}
		},

		// Configuration for copying files
		copy: {
			images: {
				cwd: 'source/img/',
				dest: 'build/img/',
				expand: true,
				src: ['**/*']
			}
		},

		compass: {
			options: {
				debugInfo: false,
				force: true,
				noLineComments: true,
				outputStyle: 'expanded',
				require: ['sass-globbing', 'compass/import-once', 'susy'],
				sassDir: 'source/sass/'
			},
			dist: {
				options: {
					cssDir: 'build/css/',
					sourcemap: true,
					sourcemap: false
				}
			}
		},

		cssmin: {
			add_banner: {
				options: {
					banner: '/* banner */'
				},
				files: {
					'build/css/main.css': ['build/css/**/*.css']
				}
			}
		},

		uglify: {
    		my_target: {
      			files: {
					'build/js/main.min.js': ['source/js/vendor/jquery.js', 'source/js/main.js'],
					'build/js/vendor/modernizr.min.js': ['source/js/vendor/modernizr.js']
				}
			}
  		},

  		sync: {
			js: {
				files: [
					{
						cwd: 'source/js/',
						dest: 'build/js/',
						src: '**/*'
					}
				]
			}
		},

		watch: {
			options: {
				livereload: true
			},
			scss: {
				files: ['source/sass/**/*.scss'],
				tasks: ['compass']
			},
			js: {
				files: ['source/js/**/*.js'],
				tasks: ['uglify']
			},
			templates: {
				files: ['source/assemble/**/*.{json,hbs}'],
				tasks: ['assemble']
			}
		},

		connect: {
			server: {
				options: {
					port: 8000,
					base: './build/'
				}
			}
		}

	});

	grunt.loadNpmTasks('assemble');

	grunt.loadNpmTasks('grunt-sync');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['build']);

	grunt.registerTask('build', [
		'newer:assemble',
		'compass',
		'cssmin',
		'uglify',
		'copy:images',
		'connect',
		'sync',
		'watch'
	]);

};