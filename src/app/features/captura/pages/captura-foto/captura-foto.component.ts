import { Component, ElementRef, ViewChild } from '@angular/core';

interface Photo {
  dataUrl: string;
  date: Date;
}
 
@Component({
  selector: 'app-root',
    standalone: false,
  templateUrl: './captura-foto.component.html',
  styleUrls: ['./captura-foto.component.css']
})
export class CapturaFotoComponent {
    activeTab: 'camara' | 'galeria' = 'camara';
  cameraActive = false;
  photos: Photo[] = [];
 
  @ViewChild('video', { static: false }) video!: ElementRef<HTMLVideoElement>;
 
  stream: MediaStream | null = null;
 
  setTab(tab: 'camara' | 'galeria') {
    this.activeTab = tab;
  }
 
  async startCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.video.nativeElement.srcObject = this.stream;
      this.cameraActive = true;
    } catch (err) {
      alert('No se pudo acceder a la cámara.');
      console.error(err);
    }
  }
 
  stopCamera() {
    this.stream?.getTracks().forEach(track => track.stop());
    this.cameraActive = false;
  }
 
  takePhoto() {
    const video = this.video.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      this.photos.unshift({ dataUrl, date: new Date() });
    }
  }
 
  downloadPhoto(photo: Photo) {
    const link = document.createElement('a');
    link.href = photo.dataUrl;
    link.download = `evidencia-${photo.date.toISOString()}.png`;
    link.click();
  }
 
  deletePhoto(index: number) {
    this.photos.splice(index, 1);
  }
 
  onFileSelect(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photos.unshift({ dataUrl: e.target.result, date: new Date() });
      };
      reader.readAsDataURL(files[i]);
    }
  }
}