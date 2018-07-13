require(['jquery','bscroll','swiper','rebder'],function($,bscroll,swiper,rebder){
    var listScroll = new bscroll('.list-wrap',{
        click:true,
        scrollY:true,
        probeType:2
    });
    var Parent = $('.list-wrap');
    // 监听滚动
    listScroll.on('scroll',function(){
        if(this.y < this.maxScrollY - 40){
            Parent.attr('up','释放加载更多');
        }else if(this.y < this.maxScrollY -20){
            Parent.attr('up','上拉加载');
        }else if(this.y > 40){
            Parent.attr('down','释放刷新');
        }
    })
    // 手指抬起
    listScroll.on('touchEnd',function(){
        if(Parent.attr('up') === '释放加载更多'){
            console.log('加载更多')
        }else if(Parent.attr('down') === '释放刷新'){
            location.reload();
        }
    })
    // 获取swiper数据
    $.ajax({
        url:'/api/swiper',
        dataType:'json',
        success:function(res){
            if(res.code === 1){
                console.log(res)
                render('#swiper-tpl','.swiper-wrapper',res.data)
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
            }
        },
        error:function(error){
            console.warn(error);
        }
    })
})