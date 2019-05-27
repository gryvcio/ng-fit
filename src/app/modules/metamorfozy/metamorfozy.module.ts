import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgwWowModule } from 'ngx-wow';
import { SharedModule } from '../../shared/shared.module';
import { MetamorfozyComponent } from './metamorfozy.component';

const routes: Routes = [{ path: '', component: MetamorfozyComponent }];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgMasonryGridModule,
    NgwWowModule,
    InfiniteScrollModule
  ],
  declarations: [MetamorfozyComponent]
})
export class MetamorfozyModule {}
