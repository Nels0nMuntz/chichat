class AudioRecorder {

    audioBlobs: Array<BlobPart> = [];
    mediaStream: MediaStream | null = null;
    mediaRecorder: MediaRecorder | null = null;

    start = () => {
        if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            return Promise.reject(new Error('Audio recording is not supported in browser'));
        };

        return navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                this.mediaStream = stream;
                this.mediaRecorder = new MediaRecorder(this.mediaStream);
                this.mediaRecorder.addEventListener('dataavailable', event => this.audioBlobs.push(event.data));
                this.mediaRecorder.addEventListener('start', e => console.log(e));
                this.mediaRecorder.start();
            })
    }

    stop = (): Promise<File> => {
        return new Promise(resolve => {
            const timestamp = +new Date();
            const mimeType = this.mediaRecorder?.mimeType;


            this.mediaRecorder?.addEventListener('stop', (e) => {
                console.log(e);
                
                const file = new File(
                    this.audioBlobs,
                    `audiofile_${timestamp}`,
                    {
                        type: mimeType?.split(';')[0],
                        lastModified: timestamp,
                    }
                );
                resolve(file);
            });
            this.cancel();
        });
    }

    pause = () => {
        this.mediaRecorder?.pause();
    }

    resume = () => {
        this.mediaRecorder?.resume();
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