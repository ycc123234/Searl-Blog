"use strict"
const NO_BGM = 0;
const PLAY_BGM = 1;
const BGM_URL = 'http://localhost:8888/SearlBlog/song';
class Music {
    constructor(url, status) {
        Object.defineProperties(this, {
            url: {
                value: url,
                writable: false,
                enumerable: true
            },
            _status: {
                writable: true,
                enumerable: false
            }
        })
        this.status = status;
        Object.seal(this);
    }
    get status() {
        return this._status;
    }
    set status(status) {
        if (status == 1 || status == 0) {
            this._status = status;
        } else {
            throw new Error('status value is undefined');
        }
    }
    onCreate() {
        this.init();
    }
    init() {

        this.initBGM(this.url);
    }
    initBGM(...params) {
        console.log(this.url, '<<<+=========');
        console.log(params, '=============')
        if (params[0] == BGM_URL) {
            this.getBGM(params[0]);
        } else {
            console.log(typeof params[0], '----------------');
        }

    }
    getBGM(url) {
        var xhr = createXhr();

        xhr.open("get", url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                return this.initBGM(JSON.parse(xhr.responseText));
            } else if (xhr.status == 404) {
                throw new Error('url address is invalid');
            }
        }
        xhr.send(null);
    }


    // this = Object.freeze(this.prototype)
}
// Object.freeze(Music.prototype);
var music = new Music(BGM_URL, 1);
music.onCreate();
console.dir(music);