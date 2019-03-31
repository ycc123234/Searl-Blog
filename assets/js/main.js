// "use strict"
var music = null;

function op(){
    var isOpen=false;
    return function(...param){
        if(param[0]!==undefined){
            isOpen=param[0];

        }
        return isOpen;
    }
}
var op=op();
var promise;
function objectPro() {
    console.log(op())
    if(!op()){
        promise= new Promise(function(open) {
            function musicPro(){
                return new Promise(function(open) {
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
            musicPro().then(function(){op(true);open();objectPro();});
    
        })
    }else{
        pro(promise);
    }
}

function pro(pro){
    pro.then(()=>{console.log(music,'########')});
}
objectPro();