// "use strict"
var music = null;
class Closer {
    constructor(...param) {

    }

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
}
const onStart = function () {
    var proOpen = Closer.open();
    var promise;
    objectPro(proOpen,promise);
}

function pro(pro) {
    pro.then(() => { console.log(music,'########') });
}
//外部类加载器
function objectPro(proOpen,promise) {
    if (!proOpen()) {
        promise = new Promise(function (open) {
            function musicPro() {
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
            musicPro().then(function () { proOpen(true); open(); objectPro(proOpen,promise); });

        })
    } else {
        pro(promise);
    }
}