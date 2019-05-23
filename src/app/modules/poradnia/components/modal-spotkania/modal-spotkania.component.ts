import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-spotkania.component.html',
  styleUrls: ['./modal-spotkania.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalSpotkaniaComponent implements OnInit {
  @Input() item;
  numbers: Number[];
  imageLoader = true;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.numbers = Array(this.item.count).fill(1);
  }
}
