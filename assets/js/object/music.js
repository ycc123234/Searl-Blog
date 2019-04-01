const BGM_URL = '/music/list';
class Music {
    constructor(url, status) {
        Object.defineProperties(this, {
            url: {
                value: url,
                writable: false,
                enumerable: true
            },
            data: {
                writable: true,
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
    init() {
        this.initBGM(this.url);
    }
    initBGM(...params) {
        //if params is url ,params request body.else return music json
        if (Object.prototype.toString.call(params[0]).toLowerCase() == "[object array]" && params[0].length) {
            this.data=params[0];
            console.log(this.data)
        } else {
            this.getBGM(params[0]);
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
// module.exports.Music=Music;