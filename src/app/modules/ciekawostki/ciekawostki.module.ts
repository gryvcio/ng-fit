import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgwWowModule } from 'ngx-wow';
import { LazyLoadModule } from 'src/app/core/directives/lazy-load.module';
import { SharedModule } from '../../shared/shared.module';
import { CiekawostkiComponent } from './ciekawostki.component';

const routes: Routes = [
  { path: '', component: CiekawostkiComponent }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, NgwWowModule, LazyLoadModule ],
  declarations: [ CiekawostkiComponent ]
})
export class CiekawostkiModule { }
