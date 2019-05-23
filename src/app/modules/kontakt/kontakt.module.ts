import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { KontaktComponent } from './kontakt.component';

const routes: Routes = [{ path: '', component: KontaktComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  declarations: [KontaktComponent]
})
export class KontaktModule {}
