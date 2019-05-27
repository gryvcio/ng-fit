import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyLoadModule } from 'src/app/core/directives/lazy-load.module';
import { SharedModule } from '../../shared/shared.module';
import { KontaktComponent } from './kontakt.component';

const routes: Routes = [{ path: '', component: KontaktComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, LazyLoadModule],
  declarations: [KontaktComponent]
})
export class KontaktModule {}
