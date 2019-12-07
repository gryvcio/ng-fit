import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbTab, NgbModule, NgbTabContent, NgbTabTitle, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { KalkulatorComponent } from './kalkulator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: KalkulatorComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
    NgbModule
  ],
  declarations: [KalkulatorComponent]
})
export class KalkulatorModule { }
