import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotosRoutingModule } from './fotos-routing.module';
import { ListaFotosComponent } from './pages/lista-fotos/lista-fotos.component';


@NgModule({
  declarations: [
    ListaFotosComponent
  ],
  imports: [
    CommonModule,
    FotosRoutingModule
  ]
})
export class FotosModule { }
