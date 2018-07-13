// 引入
var gulp = require('gulp');
var server = require('gulp-webserver');
var scss  = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var url = require('url');
var fs = require('fs');
var swiperJson = require('./mock/swiper.json');
gulp.task('server',['devCss'],function(){
    gulp.src('src')
        .pipe(server({
            port:8888,
            middleware:function(req,res,next){
                var pathname = url.parse(req.url,true).pathname;
                if(req.url === '/favicon.ico'){
                    return false;
                }
                if(pathname === '/api/swiper'){
                    res.end(JSON.stringify({code:1,data:swiperJson}))
                }else{
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname,'src',pathname)));
                }
            }
        }))
})
// 编译sass
gulp.task('devCss',function(){
    gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(autoprefixer({
            browsers:['last 2 versions','Android >= 4.0']
        }))
        .pipe(gulp.dest('./src/css')) // 转移到css中
})
// 监听
gulp.task('watch',function(){
    gulp.watch('./src/scss/*.scss',['devCss'])
})
gulp.task('dev',['server','watch'])