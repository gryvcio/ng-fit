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
  description: string;
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

  // To remove
  spotkaniaOld: Array<Spotkania> = [
    {
      cardTitle: 'Zespół Szkół',
      cardSubtitle: 'Gołkowice Dolne i Czarny Potok',
      image: 'golkowice',
      count: 11,
      title: 'Szkoła w Gołkowicach Dolnych i Czarnym Potoku',
      description: `
      <p class="font-weight-bold">Krótka Foto relacja z ostatnich spotkań w szkołach w Gołkowicach i Czarnym Potoku.</p>
      <p>Atmosfera jak zwykle Mega. Tutaj na wstępie zwracam honor wszystkim nauczycielom, z których ukradkiem się śmiałem, jak mówili, że im gardło po 45 minutach wysiada. O raju! Wy mieliście naprawdę rację. Ale jak to się mówi <em>&bdquo;Nie śmiej się dziadku&hellip;&rdquo;</em>. Szacunek dla Was za gardła nie do zdarcia. Dziękuję słuchaczom za fajne pytania i ekstra atmosferę. Mam nadzieję, że wkrótce się spotkamy i zrobimy sobie ciąg dalszy pogadanek o żywieniu. Jest w tym mega potencjał.</p>
      <p>Najważniejsze &ndash; mam nadzieję, chociaż ziarenko zdrowych zasad wynosicie. Powodzonka na drodze prawidłowości żywieniowych. Trzymam za Was kciuki!</p>
      `
    },
    {
      cardTitle: 'Szkoła Podstawowa',
      cardSubtitle: 'Olszana',
      image: 'olszana',
      count: 2,
      title: 'Szkoła Podstawowa w Olszanie',
      description: `
      <p class="font-weight-bold"><em>&bdquo;Mądre myślenie, to zdrowe jedzenie&rdquo;</em>.</p>
      <p>Pod takim hasłem, 10 kwietnia w Szkole Podstawowej im. Mieczysława Wieczorka w Olszanie odbyło się spotkanie z dietetykiem panem Mateuszem Klimkiem. Głównym organizatorem wykładu było Stowarzyszenie <em>&bdquo;Dolina Dunajca&rdquo;</em>, natomiast zajęcia były współfinansowane przez Starostwo Powiatowe w Nowym Sączu.</p>
      <p>W spotkaniu wzięły udział klasy IV&ndash;VII, ale utworzono dwie grupy. W pierwszej grupie uczestniczyły klasy IV&ndash;VI, a w drugiej klasa VII. Przez półtorej godziny prowadzący poruszał tematykę związaną z prawidłowym odżywianiem. Użycie tablicy interaktywnej bardzo ułatwiło uczniom przypomnienie wiadomości poruszanych na lekcjach przyrody, jak również podczas pogadanek na lekcjach wychowawczych oraz pomogło przyswoić nowe informacje kluczowe dla zdrowia. Pan Klimek przedstawiał obrazowo różnorodność produktów, jakie powinno się spożywać, zachęcał do aktywności ruchowej, przestrzegał przed jedzeniem zbyt dużej ilości słodyczy oraz soli. Ponadto pan Mateusz stworzył wraz z grupą idealny jadłospis oraz obalił kilka mitów żywieniowych. W trakcie zajęć prowadzący wykonywał z uczniami ćwiczenia interaktywne oraz zachęcał do udziału w dyskusji. Wszyscy uczniowie byli bardzo aktywni co dowodzi, że takie spotkania są konieczne. Szkoła bardzo często bierze udział akcjach prozdrowotnych promujących zdrowy styl życia, które uczą dzieci prawidłowych nawyków żywieniowych, bo przecież <em>&bdquo;W zdrowym ciele — zdrowy duch&rdquo;</em>.</p>
      <p>Źródło: <a href="http://www.starosadeckie.info/edukacja/madre-myslenie-zdrowe-jedzenie/" target="_blank">http://www.starosadeckie.info/edukacja/madre-myslenie-zdrowe-jedzenie/</p>
      `
    },
    {
      cardTitle: 'Gimnazjum',
      cardSubtitle: 'Jazowsko',
      image: 'jazowsko',
      count: 6,
      title: 'Gimnazjum w Jazowsku',
      description: `
      <p class="font-weight-bold">Po raz kolejny miałem przyjemność odwiedzić szkołę w Jazowsku.</p>
      <p>Spotkanie o tyle inne, że tym razem z młodzieżą klas szóstych, siódmych oraz drugich i trzecich gimnazjum. Tematyka wiadoma: <em>&bdquo;Zasady żywienia&rdquo;</em>.</p>
      <p>Powiem szczerze, nie obstawiałem wielu pytań, i tutaj ku mojemu zaskoczeniu było ich bardzo wiele. Było sporo odpowiadania i rozmawiania. Uwielbiam takie spotkania, albowiem im więcej pytań tym większa dyskusja się rodzi. A w niej rozwiązuje się najwięcej wątpliwości.</p>
      <p>Cieszy mnie bardzo fakt, że młodzież, z jaką miałem przyjemność się spotkać, była zainteresowana prelekcją i zadawała tak trafne pytania, które mam nadzieję, udało się mi wyczerpać.</p>
      <p>Trzymam za Was mocno kciuki, aby cele, o których rozmawialiśmy, udało się Wam zrealizować! Powodzenia przyszli <em>&bdquo;Kulturyści&rdquo;</em> i <em>&bdquo;Dietetycy&rdquo;</em> Dzięki wielkie za super spędzone godziny.</p>
      `
    },
    {
      cardTitle: 'Szkoła Podstawowa',
      cardSubtitle: 'Jazowsko',
      image: 'jazowsko-pods',
      count: 6,
      title: 'Szkoła Podstawowa w Jazowsku',
      description: `
      <p class="font-weight-bold">Nie tak dawno miałem okazję odwiedzić dzieciaki w Szkole Podstawowej w Jazowsku.</p>
      <p>Na pewno wizyta godna braw i pochwał. Zaskakiwany byłem w sumie, co kilka minut ich wiedzą i bardzo aktywnym podejściem do wykładu o zdrowym żywieniu. Po wesołych i bardzo intensywnym opowiadaniu o zasadach żywieniowych wyczekiwany czas gotowania nadszedł.</p>
      <p>Oczywiście masa smakołyków. Dużo śmiechu i zabawy. Krótko mówiąc wyszło pysznie!</p>
      <p>Droga Klaso powodzenia dla Was i koniecznie zróbcie takie smakołyki w domu!</p>
      `
    },
    {
      cardTitle: 'Hala Widowiskowo &ndash; Sportowa ',
      cardSubtitle: 'Łącko',
      image: 'lacko-hala',
      count: 1,
      title: 'Hala Widowiskowo &ndash; Sportowa w Łącku',
      description: `
      <p class="font-weight-bold">Tym razem spotkanie z młodzieżą na Hali w Łącku. Tematem, jaki gościł wśród rywalizujących był <em>&bdquo;Sport jest moim Przyjacielem&rdquo;</em>.</p>
      <p>I ja dołożyłem swoją cegiełkę na temat <em>&bdquo;Zdrowego stylu życia&rdquo;</em>. Bardzo miło patrzeć na młodzież tak aktywną i chętną czerpać wiedzę na temat tego co przekazywałem.</p>
      <p>Ważne że nie tylko komputer, kanapa i dobry film ale także aktywność fizyczna i sportowa rywalizacja</p>
      `
    },
    {
      cardTitle: 'Stowarzyszenie na Rzecz Osób Niepełnosprawnych',
      cardSubtitle: '<em>&bdquo;Gniazdo&rdquo;</em>',
      image: 'gniazdo',
      count: 6,
      title: 'Stowarzyszenie na Rzecz Osób Niepełnosprawnych <em>&bdquo;Gniazdo&rdquo;</em>',
      description: `
      <p class="font-weight-bold">Spotkanie z Osobami Niepełnosprawnymi ze Stowarzyszenia na Rzecz Osób Niepełnosprawnych <em>&bdquo;Gniazdo&rdquo;</em>.</p>
      <p>Krótko mówiąc było bardzo aktywnie i wesoło. Jak wiele osób tak wiele pytań w kierunku zdrowego stylu życia.</p>
      <p>Duże podziękowania za świetny klimat i mile spędzony czas!</p>
      `
    },
    {
      cardTitle: 'Szkoła Podstawowa nr 1',
      cardSubtitle: 'Kamienica',
      image: 'kamienica-pods',
      count: 8,
      title: 'Szkoła Podstawowa nr 1 w Kamienicy',
      description: `
      <p class="font-weight-bold">Tym razem miałem przyjemność być gościem w Szkole Podstawowej w Kamienicy.</p>
      <p>Postanowiłem zatytułować spotkanie <em>&bdquo;Czym skorupka za młodu nasiąknie&rdquo;</em>. Troszkę teorii, zabawy ale także praktyka, bo to ona czyni mistrza nawet w żywieniu.</p>
      <p>Przepyszne tartinki i sałatka owocowa gościły na stołach. Świetna rozrywka dla dzieciaków ale także i dla mnie!</p>
      `
    },
    {
      cardTitle: 'Zespół Szkolno &ndash; Gimnazjalny',
      cardSubtitle: 'Łącko',
      image: 'lacko-gim',
      count: 5,
      title: 'Zespół Szkolno &ndash; Gimnazjalny w Łącku',
      description: `
      <p class="font-weight-bold">Spotkanie z uczniami szkół podstawowych i gimnazjalnych w Łącku o tematyce <em>&bdquo;Zdrowy styl życia&rdquo;</em>!</p>
      `
    },
    {
      cardTitle: 'Miejskie Przedszkole nr 7',
      cardSubtitle: 'Nowy Sącz',
      image: 'ns-przed',
      count: 3,
      title: 'Miejskie Przedszkole nr 7 w Nowym Sączu',
      description: `
      <p class="font-weight-bold">Wizyta w miejskim przedszkolu nr 7 w Nowym Sączu.</p>
      `
    },
    {
      cardTitle: 'Zespół Szkolno &ndash; Gimnazjalny &mdash; warsztaty',
      cardSubtitle: 'Łącko',
      image: 'lacko-war',
      count: 5,
      title: 'Zespół Szkolno &ndash; Gimnazjalny w Łącku &mdash; warsztaty',
      description: `
      <p class="font-weight-bold">Po raz kolejny teoria i praktyka wcielona w życie.</p>
      <p>Jestem dumny z takiego obrotu sprawy. Kiedy widzę jak pokolenie młodsze chłonie wiedzę jak gąbka.</p>
      <p>I praktyka staję się dla nich zabawą i rzeczą, która chcą powtarzać. Ale najpiękniejsza chwila to ta, w której wiem, że to, co robię na prawdę ma sens. Dzięki temu chce się więcej i więcej.</p>
      <p>Tym razem uroniłem nawet łzę po słowach chłopca, który podszedł i nieśmiało powiedział: <em>&bdquo;Dziękuję, że Pan do Nas przyjechał&rdquo;</em>. Czego chcieć więcej.</p>
      <p>To ja dziękuje Wam za świetnie spędzony czas i wierzę, że te kilka godzin z wami na prawdę pokazało wam dobrą drogę, którą będziecie szli. Drogę zdrowego trybu życia. </p>
      <p>Powodzenia! Oby tak dalej!</p>
      `
    },
    {
      cardTitle: 'Szkoła Podstawowa',
      cardSubtitle: 'Olszana',
      image: 'olszana-pod',
      count: 4,
      title: 'Szkoła Podstawowa w Olszanie',
      description: `
      <p class="font-weight-bold">Spotkanie tym razem w szkole w Olszanie.</p>
      <p>Tak wiele ciekawych pytań. Potężne zainteresowanie, ogrom przekazanej i wchłoniętej przez młodsze pokolenie wiedzy. Super widzieć tak młode osoby już łapiące zajawkę na zdrowe odżywianie! Szkoda, że moje pokolenie nie miało takich spotkań. Ale nie ma tego złego&hellip; Wtedy nie mógłbym spełniać swojej <em>&bdquo;misji&rdquo;</em>.</p>
      <p>Oby tak dalej! </p>
      `
    },
    {
      cardTitle: 'Szkoła Podstawowa',
      cardSubtitle: 'Gołkowice',
      image: 'golkowice-pod',
      count: 2,
      title: 'Szkoła Podstawowa w Gołkowicach',
      description: `
      <p class="font-weight-bold">Spotkanie tym razem w szkole w Gołkowicach.</p>
      <p>Tak wiele ciekawych pytań. Potężne zainteresowanie, ogrom przekazanej i wchłoniętej przez młodsze pokolenie wiedzy. Super widzieć tak młode osoby już łapiące zajawkę na zdrowe odżywianie! Szkoda, że moje pokolenie nie miało takich spotkań. Ale nie ma tego złego&hellip; Wtedy nie mógłbym spełniać swojej <em>&bdquo;misji&rdquo;</em>.</p>
      <p>Oby tak dalej! </p>
      `
    },
    {
      cardTitle: 'Zespół Szkolno &ndash; Gimnazjalny &mdash; warsztaty nr 2',
      cardSubtitle: 'Łącko',
      image: 'lacko-war-nr2',
      count: 4,
      title: 'Zespół Szkolno &ndash; Gimnazjalny w Łącku &mdash; warsztaty nr 2',
      description: `
      <p class="font-weight-bold">I ponownie miałem przyjemność zagościć w szkole w Łącku.</p>
      <p>Teoria i kolejna przepyszna praktyka. I te słowa, które usłyszałem: <em>&bdquo;Myślałam, że to będzie niedobre a jest to takie pyszne&rdquo;</em> &ndash; Miód na moje serce. Dzięki temu wiem, że trud, jaki wnoszę w przekazywanie wiedzy ma sens, chociaż gdyby się zastanowić to w sumie nie ma w tym żadnej trudności. Jedynie przyjemność i mega satysfakcja.</p>
      <p>Dzięki za fajnie spędzony czas i mam nadzieje że do zobaczenia wkrótce </p>
      `
    },
    {
      cardTitle: 'Warsztaty Terapii Zajęciowej',
      cardSubtitle: 'Czarny Potok',
      image: 'czarny-potok',
      count: 7,
      title: 'Warsztaty Terapii Zajęciowej <em>&bdquo;Czarny Potok&rdquo;</em>',
      description: `
      <p class="font-weight-bold">Hmmm&hellip; Na prawdę wspaniałe spotkanie. Masa pytań. Ekstra zabawa na warsztatach kulinarnych.</p>
      <p>Duże moje podziękowania śle załodze, z którą miałem okazję spędzić kilka godzin. Myślę, że każdy zasługuje śmiało na określenie <em>&bdquo;Top Chef&rdquo;</em>. Również bardzo duże podziękowania Paniom, które dotrzymywały kroku na warsztatach jak i Opiekunom i Kierownictwu.</p>
      <p>Będę bardzo mile wspominał poranek z Wami i mam nadzieję do zobaczenia wkrótce!</p>
      `
    },
    {
      cardTitle: 'Przedszkole',
      cardSubtitle: '<em>&bdquo;Misiek&rdquo;</em>',
      image: 'misiek',
      count: 6,
      title: 'Przedszkole <em>&bdquo;Misiek&rdquo;</em>',
      description: `
      <p class="font-weight-bold">Moi Drodzy. Krótko opisując ostatnie spotkanie stwierdzam że tak żywiołowej wizyty nie miałem jeszcze nigdy!</p>
      <p>Miałem mega przyjemność być gościem w Przedszkolu <em>&bdquo;Misiek&rdquo;</em>. Skąd dzieciaki biorą taką dawkę energii? Ja to pytanie zadaje sobie, od kiedy zakończyło się spotkanie.</p>
      <p>Byłem bardzo zaskoczony ilością wiedzy, jaką już posiadała Publiczność. Niesamowicie dobra zabawa. Bardzo aktywnie i z mega super wrażeniami. Jak tak dalej pójdzie to jak nic za niedługo <em>&bdquo;Małe Szkraby&rdquo;</em> będą uczyć mnie a nie ja ich jak zdrowo jeść.</p>
      <p>Super bomba i oby tak dalej! Do zobaczenia!</p>
      `
    }
  ];
  mediaOld: Array<Media> = [
    {
      title: 'Wieści Podegrodzkie',
      image: 'podegrodzkie',
      count: 1
    },
    {
      title: 'Dobry Tygodnik Sądecki',
      image: 'sadecki',
      count: 4
    },
    {
      title: 'Gazeta Krakowska',
      image: 'krakowska',
      count: 1
    }
  ];

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
