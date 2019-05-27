import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgwWowService } from 'ngx-wow';
import { RandomService } from 'src/app/core/services/random.service';
import { ModalPeopleComponent } from './components/modal-people/modal-people.component';

export interface People {
  title: string,
  weight: string,
  image: string,
  description: string
}
@Component({
  selector: 'app-metamorfozy',
  templateUrl: './metamorfozy.component.html',
  styleUrls: ['./metamorfozy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetamorfozyComponent {
  imageBg: string;
  loadedImg = 15;
  lastLoadedImg = 0;
  step = 15;
  loadOlders = true;
  people: Array<People>;
  peopleInit: Array<People>;
  people2: Array<People> = [
    {
      title: 'Pani Martyna',
      weight: '&ndash;17 kg',
      image: 'martyna',
      description: `
      <p>Przed Wami 17 letnia Martyna (już prawie 18) która ciężką pracą i determinacją wywalczyła &ndash;17 kg.</p>
      <p>Dobra, kilka słów&hellip; Skromna, zawsze uśmiechnięta i pełna pozytywnego nastawienia kobieta, która podchodzi do redukcji masy ciała mega ambitnie. Do tego stopnia, że nie było mowy o odstąpieniu od wyznaczonego celu. Walcząc z własnym zdrowiem i kompleksami Martyna nie daję się złemu samopoczuciu zmienia życie całkowicie. Można wiele tutaj mówić, ale z mojej strony wielki szacun. Kompletnie dorosłe podejście i wzięcie spraw w swoje ręce. Odpowiedzialność za swoje postanowienia i hart ducha przeprowadził Cię przez całą drogę odchudzania, która na pewno lekka nie była.</p>
      <p>Zawsze widzimy czubek góry lodowej, ale za tą piękną metamorfozą i innymi kryje się masa wyrzeczeń i walk z własnymi słabościami. Dla mnie osiągnięcie ogromne. Niesamowite jest to (przynajmniej dla mnie), że potrafisz ciężko pracować na swój sukces, który osiągasz z przepięknym rozmachem.</p>
      <p>Martyna, trzymaj tak dalej, zawsze jak sobie coś postanowisz to pracuj na to tak, jak robiłaś to dotychczas odchudzając się. I najbliżsi mogą być o Ciebie całkowicie spokojni. Jak sobie wyznaczysz cel to na pewno go osiągniesz&hellip; A wiesz, dlaczego? Bo jesteś uparta, mega pozytywna, i nie ma dla Ciebie słowa <em>&bdquo;nie uda się&rdquo;</em>. Po prostu wyznaczasz cel i go realizujesz dając z siebie 200%. I mimo upadków, wstajesz i idziesz dalej!</p>
      <p>Tak trzymaj! Mocno trzymam za Ciebie kciuki! Gratuluję Ci bardzo i do zobaczenia!</p>
      `
    },
    {
      title: 'Pani Agata i Pan Zygmunt',
      weight: '&ndash;19 kg i &ndash;12 kg',
      image: 'agata-zygmunt',
      description: `
      <p class="font-weight-bold">Jedna z metamorfoz, która naprawdę spowodowała niemałe problemy, jeśli mowa o stworzeniu opisu. Zabierałem się za to kilkanaście razy za każdym razem kasując to, co napisałem. Dlaczego?  A no, dlatego że co nie napiszę wydaję mi się nieodpowiednie, za mało błyskotliwe i w ogóle do bani.</p>
      <p>Tym razem napiszę po prostu to, co mi serce dyktuję i nie będę już nic usuwał. Zacznę od cytatu oddające w pełni to, co napiszę zaraz: <em>&bdquo;Życie jest zbyt krótkie, aby je marnować. Uśmiechnij się i bierz z życia garściami&rdquo;</em>.</p>
      <p>Przed Wami Pani Agata z wynikiem &ndash;19 kg i Pan Zygmunt &ndash;12 kg. Głównym &rdquo;motorem&rdquo; napędowym do podjęcia tak pięknej metamorfozy była Pani Agata. Potykająca się o własne podupadające zdrowie postanowiła zmienić własne życie o 180 stopni. Efekt piorunujący! Ze zdrowiem przyszła przepiękna metamorfoza, a z nią niesamowita podwójna energia do walki z wszystkimi przeciwnościami losu. Ale do rzeczy&hellip;</p>
      <p>Uwielbiam poznawać takie osoby. Kogoś, kto potrafi cieszyć się każdym dniem, nawet tym pochmurnym, deszczowym, zimnym i ponurym. Pani Agata pracuję, jako kelnerka. Jednak dla niej to nie praca. To powołanie. Nie tylko gasi pragnienie głodu przynosząc piękne dania, ale potrafi każdego podnieść na duchu, naładować niesamowitą pozytywną energią.</p>
      <p>Nie znajdę osoby, która się ze mną nie zgodzi. Pani Agata wita każdy dzień z uśmiechem, ciesząc się z nawet najmniejszej rzeczy mimo przeciwności losu. To nawet nie jest umiejętność, to jest dar. Czerpać życie garściami, a nie żyjąc z dnia na dzień jak duch. Co Panią spotykałem na kontrolach uczyłem się jednej bardzo ważnej rzeczy. <em>&bdquo;Skoro życie jest takie krótkie to sprawmy, aby każda chwila była wyjątkowa&hellip;&rdquo;</em></p>
      <p>Pan Zygmunt, który dołączył chwilę później, jako towarzysz Pani Agaty jest jak naprawdę ta przysłowiowa <em>&bdquo;druga połówka&rdquo;</em>. Widać w Państwu kompletne dopełnienie. Razem tworzycie niesamowitą całość i Wasza życzliwa osobowość jest autentycznym darem dla świata, który nas otacza. Dzięki Wam człowiek na nowo uczy się cieszyć jak dziecko z małych spraw. A to właśnie w nich odnajdujemy największe szczęście, co daje energię na każdy nowy dzień!</p>
      <p>Kończąc. Ze swojej strony proszę nie zmieniajcie się. Jeszcze <em>&bdquo;raczkuję&rdquo;</em>, jeśli chodzi o życie, ale wiem jedno. Od Państwa można nauczyć się tak wiele, przede wszystkim ogromnie pozytywnego nastawienia do życia, co czyni każdą chwilę wyjątkową.</p>
      <p>Życzę Państwu powodzenia w utrzymywaniu nawyków żywieniowych, pięknie dziękuje za tak niesamowitą współpracę i do zobaczenia! Chętnie, ponownie spotkam się z Wami. Uśmiechu w życiu nigdy za wiele!</p>
      `
    },
    {
      title: 'Pani Ania i Pan Wojtek',
      weight: '&ndash;15 kg i &ndash;20 kg',
      image: 'ania-wojtek',
      description: `
      <p class="font-weight-bold">Jedne z wizyt, za którymi <em>&bdquo;nie przepadam&rdquo;</em> to te, w których dowiaduję się, że ktoś podziela moje hobby i sam w nim jest na maxa całym sercem. Osoby, które dość dokładnie śledzą Strefę Fit lub mnie znają wiedzą, że to MOTOCYKLE.</p>
      <p>Dlaczego nie przepadam za tymi wizytami? Bo wizyty takie krótkie, a hobby takie piękne że nie ma końca, można mówić i mówić, a tutaj pasuję omówić wyniki, odpowiedzieć na pytania związane z dietą.</p>
      <p>Ale do sedna. Przed Państwem Ania z wynikiem &ndash;15 kg i Wojciech &ndash;20 kg. Małżeństwo, które można powiedzieć znam krótko, bo z taką determinacją podeszli do tematu, że właściwie w mgnieniu oka kończą historię z odchudzaniem.</p>
      <p>Panią Anie i Pana Wojtka poznałem, jako mega pozytywne osoby. Można śmiało powiedzieć że dodawaliście swoim pozytywnym nastawieniem masę promyków w te zimowe, paskudne dni. Kto nie lubiłby takich wizyt? Od progu osoby z ogromem energii i to takiej, którą można się zarazić. Oprócz tego można odważnie powiedzieć, że jesteście mega uparci. Postanowienie, mocne działanie i koniec.</p>
      <p>Nic nie było wstanie Was złamać. Silne charaktery i pozytywne nastawienie! Trzymanie się postanowień i dietki na 100% i efekt murowany!</p>
      <p>Trzymam mocno kciuki za Was i tak trzymajcie! Gratuluję i dziękuję za współpracę. I mam nadzieję niebawem do zobaczenia na trasie. LWG!
      `
    },
    {
      title: 'Pani Kinga',
      weight: '&ndash;10 kg',
      image: 'kinga',
      description: `
      <p class="font-weight-bold">Hmm&hellip; Okres przed świąteczny&hellip; Totalne szaleństwo&hellip; A w tym biegu zatrzymajcie się na chwilkę i spójrzcie! Pani Kinga &ndash;10 kg.</p>
      <p>Osoba która podczas przygody odchudzania przeszła wszystko. Wzloty i mocne upadki. Tutaj nasuwa się fajne zdanie, że <em>&bdquo;Nie ważne ile razy upadasz, ważne ile razy wstaniesz&rdquo;</em>. Początki odchudzania zazwyczaj bywają piękne. Ogromna motywacja, ale z czasem kilka niepowodzeń i czar pryska. <em>&bdquo;Odpuścić?&rdquo;</em> &mdash; oj Pani Kingo ile razy przeszło przez Pani głowę to pytanie? Jednak zawsze piękne jest to, że odpowiedź była jasna. <em>&bdquo;Nie!&rdquo;</em> <em>&bdquo;Nie odpuszczę!&rdquo;</em></p>
      <p>Ogrom pracy i determinacji, wynik PE&mdash;TA&mdash;RDA. I oczywiście wielki szacunek za podejście. Ah jak ja lubię tak zdeterminowane osoby, które jeszcze muszę prosić, aby np. <em>&bdquo;mniej ćwiczyły&rdquo;</em> czy po prostu troszkę <em>&bdquo;wyluzowały&rdquo;</em>, bo dają z siebie wielokrotnie tyle ile sam organizm nie jest w stanie z siebie wyciągnąć.</p>
      <p>Super przemiana, niesamowita historia i Pani Kingo dziękuję. Jak każda przemiana tak i ta czegoś mnie nauczyła &mdash; nie ważne jak trudno będzie, nigdy nie ustępować w swoich marzeniach i celach na krok.</p>
      <p>Powodzenia w dalszych zamierzonych celach i oczywiście <em>&bdquo;nie&rdquo;</em> do zobaczenia!</p>
      `
    },
    {
      title: 'Pani Izabela',
      weight: '&ndash;8 kg',
      image: 'izabela',
      description: `
      <p class="font-weight-bold">Ciekawa metamorfoza &ndash;8 kg&hellip; Spójrzcie sami na fotki.</p>
      <p>Najważniejsze to mieć cel, i podążać krok za krokiem, aby go osiągnąć. Nie mając obranego punktu, do którego dążymy zatracamy piękno dnia codziennego. Wszystko biegnie tak szybko i bez większego sensu.</p>
      <p>Dlatego cel i marzenia są bardzo ważne. Wydaję mi się, że człowiek powinien zawsze je mieć i do nich dążyć. Podziwiam Panie, które są w stanie zrobić dietetyczne cuda, aby zmieścić się w wymarzoną kreację w najbardziej oczekiwane popołudnie w swoim życiu. W sumie Panowie wcale w niczym nie ustępują.</p>
      <p>Pani Izabelo szacunek za podejście do własnej przemiany. Nie było zbyt wiele czasu, ale z każdego dnia wycisnęła Pani dietetyczne cuda. Ogrom sporej pracy i wynik godny pochwał.</p>
      <p>Nie przynudzając dłużej&hellip; dziękuję za świetną współpracę. Wprawdzie krótką, ale przepełnioną mega pozytywną energią. Zresztą &mdash; wydaję mi się, że każdy się ze mną zgodzi, kto Panią zna, że jest Pani chodzącym <em>&bdquo;źródłem&rdquo;</em> uśmiechu, życzliwości i optymistycznego podejścia do życia!</p>
      <p>Powodzenia w realizacji dalszych celów i marzeń!  Do zobaczenia! </p>
      `
    },
    {
      title: 'Pani Barbara',
      weight: '&ndash;10 kg',
      image: 'barbara',
      description: `
      <p class="font-weight-bold">Nie ma to tamto. Moi Drodzy, moi Mili. Na monitorach Pani Barbara z wynikiem? &ndash;10 kg.</p>
      <p>Ha! Po pierwsze ogromne gratulację, po drugie muszę kilka słów dodać od siebie.</p>
      <p>A więc! Ogromny szacunek za wytrwanie w postanowieniach i jadłospisie. Doskonale wiemy, że łatwo nie było. Ogrom pracy i obowiązków jaki towarzyszy Pani w pracy niejednokrotnie pokonał niejedną osobę.</p>
      <p>Uchylmy rąbka tajemnicy. Pani Basia jest Dyrektorem Szkoły. Zadanie nie łatwe, ale to tym bardziej jeszcze wielki szacunek. Myślę, że podopieczni i uczniowie, którzy Panią znają mogą śmiało brać przykład i naśladować Pani determinacje i niesamowitą siłę. Z takim nastawieniem każdy z nich osiągnie sukcesy, o jakich tylko marzy.</p>
      <p>Dodatkowo Pani Basia jest kolejną osobą, która zawsze będąc na wizycie pozostawiała ogrom bardzo pozytywnej energii. I mimo czasem całkowitego zmęczenia baterie z automatu zostały naładowane.</p>
      <p>Bardzo dziękuję za współpracę i proszę mnie czasem odwiedzić. Mocne powodzenia i trzymam kciuki za dalsze sukcesy!</p>
      `
    },
    {
      title: 'Pani Monika',
      weight: '&ndash;15 kg',
      image: 'monika',
      description: `
      <p class="font-weight-bold">Hmm&hellip; Długo się zastanawiałem co napisać dumając nad kolejną mega ekstra przemianą. Przed Wami Pani Monika z wynikiem &ndash;15 kg.</p>
      <p>Nie przedłużając słowa wstępu Pani Monika dała się poznać jako osoba uśmiechnięta i nastawiona bojowo do tematu który podjęła bowiem na pierwszej wizycie pojawiła się świeżo przed Wigilią.</p>
      <p>Jako nieliczni po świętach podczas pierwszej kontroli pokazała świetny wynik. Po drodze mieliśmy okazję przejść jeszcze święta Wielkanocne, które również były pod przewodnictwem genialnego wyniku.</p>
      <p>Do czego dążę? A do tego, że tak potrafią tylko osoby ogromnie zdeterminowane, które przeciwności losu traktują nie, jako porażkę a jako wyzwanie, któremu chcą podołać.</p>
      <p>Pani Moniko wielki szacun nie tylko za odchudzenie, ale także za poprawienie spraw zdrowotnych! Ogromnie mocno bije brawa Ja jak i mam nadzieje każdy, kto ogląda tą prze mega przemianę!</p>
      <p>Trzymam kciuki za Panią i do zobaczenia!</p>
      `
    },
    {
      title: 'Pani Melania',
      weight: '&ndash;31 kg',
      image: 'melania',
      description: `
      <p class="font-weight-bold">Oj cicho coś na Strefie Fit  No to robimy szum. Przed Wami Melania z wynikiem &ndash;31 kg. No historia jakich mało.
      <p>Melania trafiła do mnie głównie aby powalczyć o swoje zdrowie. Jej celem było wyprostowanie wyników i cichaczem ukradkiem marzyła o sylwetce widocznej na zdjęciu. Nie bójmy się tego słowa sylwetki normalnie <em>&bdquo;modelki</em>&rdquo;.</p>
      <p>Melanii na samym początku towarzyszyło na drodze wiele osób w dążeniu do celu. Jednak, jako jedyna wytrwała do końca. Ja i reszta świata mogła już tylko podziwiać to co wyprawia. A szalała ze spadkami kilogramów niczym Ja na motocyklu jak widzę piękne długie proste na totalnym odludziu.</p>
      <p>Przez cały czas pokazywała sakramencką determinacje. Szczerze mówiąc poznając Ciebie nie sądziłem, że jest aż tak potężna. Nie dawała się skusić na żadne odstępstwa i leciała z kilogramami niczym samolot którym uwielbia fruwać do kraju który kocha Włoch.</p>
      <p>Melania jesteś prze agentka i tak trzymaj. Za ten wynik ogromne gratulację i chyle czoło tak nisko jak tylko umiem.</p>
      <p>Szacun szacun i jeszcze raz szacun. Tak trzymaj i ogromnie trzymam za Ciebie kciuki! I uważaj na wszystkie przysmaki które kuszą! Nie daj się! Do zobaczenia!</p>
      `
    },
    {
      title: 'Pan Damian',
      weight: '&ndash;20 kg',
      image: 'damian',
      description: `
      <p class="font-weight-bold">Uuu&hellip; Kolejna petarda w metamorfozach. Damian &ndash;20 kg.
      <p>Historia? O&hellip; Jest kilka spraw które pasuje nagłośnić, wyrzucić z siebie. Czekałem na ten moment bardzo długo.</p>
      <p>Było ich dwoje. Damian ze swoją Żoną walczyli o lepsze Ja. Po pierwsze strasznie zdeterminowani, niesamowicie uparci w dążeniu do celu i&hellip; twórczość, która nie znała granic.</p>
      <p>Ktoś zapytać, jaka twórczość? A taka, że takich kompozycji i wymyślnych diet nie widziałem bardzo dawno, baaa chyba nigdy nie miałem okazji doświadczyć. Druga połówka Damiana (celowo na razie pozostawiam anonimową, może nie bawem będziemy mieli okazje podziwiać jej przemianę) zmieniała dietki, komponowała takie przepisy że do dziś budzę się w nocy z krzykiem przerażenia. Żartuje oczywiście, wypas kreatywność.</p>
      <p>Po drugie jak już wspominałem że uwielbiam wesołe ekipy. Z Wami zawsze była kupa śmiechu. Dajecie niesamowicie mocny zastrzyk pozytywnej energii. I tak trzymać!</p>
      <p>Po trzecie Damian słowem kończącym. Nie daj się podjadaniu, walcz tak jak walczyłeś, bo determinacja była ogromna, ciachałeś kilogramy niczym bramki na boisku.
      <p>Tak trzymaj, dzięki za współpracę i oczywiście mam nadzieję <em>&bdquo;nie do zobaczenia</em>&rdquo;!</p>
      <p>PS. Przez Was mocno się zastanawiam nad wyeliminowaniem możliwości zmian w jadłospisach. Kolejny raz tego moja psycha nie przeżyje. (ŻART)!</p>
      `
    },
    {
      title: 'Pani Jadzia',
      weight: '&ndash;23 kg',
      image: 'jadzia',
      description: `
      <p class="font-weight-bold">Każdy zna taką osobę baa nawet osoby, na których przyjazd lub wizytę uśmiech z automatu pojawia się na twarzy. Przed Wami Pani Jadzia z wynikiem &ndash;23 kg.  Osoba zawsze uśmiechnięta, radosna i z tak ogromnym pozytywnym podejściem do życia że naprawdę rozmowa z Panią ładuje akumulatory w tempie ekspresowym.</p>
      <p>Łatwość w spadku kilogramów jest efektem systematyczności i stosowania wskazówek na 120%.</p>
      <p>W Pani Jadzi zasadach nie było mowy o odstępstwach, dlatego właśnie osiągnęła coś tak piorunującego, co mamy przyjemność widzieć na zdjęciach. Pani Jadziu oczywiście nie do zobaczenia!</p>
      <p>Ale mam nadzieję że jeszcze się spotkamy. Może nie koniecznie w sytuacji kolejnych postanowień co do utraty wagi a po prostu na kawie lub <em>&bdquo;pośmieszkować</em>&rdquo; tak jak to było na każdej wizycie. Pani Jadzia jeździła na wizytę z koleżankami, które również walczyły o lepsze Ja.</p>
      <p>Będzie mi Was brakowało, dlatego koniecznie odwiedzajcie mnie jeszcze. <em>&bdquo;Wesoła Ekipo</em>&rdquo; &mdash; bo tak zawsze Was nazywałem. Powodzenia i bardzo mocno trzymam za Was kciuki!</p>
      `
    },
    {
      title: 'Pani Ania',
      weight: '&ndash;30 kg',
      image: 'ania',
      description: `
      <p class="font-weight-bold">Na zdjęciu Pani Ania. Wynik? &ndash;30 kg. Jak zobaczyłem foty jedynie, co powiedziałem to WOW.</p>
      <p>Jak dobrze, że w obecnych czasach mamy możliwość <em>&bdquo;strzelić</em>&rdquo; sobie zdjęcie. Przynajmniej później możemy podziwiać tak niesamowite efekty.</p>
      <p>Wiem, że WOW to mało powiedziane. Pani Aniu szacun, klasa i wielkie brawa. Na Pani drodze bywały i wzloty i upadki. Bywały chwile gorsze jak i te, po których motywacja tylko rosła. Jakikolwiek wynik nie słyszeliśmy po kontrolach zapamiętałem, że zawsze z uśmiechem i ogromnym hartem ducha podchodziła Pani do swoich postanowień mimo czasem mniejszych lub większych upadków.</p>
      <p>Pani Aniu bardzo mocne gratulację. Trzymam bardzo mocno kciuki za dalsze postanowienia i cele, jakie są przed Panią. Jestem przekonany że poradzi sobie Pani z łatwością.</p>
      <p>Jeszcze raz bije brawo i gratuluje. Do usłyszenia i zobaczenia!</p>
      `
    },
    {
      title: 'Pani Cecylia',
      weight: '&ndash;10 kg',
      image: 'cecylia',
      description: `
      <p class="font-weight-bold">Strefowicze! Na zdjęciu Pani Cecylia. Wynik? &ndash;10 kg.</p>
      <p>Wiecznie w biegu, totalnym zawirowaniu. Na życiowym <em>&bdquo;speedzie</em>&rdquo;. Tak Panią zapamiętam. Zastanawiając się jak w tym całym galimatiasie różnych spraw, zawodowych, hobbistycznych udaję się znaleźć czas na dokładne sporządzanie posiłków i ich konsumowanie. Można krótko pokusić się o stwierdzenie że było to tak precyzyjne niczym gra na skrzypcach.</p>
      <p>Efekty były piękne jak muzyka wydobywająca się z tych smyczkowych instrumentów. Klasa sama w sobie.</p>
      <p>Receptę na sukces w metamorfozach odnalazła Pani na 100%. Kolejny raz śmiało można powiedzieć: <em>&bdquo;Dla chcącego, nic trudnego</em>&rdquo;.</p>
      <p>Współpracę zakończę z wielkim uśmiechem i radością dnia codziennego, jakim potrafiła Pani zarażać. Na pewno nie tylko mnie, ale innych w koło także.</p>
      <p>Przesyłam wielkie podziękowania za te kilka miesięcy współpracy. Życzę samych sukcesów w postanowieniach, jakie sobie Pani postawi na swojej drodze. I zarażony łatwością podchodzenia do wielu spraw wprowadzam to w życie sam.</p>
      <p>Pani Cecylio do zobaczenia i trzymam bardzo mocno kciuki!</p>
      `
    },
    {
      title: 'Pani Anonim',
      weight: '&ndash;24,5 kg',
      image: 'anonim-1',
      description: `
      <p class="font-weight-bold">No No No! Metamorfoza piorunująca &ndash;24,5 kg. Niestety Pani z tej przepięknej przemiany chciała pozostać anonimowa ale muszę coś napisać.</p>
      <p>Ujmę to w skrócie i podsumowując te kilkanaście tygodni.</p>
      <p>Na pierwszej wizycie poznając Panią od razu wiedziałem, że nadmierne kilogramy, z którymi się Pani boryka raczej zostaną w tępię ekspresowym odseparowane. Skąd to wiedziałem? Nie&hellip; Nie jestem wróżką.</p>
      <p>Pewny krok, twarde postanowienie przemiany własnego życia. Widać było, że na Pani drodze nie może być słowa <em>&bdquo;spróbuję/może się uda/nie wiem czy coś z tego będzie</em>&rdquo;. Jedyne, co zagościło to <em>&bdquo;zrobię to</em>&rdquo; &mdash; i oczywiście nie było innej opcji.</p>
      <p>Bardzo, ale to bardzo gratuluję. I gratuluję nastawienia i zmiany o 180 stopni. Jednak to prawdą, że największe sukcesy osiągają ludzie który <em>&bdquo;nie snują a realizują</em>&rdquo;.</p>
      <p>Brawo bije, czoło chyle! Tak trzymać! I powodzenia w dalszych celach! Do zobaczenia!</p>
      `
    },
    {
      title: 'Pani Agnieszka',
      weight: '&ndash;7 kg',
      image: 'agnieszka',
      description: `
      <p class="font-weight-bold">Strefowicze! Przed Wami Pani Agnieszka z wynikiem 7 kg.</p>
      <p>Przemiana może i dla niektórych niepozorna. Ale patrzcie Państwo ile to 7 kg odjęło Pani Agnieszce lat (z 25 na 20), dodało energii, wigoru no i z moich obserwacji uśmiechu.</p>
      <p>Przepiękna metamorfoza wiosenna nic tylko ciuchy zmieniać na lżejsze, bardziej dopasowane.</p>
      <p>Ułatwieniem może być to że Pani Agnieszka pracuje w zawodzie w którym wszystkie ciuchy z większych rozmiarów można przerobić na slim fit. I tego jej wszyscy zazdrościmy. Przepięknej metamorfozy i oszczędności bo doskonale wiedzą Ci co zakończyli przemiany ile kosztuje wybranie się po nową garderobę.</p>
      <p>Kończąc. Pani Agnieszko życzę dalszych sukcesów. Utrzymywania przepięknej figury (bo nawet najlepsza krawcowa nie poradzi sobie z przeróbkami z rozmiarów mniejszych na większe).</p>
      <p>Bardzo dużo uśmiechu i serdecznie dziękuję za tak miłą współpracę! Miłego dnia i <em>&bdquo;nie do zobaczenia</em>&rdquo;!</p>
      `
    },
    {
      title: 'Pan Marek',
      weight: '&ndash;20 kg',
      image: 'marek',
      description: `
      <p class="font-weight-bold">Drodzy Fani Strefy Fit. Przestawiam Wam Marka z wynikiem &ndash;20 kg. Opis? Myślę, że zdjęcia mówią wszystko. Totalna zmiana nawyków żywieniowych, całkowity obrót swojego życia. Aż o 180 stopni.</p>
      <p>Marek z zawodu jest kierowcą. Praca o tyle ciężka, że siedząca. Monotonia powoduję, że sięgamy po przekąski. Jak często niezdrowe. Szacun za to, że potrafiłeś zmienić swoje życie. Z batonika na nasiona słonecznika, z energetyków na zamienniki zdrowe, kawa, woda. Z obiadków z lokalnych barów na sumiennie przygotowane pudełeczka.</p>
      <p>Z mojej strony nisko głowa upada. Chyle jak zwykle czoła. Przemiana gigant. Najbardziej piękne jest to jak widzę z mojej perspektywy jak zmienia się życie osobom, z którymi współpracuje.</p>
      <p>Marku Szacun Szacun Szacun! Tak trzymaj! I Trzymam bardzo mocno kciuki za kolejne zdobyte cele. I jeszcze mocniej trzymam kciuki abyś to robił z taką łatwością jak teraz! Do zobaczenia!</p>
      `
    },
    {
      title: 'Pani Elżbieta',
      weight: '&ndash;19 kg',
      image: 'elzbieta',
      description: `
      <p class="font-weight-bold">WoW! &mdash; tak sobie pomyślałem jak dostałem maila ze zdjęciami od Pani Elżbiety. &ndash;19 kg &mdash; taki wynik zagości dzisiaj w metamorfozach. Naprawdę wielki szacunek.<p>
      <p>Cóż, z tego co pamiętam wykres spadków był piorunująco piękny. Aczkolwiek warto zauważyć, że i u Pani zdarzyły się lekkie zastoje. Pokonane z gracją i łatwością.<p>
      <p>Wielkie gromkie brawa za determinacje. Praca fizyczna i do tego w ciastkarni również nie sprzyjała. Pokusy na każdym kroku! Tak sobie myślę, że ja to bym chyba oszalał mając wszędzie w koło smakołyki i mając z tyłu głowy, że jednak redukcja trwa.<p>
      <p>Gratuluję bardzo silnej woli, motywacji, zachowanej determinacji i bardzo dziękuję za współpracę.<p>
      <p>Życzę każdemu takiej łatwości w skakaniu po kilogramach. I Pani Elżbieto trzymam bardzo mocno kciuki za dalsze sukcesy. Jeszcze raz WoW!<p>
      `
    },
    {
      title: 'Pani Katarzyna',
      weight: '&ndash;17 kg',
      image: 'katarzyna',
      description: `
      <p class="font-weight-bold">Przed Państwem kolejna metamorfoza. Wynik &ndash;17 kg. Niestety Pani Katarzyna postanowiła w pewien sposób pozostać anonimowa ale co nie co muszę napisać. Jak to Ja.</p>
      <p>Przemiana bardzo ciekawa. Osoba tym bardziej. Pani Katarzyna bywała na spotkaniach z siostrą, która motywowała ją aż do samego końca. Bardzo pozytywne gaduły!</p>
      <p>Twardo można rzec metamorfoza przepiękna. Szacun Pani Kasiu za zmianę własnego ja. Bije mocno brawo oczywiście mocne powodzenia w dalszych przeprawach przez postawione przez siebie cele!</p>
      <p>Trzymam kciuki i (Nie) do zobaczenia!</p>
      `
    },
    {
      title: 'Pani Zofia',
      weight: '&ndash;23 kg',
      image: 'zofia',
      description: `
      <p class="font-weight-bold">Ah ciekawa metamorfoza. Pani Zofia. Wynik? &ndash;23 kg. Hmm. Poznałem Panią Zofie, jako osobę skromną, cichą i w sumie nawet nie spodziewałem się jak wielki duch walki jest w niej.</p>
      <p>Początki, pamiętam je doskonale. Niczym sądecki wiatr mknęła jak sportowy samochód przez nasze autostrady.</p>
      <p>Hart ducha? tak! Bo nie zawsze było kolorowo. Zastoje jak w każdej większej redukcji też się pojawiły. I tutaj dopiero w grę wchodzi determinacja. Pokazuje charakter człowieka!</p>
      <p>Determinacja była, jest i widzę, że będzie. Bo zastój został pokonany.</p>
      <p>Pani Zofia była również jedną z osób, którą prosiłem, aby była mniej aktywna. Zapał był tak wielki, że aż czasem trzeba było go pozytywnie rzecz ujmując przygasić dla rzecz jasna zdrowia.</p>
      <p>Pani Zofio &mdash; zaskoczenie &mdash; moje i wszystkich tych, którzy spoglądali na Pani metamorfozę. Oczywiście jak to ja. Mocno biję brawo.</p>
      <p>Gratuluję spektakularnego przejścia w świat Fit i trzymam bardzo mocno kciuki za dalsze sukcesy. Jak będą tak przepiękne jak teraz to nic na świecie nie stanowi przeszkody! Dziękuję!</p>
      `
    },
    {
      title: 'Pan Leszek',
      weight: '&ndash;39 kg',
      image: 'leszek',
      description: `
      <p class="font-weight-bold">Spotykam na prawdę sporo osób. Jedni mają sporo motywacji, jednak determinacji brak. Inni przychodzą tylko i mówią <em>&bdquo;byłem/am próbowałem/am</em>&rdquo; i na tym kończy się ich przygoda.</p>
      <p>Jednak najbardziej niesamowitymi osobami są Ci, którzy mają motywacje i determinacje na poziomie tak ogromnym, że ich przemiana jest wkroczeniem w zupełnie nowe życie.</p>
      <p>Pan Leszek. Człowiek, dla niektórych bohater, dla innych osoba, dla której nie ma rzeczy nie mozliwych. &ndash;39 kg, tyle kilogramów udało się wywalczyć. Można by rzec &mdash; pięknie, ładnie, wow.</p>
      <p>Osoba widoczna z prawej strony zdjęcia dokonała czegoś świetnego. Jest kimś zupełnie innym. Nie tylko w kwestii wyglądu. Pan Leszek podreperował mocno swoje zdrowie, wykaraskał się z kilku poważnie brzmiących i wyglądających chorób, które utrudniały mocno jego codzienność.</p>
      <p>Tak wielkie rzeczy dokonywać mogą tylko wielcy ludzie. Panie Leszku wiem, że skromnie wszystkim komplementom Pan zaprzeczy jednak ja chyle czoła. Pokonał Pan wszystkie złe nawyki, jakie pogrążały Pański organizm. Przeszedł Pan przez złe momenty w diecie, pokonał zastoje i słabsze chwilę. Piękno przemiany, które możemy podziwiać na zdjęciu to czubek góry lodowej, doskonale wiemy jak ciężka droga była na szczyt. Bo o tym wiedzą osoby, które przemianę Pana przeżywały na co dzień.</p>
      <p>Panie Leszku kończąc muszę zauważyć jedno. 4 % Pana pracy 1 % mojej. Brawa obaj bijemy Pańskiej żonie! To Ona tutaj ma swój wkład 95% i to nie podlega dyskusji.</p>
      <p>Gratuluję Państwu sukcesu! Tak trzymajcie a razem sprostacie każdemu wyzwaniu. Dziękuje bardzo i do zobaczenia!</p>
      `
    },
    {
      title: 'Pani Aneta',
      weight: '&ndash;10 kg',
      image: 'aneta',
      description: `
      <p class="font-weight-bold">Tym razem przedstawiam Panią Anetę &ndash;10 kg.</p>
      <p>Każda osoba, to oddzielna historia, inny cel. Pani redukcja mam wrażenie, że przemknęła tak szybko niczym lato, które mieliśmy za oknem. Końcówka dosyć trudna ponieważ motywacja spada wraz z ilością pochwał jakie Pani zdobywała ale najważniejsze że determinacji wystarczyło.</p>
      <p>Panią Anetę zapamiętałem, jako osobę zawsze uśmiechniętą i pogodnie przyjmującą dobre jak i nieco gorsze informację, co do wyniku. Na szczęście tych pierwszych było o wiele wiele więcej.</p>
      <p>Oczywiście nie zapominajmy o Towarzyszu Pani Anety, który jest na zdjęciu. Który trzyma formę nieskazitelnie i to bez stosowania żadnych wyszukanych diet. Tak trzymaj Filip. Tobie jako pierwszemu życzę powodzenia!</p>
      <p>Bardzo miło będę wspominał Pani przemianę, pełną uśmiechu i pogody ducha. Życzę sukcesów w kolejnych postawianych sobie przed sobą celach. Mocne powodzenia dla Pani i do zobaczenia!</p>
      `
    },
    {
      title: 'Pani Małgorzata',
      weight: '&ndash;18 kg',
      image: 'malgorzata',
      description: `
      <p class="font-weight-bold">Drodzy Mili. &ndash;18 kg może pochwalić się takim pięknym wynikiem Pani Małgorzata.</p>
      <p>Metamorfoza przeze mnie zapamiętana a dlaczego?</p>
      <p>Pamiętam jak rozmawialiśmy na temat jadłospisu, w którym mocno Pani Małgorzata zaprzeczała, że nie chce artykułów zbożowych. A ja uparcie namawiałem że to na prawdę żadne zło.</p>
      <p>Jak później się okazało udało się mi przekonać do swoich racji i wyniki były olśniewająco piękne. Oczywiście jest to ziarenko przy tym całym owocnym planie jaki udało się osiągnąć.</p>
      <p>Metamorfoza ekstra! I z biegiem czasu dowiedziałem się jedno. Jest Pani osobą pozytywnie upartą, która twardo stąpa i wie że jak postawi sobie cel to nie ma uproś.</p>
      <p>Oczywiście wielkie gratulację i trzymam mocno kciuki za utrzymanie wagi.</p>
      <p>Powodzenia!</p>
      `
    },
    {
      title: 'Pani Maria',
      weight: '&ndash;11 kg',
      image: 'maria',
      description: `
      <p class="font-weight-bold">Moi Drodzy! Kolejna bardzo inspirująca metamorfoza &ndash;11 kg.</p>
      <p>Przedstawiam Panią Marie. Przemiana ogromna. Nie tylko sylwetki ale także ducha. Zawsze utrata kilogramów powoduję nie tylko zmiany w figurze ale także samopoczuciu i zdrowiu.</p>
      <p>Pani Mario dziękuje za współpracę i życzę oczywiście dalszych sukcesów. No i oczywiście witam serdecznie w gronie osób Fit!</p>
      `
    },
    {
      title: 'Pani Barbara',
      weight: '&ndash;18 kg',
      image: 'barbara-2',
      description: `
      <p class="font-weight-bold">Dla niektórych redukcja masy ciała to bajka. Inni uważają to za sprawę dosyć prostą, inni zaś mówią, że lekko nie ma. Dla Pani Barbary uważam, że była to droga przez niezłą mękę.</p>
      <p>Wynik &ndash;18 kg nie przyszedł łatwo, bowiem Pani Barbara pracuję w cukierni i zapachy, jakie spotyka, na co dzień muszą być obłędne. Silny charakter i niesamowita determinacja doprowadziła do efektu, jaki możemy dzisiaj podziwiać powyżej.</p>
      <p>Czasami mam przyjemność skosztować przysmaki, z jakimi Pani Barbara ma styczność i powiem szczerze miodzio dla podniebienia.</p>
      <p>I na prawdę czapki Moi Drodzy z głów. Osobiście chyle czoła, bo skoro Pani z takimi trudnościami walczyła podczas odchudzaniu to reszta wydaję się maleńkim okruszkiem.</p>
      <p>Ze swojej strony bardzo mocno gratuluje i ile razy Panią spotkam będę bił brawo.</p>
      <p>Oczywiście życzę powodzenia w dalszych tak prze świetnych sukcesach. Witam serdecznie w gronie osób FIT!</p>
      `
    },
    {
      title: 'Pani Paulina i Pan Piotr',
      weight: '&ndash;32 kg',
      image: 'paulina-piotr',
      description: `
      <p class="font-weight-bold">Moi Mili Moi Drodzy! Pamiętacie na pewno jakiś czas temu udostępnienie Małżeństwa, które przeszło przepiękną metamorfozę. Pokazywaliśmy zdjęcia osobno, jednak o sukces do końca walczyli razem.</p>
      <p>Tym razem coś zupełnie innowacyjnego.</p>
      <p>Pani Paulina i Pan Piotr! Którzy od początku do samego końca walczyli o każdy kg razem. Tak, więc mamy przepiękny sukces. Nie bagatela bo przecież łącznie aż 32 kilogramy!</p>
      <p>Oczywiście nie byłbym sobą gdybym nie napisał krótko jak zapamiętałem ich osobowości, charaktery i to jak walczyli twardo o każdy nawet najmniejszy spadek wagi.</p>
      <p>Pani Paulina skrupulatna w każdym calu. Zawsze wiedziałem, że czeka mnie mały <em>&bdquo;egzamin</em>&rdquo;, bowiem Pani Paulina zawsze na spotkaniu miała mase pytań do mnie. Uff &mdash; z tego co pamiętam nie zaskoczyła mnie niczym ale znaleźć odpowiedzi było bardzo ciężko.</p>
      <p>Pan Piotr człowiek, którego podziwiam już nawet nie za przemianę, jaką dokonał, choć to oczywiście także zasługuje na gromkie brawa. Podziwiam go za to, że zmienił się właściwie o 180 stopni. Przekonał do wielu produktów które były kluczem w diecie a wcześniej nie mogło być o nich mowy. Więc tym bardziej szacunen.</p>
      <p>Podsumowując. Pani Paulino, Panie Piotrze będzie mi na prawdę brakować spotkań z Wami. Niestety sprawa jest nieunikniona, ale każdy po metamorfozach pozostawia ziarnko goryczy. Bo zdaję sobie sprawę że to już po prostu koniec. Bardzo pozytywne zakończenie ale jednak.</p>
      <p>Pociesza mnie jednak myśl, że jest jeszcze wiele historii i jeszcze więcej osób, z którymi się zżyje i uda się nam wspólnie zmienić ich życie o 180 stopni tak jak zmieniliśmy Wasze.</p>
      <p>Pani Paulino, Panie Piotrze dziękuje. Pokazaliście, że na prawdę we dwójkę można wszystko. Jestem przekonany, że jaką poprzeczkę sobie nie postawicie z łatwością ją przeskoczycie. Trzymam bardzo mocno za Was kciuki! Do zobaczenia!</p>
      `
    },
    {
      title: 'Pani Ewa',
      weight: '&ndash;14 kg',
      image: 'ewa',
      description: `
      <p class="font-weight-bold">Wydaje mi się, że każdy poznał w swoim życiu osoby, z którymi współpraca wydawać by się mogło będzie trudna a raczej nawet nie możliwa.</p>
      <p>Pani Ewa po pierwszej wizycie została zapamiętana przeze mnie, jako skromna, cicha osoba. Miałem przeczucie, że motywacja jest ogromna natomiast gdzieś może zabraknąć determinacji</p>
      <p>Pierwsza wizyta kontrolna i&hellip;? Wizyta odwołana. Nie było w tym mojego zdziwienia.</p>
      <p>Jak więc wielkie było moje zdumienie jak Pani Ewa zadzwoniła umówić się na kontrole po raz kolejny i z każdym dniem widziałem osobę, która jednak nie ma zamiaru poddać sprawy.</p>
      <p>Do dnia dzisiejszego z każdą wizytą Pani Ewa zaskakuję mnie coraz bardziej. I po słowie wstępu oczywiście bardzo przepraszam za to, że moja wiara była tak skromnie mała. Myślę, że pokazała Pani nie tylko mi, ale również innym niedowiarkom jak silny charakter ma i jak wiele potrafi osiągnąć.</p>
      <p>Dzisiaj widzę osobę pełną energii. Nadal skromną i cichą, ale myślę, że zmiana wizerunku pokazała jak wielkie rzeczy potrafi Pani osiągać. Oby tak dalej Pani Ewo.</p>
      <p>Bardzo dziękuje za tą jakże wspaniałą współpracę. I gratuluję wejścia w jakże pięknym stylu w świat osób Fit. Pozdrawiam serdecznie!</p>
      `
    },
    {
      title: 'Pani Elżbieta',
      weight: '&ndash;10 kg',
      image: 'elzbieta-2',
      description: `
      <p class="font-weight-bold">Kolejna Bohaterka, kolejne wyzwania, kolejny piękny sukces &ndash;10 kg.</p>
      <p>Poznałem Panią Elżbietę na tyle na ile można kogoś poznać w kilkanaście tygodni. Miłośniczka gór i osoba, która umie walczyć z własnymi słabościami. Bowiem nikt nie wybiera się w wysokie góry, jeśli nie ma silnego charakteru.</p>
      <p>Redukcja dla Pani była poniekąd małym <em>&bdquo;K2</em>&rdquo;. Wyrzeczenia, walka z własną silną wolą i słabościami. Brawo. I tym razem dociera Pani na sam szczyt.</p>
      <p>Teraz z góry może Pani popatrzeć na całą drogę, jaką przeszła. Jest nie mała, prawda? I gdy już człowiek zdobędzie punkt, do którego dąży zdaję sobie sprawę, jakie piękno osiągnął. Jednak najpiękniejsze jest w tym to, że nie cieszy aż tak osiągniecie celu a tak na prawdę droga, jaką musieliśmy przejść, aby to osiągnąć. To w niej jest najpiękniejsza historia i przygoda.</p>
      <p>Pani Elżbieto moje wielkie gratulacje. Życzę kolejnych świetnych wyników nie tylko w byciu Fit. Trzymam bardzo mocno kciuki za Panią.</p>
      <p>Serdeczne dziękuje i powodzenia!</p>
      `
    },
    {
      title: 'Pani Barbara',
      weight: '&ndash;7 kg',
      image: 'barbara-3',
      description: `
      <p class="font-weight-bold">Żywiołowość, energia, bojowość, dynamiczność i wiele wiele innych zalet&hellip; Tak można określić Panią Barbarę. Kolejną bohaterkę metamorfoz &ndash;7 kg.</p>
      <p>Krótko mówiąc Pani Barbara nie zadając zbyt wiele pytań, z każdą wizyta ciachała kg niczym brzytwa. Myślę, że sumienne stosowanie jadłospisu jak i po prostu zmiana nawyków żywieniowych spowodowały, że efekt piękny widać od razu. Uważam, że Pani w swoim ciągłym biegu spala tyle, co biegacz w <em>&bdquo;ultra maratonie</em>&rdquo;.</p>
      <p>Brawa duże dla Pani i gratuluję. Bardzo mile będę wspominał przemianę widoczną na zdjęciu, bo pogodą ducha i niesamowitym optymizmem zawsze Pani zarażała innych w tym mnie.</p>
      <p>Powodzenia w dalszych sukcesach. Trzymam kciuki! Do zobaczenia!</p>
      `
    },
    {
      title: 'Pani Anna',
      weight: '&ndash;24,2 kg',
      image: 'ania-2',
      description: `
      <p class="font-weight-bold">-24,2 o to ten wynik zostaje na stałe przypisany w historie Pani Anny.</p>
      <p>Uważam, że metamorfoza, którą widzimy wymaga zatrzymania się na chwilę w tym codziennym biegu. Ilekroć zerkam na zdjęcia widzę w głowie historie.</p>
      <p>Historie osoby, która mimo przeciwności losu utraciła dawno temu idealna sylwetkę. Pani Anna powiedziała pewnego dnia dość. Z wielkim hartem ducha i niesamowita determinacją odzyskała świetną figurę. Zmiana nawyków żywieniowych spowodowała, że Pani Anna dziś czuje się świetnie we własnym ciele.</p>
      <p>Mogę z czystym sumieniem stwierdzić, że na prawdę podziwiam Panią za taką determinację. Miała Pani podczas odchudzania tylko jedno małe potkniecie, gdzie ja sam w swojej przemianie miałem ich dziesiątki.</p>
      <p>Chyle czoła po raz kolejny. I bardzo dziękuje Pani Anno za współpracę. Pani wyniosła z tych kilku miesięcy ekstra figurę a ja nauczyłem się, że nigdy nie warto się poddawać, walczymy zawsze do końca, mimo ze czasem światełko w tunelu jest dosłownie niewidoczne.</p>
      <p>Powodzenia i jeszcze raz bardzo dziękuje!</p>
      `
    },
    {
      title: 'Pani Irena',
      weight: '&ndash;11 kg',
      image: 'irena',
      description: `
      <p class="font-weight-bold">Pamiętacie Pana Jerzego (pierwszego mężczyznę w metamorfozach)? Przedstawiam wszystkim Panią Irenę &mdash; żonę Pana Jerzego, która szła za jego przykładem i również zdobywa przepiękny wynik &ndash;11 kg.</p>
      <p>Aż żałuję, że nie mam wspólnego zdjęcia przemiany. Motywacja ogromna, determinacja jeszcze potężniejsza. Oboje szli za ciosem. Wspólna radość z każdego utraconego kilogramu. Kiedy jedna osoba upada, podnosi ją druga. Tym o to akcentem widzimy zmianę o 180 stopni.</p>
      <p>Mówi się, że <em>&bdquo;Za każdym sukcesem wielkiego mężczyzny stoi wyjątkowa, mądra kobieta</em>&rdquo; &mdash; ot co wielka prawda.</p>
      <p>Pani Ireno bardzo ogromne gratulację za hart ducha i siłę. Nie było na redukcji lekko. Bywały zastoje, które nawet na chwilę nie zniechęciły Panią.</p>
      <p>Brawa dla Pani i jeszcze raz dla Państwa. Życzę samych sukcesów! I na koniec bardzo dziękuje za współprace. Widać doskonale że dla Państwa nie ma rzeczy niemożliwych. Do zobaczenia!</p>
      `
    },
    {
      title: 'Pan Marcin',
      weight: '&ndash;7 kg',
      image: 'marcin',
      description: `
      <p class="font-weight-bold">Kolejna metamorfoza &mdash; kolejny mężczyzna w tej coraz większej i jakże wspaniałej galerii.</p>
      <p>Duże brawa dla Pana Marcina. Wynik &ndash;7 kg pokazuję piękną przemianę widoczną na zdjęciu.</p>
      <p>Są takie chwile w mojej pracy, które dają na prawdę niesamowity zastrzyk energii &mdash; przede wszystkim zadowolenie wszystkich osób oraz ich spektakularne przemiany. Wielkie gratulację dla Pana i podziękowanie za wytrwałość.</p>
      <p>Sukces osiągnięty poprzez systematyczną pracę. Motywacja i determinacja na najwyższym szczeblu.</p>
      <p>Powodzenia na dalszej drodze. Trzymam kciuki za kolejne sukcesy!</p>
      `
    },
    {
      title: 'Pani Magdalena',
      weight: '&ndash;7 kg',
      image: 'magdalena',
      description: `
      <p class="font-weight-bold">Przychodzi taki czas w życiu osoby z nadwaga, że pora powiedzieć sobie <em>&bdquo;stop</em>&rdquo;. Im wcześniej to się wydarzy tym lepiej. Przedstawiam wszystkim Panią Magdalenę z wynikiem &ndash;7kg. Spadek na wadze bardzo widoczny, ponieważ główny ubytek to tkanka tłuszczowa.</p>
      <p>Plan był prosty: schudnąć.</p>
      <p>Pojęcie dieta kojarzy się dość restrykcyjne, ale mam nadzieje ze udało się mi przekonać Panią Magdalenę, że <em>&bdquo;nie taki straszny wilk</em>&rdquo;. Motywacja i determinacja te dwa słowa kierowały Panią Magdalenę codziennie krok do celu.</p>
      <p>Mimo trudności i chwil zwątpienia efekt piękny. Rzetelnie realizowany plan dietetyczny i treningowy skutkuje udaną metamorfozą. Zmieniony styl życia tak, więc nie muszę się martwić, że sobie Pani nie poradzi w przyszłości z utrzymaniem świetnego wyniku.</p>
      <p>Kolejny raz jestem bardzo dumny i trzymam bardzo mocno kciuki za następne sukcesy. Powodzenia!</p>
      `
    },
    {
      title: 'Pan Jerzy',
      weight: '&ndash;27 kg',
      image: 'jerzy',
      description: `
      <p class="font-weight-bold">No i Strefa Fit doczekała się! Pierwszym mężczyzną, który zgodził się udostępnić swoją metamorfozę jest Pan Jerzy. Niczym <em>&bdquo;Rodzynek</em>&rdquo; wśród Pań, które mogliśmy podziwiać wcześniej.</p>
      <p>Efekt zdumiewająco piorunujący. Mniej 27 kg. Droga jaką Pan Jerzy przeszedł podczas odchudzania na pewno była troszkę wyboista niczym trasy motocyklowe jakie pokonuje w wolnych chwilach. Jednak swoim pozytywnym i zdeterminowanym podejściem była dla niego łatwością.</p>
      <p>Niesamowitym sukcesem jest to, że chwile zwątpienia były niczym pełny bak w motocyklu &mdash; tylko chwilowe. Cały czas mocnym krokiem do przodu.</p>
      <p>Świetna metamorfoza. Pan Jerzy zmienił nawyki żywieniowe i pokazał próbę sił. Jestem pewny, że zakończenie diety nie jest końcem zdrowego stylu życia. I myślę, że z każdy dzień będzie procentował jeszcze bardziej piorunująco sylwetką, kondycją i przede wszystkim lepszym samopoczuciem. Panie Jerzy dziękuję bardzo za świetną współpracę i trzymam kciuki za dalsze powodzenia!</p>
      <p>Do zobaczenia na trasie!</p>
      `
    },
    {
      title: 'Pani Iwona',
      weight: '&ndash;24,1 kg',
      image: 'iwona',
      description: `
      <p class="font-weight-bold">Przedstawiam kolejną osobę z wynikiem &ndash;24,1 kg. Pani Iwona bardzo poważnie podeszła do zmiany stylu życia i nawyków żywieniowych. Bardzo zdyscyplinowana i pracowita osoba, a swoim optymistycznym podejściem do świata zarażała na każdym spotkaniu.</p>
      <p>Sumienne przestrzeganie jadłospisu i dbałość o każdy szczegół zaleceń poskutkowało piorunującym efektem widocznym na zdjęciu. Cała redukcja stanowiła z każdym dniem próbę sił i pokazały, że Pani Iwona poradzi sobie świetnie w następnym etapie, jaki ją czeka &mdash; mianowicie utrzymanie wagi. Nowe nawyki żywieniowe procentują i będą procentować jeszcze ładniejszą sylwetką i przede wszystkim lepszym samopoczuciem.</p>
      <p>Gratuluję i trzymam kciuki za inne wyzwania które stawia sobie Pani przed sobą! Powodzenia!</p>
      `
    },
    {
      title: 'Pani Elżbieta',
      weight: '&ndash;15 kg',
      image: 'elzbieta-3',
      description: `
      <p class="font-weight-bold">Pragnę przedstawić wszystkim Panią Elżbietę. Musze przyznać, że gdy rozpoczynaliśmy współprace, delikatnie podchodziłem z dystansem do tej metamorfozy tak jak i duży dystans dzieli nasze miejscowości, bowiem Pani Elżbieta jest aż z Wrocławia. Pozytywnym aspektem jest to, że uwielbia nasze tereny górskie i bardzo często tutaj przybywa. Właściwie ma tutaj drugi dom.</p>
      <p>&ndash;15 kg jest to wynik, który nie jednego zaskoczy, zmiana na zdjęciu zaskoczy wszystkich. Piękna przemiana i ostatnie komentarze, jakie słyszę to, że bardzo Pani Elżbieta odmłodniała.</p>
      <p>Bardzo dziękuje za tak zaskakująca metamorfozę i za współprace. Świetna przemiana i życzę dalszych tak przepięknych sukcesów!</p>
      `
    },
    {
      title: 'Pani Wiktoria',
      weight: '&ndash;12 kg',
      image: 'wiktoria',
      description: `
      <p class="font-weight-bold">Chciałbym przedstawić pierwszą &mdash; najmłodszą osobę która zawita w gronie Fit!</p>
      <p>Wiktoria z wynikiem 12 kg mniej. Krótko mówiąc idealną wagę osiągnęła w 4 miesiące.</p>
      <p>Jak widać przemiana przepiękna. Można powiedzieć nowa osoba, z niesamowitym sukcesem i zmianą o 180 stopni. Wiktoria nauczyła się mnóstwa nawyków żywieniowych jak i ciężką pracą pokazała, że nie ma rzeczy niemożliwych.</p>
      <p>Gratuluje i bardzo dziękuję Wiktorii za wytrwałość. Nie mogę pominąć mamy i babci &mdash; brawa dla nich &mdash; za świetną prace. Obie były w czasie redukcji najlepszymi kucharkami w kraju.</p>
      <p>Trzymam kciuki za dalsze sukcesy i powodzenia!</p>
      `
    },
    {
      title: 'Pani Małgorzata',
      weight: '&ndash;11,5 kg',
      image: 'malgorzata-2',
      description: `
      <p class="font-weight-bold">Tym razem dosyć nietypowo. Nie sylwetką będziemy motywować a wynikami.</p>
      <p>Wielkie gratulację. Współpraca zakończona z wynikiem &ndash;11,5 kg masy ciała. Pierwszy pomiar odbył się 2016&ndash;04&ndash;11.</p>
      <p>W ciągu 2,5 miesiąca Pani Małgorzata:</p>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Utraciła ponad 10 kg czystej tkanki tłuszczowej</li>
        <li class="list-group-item">Wskaźnik BMI spadł o 4,7</li>
        <li class="list-group-item">Poziom tłuszczu około narządowego zmalał o 5</li>
      </ul>
      <p>Duże brawa, kolejne wielkie gratulację i najserdeczniejsze podziękowania za współpracę. Trzymam bardzo mocno kciuki za dalsze sukcesy!</p>
      `
    },
    {
      title: 'Pani Beata',
      weight: '&ndash;11 kg',
      image: 'beata',
      description: `
      <p class="font-weight-bold">Przedstawiam wszystkim kolejną z Pań, która zakończyła zmagania z redukcją.</p>
      <p>Wynik myślę, że zasługujący na gromkie brawa. Dziękuje bardzo za świetną współpracę, gratulację i życzę dalszych tak obrazowych sukcesów!</p>
      `
    },
    {
      title: 'Pani Małgorzata',
      weight: '&ndash;30 kg',
      image: 'malgorzata-3',
      description: `
      <p class="font-weight-bold">Do grona FIT z wielkim rozmachem dołącza Pani Małgorzata, która utraciła 30 kg w niecałe 20 tygodni. Wynik godny <em>&bdquo;szoku</em>&rdquo; na miarę ilości kg, jakie zmieniły Panią nie do poznania.</p>
      <p>Na początek kilka motywacyjnych zdań od Pani Małgorzaty:</p>
      <p><em>&bdquo;Serdecznie, zachęcam do podjęcia walki z nadwagą jednocześnie motywuje chętnych do zrobienia pierwszego kroku. Dużo razy podchodziłam do odchudzania, nie wychodziło. Usprawiedliwiałam się, że nie da rady. To była najprostsza wymówka i okazja do następnej porcji ciasta i nie tylko. Teraz doszłam do celu, to przykład dla innych, żeby uwierzyli w siebie. Nie poddawajcie się, dacie radę. Musi być cel, a każdy jeden dzień wytrwania w diecie to krok do mety, do wymarzonego celu Każdy zgubiony kilogram, będzie was motywował, staniecie się weselsi, pogodniejsi. Podjęcie diety, a jeśli zostanie połączona z aktywnością fizyczną przeniesie rezultaty. Głęboko myślę i jestem przekonana, że teraz uda się Tobie wytrwać w swoim postanowieniu. Tego życzę wszystkim z całego serca. Powodzenia.</em>&rdquo;</p>
      <p>Na zakończenie kilka słów ode mnie. Na początku moje gratulację i serdeczne podziękowania. Nie wiem, jakie będą reakcję, ale mnie zadziwiały z każdym tygodniem wyniki coraz bardziej. Tempo &mdash; oszałamiające. Nie zdąża się mi to często, ale jak wiele moich słów padło, aby wyprosić Panią Małgorzatę o zmniejszenie aktywności fizycznej i przystopowane z treningami. Nieprawdopodobna determinacja jak i upartość dążenia do celu. Zmiana o 180 stopni nie tylko na zdjęciu, ale także i w żywieniu. Myślę, że to była obopólna lekcja osiągania sukcesu. Mam nadzieję, że nauczyłem Panią Małgorzatę innego spojrzenia na żywienie, aktywności fizyczna i wszystko, co z tym związane. Wydawało się mi ze jestem osobą dążącą uparcie do celu, ale przy Pani niestety spadłem z tego podium, które liczy tylko jedno miejsce. Jest Pani nr 1. Gratuluje jeszcze raz i serdecznie dziękuje. Powodzenia w dalszych tak oszałamiających sukcesach!</p>
      `
    },
    {
      title: 'Pani Aneta',
      weight: '&ndash;8 kg',
      image: 'aneta-2',
      description: `
      <p class="font-weight-bold">Dnia 2016&ndash;03&ndash;22 po 4 miesięcznych zmaganiach Pani Anetty współpraca zakończona pełnym sukcesem.</p>
      </p>Pierwsze spotkanie z Panią Anettą można podsumować krótko. <em>&bdquo;Za bardzo nie wierze że mi się uda</em>&rdquo;. Wiec pytanie, jakim to cudem udało się uzyskać tak piorunujący wynik.</p>
      </p>To żaden cud. Ciężka praca z własnymi słabościami i niesamowita determinacja doprowadziła Panią Anette w miejsce gdzie właśnie się znajduje. Wynik jaki osiągnęła nie był łatwy do zrealizowania.</p>
      </p>Na drodze stawały pokusy w postaci słodkości i innego jedzenia które podczas redukcji było odlegle. Bywały tygodnie gdzie waga spadała po 0,1 kg na dwa tygodnie co w większości przypadków skończyło by się porzuceniem diety i postawionego sobie celu. Nie w przypadku Pani Anetty. Wiele osób ją zna natomiast ja w pełnym przekonaniu mogę powiedzieć rzadko spotyka się osoby tak zdeterminowane i posiadające niewyobrażalnie silną wolę.</p>
      </p>Pani Anetta przyszła do mnie pierwszy raz zmotywowana. Postawiła sobie cel który uważała za nieosiągalny. Mowa o spadku 5 kg. Z biegiem czasu im bliżej była celu tym ten wynik był coraz trudniejszy do osiągnięcia.</p>
      </p>Motywacja zniknęła tak jak w wielu domach znika pyszna przekąska serwowana po obiedzie. Na każdej kontroli stawała osoba coraz bardziej pewna swojego celu i za każdym razem jeszcze bardziej zdeterminowana do osiągnięcia go. Dzięki temu Pani Anetta osiągnęła swój cel i pobiła go z arcymistrzowską precyzją. Wynik to spadek o 8 kg.</p>
      </p>Ja ze swojej strony bardzo dziękuje za tę współpracę i jeszcze raz gratuluje wyniku. Chyle czoła nie za te proste tygodnie w których Pani osiągała piękne wyniki a za te w których tak trudno było je osiągnąć. Za to że nie poddała się Pani mimo trudności jakie napotykaliśmy.</p>
      </p>Kończąc. Pani Anetto dziękuje jeszcze raz i życzę z całego serca powodzenia. Trzymam bardzo mocno kciuki za utrzymanie osiągniętej wagi no i do zobaczenia niebawem!</p>
      `
    },
    {
      title: 'Pani Janina',
      weight: '&ndash;10 kg',
      image: 'janina',
      description: `
      <p class="font-weight-bold">Kolejną osobą, która zgodziła się udostępnić swoją metamorfozę jest Pani Janina.</p>
      <p>Dzięki zdrowym nawykom żywieniowym i ogromnej motywacji mamy piękny sukces widoczny na zdjęciu. Współpraca z Panią Janiną to przyjemność w każdym calu. Bywały różne kryzysy podczas tej redukcji natomiast pozytywne nastawienie Pani Janiny spowodowały, że wszystkie dni gdzie dietę najchętniej rzuciłoby się w kat odchodziły w dal. Świetna walka i samozaparcie pokazały ze dla chcącego nie ma nic trudnego.</p>
      <p>Wielkie gratulacje! Oczywiście na zakończenie pragnę bardzo serdecznie podziękować Pani Janinie za współprace i witam w świecie osób zwanych <em>&bdquo;Fit</em>&rdquo;!</p>
      `
    },
    {
      title: 'Pani Anita',
      weight: '&ndash;25 kg',
      image: 'anita',
      description: `
      <p class="font-weight-bold">Mam zaszczyt przedstawić kolejną osobę, która osiągnęła cel na miarę mistrzowską.</p>
      <p>Pani Anita z wynikiem &ndash;25 kg. Cóż mogę rzec. Kiedy usłyszałem pierwszy raz Panią Anitę wiedziałem, że będzie ciekawie. Ciężko też określić, ale czułem, że osiągnie cel. Słychać było w glosie bardzo pogodną i zdeterminowana osobę. Z każdym spotkaniem kontrolnym Pani Anita zaskakiwała wynikami, które wymagały na prawdę gromkich oklasków. Na wadze stawała osoba, która nie tylko osiągała swoje cele, ale coraz bardziej pewna tego, do czego dąży. Pani Anito, krótko można powiedzieć <em>&bdquo;Uczeń przerósł mistrza</em>&rdquo;.</p>
      <p>Dziękuje, że nie poddała się Pani mimo chwil, które każdego dopadają na redukcji. Dała i daje sobie Pani świetnie rade z wszelkimi przeciwnościami losu i to na prawdę godne pochwały. Po takim sukcesie, jaki każdy widzi na zdjęciu można krótko powiedzieć po prostu nie ma dla Pani rzeczy niemożliwych. Kończąc, wielkie brawa za wytrwałość. Szkoda żegnać się z Panią i wszystkimi osobami, które osiągnęły swoje cele. Dziękuje Pani Anito jeszcze raz za współprace.</p>
      <p>Trzymam kciuki za dalsze piorunujące sukcesy, a jestem pewny że będzie ich więcej no i do zobaczenia!</p>
      `
    }
  ];

  constructor(
    private modalService: NgbModal,
    private wowService: NgwWowService,
    private http: HttpClient,
    private randomBg: RandomService,
    private cd: ChangeDetectorRef
  ) {
    this.getData();
    this.wowService.init();
    this.imageBg = randomBg.getRandomBg('metamorfozy');
  }

  openModal(item: People) {
    const modalRef = this.modalService.open(ModalPeopleComponent, { size: 'lg' });
    modalRef.componentInstance.item = item;
  }

  getData() {
    this.http.get('assets/data/people.txt', { responseType: 'text' }).subscribe(data => {
      let json = data.replace(/(\r\n|\n|\r)/gm, '');
      json = json.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
      json = json.replace(/'/g, '"');
      this.peopleInit = JSON.parse(json);
      this.loadOlder();
      this.cd.detectChanges();
    });
  }

  loadOlder() {
    this.lastLoadedImg = this.loadedImg;
    this.people = this.peopleInit.slice(0, this.loadedImg);
    this.loadedImg += this.step;
    if (this.lastLoadedImg >= this.peopleInit.length) {
      this.loadOlders = false;
    }
  }

}
