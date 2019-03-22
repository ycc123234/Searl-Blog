(()=>{
    "use strict"
const NO_BGM = 0;
const PLAY_BGM = 1;
const BGM_URL = 'http://localhost:8888/SearlBlog/song';
function Music(url, status) {
    Object.defineProperties(this, {
        url: {
            value: url,
            writable: false,
            enumerable: true
        },
        _status:{
            writable:true,
            enumerable:false
        }
    })
    this.status = status;
    Object.seal(this);
}
Music.prototype = {
    onCreate: function () {
        this.init();
    },
    init: function () {

        this.initBGM(this.url);
    },
    initBGM: function () {
        console.log(this.url, '<<<+=========');
        console.log(arguments)
        if (arguments[0] == BGM_URL) {
            this.getBGM(arguments[0]);
        } else {
            console.log(typeof arguments[0]);
        }

    },
    getBGM: function (url) {
        var xhr = createXhr();

        xhr.open("get", url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                return this.initBGM(JSON.parse(xhr.responseText));
            }else if(xhr.status==404){
                throw new Error('url address is invalid');
            }
        }
        xhr.send(null);
    }
}
Object.defineProperty(Music.prototype,'status',{
    get:function(){
        return this._status;
    },
    set:function(status){
        if(status==1||status==0){
            this._status=status;
        }else{
            throw new Error('status value is undefined');
        }
    },            
    enumerable: true

    // this:Object.freeze(this.prototype)   
})
Object.freeze(Music.prototype);
var mm = new Music(BGM_URL, 0);
console.dir(mm.onCreate());

})()