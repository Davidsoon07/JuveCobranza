import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: 'captura',
      loadChildren: () =>
      import('./features/captura/captura.module').then(m => m.CapturaModule),
  },
  {
      path: 'fotos',
      loadChildren: () =>
      import('./features/fotos/fotos.module').then (m => m.FotosModule), 
  },
  { path: '', redirectTo: 'captura', pathMatch: 'full'},
  { path: '**', redirectTo: 'captura' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
