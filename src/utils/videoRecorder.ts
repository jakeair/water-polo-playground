export class VideoRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];

  async startRecording(stream: MediaStream) {
    try {
      this.recordedChunks = [];
      
      // Optimize video encoding settings based on device capabilities
      const options: MediaRecorderOptions = {
        mimeType: 'video/webm;codecs=vp9,opus',
        videoBitsPerSecond: window.innerWidth < 768 ? 2500000 : 8000000 // Lower bitrate for mobile
      };

      this.mediaRecorder = new MediaRecorder(stream, options);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(20); // Collect data more frequently
      console.log('Started recording with optimized settings');
    } catch (error) {
      console.error('Error starting recording:', error);
      throw error;
    }
  }

  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No recording in progress'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        try {
          const blob = new Blob(this.recordedChunks, {
            type: 'video/webm'
          });
          console.log('Recording stopped, blob size:', blob.size);
          resolve(blob);
        } catch (error) {
          console.error('Error creating blob:', error);
          reject(error);
        }
      };

      this.mediaRecorder.stop();
    });
  }
}