import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountUpModule } from 'countup.js-angular2';
import { NgwWowModule } from 'ngx-wow';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule, CountUpModule, NgwWowModule],
  declarations: [HomeComponent]
})
export class HomeModule {}
