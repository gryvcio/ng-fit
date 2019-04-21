import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ciekawostki',
  templateUrl: './ciekawostki.component.html',
  styleUrls: ['./ciekawostki.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CiekawostkiComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
