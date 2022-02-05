export class AudioPlayer {

    public duration?: number;
    private startedAt: number;
    private pausedAt: number;
    private sourceBuffer: ArrayBuffer;
    private audioBuffer: AudioBuffer | null;
    private sourceNode: AudioBufferSourceNode | null;
    private audioContext: AudioContext;    
    private onEndedListener: () => void;

    constructor(sourceBuffer: ArrayBuffer, onEndedListener: () => void){
        this.startedAt = 0;
        this.pausedAt = 0;
        this.sourceBuffer = sourceBuffer;
        this.audioBuffer = null;
        this.sourceNode = null;
        this.audioContext = new AudioContext();
        this.onEndedListener = onEndedListener;
    }

    private init = async () => {
        this.audioBuffer = await this.audioContext.decodeAudioData(this.sourceBuffer);
        this.duration = Math.round(this.audioBuffer.duration);
    }

    static create = async (arrayBuffer: ArrayBuffer, onEndedListener: () => void) => {
        const instance = new AudioPlayer(arrayBuffer, onEndedListener);
        await instance.init();
        return instance;
    };

    start = () => {
        this.sourceNode = this.audioContext.createBufferSource();
        this.sourceNode.connect(this.audioContext.destination);
        this.sourceNode.buffer = this.audioBuffer;
        if(this.pausedAt) {
            this.startedAt = Date.now() - this.pausedAt;
            this.sourceNode.start(0, this.pausedAt / 1000)
        }else{
            this.startedAt = Date.now();
            this.sourceNode.start(0);
        };
        this.sourceNode.addEventListener('ended', this.onEndedListener);
    };

    stop = () => {
        this.sourceNode?.stop();
        this.pausedAt = Date.now() - this.startedAt;
    };

};