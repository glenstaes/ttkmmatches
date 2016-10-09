// Load in the dependencies
var gulp = require("gulp");
var Server = require("karma").Server;

// Run the test suite once
gulp.task("testsingle", function(done){
    new Server({
        configFile: __dirname + "/karma.conf.js", singleRun: true
    }, done).start();
});

// Run the test suite and watch file changes
gulp.task("test", function(done){
    new Server({
        configFile: __dirname + "/karma.conf.js", singleRun: false
    }, done).start();
});