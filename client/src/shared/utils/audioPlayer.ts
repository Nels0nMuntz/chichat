export class AudioPlayer {
    private arrayBuffer: ArrayBuffer;
    private source: AudioBufferSourceNode;
    private audioContext: AudioContext;
    public duration?: number;

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

    start = () => {
        return this.source.start();
    }
};