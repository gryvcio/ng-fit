import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalBlogComponent } from './modal-people/modal-blog.component';
import { NgwWowService } from 'ngx-wow';
import { RandomService } from 'src/app/core/services/random.service';
import { HttpClient } from '@angular/common/http';

export interface Blog {
  title: string;
  date: string;
  image: string;
  imageUrl?: string;
  description: Array<string>;
  descShort?: string;
}
@Component({
  selector: 'app-ciekawostki',
  templateUrl: './ciekawostki.component.html',
  styleUrls: ['./ciekawostki.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CiekawostkiComponent {
  imageBg: string;
  loadedImg = 10;
  lastLoadedImg = 0;
  step = 10;
  loadOlders = true;

  blogList: Array<Blog> = [];
  blogListInit: Array<Blog> = [];

  constructor(
    private modalService: NgbModal,
    private wowService: NgwWowService,
    private randomBg: RandomService,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {
    this.wowService.init();
    this.imageBg = randomBg.getRandomBg('ciekawostki');
    this.getBlogFromJson();
  }

  getBlogFromJson() {
    this.http.get('assets/data/blog.json').subscribe(
      (data: Array<Blog>) => {
        this.blogListInit = data;
        this.loadOlder();
        this.cd.detectChanges();
      },
      err => {
        console.error(err);
      }
    );
  }

  loadOlder() {
    this.lastLoadedImg = this.loadedImg;
    this.blogList = this.blogListInit.slice(0, this.loadedImg);
    this.loadedImg += this.step;
    if (this.lastLoadedImg >= this.blogListInit.length) {
      this.loadOlders = false;
    }
    this.updateBlogData(this.blogList);
  }

  updateBlogData(arr: Array<Blog>) {
    arr.forEach(el => {
      el.imageUrl = `assets/img/blog/thumb/${el.image}-thumb.jpg`;
      el.descShort = this.createShortDesc(el.description);
    });
  }

  createShortDesc(arr: Array<string>) {
    let shortDesc: string;
    let i = 0;

    arr.forEach((el: string) => {
      if (i === 0) {
        shortDesc = `<p class=\"font-weight-bold\">${el}</p>`
      } else {
        shortDesc = shortDesc.concat(`<p>${el}</p>`);
      }
      i++;
    });

    return shortDesc;
  }

  openModal(item: Blog) {
    const modalRef = this.modalService.open(ModalBlogComponent, { size: 'lg' });
    modalRef.componentInstance.item = item;
  }
}
