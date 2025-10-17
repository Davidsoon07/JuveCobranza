import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CapturaRoutingModule } from './captura-routing.module';
import { CapturaFotoComponent } from './pages/captura-foto/captura-foto.component';



@NgModule({
  declarations: [CapturaFotoComponent],
  imports: [CommonModule, CapturaRoutingModule, FormsModule, CapturaRoutingModule],
})
export class CapturaModule { }

