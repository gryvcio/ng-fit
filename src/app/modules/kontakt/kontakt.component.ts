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
  wskazowkiCount = 7;
  wskazowkiImage: Number[];

  constructor(private wowService: NgwWowService, private randomBg: RandomService) {
    this.wowService.init();
    this.imageBg = randomBg.getRandomBg('kontakt');
    
    this.wskazowkiImage = [1, 2, 3, 4, 5, 6, 7];
  }
}
