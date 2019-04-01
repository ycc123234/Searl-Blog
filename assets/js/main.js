
// "use strict"
var music;
//闭包状态类
class Clousure {
    constructor(...param) {}
    static open() {
        var isOpen = false;
        return function (...param) {
            if (param[0] !== undefined) {
                isOpen = param[0];

            }
            console.log(isOpen)
            return isOpen;
        }
    }
    //时间管理者
    static timer(){
        var mSrc=false;
        return function(bool){
            if(bool){
                mSrc=bool
            }
            console.log('mSrc',mSrc)
            return mSrc;
        }
    }
}


//外部类加载管道
var objectPro = function (proOpen, promise) {
    if (!proOpen()) {
        promise = new Promise(function (open) {
            musicPro = function () {
                return new Promise(function (open) {
                    //Music加载器
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = "/js/object/music.js";
                    document.getElementsByTagName('head')[0].appendChild(script);

                    //Music执行域
                    script.onload = function () {
                        music = new Music('/music/list', 1);
                        music.init();
                        
                        open();
                    }
                })
            }
            musicPro().then(function () { proOpen(true); open(); objectPro(proOpen, promise); });

        })
    } else {
        SuperPromise(promise);
    }
}
//音乐进度计时器
var musicTimer = function () {
    setInterval(function () {
        console.log(bgm.currentTime, bgm.duration);
        if (bgm.currentTime >= bgm.duration) {
            clearInterval(musicTimer)
        }
    }, 1000)
}


//音乐信息注入器
var musicInit = function () {
    console.log('=======')
    bgm.src = music.data[0].url;
    musicTimer();
    b_title.textContent = music.data[0].title;
    b_artist.textContent = music.data[0].artist;
    b_picture.src = music.data[0].picture;
}

//音乐src监视器
var musicSrcListener=function(){
     setTimeout(function(){
        console.log('wait');
        if(music.data!==undefined){
            musicInit();
        }else{
            musicSrcListener();
        }
    },5);
}

/*****************   ↑↑制造↑↑   |   ↓↓使用↓↓     *************** */
//音乐加载器
var musicLoad=function(){
    musicSrcListener();
}
//事件生成器
dp.addEventListener('click', function () { bgm.play(); }, false)

//总线程管道
var SuperPromise = function (promise) {
    // 外部类加载管道
    promise.then(musicSrcListener()).then();
}

//启动器
const onStart = function () {
    /*********系统初始化外部类********* */   
    var proOpen = Clousure.open();  //状态信息码生成
    var promise;                    //容器生成
    objectPro(proOpen, promise);    //注入信息

    /*********系统加载外部类*********** */ 
    musicLoad();
    

    /******************************** */
}

//启动测试器
onStart();
