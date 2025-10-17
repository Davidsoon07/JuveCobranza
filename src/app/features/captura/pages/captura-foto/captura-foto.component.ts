import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FotosService } from '../../../../core/services/fotos.service';


@Component({
  selector: 'app-captura-foto',
  standalone: false,
  templateUrl: './captura-foto.component.html',
  styleUrl: './captura-foto.component.css'
})
export class CapturaFotoComponent implements OnDestroy{

  @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  private mediaStream?: MediaStream;

  fileParaSubir?: File;
  previewSrc: string | null = null;
  descripcion = '';

  constructor(private fotosSrv: FotosService) {}

  async iniciarCamara() {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, audio: false
      });
      this.videoRef.nativeElement.srcObject = this.mediaStream;
    } catch (e) {
      alert('No se pudo acceder a la cámara: ' + (e as Error).message);
    }
  }

  detenerCamara() {
    this.mediaStream?.getTracks().forEach(t => t.stop());
    this.mediaStream = undefined;
  }

  capturarFrame() {
    const video = this.videoRef.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      if (!blob) return;
      const file = new File([blob], `captura_${Date.now()}.jpg`, { type: 'image/jpeg' });
      this.setPreview(file);
    }, 'image/jpeg', 0.9);
  }

  onArchivoSeleccionado(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.setPreview(file);
  }

  private setPreview(file: File) {
    this.fileParaSubir = file;
    const reader = new FileReader();
    reader.onload = () => this.previewSrc = reader.result as string;
    reader.readAsDataURL(file);
  }

  subir() {
    if (!this.fileParaSubir) return alert('No hay imagen para subir.');
    this.fotosSrv.subirArchivos(this.fileParaSubir, { descripcion: this.descripcion })
      .subscribe({
        next: (res) => {
          alert('Imagen guardada con id ' + res.id);
          this.previewSrc = null;
          this.descripcion = '';
          this.fileParaSubir = undefined;
        },
        error: (err) => alert('Error al subir: ' + (err?.error?.message || err.message))
      });
  }

  ngOnDestroy(): void {
    this.detenerCamara();
  }
}
