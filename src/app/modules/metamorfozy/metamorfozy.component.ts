import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgwWowService } from 'ngx-wow';
import { RandomService } from 'src/app/core/services/random.service';
import { ModalPeopleComponent } from './components/modal-people/modal-people.component';

export interface People {
  title: string;
  weight: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-metamorfozy',
  templateUrl: './metamorfozy.component.html',
  styleUrls: ['./metamorfozy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MetamorfozyComponent {
  imageBg: string;
  loadedImg = 5;
  lastLoadedImg = 0;
  step = 5;
  people: Array<People> = [];
  peopleInit: Array<People>;

  constructor(
    private modalService: NgbModal,
    private wowService: NgwWowService,
    private http: HttpClient,
    private randomBg: RandomService,
    private cd: ChangeDetectorRef
  ) {
    this.getPeopleFromJson();
    this.wowService.init();
    this.imageBg = randomBg.getRandomBg('metamorfozy');
  }

  openModal(item: People) {
    const modalRef = this.modalService.open(ModalPeopleComponent, { size: 'lg' });
    modalRef.componentInstance.item = item;
  }

  getPeopleFromJson() {
    this.http.get('assets/data/people.json').subscribe(
      (data: Array<People>) => {
        this.peopleInit = data;
        this.loadOlder();
        this.cd.detectChanges();
      },
      err => console.error(err)
    );
  }

  loadOlder() {
    this.lastLoadedImg = this.loadedImg;
    this.people = this.peopleInit.slice(0, this.loadedImg);
    this.loadedImg += this.step;
  }

  onScrollDown() {
    this.loadOlder();
  }
}
