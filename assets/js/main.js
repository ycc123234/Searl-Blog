"use strict"
//Music加载器
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "/js/object/music.js";
document.getElementsByTagName('head')[0].appendChild(script);

//Music执行域
script.onload = function () {
    var music = new Music('/music/list', 1);
    music.init();
}