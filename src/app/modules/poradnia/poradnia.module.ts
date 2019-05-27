import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PoradniaComponent } from './poradnia.component';
import { LazyLoadDirective } from '../../core/directives/lazy-load.directive';

const routes: Routes = [
  { path: '', component: PoradniaComponent }
]

@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes), SharedModule ],
  declarations: [LazyLoadDirective, PoradniaComponent ]
})
export class PoradniaModule { }
