class AudioRecorder {

    audioBlobs: Array<BlobPart> = [];
    mediaStream: MediaStream | null = null;
    mediaRecorder: MediaRecorder | null = null;

    start = () => {
        if(!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            return Promise.reject(new Error('Audio recording is not supported in browser'));
        };

        return navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                this.mediaStream = stream;
                this.mediaRecorder = new MediaRecorder(this.mediaStream);
                this.mediaRecorder.addEventListener('dataavailable', event => this.audioBlobs.push(event.data));
                this.mediaRecorder.start();
            })
    }

    stop = () => {
        return new Promise(resolve => {
            const mimeType = this.mediaRecorder?.mimeType;
            this.mediaRecorder?.addEventListener('stop', () => {
                const audioBlob = new Blob(this.audioBlobs, { type: mimeType });
                resolve(audioBlob);
            });
            this.cancel();
        });
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