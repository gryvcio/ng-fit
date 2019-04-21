import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfertaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
