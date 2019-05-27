import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RandomService } from 'src/app/core/services/random.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfertaComponent {
  imageBg: string;

  sickList = [
    'Chorobie refluksu przełyku',
    'Chorobie wrzodowej',
    'Zespole jelita drażliwego',
    'Chorobie uchyłkowej jelita',
    'Zaparciach',
    'Przewlekłym i ostrym zapalenie trzustki',
    'Cukrzycy typu I i II',
    'Chorobach wątroby',
    'Kamicy pęcherzyka żółciowego',
    'Niewydolności wątroby',
    'Depresji',
    'Nowotworach',
    'Ciąży i w przypadku kobiet karmiących',
    'Chorobach tarczycy'
  ];

  investigationList = [
    'Pomiar powinien odbywać się min 3 godziny po zjedzeniu posiłku.',
    'Do pomiaru należy przystąpić z pustym pęcherzem.',
    'Pomiar powinien odbywać się 3 godziny po wysiłku.',
    'W dniu pomiaru nie zakładać długich rajstop gdyż badanie jest przeprowadzane na boso.'
  ];

  analizatorList = [
    {
      icon: 'fas fa-file-medical-alt',
      color: 'success',
      items: [
        'Masę ciała',
        'Masę mięśni szkieletowych',
        'Masę tkanki tłuszczowej',
        'Zawartość białka, zawartość substancji mineralnych',
        'Całkowitą zawartość wody w organizmie'
      ]
    },
    {
      icon: 'fas fa-procedures',
      color: 'warning',
      items: [
        'BMI',
        'Wskaźnik talia-biodro (WHR)',
        'Podstawową przemianę materii (BMR)',
        'Segmentalną analizę tkanki tłuszczowej i beztłuszczowej (prawego i lewego ramienia, prawej i lewej nogi, tułowia)'
      ]
    },
    {
      icon: 'fas fa-user-md',
      color: 'info',
      items: [
        'Kontrola tkanki tłuszczowej',
        'Kontrola mięśni',
        'Kontrola masy ciała',
        'Poziom tłuszczu trzewnego,',
        'Procentową zawartość tkanki tłuszczowej'
      ]
    },
    {
      icon: 'fas fa-weight',
      color: 'danger',
      items: [
        'Impedancja każdego z segmentu, impedancja każdej częstotliwości',
        'Skala fitness',
        'Analiza otyłości',
        'Stopień otyłości (%)'
      ]
    }
  ];

  constructor(private randomBg: RandomService) {
    this.imageBg = randomBg.getRandomBg('oferta');
  }
}
