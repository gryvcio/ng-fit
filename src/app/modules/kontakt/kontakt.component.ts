import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KontaktComponent {
  imageBg: string;
  wskazowkiCount = 7;
  wskazowkiImage: Number[];

  constructor(private wowService: NgwWowService) {
    this.wowService.init();
    this.wskazowkiImage = [1, 2, 3, 4, 5, 6, 7];

    const random = Math.floor(Math.random() * 5) + 1;
    this.imageBg = `/assets/img/bg/kontakt-bg-${random}.jpg`;
  }
}
