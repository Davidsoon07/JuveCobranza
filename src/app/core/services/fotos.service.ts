import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FotosService {
  private baseUrl = 'http://localhost:4000/api/photos';

  constructor(private http: HttpClient){}

  subirArchivos(file: File, meta?: {descripcion?: string}){
    const form = new FormData();
    form.append('file', file);
    if(meta?.descripcion)form.append('descripcion', meta.descripcion);
    return this.http.post<{ id: number}>(this.baseUrl, form);
  }


}
