async function getStream(constraints) {
    return await navigator.mediaDevices.getUserMedia(constraints);
}

function getMimeType() {
    return `video/webm;codecs=h264`;
}

function getRecordOptions() {
    return {
        videoBitsPerSecond: 2500000,
        mimeType: getMimeType()
    }
}
function getFileExt() {
    return "." + getMimeType().replace(/[^(\/)]*\/([a-zA-Z]*).*/, "$1");
}


function getRandomName() {
    return Math.random().toString(36).substring(7);
}

function u8Tou32(u8){
    let l = u8.lenght%4;
    let length = u8.length;
    if(l) length += 4;
    const u32 = new Uint32Array(length);
    for(let i=0;i<length;i+=4){
        u32[i/4] = u8[i] << 24 + ((u8[i+1]||0) << 16) + ((u8[i+2]||0) << 8) + u8[i+3]||0
    }
    return u32;
}

class RecorderController {
    constructor(parent) {
        /**@type { MediaStream } */
        this.stream = new MediaStream();
        /**@type { MediaRecorder } */
        this.recorder = null;
        this.arrayBuffer = new Uint8Array(0);
        /**@type { HTMLDivElement } */
        this.parent = parent;
        this.init();
    }
    init() {
        console.log("initial MediaRecorder ...");
        this.recorder = new MediaRecorder(this.stream, getRecordOptions());
        console.log("add listener ...");
        this.recorder.addEventListener("error", (error) => {
            throw error;
        })
        this.recorder.addEventListener("dataavailable", async (event) => {
            const data = event.data;
            const buffer = await data.arrayBuffer();
            this._record(new Uint8Array(buffer));
        })
    }

    async play() {
        return new Promise(async (resolve, reject) => {
            console.log("prepare to play ...");
            console.log("this.state : " + this.state);
            let type = "start";
            switch (this.state) {
                case "recording": return reject();
                case "paused": type = "resume"; break;
            }
            console.log("prepare to get stream");
            const callback = async (event) => {
                this.recorder.removeEventListener(type, callback);
                this._render(true);
                console.log("recording ...");
                console.log("this.state : " + this.state);
                resolve(event);
                // const audioStream = await getStream({audio:true});
                // const context = new AudioContext();
                // const source = context.createMediaStreamSource(audioStream);
                // source.connect(context.destination);

            }
            this.recorder.addEventListener(type, callback);
            if (type === "start") {
                const stream = await getStream({ video: true });
                stream.getTracks().forEach(track => {
                    this.stream.addTrack(track);
                })
                this.recorder.start(1000);
            } else {
                this.stream.getTracks().forEach((track) => {
                    track.enabled = true;
                })
                this.recorder.resume();
            }
        })
    }

    pause() {
        return new Promise((resolve, reject) => {
            console.log("prepare to pause ...");
            console.log("this.state : " + this.state);
            if (this.state === "inactive" || this.state === "paused") return resolve();
            const callback = () => {
                this.recorder.removeEventListener("pause", callback);
                this._render(false);
                this.stream.getTracks().forEach((track) => {
                    track.enabled = false;
                })
                console.log("paused ...");
                console.log("this.state : " + this.state);
                resolve();
            }
            this.recorder.addEventListener("pause", callback);
            this.recorder.pause();
        })
    }

    stop() {
        return new Promise((resolve, reject) => {
            console.log("prepare to stop ...");
            console.log("this.state : " + this.state);
            if (this.state === "inactive") return resolve();
            const callback = () => {
                this.stream.getTracks().forEach((track) => {
                    track.stop();
                    this.stream.removeTrack(track);
                })
                this.recorder.removeEventListener("stop", callback);
                this._render(false);
                console.log("stoped ...");
                console.log("this.state : " + this.state);
                resolve();
            }
            this.recorder.addEventListener("stop", callback);
            this.recorder.stop();
        })
    }

    _render(isPlay) {
        if (!isPlay) {
            if (!this._video) return;
            this._video.pause();
            this._video.remove();
            this._video.srcObject = null;
            this._video = null;
        } else {
            const video = document.createElement("video");
            this._video = video;
            video.srcObject = this.stream;
            const play = () => {
                video.play();
                video.removeEventListener("loadedmetadata", play);
            }
            video.addEventListener("loadedmetadata", play);
            this.parent.appendChild(video);
        }
    }

    _record(nextBuffer) {
        let newArrayBuffer = new Uint8Array(nextBuffer.length + this.arrayBuffer.length);
        newArrayBuffer.set(this.arrayBuffer);
        newArrayBuffer.set(nextBuffer, this.arrayBuffer.length);
        this.arrayBuffer = newArrayBuffer;
        newArrayBuffer = null;
    }

    async downloadWebm() {
        console.log("prepare to download ......");
        const blob = new Blob([this.arrayBuffer.buffer], { type: this.mimeType });
        const url = URL.createObjectURL(blob);
        return this._download(url, getRandomName() + getFileExt());
    }

    async _download(url, name) {
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("download", name);
        const event = document.createEvent("MouseEvent");
        event.initMouseEvent("click");
        a.dispatchEvent(event);
    }

    async downloadMp4() {
        const data = await this._convertToMp4();
        console.log("prepare to download mp4");
        const blob = new Blob([data]);
        const url = URL.createObjectURL(blob);
        this._download(url, getRandomName() + ".mp4");
    }

    async _convertToMp4(){
        console.log("prepare to create worker");
        if(!this.worker){
            this.worker = new Worker("./ffmpeg-asm-worker.js");
        }
        return new Promise((resolve,reject)=>{
            this.worker.onmessage = (e) => {
                const msg = e.data;
                switch (msg.type) {
                    case "ready":
                        console.log("prepare to convert webm to mp4");
                        this.worker.postMessage({
                            type: 'command',
                            arguments: '-i video.webm -c:v mpeg4 -b:v 6400k -strict experimental output.mp4'.split(' '),
                            files: [
                                {
                                    data: this.arrayBuffer.slice(0),
                                    name: 'video.webm'
                                }
                            ]
                        });
                        // worker.postMessage({ type: "run", arguments: ["-version"] });
                        break;
                    case "start":
                    case "stdout":
                    case "run":
                    case "exit":
                    case "abort":
                    case "stderr":
                        console.log(msg.data);
                        break;
                    case "error":
                        reject();
                        break;
                    case "done":
                        const data = msg.data[0].data;
                        resolve(data)
                        break;
                }
            }
        })
        
    }
    
    async getDuration(){//没用
        // let data = await this._convertToMp4();
        const blob = new Blob([this.arrayBuffer.buffer], { type: this.mimeType });
        const url = URL.createObjectURL(blob);
        const video = document.createElement("video");
        video.preload = 'metadata';
        video.addEventListener("loadedmetadata",()=>{
            URL.revokeObjectURL(url);
            console.log("duration : "+video.duration);
        })
        video.src = url;
    }

    async _getDuration(){
        let data = await this._convertToMp4();
        let dataview = new DataView(data.slice(0));
        let start = 100;
        const tag = "6d766864";//0x6d766864 mvhd转化来的
        for(let i=101;i<dataview.byteLength-3;i++){
            if (dataview.getUint32(i).toString(16) === tag){
                start = i;
                break;
            }
        }
        start+=17;
        var timeScale = dataview.getUint32(start);
        var duration = dataview.getUint32(start+4);
        console.log("timeScale : " + timeScale+" ,duration : "+duration);
        console.log("duration : "+(duration / timeScale));
        // this._download(url, getRandomName() + ".mp4");
    }

    get mimeType() {
        return this.recorder.mimeType;
    }

    get state() {
        return this.recorder.state;
    }

    get videoBitsPerSecond() {
        return this.recorder.videoBitsPerSecond;
    }

    get audioBitsPerSecond() {
        return this.recorder.audioBitsPerSecond;
    }
}

function strToBuffer(){

}


window.RecorderController = RecorderController;