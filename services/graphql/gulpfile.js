/* eslint-disable no-console */
const gulp = require('gulp');
const { spawn } = require('child_process');

let node;
const watchedPaths = ['src/*.js', 'src/**/*.js', 'src/**/*.graphql'];

gulp.task('serve', ['lint'], (cb) => {
  if (node) node.kill();

  node = spawn('node', ['src/index.js'], { stdio: 'inherit' });

  node.on('close', (code) => {
    if (code === 8) {
      cb(code);
      console.log('Error detected, waiting for changes...');
    }
  });
  cb();
});

gulp.task('watch', () => gulp.watch(watchedPaths, ['serve']));

gulp.task('lint', (cb) => {
  const lint = spawn('./node_modules/.bin/eslint', ['src/**/*.js'], { stdio: 'inherit' });
  lint.on('close', (code) => {
    if (code === 8) {
      cb(code);
      gulp.log('Error detected, waiting for changes...');
    }
    cb();
  });
});

gulp.task('default', ['watch', 'serve']);

// clean up if an error goes unhandled.
process.on('exit', () => {
  if (node) node.kill();
});
