import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgwWowService } from 'ngx-wow';
import { RandomService } from 'src/app/core/services/random.service';
import { ModalMediaComponent } from './components/modal-media/modal-media.component';
import { ModalSpotkaniaComponent } from './components/modal-spotkania/modal-spotkania.component';

export interface Spotkania {
  cardTitle: string;
  cardSubtitle: string;
  image: string;
  imageUrl?: string;
  count: number;
  title: string;
  description: Array<string>;
}
export interface Media {
  title: string;
  image: string;
  imageUrl?: string;
  count: number;
}

@Component({
  selector: 'app-poradnia',
  templateUrl: './poradnia.component.html',
  styleUrls: ['./poradnia.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoradniaComponent {
  imageBg: string;

  spotkania: Array<Spotkania> = [];
  media: Array<Media> = [];

  constructor(
    private modalService: NgbModal,
    private wowService: NgwWowService,
    private randomBg: RandomService,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {
    this.wowService.init();
    this.imageBg = randomBg.getRandomBg('poradnia');

    this.getSpotkaniaFromJson();
    this.getMediaFromJson();
  }

  getSpotkaniaFromJson() {
    this.http.get('assets/data/spotkania.json').subscribe(
      (data: Array<Spotkania>) => {
        this.spotkania = data;
        this.updateImgUrl(this.spotkania, 'spotkania');
        this.cd.detectChanges();
      },
      err => {
        console.error(err);
      }
    );
  }

  getMediaFromJson() {
    this.http.get('assets/data/media.json').subscribe(
      (data: Array<Media>) => {
        this.media = data;
        this.updateImgUrl(this.media, 'media');
        this.cd.detectChanges();
      },
      err => {
        console.error(err);
      }
    );
  }

  updateImgUrl(arr: Array<Spotkania | Media>, location: string) {
    arr.forEach(el => {
      el.imageUrl = `assets/img/${location}/${el.image}.jpg`;
    });
  }

  openModal(item: Spotkania) {
    const modalRef = this.modalService.open(ModalSpotkaniaComponent, { size: 'lg' });
    modalRef.componentInstance.item = item;
  }

  openModalMedia(item: Media) {
    const modalRef = this.modalService.open(ModalMediaComponent, { size: 'lg' });
    modalRef.componentInstance.item = item;
  }
}
