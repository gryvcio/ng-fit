import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CiekawostkiComponent } from './ciekawostki.component';

const routes: Routes = [
  { path: '', component: CiekawostkiComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  declarations: [ CiekawostkiComponent ]
})
export class CiekawostkiModule { }
