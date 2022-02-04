export class AudioPlayer {

    public duration?: number;
    private arrayBuffer: ArrayBuffer;
    private source: AudioBufferSourceNode;
    private audioContext: AudioContext;    

    constructor(arrayBuffer: ArrayBuffer){
        this.arrayBuffer = arrayBuffer;
        this.audioContext = new AudioContext();
        this.source = this.audioContext.createBufferSource();
    }

    private init = async () => {
        const audioBuffer = await this.audioContext.decodeAudioData(this.arrayBuffer);
        this.source.buffer = audioBuffer;
        this.source.connect(this.audioContext.destination);
        this.duration = audioBuffer.duration;
    }

    static create = async (arrayBuffer: ArrayBuffer) => {
        const instance = new AudioPlayer(arrayBuffer);
        await instance.init();
        return instance;
    };

    start = (when?: number | undefined, offset?: number | undefined, duration?: number | undefined) => this.source.start(when, offset, duration);

    stop = (when?: number | undefined) => this.source.stop(when);

};