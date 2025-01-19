export class VideoRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];

  async startRecording(stream: MediaStream) {
    try {
      this.recordedChunks = [];
      
      // Configure for high quality recording
      const options: MediaRecorderOptions = {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 8000000 // 8 Mbps for high quality
      };

      this.mediaRecorder = new MediaRecorder(stream, options);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      // Collect data more frequently for smoother recording
      this.mediaRecorder.start(16.67); // ~60fps (1000ms / 60)
      console.log('Started recording with high quality settings');
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