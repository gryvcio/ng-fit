import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-header-img-bg',
  templateUrl: './header-img-bg.component.html',
  styleUrls: ['./header-img-bg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderImgBgComponent {
  @Input() imageBg: string;
  @Input() positionBgY: string = 'bottom';
  @Input() title: string;
  @Input() subtitle: string;
  @Input() dark: boolean = true;

  constructor(private wowService: NgwWowService) {
    this.wowService.init();
  }
}
