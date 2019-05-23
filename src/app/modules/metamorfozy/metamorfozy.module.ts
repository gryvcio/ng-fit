import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { NgwWowModule } from 'ngx-wow';
import { SharedModule } from '../../shared/shared.module';
import { MetamorfozyComponent } from './metamorfozy.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [{ path: '', component: MetamorfozyComponent }];

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(routes), SharedModule, NgMasonryGridModule, NgwWowModule],
  declarations: [MetamorfozyComponent]
})
export class MetamorfozyModule {}
