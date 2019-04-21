import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() item;
  numbers;

  constructor(public activeModal: NgbActiveModal) {
    
    // this.numbers = Array(this.item.count).fill().map((x, i) => i); // [0,1,2,3,4]
  }

  ngOnInit() {
    console.log(this.item);
    this.numbers = Array(this.item.count).fill(1); // [4,4,4,4,4]

  }
}
