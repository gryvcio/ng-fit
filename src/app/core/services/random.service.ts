import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  getRandomBg(page: string): string {
    const random = Math.floor(Math.random() * 5) + 1;
    
    return `/assets/img/bg/${page}-bg-${random}.jpg`;
  }
}
