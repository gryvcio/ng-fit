import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-media',
  templateUrl: './modal-media.component.html',
  styleUrls: ['./modal-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalMediaComponent implements OnInit {
  @Input() item;
  numbers: Number[];
  imageLoader = true;
  
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.numbers = Array(this.item.count).fill(1);
  }
}
