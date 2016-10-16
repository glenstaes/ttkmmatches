// Load in the dependencies
var gulp = require("gulp");
var Server = require("karma").Server;
var browserSync = require("browser-sync").create();

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

// Run browsersync and watch changes on the files
gulp.task("serve", function(){
    browserSync.init({
        proxy: "ttkmmatches"
    });

    gulp.watch(["app/*.*", "app/**/*.*", "tests/*.*", "tests/**/*.*"]).on("change", function(){
        browserSync.reload();
        gulp.start("testsingle");
    });
});