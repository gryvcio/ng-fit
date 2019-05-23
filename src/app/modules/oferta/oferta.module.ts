import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { OfertaComponent } from './oferta.component';

const routes: Routes = [
  { path: '', component: OfertaComponent }
]

@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes), SharedModule ],
  declarations: [ OfertaComponent ]
})
export class OfertaModule { }
