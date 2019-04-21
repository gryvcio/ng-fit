import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KontaktComponent } from './kontakt.component';

const routes: Routes = [
  { path: '', component: KontaktComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  declarations: [ KontaktComponent ]
})
export class KontaktModule { }
