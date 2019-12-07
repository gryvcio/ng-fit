import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-kalkulator',
  templateUrl: './kalkulator.component.html',
  styleUrls: ['./kalkulator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalkulatorComponent {
  bodyWeight: number;
  bodyHeight: number;
  bmi: number;

  onCountBMI() {
    if (this.bodyWeight && this.bodyHeight) {
      this.bmi = Math.round((this.bodyWeight / ((this.bodyHeight * this.bodyHeight) / 10000)) * 100) / 100;
    } else {
      this.bmi = 0;
    }
  }
}
