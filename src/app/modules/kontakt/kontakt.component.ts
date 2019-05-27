import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { RandomService } from 'src/app/core/services/random.service';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KontaktComponent {
  imageBg: string;
  hints: Array<string> = [];

  constructor(private wowService: NgwWowService, private randomBg: RandomService) {
    this.wowService.init();
    this.imageBg = randomBg.getRandomBg('kontakt');
    this.updateImgUrl(this.hints);
  }

  updateImgUrl(arr: Array<string>) {
    for (let i = 0; i < 8; i++) {
      arr[i] = `assets/img/wskazowki-${i + 1}.jpg`;;   
    }
  }
}
