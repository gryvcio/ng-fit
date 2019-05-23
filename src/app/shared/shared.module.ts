import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgwWowModule } from 'ngx-wow';
import { HeaderImgBgComponent } from './components/header-img-bg/header-img-bg.component';
import { HeaderSectionComponent } from './components/header-section/header-section.component';

@NgModule({
  imports: [CommonModule, NgwWowModule],
  declarations: [HeaderSectionComponent, HeaderImgBgComponent],
  exports: [HeaderSectionComponent, HeaderImgBgComponent]
})
export class SharedModule {}
