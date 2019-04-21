import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KontaktComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
