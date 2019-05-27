import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyLoadModule } from 'src/app/core/directives/lazy-load.module';
import { SharedModule } from '../../shared/shared.module';
import { PoradniaComponent } from './poradnia.component';

const routes: Routes = [
  { path: '', component: PoradniaComponent }
]

@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes), SharedModule, LazyLoadModule ],
  declarations: [PoradniaComponent]
})
export class PoradniaModule { }
