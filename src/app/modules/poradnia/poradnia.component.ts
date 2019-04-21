import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-poradnia',
  templateUrl: './poradnia.component.html',
  styleUrls: ['./poradnia.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoradniaComponent {
  spotkania = [
    {
      cardTitle: 'Zespół Szkół',
      cardSubtitle: 'Gołkowice Dolne i Czarny Potok',
      image: 'golkowice',
      count: 3,
      title: 'Szkoła w Gołkowicach Dolnych i Czarnym Potoku',
      description: 'Krótka Foto relacja z ostatnich spotkań w szkołach w Gołkowicach i Czarnym Potoku. Atmosfera jak zwykle Mega. Tutaj na wstępie zwracam honor wszystkim nauczycielom, z których ukradkiem się śmiałem jak mówili, że im gardło po 45 minutach wysiada. O raju! Wy mieliście naprawdę rację. Ale jak to się mówi „Nie śmiej się dziadku…..”. Szacun dla Was za gardła nie do zdarcia. Dziękuję słuchaczom za fajne pytania i ekstra atmosferę. Mam nadzieję, że wkrótce się spotkamy i zrobimy sobie ciąg dalszy pogadanek o żywieniu. Jest w tym mega potencjał. Najważniejsze – mam nadzieję, chociaż ziarenko zdrowych zasad wynosicie Powodzonka na drodze prawidłowości żywieniowych. Trzymam za Was kciuki!',
    },
    {
      cardTitle: 'Szkoła Podstawowa',
      cardSubtitle: 'Olszana',
      image: 'olszana',
      count: 2,
      title: 'Szkoła Podstawowa w Olszanie',
      description: '„Mądre myślenie, to zdrowe jedzenie” Pod takim hasłem, 10  kwietnia w Szkole Podstawowej im. Mieczysława Wieczorka w Olszanie odbyło się spotkanie z dietetykiem panem Mateuszem Klimkiem. Głównym organizatorem wykładu było Stowarzyszenie „Dolina Dunajca”, natomiast zajęcia były współfinansowane przez Starostwo Powiatowe w Nowym Sączu. W spotkaniu wzięły udział klasy IV-VII, ale utworzono dwie grupy. W pierwszej grupie uczestniczyły klasy IV-VI, a w drugiej klasa VII. Przez półtorej godziny prowadzący poruszał tematykę związaną z prawidłowym odżywianiem. Użycie tablicy interaktywnej bardzo ułatwiło uczniom przypomnienie wiadomości poruszanych na lekcjach przyrody, jak również podczas pogadanek na lekcjach wychowawczych oraz pomogło przyswoić nowe informacje kluczowe dla zdrowia. Pan Klimek przedstawiał obrazowo różnorodność produktów jakie powinno się spożywać, zachęcał do aktywności ruchowej, przestrzegał przed jedzeniem zbyt dużej ilości słodyczy oraz soli. Ponadto pan Mateusz stworzył wraz z grupą idealny jadłospis oraz obalił kilka mitów żywieniowych. W trakcie zajęć prowadzący wykonywał z uczniami ćwiczenia interaktywne oraz zachęcał do udziału w dyskusji. Wszyscy uczniowie byli bardzo aktywni, co dowodzi że takie spotkania są konieczne. Szkoła bardzo często bierze udział akcjach prozdrowotnych promujących zdrowy styl życia, które uczą dzieci prawidłowych nawyków żywieniowych, bo przecież „ w zdrowym ciele- zdrowy duch”. Źródło: http://www.starosadeckie.info/edukacja/madre-myslenie-zdrowe-jedzenie/'
    },
    {
      cardTitle: 'Gimnazjum',
      cardSubtitle: 'Jazowsko',
      image: 'jazowsko',
      count: 6,
      title: 'Gimnazjum Jazowsko',
      description: 'Po raz kolejny miałem przyjemność odwiedzić szkołę w Jazowsku. Spotkanie o tyle inne, że tym razem z młodzieżą klas szóstych, siódmych oraz drugich i trzecich gimnazjum. Tematyka wiadoma: „Zasady żywienia”. Powiem szczerze nie obstawiałem wielu pytań, i tutaj ku mojemu zaskoczeniu było ich bardzo wiele. Było sporo odpowiadania i rozmawiania. Uwielbiam takie spotkania, bowiem im więcej pytań tym większa dyskusja się rodzi. A w niej rozwiązuje się najwięcej wątpliwości. Cieszy mnie bardzo fakt, że młodzież, z jaką miałem przyjemność się spotkać była zainteresowana prelekcją i zadawała tak trafne pytania, które mam nadzieję udało się mi wyczerpać. Trzymam za Was mocno kciuki, aby cele, o których rozmawialiśmy udało się Wam zrealizować! Powodzenia przyszli „Kulturyści” i „Dietetycy”  Dzięki wielkie za super spędzone godziny.'
    }
  ];

  constructor(private modalService: NgbModal) { }

  open(item) {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
    modalRef.componentInstance.item = item;
  }
}
