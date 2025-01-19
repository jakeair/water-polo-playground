export class VideoRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];

  async startRecording(stream: MediaStream) {
    try {
      this.recordedChunks = [];
      
      // Try different codecs for better mobile compatibility
      const mimeTypes = [
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm'
      ];

      let selectedMimeType = '';
      for (const mimeType of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mimeType)) {
          selectedMimeType = mimeType;
          break;
        }
      }

      if (!selectedMimeType) {
        throw new Error('No supported mime type found for this device');
      }

      // Configure for high quality recording with device-specific optimizations
      const options: MediaRecorderOptions = {
        mimeType: selectedMimeType,
        videoBitsPerSecond: 12000000 // 12 Mbps for higher quality
      };

      this.mediaRecorder = new MediaRecorder(stream, options);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      // Collect data more frequently for 120fps recording
      this.mediaRecorder.start(8.33); // ~120fps (1000ms / 120)
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