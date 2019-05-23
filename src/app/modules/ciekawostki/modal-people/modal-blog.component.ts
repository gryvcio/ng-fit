import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-blog',
  templateUrl: './modal-blog.component.html',
  styleUrls: ['./modal-blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalBlogComponent {
  @Input() item;
  imageLoader = true;
  
  constructor(public activeModal: NgbActiveModal) { }
}
