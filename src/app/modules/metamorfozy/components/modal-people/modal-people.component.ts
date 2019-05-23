import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-people',
  templateUrl: './modal-people.component.html',
  styleUrls: ['./modal-people.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalPeopleComponent {
  @Input() item;
  imageLoader = true;
  
  constructor(public activeModal: NgbActiveModal) { }
}
