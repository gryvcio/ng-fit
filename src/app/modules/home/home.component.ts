import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  @ViewChild('classic2', { static: false }) classic2: ElementRef;

  countToOptions = {
    duration: 4,
    separator: ' ',
    suffix: '+',
  };
  coffees: Number;
  workHours: Number;
  burnKilos: Number;
  trainings: Number;

  constructor(private wowService: NgwWowService, private modalService: NgbModal) {
    this.wowService.init();
    this.getData();
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.open(this.classic2, 'Notification', '');
    // }, 2000);
  }

  getData() {
    const workDays = 250;
    const oneDay = 24 * 60 * 60 * 1000;
    const startDate = new Date(2015, 10, 1);
    const today = new Date();

    const diffDays = Math.round(Math.abs((today.getTime() - startDate.getTime()) / oneDay));
    const diffYears = Math.round(Math.abs(today.getFullYear() - startDate.getFullYear()));

    this.coffees = (diffDays - diffYears * workDays) * 3;
    this.workHours = (diffDays - diffYears * workDays) * 10;
    this.burnKilos = (diffDays - diffYears * workDays) * 5.35;
    this.trainings = (diffDays - diffYears * workDays) * 2.3;
  }


  open(content, type: string, modalDimension: string) {
    this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
    });
  }
}
