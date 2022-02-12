import { UploadMetadata } from "@firebase/storage";

class AudioRecorder {

    audioBlobs: Array<BlobPart> = [];
    mediaStream: MediaStream | null = null;
    mediaRecorder: MediaRecorder | null = null;
    private duration: number = 0;
    private startedAt: number = 0;
    private pausedAt: number = 0;

    start = () => {
        if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            return Promise.reject(new Error('Audio recording is not supported in browser'));
        };

        return navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                this.mediaStream = stream;
                this.mediaRecorder = new MediaRecorder(this.mediaStream);
                this.mediaRecorder.addEventListener('dataavailable', event => this.audioBlobs.push(event.data));
                this.mediaRecorder.start();
                this.startedAt = Date.now();
            })
    }

    stop = (): Promise<{ file: File, metadata: UploadMetadata }> => {
        return new Promise(resolve => {
            const timestamp = +new Date();
            const mimeType = this.mediaRecorder?.mimeType;


            this.mediaRecorder?.addEventListener('stop', () => {
                this.pausedAt = Date.now();
                this.duration = this.duration + (this.pausedAt - this.startedAt);

                const file = new File(
                    this.audioBlobs,
                    timestamp.toString(),
                    {
                        type: mimeType?.split(';')[0],
                        lastModified: timestamp,
                    }
                );
                const durationsInSeconds = this.duration / 1000;
                resolve({
                    file,
                    metadata: {
                        customMetadata: {
                            duration: durationsInSeconds.toString(),
                        },
                    },
                });
            });
            this.cancel();
        });
    }

    pause = () => {
        this.mediaRecorder?.pause();
        this.pausedAt = Date.now();
        this.duration = this.duration + (this.pausedAt - this.startedAt);
    }

    resume = () => {
        this.mediaRecorder?.resume();
        this.startedAt = Date.now();
    }

    cancel = () => {
        this.mediaRecorder?.stop();
        this.stopStream();
        this.resetRecordingProperties();
    }

    private stopStream = () => {
        this.mediaStream?.getTracks().forEach(track => track.stop());
    }

    private resetRecordingProperties = () => {
        this.mediaStream = null;
        this.mediaRecorder = null;
    }
};

export const audioRecorder = new AudioRecorder();