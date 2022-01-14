interface IAudioRecorder {
    start: () => void;
    stop: () => Promise<IAudioRecorderResponse>;
};
interface IAudioRecorderResponse {
    audioBlob: Blob;
    audioUrl: string;
    play: () => void;
};

export const recordAudio = (): Promise<IAudioRecorder> => {
    return new Promise(async (resolve, reject) => {
        if(!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            reject(new Error('Feature is not supported in browser'));
        };
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks: BlobPart[] = [];

        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });

        const start = () => mediaRecorder.start();

        const stop = (): Promise<IAudioRecorderResponse> => {
            return new Promise(resolve => {
                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks);
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    const play = () => audio.play();
                    resolve({ audioBlob, audioUrl, play });
                });
                mediaRecorder.stop();
            });
        };

        resolve({ start, stop });
    })
};