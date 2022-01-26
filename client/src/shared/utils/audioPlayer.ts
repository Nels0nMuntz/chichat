export class AudioPlayer {
    private arrayBuffer: ArrayBuffer;
    private source: AudioBufferSourceNode;
    private audioContext: AudioContext;
    public duration?: number;

    constructor(arrayBuffer: ArrayBuffer){
        this.arrayBuffer = arrayBuffer;
        this.audioContext = new AudioContext();
        this.source = this.audioContext.createBufferSource();
        
        // this.audioContext.decodeAudioData(blob)
    }

    init = async () => {
        const audioBuffer = await this.audioContext.decodeAudioData(this.arrayBuffer);
        this.source.buffer = audioBuffer;
        this.source.connect(this.audioContext.destination);
        this.duration = audioBuffer.duration;
    }

    start = () => {
        return this.source.start();
    }
};