import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetamorfozyComponent } from './metamorfozy.component';

const routes: Routes = [
  { path: '', component: MetamorfozyComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  declarations: [ MetamorfozyComponent ]
})
export class MetamorfozyModule { }
