require(['jquery','bscroll','swiper','handlebars'],function($,bscroll,swiper,handlebars){
    new swiper('.cont',{
        autoplay:true,
        loop:true,
        speed:1000,
        pagination:{
            el:'.swiper-pagination',
            dynamicBullets: true,
            dynamicMainBullets: 2
        }
    });
    new bscroll('.list-wrap',{
        click:true,
        scrollY:true,
        probeType:2
    })
})