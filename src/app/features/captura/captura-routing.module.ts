import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapturaFotoComponent } from './pages/captura-foto/captura-foto.component';
import { ListaFotosComponent } from '../fotos/pages/lista-fotos/lista-fotos.component';

const routes: Routes = [{ path: '', component: CapturaFotoComponent }];

//const routes: Routes = [{ path: '', component: ListaFotosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapturaRoutingModule { }
