import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgwWowModule } from 'ngx-wow';
import { HeaderImgBgComponent } from './components/header-img-bg/header-img-bg.component';
import { HeaderSectionComponent } from './components/header-section/header-section.component';
import { SpinnerErrorComponent } from './components/spinner-error/spinner-error.component';

@NgModule({
  imports: [CommonModule, NgwWowModule],
  declarations: [HeaderSectionComponent, HeaderImgBgComponent, SpinnerErrorComponent],
  exports: [HeaderSectionComponent, HeaderImgBgComponent, SpinnerErrorComponent]
})
export class SharedModule {}
