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
  description: string;
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

  // To remove
  blogListInitOld: Array<Blog> = [
    {
      title: '8 Marca',
      date: '2019-03-08',
      image: '8-marca',
      description: `
      <p class="font-weight-bold">Najdroższe Panie!</p> 
      <p>Wszystkiego Najlepszego z okazji Waszego Święta! Dużo zdrowia, szczęścia i uśmiechu! Cierpliwości do płci przeciwnej i nie tylko. I spełnienia wszystkich marzeń!</p>
      <p>PS Panowie, przypominam. To dziś!</p>
      `
    },
    {
      title: 'Pączusie',
      date: '2019-02-28',
      image: 'paczusie',
      description: `
      <p class="font-weight-bold">Ah to dziś ten magiczny dzień, o który pytają wszyscy od tygodnia&hellip;</p>
      <p><em>&bdquo;Ile mogę zjeść pączków? Czy na to miejsce nie jem II śniadania? Czy zawale dietę jak zjem pączka?&rdquo;</em> itd. Moi Drodzy  300 kcal. Model na zdjęciu, smażony na głębokim tłuszczu. Nie zdrowy, masa cukru, bita śmietana&hellip; Ale&hellip; Ale jest pyszny. Baa.. Przepyszny. Nie dajmy się zwariować i wszystkim smacznego.</p>
      <p>Nic nie ujmujemy, jemy normalnie posiłki i rozkoszujemy się tym jednym pączkiem. Ale pamiętajcie, już nie chce słyszeć do Wielkanocy o jakiś takich wybrykach.</p>
      <p>Smacznego!</p>
      `
    },
    {
      title: 'Łopatowanie',
      date: '2019-01-07',
      image: 'lopatowanie',
      description: `
      <p class="font-weight-bold">Dzień dobry w ten zimowy poranek!</p>
      <p>Łopaty w ruch. Odśnieżamy i się ruszamy. Wiem że z tłuszczykiem cieplej ale pamiętajcie zdrowie ponad wszystko.</p>
      <p>Miłego dnia.</p>
      <p>PS Moja mina mówi wszystko&hellip;</p>
      `
    },
    {
      title: 'Patera',
      date: '2019-01-06',
      image: 'patera',
      description: `
      <p class="font-weight-bold">Głupi widok &mdash; pusta patera?</p>
      <p>Żeby komuś nie przyszło do głowy jej zapełniać. W święta się napracowała, dużo dźwigała to teraz może odpocząć &mdash; czyściutka i umyta. </p>
      <p>A my sięgamy po pyszne, słodziutkie, kolorowe, zdrowe i soczyste owose oraz nie zapominamy o warzywach &mdash; miękkich, twardych, słodkich, kwaśnych, gorzkich, czerwonych i zielonych.</p>
      `
    },
    {
      title: 'Kciuki',
      date: '2019-01-04',
      image: 'kciuki',
      description: `
      <p class="font-weight-bold">Hejo!</p>
      <p>Już 4 styczeń. Jak tam z realizacją postanowień noworocznych? Będę trzymał mocno kciuki i chętnie poczytam (jeżeli do mnie napiszecie) co to takiego zaplanowaliście zrobić w tym roku i jak Wam idzie.</p>
      <p>Wierzę że to właśnie Wam się uda bo domeną silnych osobowości jest to, że umią realizować to co sobie postanowią. Jest więc okazja sprawdzić siłę swojego charakteru i pokazać innym że nie puszczacie słów na wiatr.</p>
      `
    },
    {
      title: 'Truskawki',
      date: '2018-05-22',
      image: 'truskawki',
      description: `
      <p class="font-weight-bold">Truskawki &mdash; uwaga!</p>
      <p>Już nadchodzą. Pierwsze polskie kobiałki z truskawkami pokazują się na naszym starosądeckim maślanym rynku.</p>
      <p>Kocham ten owoc, jako pierwszym najadam się do syta. Delektuje się ich słodkim, orzeźwiającym smakiem, który super gasi pragnienie i oczyszcza nerki. Czuję to wtedy, gdy po ich zjedzeniu częściej muszę korzystać z toalety bo działają moczopędnie.</p>
      <p>Staram się jeść truskawki na surowo, żeby jak najwięcej wykorzystać ich właściwości.</p>
      <p>* polecam, jako uzupełniacz Wit C, bo zawierają jej więcej niż pomarańcze</p>
      <p>* 100g to tylko 32 kcal</p>
      <p>* mają niski indeks glikemiczny &mdash; IG 40 &mdash; chorzy na cukrzycę mogą sięgać po nie bez obaw</p>
      <p>* zawierają pektyny pobudzające perystaltykę jelit</p>
      <p>* są żółciopędne &mdash; stymulują pracę wątroby</p>
      <p>* obniżają ciśnienie tętnicze</p>
      <p>Kupujcie, uprawiajcie (ze swojego ogródka najlepsze), przerabiajcie, serwujcie na stół ile się da. Pamiętajcie jednak o tym żeby dobrze je umyć przed jedzeniem.</p>
      <p>Nie może nas zwieść ich piękny, błyszczący, czysty wygląd. Plantatorzy dbają żeby tak właśnie wyglądały i pryskają chemikaliami ile wlezie. Jednak żeby nie było za pięknie alergicy &mdash; uwaga &mdash; są silnie alergizujące.</p>
      <p>Chorzy na zespół jelita drażliwego oraz uczuleni na salicylany również nie powinni po nie sięgać. Wszyscy pozostali mogą cieszyć się, że zima się skończyła i przychodzi najpiękniejszy czas dla wszystkich owoco &mdash; i roślinożerców. Czas pełnych, kolorowych straganów uginających się pod ciężarem jarzyn i owoców cieszących nasze oczy i nasze żołądki.</p>
      <p>Smacznego!</p>
      `
    },
    {
      title: '8 Marca',
      date: '2018-03-08',
      image: '8-marca-2018',
      description: `
      <p class="font-weight-bold">Moje Panie!</p>
      <p>Dzisiaj Wasze święto, więc życzę wszystkim Paniom znanym mi i nieznanym, moim klientkom, mamie, narzeczonej, siostrze, koleżankom, Paniom z piekarni i z <em>&bdquo;maślanego rynku&rdquo;</em>  oraz dla wszystkich Pań które znam i które dopiero poznam bądźcie szczęśliwe zawsze nie tylko dzisiaj, uśmiechajcie się tak żeby zarażać wszystkich wokół, wtedy życie stanie się kolorowe jak moje kwiaty dla Was.</p>
      <p>Miłego dnia!</p>
      `
    },
    {
      title: 'Pasja',
      date: '2018-03-06',
      image: 'pasja',
      description: `
      <p class="font-weight-bold">Pasja &mdash; każdy ją ma. Większą lub mniejszą. Coś, co pozwala odbić się od stresu, zresetować głowę, naładować baterię. Tym razem nie tylko zdrowe odżywianie, przepisy i posty o dietetycznych inspiracjach!</p>
      <p>Moi Drodzy mój świat, spokoju, uśmiechu i wielkiego worka endorfin. Motocykle. Coś, czym jestem zarażony od najmłodszych lat. Powód, dla którego znienawidziłem okres zimowy. Jeżdżę, od kiedy pamiętam. Jako mały brzdąc rozkwitała moja pasja na znanej <em>&bdquo;motorynce</em>&rdquo;. Już wtedy w głowie kotłowały mi się wycieczki, wyprawy na większych maszynach.</p>
      <p>Od kilku lat każdy ładniejszy dzień spędzam właśnie na nim &mdash; Motocyklu. Wcześniej Hania w tym roku zagościła w garażu Beatka. Nie każdy moją pasje zrozumie. Wiele osób jest bardzo przeciwnych. Jednak ja odkrywam niesamowitą wolność i swobodę. Nie ma telefonów, zmartwień, przeciwności losu. Jestem tylko Ja i droga, którą przemierzam.</p>
      <p>Moim marzeniem są dalekie wyprawy, na razie małymi kroczkami odwiedzam bliższe kraje, smakując ich gościnności, odwiedzając piękne miejsca, które widuje tylko na zdjęciach.</p>
      <p>Dla mnie samego nie ważny jest cel, najpiękniejsza jest podróż. W zeszłym roku wyjeżdżając do Grecji, kumpel, z którym ruszałem stwierdził, że to będzie dla mnie Survival. Nigdy nie śpiąc pod namiotem, nigdy wcześniej nie spędzając po 13 h na motocyklu w upale 35 stopniowym. Brudnym, zmęczonym &mdash; taki właśnie mieliśmy tydzień.</p>
      <p>Po powrocie stwierdziłem, że to nie dla mnie. Po tygodniu odpoczynku już zacząłem fantazjować o nowych podróżach, nowych celach. Jednak dawka szczęścia jest wprost proporcjonalna do ilości spalanego paliwa. Czekam z utęsknieniem na wiosnę, aby po raz kolejny wsiąść i przemierzać miasta, województwa i kraje. Planów setki a sezon taki krótki. Oby w tym roku był rekordowo długi.</p>
      <p>Życzę każdemu powodzenia w rozwijaniu swoich hobby i znajdujcie tyle uśmiechu we własnych pasjach co ja w swojej. Trzymam za Was kciuki!</p>
      `
    },
    {
      title: 'Zima',
      date: '2018-02-27',
      image: 'zima',
      description: `
      <p class="font-weight-bold">Zima w pełni a przecież zaraz marzec!</p>
      <p>Zimno, mróz, wiatr, śnieg, ślisko &mdash; szukamy pozytywnych odczuć w taką pogodę. Spróbujmy nacieszyć oczy pięknem krajobrazu, bo biało za oknem ostatnio nie często się zdarza.</p>
      <p>Pamiętajmy!</p>
      <p>Dbajmy o siebie teraz szczególnie sumienie. Pilnujmy diety i zdrowo się odżywiajmy. Nie rezygnujmy z ruchu &mdash; szczególnie na świeżym powietrzu (wybieramy dni kiedy choć trochę powiewa wiatr &mdash; unikniemy smogu). Zaprocentuje to gdy bakterie i wirusy będą krążyć wokół nas a gdy nas dopadną, to łagodniej przejdziemy infekcje.</p>
      <p>Chciałem się jeszcze podzielić z Wami przepisem na napój, który ma chronić przed infekcjami. Warto spróbować &mdash; polecam:</p>
      <p>* suszone owoce głogu &mdash; zalać szklanką gorącej wody</p>
      <p>* dodać szczyptę imbiru</p>
      <p>* łyżeczkę miodu lipowego</p>
      <p>* łyżeczkę soku z cytryny</p>
      <p>* łyżeczkę mocnego naparu z lipy</p>
      <p>Podgrzać ale nie zagotować. Pić rano i wieczorem. Spróbujcie! Jeżeli będziecie wytrwali na pewno przyniesie efekty. Czekam jak zawsze na Wasze metody na przetrwanie zimy.</p>
      <p>Napiszcie jak Wam smakowało!</p>
      `
    },
    {
      title: 'Pączek',
      date: '2018-02-08',
      image: 'paczek',
      description: `
      <p class="font-weight-bold">Ah te programy do fotomontaży, teraz potrafią zdziałać cuda. Ja z pączkiem? A to dobre!</p>
      <p>A tak serio &mdash; nie dajmy się zwariować to tylko 300 kcal i masa niezdrowych rzeczy. Ale ok, tradycja. Do moich Podopiecznych &mdash; i tak wiem że wsuniecie pączka. Aby Wam jeszcze bardziej smakował pamiętajcie że ja nie pozwoliłem. Co zabronione to jeszcze lepiej smakuje.</p>
      <p>Smacznego!</p>
      <p>PS Tylko jednego!</p>
      `
    },
    {
      title: 'Kawa zbożowa',
      date: '2018-01-29',
      image: 'kawa-zbozowa',
      description: `
      <p class="font-weight-bold">Kawa zbożowa &mdash; Pan Jacek w komentarzach do postu o kawie naturalnej przypomniał o <em>&bdquo;zbożówce</em>&rdquo;, dlatego postanowiłem napisać kilka słów na jej temat!</p>
      <p>Cieszę się, że czytacie moje wpisy i że chcecie rozmawiać ze mną w komentarzach. Super!</p>
      <p>Dzisiaj kawa zbożowa dla tych, co ją lubią i piją oraz dla tych, co jej nie cierpią. Tych kilka informacji może się przydać w razie chęci wypicia kubka tego zdrowego napoju.</p>
      <p>Sięgnąłem i ja kiedyś po nią, gdy mój organizm dał sygnał, że nie ma ochoty na kawę naturalna. Ale zdarza się też tak, że niektórym z Was lekarz zabroni picia ulubionej <em>&bdquo;czarnej</em>&rdquo; z pianką, espresso czy latte. Więc co wtedy? Tragedia?</p>
      <p>No cóż &mdash; zdrowie wymaga poświęceń i trzeźwego spojrzenia na to, co pijemy i jemy. Może wtedy kawa zbożowa pomoże przetrwać trudne chwile rozstania, da namiastkę smaku i odrobinę połechta kubki smakowe. Polecam spróbować.</p>
      <p>W sklepach dostępna jest w kilku rodzajach: saszetki, rozpuszczalna, do gotowania. Możemy z nich wyczarować wersje czarną, czarną z mlekiem, a nawet mrożoną. Wypijmy ja rodzinie, w niedzielne popołudnie zasiadając do stołu całą rodziną, bo przecież oprócz nas mogą ją pić również dzieci.</p>
      <p>Chciałbym Was do niej zachęcić. Dlaczego?</p>
      <p>* bo nie zawiera kofeiny</p>
      <p>* za to zawiera selen, magnez, fosfor, potas, cynk, witaminy z grupy B</p>
      <p>* jest bogata w błonnik</p>
      <p>* nie zakwasza organizmy</p>
      <p>* wspomaga wydzielanie żółci</p>
      <p>* z dodatkiem cykorii wpływa na florę bakteryjną w jelitach</p>
      <p>* zatem może być elementem zdrowej diety</p>
      <p>Jak zwykle uwaga!</p>
      <p>Wszyscy chorujący na cukrzycę powinni sięgać po nią raz na jakiś czas, ponieważ ma wysoki indeks glikemiczny. Natomiast chorzy na celiakię muszą z niej zrezygnować ze względu na gluten zawarty w prażonych zbożach, z których się składa. Alternatywą może być kawa żołędziowa.</p>
      <p>Jeżeli komuś z Was wydaje się, że bez kawy naturalnej żyć nie można to zapewniam, że można. Znam osobę, która z własnej i nieprzymuszonej woli pije <em>&bdquo;zbożówkę</em>&rdquo; i żyje.</p>
      <p>Zachęcam, spróbujcie, bo warto!</p>
      `
    },
    {
      title: 'Herbata',
      date: '2018-01-16',
      image: 'herbata',
      description: `
      <p class="font-weight-bold">A może dzisiaj zamiast kawusi &mdash; herbatka?</p>
      <p>Po ostatnim wpisie musiałem o niej napisać, bo by się obraziła. Czarna, czerwona, zielona, żółta, biała, z domieszką suszonych owoców i ziół&hellip;</p>
      <p>Tyle ich do wyboru i każda bardzo smaczna. Dzisiaj jednak uśmiechnęła się do mnie czarna z cytryną i odrobiną soku malinowego (ale jak z cytryną to koniecznie odcedzona bez fusów &mdash; pamiętajcie. Wytwarza się cytrynian glinu, który jest szkodliwy i rakotwórczy).</p>
      <p>Pychotka! Widzicie, co za oknem się dzieje i właśnie w taką pogodę doda mi energii i orzeźwi.</p>
      <p>Ale też (nieważne, jaki rodzaj wybiorę) zadziała:</p>
      <p>* przeciwwirusowo i przeciwbakteryjnie</p>
      <p>* przeciwwrzodowo</p>
      <p>* obniży cholesterol</p>
      <p>* obniży ciśnienie</p>
      <p>* zapobiegnie nadkwasocie</p>
      <p>* wspomoże metabolizm</p>
      <p>* pracę wątroby</p>
      <p>* ma działanie moczopędne</p>
      <p>* ułatwi koncentrację</p>
      <p>* poprawi pamięć</p>
      <p>* wzmocni</p>
      <p>* pomoże w utrzymaniu zdrowia w jamie ustnej</p>
      <p>* przeciwdziała próchnicy, bo zawiera fluor</p>
      <p>* zawiera cenne minerały</p>
      <p>* zapobiegnie udarowi i chorobom niedokrwiennym mózgu</p>
      <p>* złagodzi zapalenie spojówek (okłady na oczy)</p>
      <p>Pamiętajcie każdy rodzaj parzy się inaczej &mdash; czarną zalewamy wrzątkiem natomiast zieloną, żółtą, białą wodą o temperaturze od 70 &mdash; 90 stopni. Parzona krócej niż 3 min &mdash; pobudzi, dłużej niż 5 min przyniesie ukojenie i uspokoi.</p>
      <p>A co tak pobudza? Teina &mdash; jest to ten sam alkaloid, co kofeina z tą różnicą, że jest dłużej przyswajana przez organizm i dlatego wydłuża stan pobudzenia.</p>
      <p>Zrezygnujcie z herbat instant i innych napojów herbacianych, ponieważ nie mają one nic wspólnego z herbatą.</p>
      <p>I jeszcze coś ważnego dla tych, co się odchudzają &mdash; pijcie herbatki, bo tłumią apetyt, a jak wiecie bardzo mi zależy na tym żeby zbyt duża chęć do jedzenia nie zniweczyła moich starań o Waszą prawidłową wagę.</p>
      `
    },
    {
      title: 'Kawa',
      date: '2018-01-04',
      image: 'kawa',
      description: `
      <p class="font-weight-bold">Lubicie kawusie? Nie możecie rozpocząć bez niej dnia? Kochacie jej smak i zapach? Żaden inny napój jej nie zastąpi? Na te wszystkie pytania ja mogę odpowiedzieć &mdash; tak!</p>
      <p>Pachnie mi to uzależnieniem, ale właściwie wcale się tym nie martwię. Jak większość ludzi nie wyobrażam sobie rozpoczęcia nowego dnia bez filiżanki czarnego napoju. Uwielbiam jej zapach i smak. Każdy, kto ja pije ma ulubiony jej smak i rodzaj &mdash; z ekspresu, <em>&bdquo;fusiastą</em>&rdquo;, rozpuszczalną, z mlekiem, ze śmietaną, mocną, słabą&hellip; Sami widzicie, że każdy może znaleźć coś dla siebie.</p>
      <p>Wiele już napisano i wielu ją badało pod każdym względem. Działa na nas uzależniająco a kofeina w niej zawarta sprawia, że tak trudno się codziennie bez niej obejść. Prawdą jest też to, że gdy z jakichś powodów musimy z niej zrezygnować to głowa przez kilka dni boli jak diabli.</p>
      <p>Dlatego też, gdy ją pijemy codziennie to uważajmy na ilość. Ze względu właśnie na kofeinę nie przekraczajmy 3-4 filiżanek dziennie (filiżanek, a nie kubków po 300 ml). I pamiętajcie najlepsza jest parzona w ekspresie lub kawiarce.</p>
      <p>Może napiszę coś i zaletach, bo się zniechęcicie do czytania. A więc:</p>
      <p>* pita z rana &mdash; pobudza i poprawia sprawność psychiczna</p>
      <p>* zwiększa tętno, ale tylko wtedy, gdy rzadko ją pijemy</p>
      <p>* chwilowo poprawia IQ</p>
      <p>* dotleni organizm, poprawi koncentrację</p>
      <p>* pozytywnie wpłynie na trawienie i metabolizm</p>
      <p>* polepszy perystaltykę</p>
      <p>* pita przed treningiem zmniejszy zmęczenie</p>
      <p>* zmniejszy ryzyko marskości i stłuszczenia wątroby</p>
      <p>* jest lekarstwem na zmęczenie i senność</p>
      <p>* kofeina chroni przed choroba Parkinsona</p>
      <p>* zmniejszy ryzyko wystąpienia cukrzycy typu 2</p>
      <p>I co? Warto było przeczytać?</p>
      <p>Ale żeby tak pięknie nie było to powiem, że nadmiar źle wpływa na zdrowie i powoduje:</p>
      <p>* nerwowość</p>
      <p>* niepokój</p>
      <p>* rozdrażnienie</p>
      <p>* kłopoty ze snem</p>
      <p>* powoduje żółknięcie zębów</p>
      <p>* i wzmaga próchnicę</p>
      <p>Sami musicie zdecydować czy pić kawę czy nie pić. Posłuchajcie siebie, tego, co mówi Wasz organizm. Jeżeli zaobserwuje, że po wypiciu filiżanki kawy coś jest nie tak to zrezygnujcie z tego specyfiku. Zawsze zdrowie jest najważniejsze.</p>
      <p>Rezygnując &mdash; odstawiajcie ja stopniowo, aby organizm miał czas przywyknąć do jej braku.</p>
      `
    },
    {
      title: 'Dietetyk też człowiek',
      date: '2018-01-02',
      image: 'dietetyk',
      description: `
      <p class="font-weight-bold"><em>&bdquo;Dietetyk też człowiek</em>&rdquo; &mdash; jeden z moich najbardziej ulubionych tekstów, który jakiś czas temu przeczytałem w Internecie!</p>
      <p>Musze, co poniektórych rozczarować, ale jak każdy z Was też lubię czasami, z naciskiem na czasami zjeść i napić się czegoś, co w jadłospisach przeze mnie przygotowywanych się nie znajdzie.</p>
      <p>Jeżeli spotkacie mnie w sklepie na zakupach to niech Was nie zdziwi, że w moim koszyku może znaleźć się coś, co określamy mianem niezdrowe.</p>
      <p>To przecież tylko ja Mateusz &mdash; zwykły człowiek. Zwykły, normalny nie zawsze robiący tak jak uczy i mówi swoim klientom na wizytach w poradni. Nie ma się, co czarować, nie jestem święty.</p>
      <p>Cóż warte będzie życie, jeżeli zabraknie chwil, które sprawiają nam przyjemność i umilają szarość dni. Jeżeli uszczęśliwi Was tak jak mnie kawałeczek czekolady, piwo raz na jakiś czas czy ulubione ciasteczko a może kilka orzechów to, czemu nie zjeść.</p>
      <p><em>&bdquo;Nie dajcie się zwariować</em>&rdquo; zjedzcie czasem to czy tamto, ale pamiętajcie o tym żeby robić to sporadycznie. Dzielcie się smakołykami z bliskimi wtedy nie zjecie wszystkiego, bo kawałek czekolady a cała to jest różnica. Ja właśnie tak robię i uwierzcie daje jakoś radę.</p>
      <p>Gdy już jecie to myślcie, co i ile wkładacie do ust. Pomoże to w kontrolowaniu ilości szczególnie tych rzeczy najbardziej przez Was ulubionych. Na pewno niektórzy skrytykują to, o czym napisałem, ale nie mogę udawać, że ten problem mnie nie dotyczy i nie będę udawał kogoś, kim nie jestem. Nazywam to problemem, bo niestety miesza często w mojej pracy.</p>
      <p>Przyznanie się do swoich słabości nie jest łatwe, ale pomoże zrozumieć każdemu, kto stara się żyć i jeść według zasad zdrowego żywienia, że może zdarzyć się zjeść coś co w tych normach się nie mieści. To przecież nie będzie <em>&bdquo;koniec świata</em>&rdquo;.</p>
      <p>Mówię Wam to ja Mateusz &mdash; zwykły człowiek, który ulega pokusom i słabościom, które nie mieszczą się w ramach zdrowego żywienia.</p>
      `
    },
    {
      title: 'Cellulit',
      date: '2017-12-20',
      image: 'cellulit',
      description: `
      <p class="font-weight-bold">Cellulit (Na prośbę Pani Aleksandry) &mdash; często nazywany skórka pomarańczową. Ale oprócz pomarszczonej struktury podobieństwa się kończą. Szkoda!</p>
      <p>Nie można go pokroić, zetrzeć do deseru, kandyzować &mdash; przynajmniej byłby z niego jakiś pożytek, a tak&hellip; Przychodzą mi na myśl słowa z piosenki zespołu Bajm: <em>&bdquo;Pojawia się i znika mam na twym punkcie bzika</em>&rdquo; Wszystko by się zgadzało, tyko to słowo &mdash; <em>&bdquo;znika</em>&rdquo; nie pasuje (a szkoda).</p>
      <p>Trzeba bardzo dużo wysiłku i konsekwencji żeby się go pozbyć. Spędza sen z powiek milionom kobiet otyłych i szczupłych. Winą za jego pojawienie się trzeba obarczyć:</p>
      <p>* zaburzenia hormonalne</p>
      <p>* menstruację</p>
      <p>* karmienie piersią</p>
      <p>* antykoncepcję</p>
      <p>* ciążę</p>
      <p>Ale również:</p>
      <p>* zmniejszoną aktywność fizyczną, czyli zmniejszenie masy mięśniowej na rzecz masy tłuszczowej</p>
      <p>* nieodpowiednia dieta</p>
      <p>* nieregularne posiłki</p>
      <p>Wniosek z tego taki, że nie dostajemy go w spadku, ale pracujemy <em>&bdquo;ciężko</em>&rdquo; żeby się u nas pojawił i zadomowił na dobre. Występują jego różne odmiany, ale jedno jest pewne nieważne, z którym się zmagamy nie jest to sprawa prosta. Proponuję ugryźć problem z wielu stron na raz.</p>
      <p>Ruch i ćwiczenia:</p>
      <p>* regularne i intensywne treningi (z pewnością działają, bo czy ktoś widział lekkoatletki z cellulitem)</p>
      <p>* wybierzcie zestaw ćwiczeń na cellulit muszą pobudzić krążenie i spalanie tkanki tłuszczowej</p>
      <p>Masaże i zabiegi kosmetyczne:</p>
      <p>* zabiegi poprawiające krążenie skóry &mdash; pillingi</p>
      <p>* domowy masaż bańka chińska (podobno działa rewelacyjnie)</p>
      <p>* zabiegi w gabinetach kosmetycznych</p>
      <p>Dieta:</p>
      <p>* dbałość o dobieranie produktów (nieprzetworzona żywność, produkty z pełnego przemiału&hellip;)</p>
      <p>* regularne posiłki</p>
      <p>* ograniczenie produktów pochodzenia zwierzęcego</p>
      <p>* picie wody (ok 1,5-2 l dziennie)</p>
      <p>* wykluczenie z diety alkoholu, napojów z długą datą przydatności do spożycia</p>
      <p>* ograniczenie soli w potrawach</p>
      <p>* ograniczenie picia kawy</p>
      <p>Wiem, co pomyślicie &mdash; znowu zakazy, nakazy, wyrzeczenia. Ale przecież sukces zawsze rodzi się w bólach, więc dlaczego teraz ma być inaczej.</p>
      <p>Powodzenia życzę!</p>
      `
    },
    {
      title: 'Razowe naleśniki',
      date: '2017-12-11',
      image: 'razowe-nalesniki',
      description: `
      <p class="font-weight-bold">Razowe naleśniki &mdash; idąc za myślą z poprzedniego postu chce zaproponować zmodyfikowaną wersję dania, które lubią dzieci jak i dorośli.</p>
      <p>Częściej robi się je na słodko, ale wersja słona też jest dobra. Ja wolę tą drugą propozycje, dlatego postanowiłem zrealizować ją niezwłocznie. Na myśl o naleśnikach z jarzynami (bo to one właśnie chodziły za mną od rana) cały czas burczało mi w brzuchu i trudno było pracować. Zaopatrzyłem się, więc w mieszankę warzywna i pierś z kurczaka i marzenie przybrało formę realną.</p>
      <p>Podduszone jarzyny z mięskiem wylądowały w naleśniku i okraszone odrobiną sosu znalazły się w moim brzuchu. Dlatego też dzisiejszy obiad uszczęśliwił mnie bardzo i nawet wiatr nie potrafił zepsuć mi humoru.</p>
      <p>Namawiam, więc do zrobienia na obiad czy kolację naleśników z dodatkiem mąki razowej i mam nadzieję, że polubicie taką ich odmianę.</p>
      <p>Składniki na ciasto:</p>
      <p>* 3 małe jajka</p>
      <p>* 1.5 szklanki mąki (pół na pół mąki pszennej i mąki razowej)</p>
      <p>* 1.5 szklanki wody (powinniśmy uzyskać konsystencję rzadkiej śmietany)</p>
      <p>* 1 łyżka oleju (dodać do ciasta)</p>
      <p>* szczypta soli</p>
      <p>Wszystko dokładnie wymieszać. Patelnie posmarować 1 łyżka oleju (tylko przed smażeniem pierwszego naleśnika), mocno rozgrzać i smażyć cienkie placki opiekając z obu stron. Z takiej porcji otrzymamy ok 10 sztuk. Jeżeli zostanie Wam jakaś niezjedzona sztuka to pokrójcie ją na bardzo cienkie paseczki i podajcie do ulubionej sałatki zamiast chleba.</p>
      <p>Smacznego!</p>
      `
    },
    {
      title: 'Błonnik',
      date: '2017-12-05',
      image: 'blonnik',
      description: `
      <p class="font-weight-bold">Błonnik &mdash; wszyscy wiemy, że potrzebny, że przyspiesza perystaltykę jelit, że <em>&bdquo;zamiata</em>&rdquo; nasz przewód pokarmowy, że usprawnia pracę przewodu pokarmowego, że pęcznieje w żołądku i potęguje uczucie sytości, że zapobiega zaparciom, że pomaga w rozwoju przyjaznych bakterii w jelitach, że że że&hellip;</p>
      <p>To tylko niektóre z zalet tej miotełki, czyli włókna pokarmowego. Jednak jemy go w Polsce zbyt mało. Potrzebujemy od 25-40g na dobę a zjadamy poniżej 20 g dziennie. Swoje zapotrzebowanie bardzo łatwo obliczyć.</p>
      <p>Ilość błonnika w g = masa ciała w kg ÷ 2.</p>
      <p>A 20g to dużo poniżej normy nawet dla osób ważących 50 kg. Ilu znacie dorosłych znajomych o takiej wadze? Znaleźć go jest bardzo łatwo i nie potrzeba na to wielu pieniędzy. Wystarczy na zakupach poświęcić mu trochę uwagi.</p>
      <p>Wybieramy:</p>
      <p>* pieczywo razowe z pełnego ziarna</p>
      <p>* otręby oraz płatki pszenne</p>
      <p>* kasze, ryż brązowy, makaron razowy</p>
      <p>* warzywa &mdash; zwłaszcza strączkowe</p>
      <p>* owoce &mdash; szczególnie suszone</p>
      <p>* orzechy, migdały, nasiona (lnu, słonecznika)</p>
      <p>Błonnik nie jest trawiony przez organizm ani nie dostarcza mu energii. Chłonie wodę z przewodu pokarmowego i pęcznieje, dlatego musicie pamiętać, że trzeba jej wypić do 2 l, aby nie doprowadzić do zaparć. Często powtarzam na wizytach w poradni, że za pomocą płatków lub otrąb możemy obniżyć indeks glikemiczny potrawy, zapobiegnie to wahaniom poziomu glukozy we krwi. Dlatego nie odczujemy nagłego i silnego napadu głodu.</p>
      <p>Namawiam Was wszystkich do obserwowania swojego samopoczucia po posiłku, ponieważ możemy być nieświadomi tego, że błonnik i jego nadmiar może nie służyć naszemu zdrowiu.</p>
      <p>Uwaga!</p>
      <p>Gdy cierpicie na choroby żołądka (refluks, nadżerki, wrzody), chorobę zapalną jelit, zapalenie trzustki, uszkodzenie wątroby unikajcie produktów z dużą zawartością błonnika. Wystrzegajcie się razowego pieczywa, roślin strączkowych a owoce i warzywa koniecznie obierajcie ze skórki.</p>
      <p>Tyle chciałem napisać żeby zasygnalizować temat i jak zwykle <em>&bdquo;truje</em>&rdquo;, ale z troski o Was!</p>
      `
    },
    {
      title: 'Stres',
      date: '2017-11-30',
      image: 'stres',
      description: `
      <p class="font-weight-bold">Temat zawsze na czasie, bo trudno będzie znaleźć osobę, której udaje się bez niego żyć. Zawsze coś lub ktoś się znajdzie żeby nam życie <em>&bdquo;umilić</em>&rdquo;!</p>
      <p>Przekonałem się o tym niedawno przy okazji przenoszenia mojej poradni w inne miejsce. Trochę nerwów, zamieszania, stresu z tym związanego &mdash; czy zdążę? Czy wszystko uda się w jeden dzień przeorganizować? I co? Udało się!</p>
      <p>Ale od razu poczułem &mdash; spadek odporności (katar, przeziębienie, ogólne zmęczenie). Dlatego wiem, że każdy z nas ma takie chwile, które przychodzą niespodziewanie, znienacka, więc trudno się do nich przygotować i ich uniknąć.</p>
      <p>Trzeba nauczyć się z nimi radzić żeby stres nie towarzyszył nam zbyt długo. Miejcie na uwadze to, że przewlekły stres osłabia nasze ciało i powoduje zaostrzenie chorób. Niech zaobserwują to Ci, którzy cierpią z powodu przewlekłych dolegliwości tj Hashimoto, łuszczyca, cukrzyca, reumatoidalne zapalenie stawów, choroby jelita grubego itd.</p>
      <p>Bardzo mi na Was zależy, chce żeby Wasze ciało prawidłowo funkcjonowało. Wszystko to nie jest bezinteresowne, bo przecież moja praca będzie dużo łatwiejsza gdy nie będziecie mieli kłopotów zdrowotnych.</p>
      <p>Odchudzania i walki o zdrowie nie będą zaburzały napady obżarstwa i stany powodujące brak apetytu. Za tym przecież idą biegunki jak i również zaparcia, czyli wrogowie mojej pracy. Winowajca &mdash; stres. Szkoda, że nie można wziąć gumki i wymazać go z naszego życia. Obserwujcie siebie, starajcie się reagować, gdy stres Was dopada. Nie pozwólcie mu zapanować nad umysłem i dezorganizować spokojne życie.</p>
      <p>Wtedy może pomóc zwyczajne wygadanie się, ćwiczenia czy masaż. Pozwoli to pozbyć się hormonów stresu &mdash; kortyzolu i adrenaliny. Wprawdzie niewielki ich poziom może pomóc w realizowaniu zadań dnia codziennego, ale bezpieczniej jest omijać je szerokim łukiem.</p>
      <p>Od dzisiaj mam dla Was zadanie: każdą sytuację stresowa przekłuwamy w motywację do działania. Przynajmniej będzie z nich jakiś pożytek.</p>
      `
    },
    {
      title: 'Buraczkowy zawrót głowy',
      date: '2017-11-23',
      image: 'buraczkowy',
      description: `
      <p class="font-weight-bold">Buraczek i coś jeszcze &mdash; dzisiaj propozycja do kanapek i propozycja małej przekąski!</p>
      <p>Mam nadzieję, że urozmaici to Wasze posiłki i będzie kolorową &mdash; zdrowa alternatywa. Uwierzcie warto!</p>
      <p>Hummus z buraczka:</p>
      <p>* 1szklanka ciecierzycy nieugotowanej</p>
      <p>* 3 małe buraczki</p>
      <p>* sok z połowy cytryny (opcjonalnie)</p>
      <p>* 3 ząbki czosnku</p>
      <p>* 2 łyżki tahini</p>
      <p>* sól do smaku</p>
      <p>* odrobina miodu</p>
      <p>* 2 łyżeczki sezamu niełuskanego (do posypania)</p>
      <p>Ciecierzycę moczyć 12 godzin. Po tym czasie wypłukać i ugotować do miękkości. Pozostawić do ostygnięcia. Buraczki upiec w piekarniku lub ugotować w wodzie. Ostudzić. Wszystko wrzucić do miksera i zmiksować. Przełożyć do miseczki i posypać sezamem (Ja wolę bez soku z cytryny więc nie dodaje). Potraktujcie to jako kolorowe smarowidło do chleba!</p>
      <p>Kulki z buraczka:</p>
      <p>* 3 małe buraczki upieczone</p>
      <p>* 1 szklanka amarantusa ekspandowanego</p>
      <p>* 0,5 &mdash; 0,75 szklanki wiórków kokosowych</p>
      <p>* 0,5 szklanki orzechów włoskich</p>
      <p>* 0,5 szklanki orzechów laskowych</p>
      <p>* 2-3 łyżki melasy</p>
      <p>* 1 łyżeczka kakao</p>
      <p>* szczypta soli</p>
      <p>* 1 łyżeczka oleju kokosowego</p>
      <p>Miksujemy twarde składniki. Po zmiksowaniu przesypujemy do innego naczynia. Następnie miksujemy miękką resztę. Formujemy kuleczki i obtaczamy we wiórkach kokosowych. Można włożyć do lodówki, aby nieco stwardniały.</p>
      <p>Smacznego!</p>
      <p>Jeżeli wypróbujecie któryś z przepisów napiszcie czy Wam smakował. Czekam!</p>
      `
    },
    {
      title: 'Burak',
      date: '2017-11-09',
      image: 'burak',
      description: `
      <p class="font-weight-bold">Można określić tą nazwą kogoś, kogo nie lubimy, ale chodzi mi o warzywo które ma piękny kolor i wiele właściwości które są zbawienne dla naszego zdrowia!</p>
      <p>Jako dziecko nie przepadałem za nim, ale im jestem starszy tym bardziej go doceniam. Chcę Wam przypomnieć, że to właśnie jesienią jest czas, aby zaprosić go do kuchni i do spiżarni.</p>
      <p>Czym się nam odwdzięczy:</p>
      <p>* będzie zapobiegał nowotworom</p>
      <p>* uchroni przed katarem</p>
      <p>* uwolni od zgagi</p>
      <p>* obniży ciśnienie</p>
      <p>* doda sił</p>
      <p>* złagodzi kaszel</p>
      <p>* będzie działał wykrztuśnie</p>
      <p>* zadba i lepszą odporność</p>
      <p>* sprawi, że wolniej będziemy się starzeć</p>
      <p>* pomoże przy anemii</p>
      <p>I co nie warto?</p>
      <p>Pijmy, więc sok z buraków. Najlepiej na surowo (wyciśnięty wcześniej, aby chociaż godzinę postał samotnie w dzbanku) z dodatkiem soku z ulubionych owoców.</p>
      <p>Jeżeli chęci Wam starczy to zakiście buraczka na barszcz:</p>
      <p>* 1 kg małych buraków</p>
      <p>* 5 szklanek wody</p>
      <p>* 1 łyżeczka cukru</p>
      <p>* 1 łyżka soli (płaska)</p>
      <p>* 4 ząbki czosnku</p>
      <p>* 2 liście laurowe</p>
      <p>* 3 ziela angielskie</p>
      <p>* garść kminku</p>
      <p>* kromka chleba razowego na zakwasie</p>
      <p>Wyszorować buraki. Obciąć końce. Pokroić w plastry. Ułożyć w kamiennym garnku, wrzucić przyprawy. Zalać osoloną woda i docisnąć talerzykiem. Trzymać w temperaturze pokojowej 4-5 dni. Po kilku dniach zakwas nadaje się do picia i na barszcz. Zlać go do butelek i przechowywać w lodówce.</p>
      <p>Pamiętajcie, że buraki ugotowane i upieczone w skórce będą bardziej wartościowe. Trzymajcie je w lodówce i obierajcie dopiero przed jedzeniem.</p>
      <p>Zachowają intensywny kolor, jeżeli sól dodacie dopiero pod koniec gotowania.</p>
      <p>Uwaga! Chorzy na cukrzycę. Po ugotowaniu buraki mają wysoki indeks glikemiczny, ale na pocieszenie powiem, że w stanie surowym indeks jest niski.</p>
      `
    },
    {
      title: 'Zupa czosnkowa',
      date: '2017-11-06',
      image: 'zupa-czosnkowa',
      description: `
      <p class="font-weight-bold">Dzisiaj mała propozycja! Jeżeli został Wam rosołek z niedzieli to zachęcam do zrobienia pysznej zupy czoskowej!</p>
      <p>Składniki:</p>
      <p>* 1 litr rosołu drobiowego</p>
      <p>* 2-3 ząbki czosnku</p>
      <p>* chleb razowy</p>
      <p>* bundz</p>
      <p>Do rosołu wrzucamy zmiażdżone ząbki czosnku. Gotujemy na wolnym ogniu pod przykryciem ok 5 minut. Chleb kroimy w kostkę i podpiekamy na suchej patelni do momentu aż się zarumieni.</p>
      <p>Bundz kroimy w kostkę. Na jedną porcję potrzeba ok 2 łyżek sera. Na dno talerza nałożyć ser, zalać bardzo gorącym wywarem, posypać grzankami.</p>
      <p>Smacznego!</p>
      <p>Jeżeli macie smaczne, sprawdzone przepisy na czosnkowe dania to proszę podzielcie się z wszystkimi w komentarzach. Czekam!</p>
      `
    },
    {
      title: 'Czosnek',
      date: '2017-11-05',
      image: 'czosnek',
      description: `
      <p class="font-weight-bold">Inaczej moc natury. Kochamy jego smak i zapach albo nie cierpimy. Jednak mimo naszej niechęci wart jest szczególnej uwagi!</p>
      <p>Oprócz zastosowania w kuchni będę zachęcał również do używania go ze względów zdrowotnych. Właśnie teraz, gdy nadchodzi zima będzie zapobiegał infekcjom jak i je leczył. Musicie jedynie dać mu szansę.</p>
      <p>Najlepiej jeść go na surowo choćby dodając do sałatek. Można też zamrozić żeby mieć go zawsze pod ręką.</p>
      <p>Wiem, co niektórzy powiedzą &mdash; po zjedzeniu jest nieprzyjemny zapach z ust.</p>
      <p>Ale czy to aż tak ważne jeżeli ten niepozorny ząbek może tyle dobrego zdziałać. Jak pojęcie to nie całujcie nikogo bliskiego i nie chuchajcie na znajomych to jakoś będzie.</p>
      <p>Nie będę wypisywał, co zawiera bo każdy może to sprawdzić ale chcę Was zachęcić kilkoma informacjami o tym co to maleństwo może:</p>
      <p>* ma właściwości bakteriobójcze</p>
      <p>* stosuje się go w zakażeniach przewodu pokarmowego</p>
      <p>* miażdżycy</p>
      <p>* pomaga na kaszel i zapalenie oskrzeli</p>
      <p>* obniża ciśnienie i poziom cholesterolu</p>
      <p>* chroni przed przeziębieniami</p>
      <p>* odstrasza wampiry! (Żarcik)</p>
      <p>* pomaga zwalczać pasożyty</p>
      <p>* działa napotnie i wykrztuśnie</p>
      <p>Nas w tym okresie będzie najbardziej interesowała jego pomoc w zdobywaniu odporności, o którą teraz walczymy.</p>
      <p>Zaproponuje Wam nalewkę przeciw przeziębieniową i uodparniającą:</p>
      <p>* 2 główki czosnku &mdash; zmiażdżyć</p>
      <p>* 2 cytryny &mdash; wycisnąć sok</p>
      <p>* 4 łyżki miodu</p>
      <p>* 2 szklanki przegotowanej wody</p>
      <p>Wszystko wymieszać w szklanym naczyniu. Przykryć i zostawić w ciemnym miejscu na dwie doby. Po tym czasie przecedzić i przechowywać szklanym słoju. Dawkować po 2 łyżki dziennie.</p>
      <p>Jeżeli martwicie się aromatem, jaki będzie Wam towarzyszył mam dobrą wiadomość. Można go zwalczyć jedząc natkę pietruszki, jabłko, seler. Można napić się herbaty miętowej albo pogryźć ziarno kawy lub kardamonu.</p>
      <p>Uwaga &mdash; na duże ilości czosnku powinny uważać osoby z niskim ciśnieniem, cukrzycą, biorących regularnie leki oraz mających kłopoty z żołądkiem!</p>
      `
    },
    {
      title: 'Zdrowy zamiennik',
      date: '2017-10-28',
      image: 'zdrowy-zamiennik',
      description: `
      <p class="font-weight-bold">Postanowiłem zaproponować Wam pewną alternatywę dla placków, ciasteczek, cukierków, deserków, czekoladek!</p>
      <p>Niektórzy doskonalę wiedzą że jestem fanem słodyczy (miałem się publicznie nie przyznawać).</p>
      <p>W związku z powyższym jeżeli macie w swoim życiu chwilę (z naciskiem na słowo chwile!) kiedy wydaje się że bez czegoś słodkiego w ustach świat przestanie istnieć, zróbcie coś dla siebie, dla tych których kochacie i na których szczególnie wam zależy.</p>
      <p>To będzie taki mały zamiennik dla słodkości, które zapewne będziecie przygotowywać przed Świętem Zmarłych dla rodziny i znajomych.</p>
      <p>To, co chce zaproponować, będzie zawierało składniki, które przysłużą się Waszemu zdrowiu.</p>
      <p>Oto przepis na makaroniki:</p>
      <p>* 140g suszonych daktyli (uzupełnią niedobór potasu, zapobiegną miażdżycy, złagodzą objawy menopauzy, pomogą przy zaparciach)</p>
      <p>* 150g orzechów nerkowca (mogą zapobiec rozwojowi cukrzycy, wspomogą serce, są skarbnica potasu)</p>
      <p>* 4 łyżki rodzynek (zawierają żelazo, miedź i mangan, wzmocnią układ nerwowy, poprawią pracę mózgu i pamięć)</p>
      <p>* 1 łyżka kakao (zapobiegnie demencji, poprawi pamięć, zapobiegnie chorobom układu krążenia)</p>
      <p>* wanilia</p>
      <p>* gorąca woda</p>
      <p>* kokos do obtoczenia makaroników (zawiera kwas foliowy, potas, magnez, obniża poziom cholesterolu, zapobiega próchnicy)</p>
      <p>Daktyle zalać gorącą wodą na 15 min. Po tym czasie odlać wodę. Daktyle, orzechy, rodzynki, kakao, wanilię wrzucić do miksera. Zmiksować. Małą foremkę wyłożyć papierem do pieczenia. Wyłożyć masę na dno formy i mocno ubić wyrównując powierzchnię. Włożyć do lodówki na godzinę lub do zamrażarki na 20 min. Po upływie wymaganego czasu wyjąć z formy i pociąć na małe prostokąty. Obtaczać w kokosie. Smacznego!</p>
      <p>Sięgajcie po nie w wyjątkowych chwilach, nie przesądzając z ilością. Walory zdrowotne są nieocenione, ale dla wszystkich, którzy muszą liczyć kalorie duża ilość jest niewskazana.</p>
      <p>Jeżeli macie ciekawą propozycję na zdrowy zamiennik napiszcie do mnie. Fotki mile widziane. Czekam!</p>
      `
    },
    {
      title: 'Woda',
      date: '2017-10-24',
      image: 'woda',
      description: `
      <p class="font-weight-bold">Nie zachęci nas smakiem ani zapachem, nie zachwyci kolorem. Każdy jednak wie, że bez niej nie ma zdrowia ani życia.</p>
      <p>Jak niektórzy z Was pamiętają, po konsultacjach, że mną w mojej poradni zawsze przypominam o konieczności picia wody.</p>
      <p>Znowu namolnie powiem po raz setny, żeby być zdrowym trzeba codziennie walczyć. Nie na ringu, ale na talerzu. W tym przypadku stoczmy bój z tym, co niezdrowe, czyli że słodkim, gazowanymi napojami, hektolitrami kawy i używkami, które tak kochamy. Spróbujmy je ograniczyć i wprowadzić na stałe do naszego menu &mdash; wodę.</p>
      <p>Delektujmy się nią nie tylko latem, kiedy organizm przez pragnienie sam o niej przypomina. Ale sięgajmy po nią codziennie &mdash; jesienią i zimą również.</p>
      <p>Uzdrawiajmy nasze ciało każdego dnia, jeżeli:</p>
      <p>* walczymy o zdrowe serce</p>
      <p>* chcemy mieć więcej energii</p>
      <p>* chcemy nawilżyć skórę i poprawić jej wygląd</p>
      <p>* zapobiec chorobom nerek</p>
      <p>* chcemy zapobiegać zaparciom</p>
      <p>* chcemy poprawić metabolizm</p>
      <p>* chcemy oczyścić nasze ciało z toksyn</p>
      <p>Szczególnie niech pamiętają o tym Ci, którzy się odchudzają jak również ludzie borykający się z nadwagą.</p>
      <p>Dlatego wyróbmy w sobie nawyk picia wody, zawsze miejmy ją w pobliżu żeby można było po nią sięgnąć. Pijmy małymi łykami żeby organizm miał czas wchłonąć i nawodnić każdy zakątek naszego ciała.</p>
      <p>Przypominajmy ludziom starszym z naszych rodzin o konieczności picia wody. Z wiekiem maleje u nich uczucie pragnienia, co skutkuje mniejsza chęcią do przyjmowania płynów. Ma to niestety bardzo poważne skutki, jeżeli chodzi o ich zdrowie.</p>
      <p>Uczmy również nasze dzieci tego, że woda to samo dobro. Zamiast pieniędzy do ręki na coś do picia zadbajmy żeby zawsze miały przy sobie małą butelkę wody, po którą mogą sięgnąć.</p>
      <p>Wiem, że znowu nudzę takim gadaniem, ale przecież taka moja rola &mdash; przypominać, uczyć, namawiać, zachęcać. Tak też mogę dbać o Was i Wasze zdrowie.</p>
      <p>Zadanie domowe!</p>
      <p>Przeanalizujcie to co pijecie w ciągu doby i zastanówcie się czy wszystkie te napoje służą Waszemu zdrowiu,i czy ciało nie wysyła jakiegoś cichego wołania o pomoc.</p>
      `
    },
    {
      title: 'Odporność',
      date: '2017-10-17',
      image: 'odpornosc',
      description: `
      <p class="font-weight-bold">Mam nadzieję, że myśleliście o budowaniu odporności i wzmacnianiu swojego organizmu przez cały rok. Jedno jest pewne <em>&bdquo;z nieba nie spadnie</em>&rdquo;, trzeba na nią zapracować.</p>
      <p>Holistyczne podejście do swojego ciała wydaje mi się najbardziej słuszne. Czyli usprawnienie układu immunologicznego przez prawidłowe odżywianie, aktywność fizyczna, walkę ze stresem i zachowanie ogólnej równowagi.</p>
      <p>Przyjrzyjcie się swoim przyzwyczajeniom i zacznijcie działać. Tym razem walczymy o odporność.</p>
      <p>* Poświęćcie codziennie trochę czasu na odpoczynek. Przemęczony organizm jest podatny na infekcje.</p>
      <p>* Hartujcie się, łatwiej zniesie gwałtowne zmiany temperatury.</p>
      <p>* Często wietrzcie mieszkanie, dbając żeby temperatura w domu nie przekraczała 20 C</p>
      <p>* Spacerujcie przynajmniej 3 razy w tygodniu głęboko wdychając powietrze.</p>
      <p>* Oczywiście nie zapomnijcie o prawidłowym i zdrowym odżywianiu.</p>
      <p>Uwaga &mdash; aby wzmocnić odporność potrzeba 2-3 tygodnie, więc wniosek z tego taki że zaczynamy od dzisiaj.</p>
      <p>Pamiętaj również, że organizm człowieka nie potrafi magazynować witaminy C, dlatego musisz ją codziennie dostarczać. Ma ona, bowiem duże znaczenie w podnoszeniu odporności.</p>
      <p>Nieuczulonym polecam codziennie na czczo szklankę wody (letniej) z 1 łyżka miodu i sokiem z połowy cytryny. Przygotujcie wieczorem i wypijcie rano.</p>
      <p>Ciekawostka, która powinna ucieszyć kobiety to taka, że bronicie się lepiej przed infekcjami mając silniejszy system immunologiczny. Powodem jest estrogen. W czasie menopauzy poziom tego hormonu spada i odporność kobiet w tym okresie jest mniejsza.</p>
      <p>Jeszcze jedno chce Was zapytać: Pamiętacie o badaniach. Nie badaniach technicznych samochodu (wiem, że o nich pamiętacie doskonale), ale o badaniach okresowych, kontrolnych własnego organizmu.</p>
      <p>Co jakiś czas warto się przebadać, tak zupełnie bez powodu!</p>
      `
    },
    {
      title: 'Weekend',
      date: '2017-10-13',
      image: 'weekend',
      description: `
      <p class="font-weight-bold">Hej Kochani! Planujemy! Co? Weekend!</p>
      <p>A tak właściwie chce żebyście zaplanowali wyjście z domu. Ma być piękna pogoda wiec nie możemy tego zmarnować. Nie myjemy okien, samochodów, nie sprzątamy garażu tylko wychodzimy i cieszymy się słońcem.</p>
      <p>ŁĄdujemy akumulatory na następne dni. Nie ważne ile kilometrów zrobimy czy to na spacerze czy może na rowerze. Ważne jest to, że ruszymy swoje&hellip; ciało i poczujemy powiew świeżego powietrza. Mamy takie piękne tereny wokół siebie, więc w drogę.</p>
      <p>Napiszcie do mnie gdzie byliście, przyślijcie zdjęcia. Będę wtedy wiedział ze trafiłem do kogoś po drugiej stronie z tym moim nudnym gadaniem. Będę mógł wtedy powiedzieć moja walka o wasze zdrowie rozpoczęta!</p>
      `
    },
    {
      title: 'Jesień',
      date: '2017-10-11',
      image: 'jesien',
      description: `
      <p class="font-weight-bold">Czyżby to już koniec pięknego lata? Szkoda&hellip; To, co przyjemne zazwyczaj szybko się kończy. Wszystko zwalnia, przyroda zasypia a my&hellip; Boje się o tym myśleć!</p>
      <p>Nasz organizm nie lubi tych ponurych, krótkich dni. Deszcz i zimno nie zachęcają do rannej pracy. Szukamy ciepłego i przytulnego miejsca żeby usiąść i podrzemać trochę albo poleniuchować.</p>
      <p>Proszę Was jednak nie przechodźcie w letarg jesienno&mdash;zimowy. Zaplanujcie ten czas tak żeby go nie zmarnować. Wszystkie dotychczasowe osiągnięcia (myślę tu o spadku wagi i aktywnym życiu) trzeba przez ten czas zachować.</p>
      <p>Nie jesteśmy niedźwiedziami i nie musimy gromadzić tłuszczu i zapadać w sen zimowy. Znajdźmy dla siebie aktywność na jesień, wyznaczmy sobie cel. Wybierzmy coś, co sprawia mam przyjemność. Mogą to być spacery, ulubione zajęcie fitness albo pół godz. zajęć ruchowych w domu.</p>
      <p>Wybór jest ogromny. Dołączcie do tego zdrowe odżywianie i sukces w walce o zdrowie gotowy.</p>
      <p>Myślcie i działajcie. Zachęcam gorąco do tego, bo wiem ze trudny czas przed nami. Jednak trud się opłaci &mdash; pomyślcie &mdash; jak to pięknie będzie pokazać na wiosnę swój nowy, zdrowszy wizerunek.</p>
      `
    },
    {
      title: 'Melisa ',
      date: '2017-03-12',
      image: 'melisa',
      description: `
      <p class="font-weight-bold">Kiedy jakiś czas temu uświadomiłem sobie, że w ogrodzie mojej mamy rośnie tak wspaniała roślina jaką jest melisa, od razu postanowiłem wykorzystać jej dobrodziejstwo.</p>
      <p>Latem wykorzystuje świeże liście, natomiast zimą &mdash; zasuszone. Dbamy, żeby nie zmarnował się ani jeden liść ponieważ jej działanie zadziwi każdego z Was. Działanie jej to nie tylko właściwości uspokajające i nasenne ale również:</p>
      <p>* na problemy z trawieniem (napary z melisy zwiększają wydzielanie soku żołądkowego i żółci, a co za tym idzie &mdash; ułatwiają trawienie i pobudzają apetyt)</p>
      <p>* jest dobrym środkiem na bóle głowy, migreny, zawroty głowy</p>
      <p>* może zapobiec miażdżycy (zmniejsza stężenie cholesterolu we krwi)</p>
      <p>* na bolesne miesiączki (środek łagodzący bóle miesiączkowe. Sprawdzi się również przy skąpym miesiączkowaniu lub jego zmiennym nasileniu)</p>
      <p>* na pamięć i koncentrację (zmniejsza objawy demencji starczej)</p>
      <p>* na opryszczkę i nie tylko (działa przeciwbakteryjnie i przeciwwirusowo)</p>
      <p>* łagodzi zapalenie dziąseł</p>
      <p>* hamuje rozwój bakterii Helicobakter pylori</p>
      <p>* łagodzi dokuczliwe mdłości w pierwszym trymestrze ciąży oraz pobudza laktacje</p>
      <p>* wspomaga leczenie nadczynności tarczycy</p>
      <p>Uspokajająco na organizm wpływa zarówno picie naparu z melisy, jak i kąpiel ziołowa!</p>
      `
    },
    {
      title: 'Tłusty czwartek',
      date: '2017-03-12',
      image: 'tlusty-czwartek',
      description: `
      <p class="font-weight-bold">Muszę się przyznać, że się o Was boję. Uważajcie na pączki, faworki i oponki! Wszystkie te przysmaki smażone są w głębokim tłuszczu i są meeega kaloryczne.</p>
      <p>Wiem, że trudno w tym dniu oprzeć się takim przysmakom ale uwierzcie że się da &mdash; wszystko jest w naszej głowie. Jeżeli już musicie zjeść &mdash; z grzeczności a może z chytrości to postarajcie się poprzestać na jednej sztuce zwłaszcza że:</p>
      <p>* pączek 80g / 340kcal</p>
      <p>* faworek / chrust &mdash; 1 szt. / 87kcal</p>
      <p>* oponka 50g / 134 kcal</p>
      <p>Bądźcie czujni i przemyślcie czy warto! Żeby nie było że nie przestrzegałem! Smacznego!</p>
      `
    },
    {
      title: 'Jajko',
      date: '2017-03-12',
      image: 'jajko',
      description: `
      <p class="font-weight-bold">Często zastanawiam się wracając do domu, co mógłbym zjeść na szybko. Dzisiejsza propozycja nie będzie bardzo nowatorska, ale zachęci do zjedzenia czegoś innego.</p>
      <p>Nie wiem jak u Was, ale u mnie w domu zawsze w lodówce są jajka. Wiec, kiedy brak pomysłu na ugotowanie czegoś ciepłego, braku czasu na długie przygotowania skuś się na pyszny omlet.</p>
      <p>Te małe niepozorne jajeczka są lekarstwem przeciw miażdżycy. Białko proste daje człowiekowi ogromne siły a żółtko zawiera wszystkie mikroelementy, biopierwiastki i witaminy: A,B,E która opóźnia procesy starzenia, wit. D, kwas foliowy, wapń, żelazo oraz fosfor niezbędny dla zębów i paznokci. Nie ma nic lepszego dla odżywienia organizmu niż żółtko. Jajko zawiera również w sobie drogocenną lecytynę &mdash; zapobiegającą miażdżycy. Ale nie można go łączyć w nadmiarze z tłuszczami nasyconymi np. smażyć na maśle oraz łączyć z cukrem. Najkorzystniejszą postacią są jajka gotowane na miękko.</p>
      <p>Przepis:</p>
      <p>* 3 jajka</p>
      <p>* 4 łyżki mleka</p>
      <p>* 1 łyżka mąki kukurydzianej</p>
      <p>* 1 pomidor</p>
      <p>* 1/2 mozzarella 60g</p>
      <p>* bazylia suszona/świeża</p>
      <p>* oliwa z oliwek</p>
      <p>* sól</p>
      <p>* pieprz</p>
      <p>Jajka, mleko i mąkę wymieszać na jednolitą konsystencję, nie ubijać. Doprawić solą i pieprzem. Wylać na rozgrzaną patelnię posmarowaną odrobiną oliwy. Na wierzch ułożyć pokrojony pomidor, ser, posypać bazylią. Smażyć na małym ogniu pod przykryciem aż omlet się zetnie. Smacznego!</p>
      <p>Kaloryczność: około 550 kcal!</p>
      `
    },
    {
      title: 'Włosy a dieta',
      date: '2017-03-08',
      image: 'wlosy-a-dieta',
      description: `
      <p class="font-weight-bold">Kobiety lubią i chcą mieć długie i piękne, my mężczyźni gęste i bez zakoli.</p>
      <p>Wiem, że nikt nie chce żeby zwracały na siebie uwagę tym, że są przerzedzone i w marnej kondycji. Często, gdy zaczynają wypadać zaczynamy się martwić, co się dzieje. Koniecznie trzeba znaleźć przyczynę, żeby zwalczyć skutek: wypadania, przerzedzania, łamliwości, łysienia. Wydawać by się mogło, ze inny szampon, lepsza odzywka będą receptą na nasze problemy, ale nie tędy droga. Nie zaszkodzą, ale czy pomogą? Tak jak w przypadku skóry włosy są obrazem niedożywienia ilościowego jak i jakościowego. Każdy niedobór działa niekorzystnie:</p>
      <p>* brak siarki &mdash; włosy słabe, wypadają</p>
      <p>* brak Wit A &mdash; słabe, suche i łamliwe</p>
      <p>* brak Wit B1, B5, B6, H &mdash; łojotok, łamliwość</p>
      <p>* brak mikroelementów tj. cynk, miedź &mdash; łamliwe, słabe i matowe</p>
      <p>* brak cynku spowoduje wypadni</p>
      <p>* niedobór żelaza &mdash; łysienie</p>
      <p>Jeżeli zmienimy dietę na korzystną dla włosów pamiętać należy, ze włos jest tkanką martwą, dlatego efekty zobaczymy dopiero po obcięciu zniszczonych włosów. Wtedy nastąpi wymiana tkanek. Należy regularnie i cierpliwie stosować nowy program żywieniowy. Nie zniechęcajcie się bo tak jak napisałem dopiero osiągnięty włos będzie zdrowy i mocny. Po ścięciu osłabionych końców zobaczycie różnice. Cierpliwość popłaca, bo nie tylko włosy odczują różnice, ale skóra i paznokcie również.</p>
      <p>Czy nie warto spróbować? Nie zwlekajcie tylko do dzieła!</p>
      `
    },
    {
      title: 'Awokado',
      date: '2017-03-08',
      image: 'awokado',
      description: `
      <p class="font-weight-bold">Lubię jak na talerzu jest kolorowo i przy okazji zdrowo. Ostatnio bardzo często wracam do awokado, bo muszę przyznać, że jest to moje małe odkrycie.</p>
      <p>Dobre zdrowe i przy okazji zastępuje mi smarowidło do chleba. Już dawno wyrzuciłem ze swojej diety margarynę do smarowania i staram się zastąpić ją czymś wartościowym. Skuście się na ten owoc, bo wart jest tego. A jeżeli awokado jest jeszcze twarde koniecznie poczekajcie aż całkiem zmięknie i wtedy zróbcie sobie kanapeczki.</p>
      <p>Chleb razowy 26g + awokado 15g + Łosoś wędzony na ciepło 16g + pomidor 15g, jeszcze tylko odrobina rukoli i jeśli lubisz czosnek to zmieszaj go z odrobiną oliwy i kilkoma kroplami polej kanapeczkę.</p>
      <p>Wybrałem go dlatego bo ma wiele korzyści zdrowotnych, chociaż zawiera dużo kalorii są to kalorie pełne wartości odżywczych. Tłuszcze są zdrowe dla serca i są świetnym paliwem dla mózgu, połączone z potasem skutecznie obniżają ciśnienie krwi. Owoc ten zawiera 30 % więcej potasu niż banan. Zawiera również witaminę E (witaminę młodości). Jego tłusty miąższ wykazuje właściwości odchudzające a wśród tych wszystkich witamin szczególnie cenny jest kwas foliowy, który zapobiega wadom rozwojowym płodu. Wszystkim tym, których skusi moja propozycja życzę</p>
      <p>Smacznego!</p>
      `
    },
    {
      title: 'Skóra a dieta',
      date: '2017-03-08',
      image: 'skin',
      description: `
      <p class="font-weight-bold">Siedzę i myślę, jaki temat do wpisu wybrać. Postanowiłem, że w najbliższym czasie napiszę o wpływie diety na skórę, włosy i paznokcie.</p>
      <p>Przybliżenie tego tematu pozwoli Wam ocenić, że wpływ diety ma ogromne znaczenie na nasz wygląd i zdrowie. Miejcie świadomość, że właśnie to, co jemy wpływa w bezpośredni sposób na nasz wygląd. Kondycja naszej skóry również wynika z tego, co jemy. Chcemy żeby miała piękny wygląd niezależnie od tego ile mamy lat, ale czy rzeczywiście o niej myślimy? To, że nasze toaletki są pełne kremów, peelingów, maseczek, balsamów, to jeszcze nie wszystko. Owszem kosmetyki pomagają w nawilżeniu i poprawie wyglądu skóry, ale czy pomogą, jeśli np. zabraknie kolagenu? Oczywiście to tylko słowa, ale często widzimy na ulicach ludzi, na których twarzach widać zmęczenie, alergie, nietolerancje pokarmowe lub nadużywanie alkoholu, a to wszystko jest oznaką złego odżywiania, bo przecież zdrowa dieta to jest właściwe lekarstwo na te problemy. Zachęcam żeby każdy z nas patrząc na siebie następnym razem ocenił czy jego skóra potrzebuje pomocy.</p>
      <p>Nawet niewielki niedobór witaminy A może spowodować chropowatość skóry a witaminy B łojotok i trądzik. Żeby zadbać o piękną cerę należy w swojej diecie uwzględnić:</p>
      <p>* tłuszcze omega zatrzymują wodę w naskórku np. łosoś, makrela</p>
      <p>* witamina B5 łagodzi podrażnienia i dobrze nawilża np. wątróbka, jajka, bób, groch, fasola</p>
      <p>* witamina E opóźnia powstawanie zmarszczek np. olej roślinny i tłuste ryby</p>
      <p>* witamina C odmładza np. papryka, brokuł, brukselka, czarna porzeczka, kiwi</p>
      <p>* prowitamina A opóźnia procesy starzenia np. marchew, suszona morela, czerwona papryka, dynia ale również cynk, krzem, żelazo, miedź.</p>
      <p>Efekty zmiany sposobu żywienia zauważysz dopiero lub już po 2 tygodniach. Dlatego dbajcie o zróżnicowanie posiłków. Dieta taka wymaga dużej regularności i cierpliwości. Jeżeli zauważysz, że twoja skóra woła o pomoc zabieraj się do pracy!</p>
      `
    },
    {
      title: 'Herbata i Kakao',
      date: '2017-03-08',
      image: 'herbata-i-kakao',
      description: `
      <p class="font-weight-bold">Nastały długie zimowe wieczory, które ciągnął się niemiłosiernie. Nie mamy już ochoty na zimne napoje pełne kostek lodu czy zimny deser.</p>
      <p>Nadszedł czas na rozgrzewające herbaty i wszystko to, co potrafi ogrzać nasze ciało i wprowadzić nas w błogi stan zadowolenia. Moja propozycja nie jest niczym nowym, ale przypomni nam o tym, ze tak niewiele trzeba żeby zaznać przyjemnego z pożytecznym. Gdy już przygotujecie którąś z propozycji usiądźcie wygodnie w ulubionym fotelu, włączcie relaksująca muzę i odpocznijcie po ciężkim dniu. Czas na chwile się zatrzymać, pomyśleć a wszystko stanie się możliwe. Spróbujcie, naprawdę warto.</p>
      <p>Pamiętajcie o jednym herbata czarna działa podobnie jak kawa, dlatego nie pijcie jej wieczorem wybierz raczej zielona lub czerwona. Mocno zaopatrzona zabezpieczy przed chorobami serca, niewydolnością mózgu, kłopotami z zapaleniem śluzówki i chroni nawet przed grupą. Czarna herbata nabiera właściwości gdy gotuję się ją w 100%C, Uaktywniają się wtedy garbniki, które działają ściągająco i odkażająco.</p>
      <p>Przepis 1:</p>
      <p>* 1 łyżeczka czarnej</p>
      <p>* 1 łyżeczka zielonej</p>
      <p>* 1 łyżeczka czerwonej</p>
      <p>* kilka goździków</p>
      <p>* kawałeczek cynamonu</p>
      <p>* 3 ziarna kardamonu</p>
      <p>* 2 plasterki świeżego imbiru</p>
      <p>* 1l wody</p>
      <p>* 1 plasterek pomarańczy</p>
      <p>* 1 plasterek limonki</p>
      <p>* 3 malinki(moja być mrożone)</p>
      <p>* miód</p>
      <p>Suchą herbatę czarną zalewamy woda. Wrzucamy goździki, kardamon, cynamon, imbir. Gotujemy pod przykryciem 2 minuty. Odstawiamy z ognia i chwile zostawiamy, aby temperatura trochę opadła. Wsypujemy pozostałe herbaty. Przykrywamy i zostawiamy do naciągnięcia. Przecedzamy. Nalewamy do filiżanek lub kubków, słodzimy miodem i dorzucamy owoce.</p>
      <p>Kaloryczność (Gorzka herbata 0kcal, z dodatkiem miodu 1 łyżeczka 10g/37kcal)</p>
      <p>Przepis 2:</p>
      <p>* 1 łyżeczka &mdash; 5g kakao(ilość zależy od upodobań smakowych)</p>
      <p>* 150 ml wody</p>
      <p>* 150 ml mleka 1,5 %</p>
      <p>* 1 łyżeczka miodu</p>
      <p>Do małego garnka, wsyp kakao nalej wody i gotuj 5 min. Uważaj żeby nie wykipiało. Jeżeli masz taką możliwość to kakao z wodą przygotuj dzień wcześniej. A przed spożyciem dolej mleko. Podgrzej. Dodaj miód do smaku. Taki napój jest lekkostrawny, jest źródłem związków, które wykazują korzystny wpływ na układ krążenia. Dostarcza witaminy z grupy B i Wit PP oraz magnez, który optymistycznie nastawia do świata. Kakao powinny unikać osoby zmagające się ze zgagą. Stosowane w nadmiarze może być przyczyną zaparć.</p>
      <p>Kaloryczność około 118kcal!</p>
      `
    },
    {
      title: 'Motywacja',
      date: '2017-03-05',
      image: 'motywacja',
      description: `
      <p class="font-weight-bold">W odpowiedzi na pytanie Pani Pauliny &mdash; jak się dobrze zmotywować?</p>
      <p>Muszę przyznać, że nie jest to łatwe zadanie, ale wiem ze motywacja jest motorem do działania. Gdy znajdziesz coś, co da Ci sile i podniesie Cię z kanapy to już tylko krok do uwierzenia w siebie i osiągnięcia sukcesu.</p>
      <p>Zadasz znowu pytanie &mdash; ale co? Przede wszystkim nie stawiaj sobie bardzo odległych celów i krok po kroku zacznij je realizować. Jeżeli do zgubienia masz 20 kg to skup się na pierwszych dwóch. Później na następnych itd, itd&hellip; Będzie łatwiej i nie zniechęcisz się, ze długa droga przed Tobą. Zapewniam Cię, cierpliwość popłaca a cel, który chcesz osiągnąć jest w zasięgu ręki.</p>
      <p>Natknąłem się kiedyś na bardzo fajne zdanie, <em>&bdquo;Wyobrażam sobie, jak będę dumny z siebie, gdy uda mi się zrobić coś, czego nie chce mi się robić</em>&rdquo;. Może te słowa będą inspiracją, gdy ćwiczenia, które powinnaś wykonać chcesz odłożyć na później. Jednak radzę nie odkładaj dwa dni z rzędu, ponieważ bardzo trudno później wrócić do aktywności.</p>
      <p>Wybierz taki rodzaj ćwiczeń, które choć w minimalnym stopniu sprawiają Ci przyjemność &mdash; będzie łatwiej. Nastawienie jest bardzo ważne. Dlatego nie powinnaś myśleć, ze Ci się może nie udać, tylko mów sobie &mdash; od teraz zaczynam i w końcu będę robić coś dla siebie. Będę walczyć o zdrowie, lepsze samopoczucie, będę walczyć o siebie. To będzie moje nowe życie &mdash; bez chorób, nadwagi, uzależnień. Mogę wszystko pokonać, bo stać mnie na to. Miej świadomość, ze sukces i powodzenie zależy tylko od Ciebie, bo ono jest w Tobie. Może za osiągnięcie jakiegoś obranego celu nagrodź siebie czymś, co sprawi Ci przyjemność. Niech to nie będzie kawałek ciasta, ale może jakiś zabieg kosmetyczny, nowy ciuch. Coś, co lubisz.</p>
      <p>Nie zapominaj jednak ze to nie koniec, ze każdy dzień będzie walką, którą musisz wygrać. Uświadom sobie, co Cię zniechęca i próbuj tego unikać. Przede wszystkim nie daj satysfakcji tym, którzy nie wierzą, że osiągniesz cel. Załóż dziennik swoich postępów i wpisz do nich zajęcia na każdy dzień i wszystko, co musisz wykonać. Gdy je zrealizujesz stawiaj przy każdym krzyżyk, co będzie dla Ciebie sygnałem, ze wypełniłaś dobrze plan. Może pomoże Ci złożenie obietnicy komuś, kto będzie śledził postępy i cele, jakie sobie założyłaś. Wtedy będziesz miała większą motywacje do wypełniania postanowień. A może zaczniesz je realizować z kimś Ci bliskim, kto chce Ci pomoc. Wspólnie, razem zawsze jest prościej. Zagości między Wami atmosfera rywalizacji, co da dodatkowe paliwo do tego żeby walczyć dalej.</p>
      <p>Ja będę trzymał za Ciebie kciuki, bo wiem, jakie to wszystko jest trudne. Jest jeszcze jeden rodzaj motywacji, który odkryłem w sobie. Jeżeli usłyszę od kogoś, ze nie wierzy w mój plan i na pewno mi się nie uda osiągnąć celu to robię wszystko żeby pokazać, ze właśnie będzie odwrotnie. To ja mam racje i siła jest we mnie. Jak coś postanowię to tak będzie. Dziwne, prawda? Ale pamiętaj ze każdy, kto zwycięża taka walkę jest bohaterem. Powodzenia!</p>
      <p>A to jest jedna z moich własnych motywacji!</p>
      `
    },
    {
      title: 'Krewetki',
      date: '2017-03-05',
      image: 'krewetki',
      description: `
      <p class="font-weight-bold">Na dzisiejszych zakupach wpadłem na pomysł dania z krewetkami w roli głównej.</p>
      <p>Rodzaj ich nie zachwycał (krewetki indyjskie), ale smak wynagrodził wszystko. Jak masz taką możliwość to wybierz rozmiarowo większe krewetki, ponieważ te małe kurczą się podczas obróbki termicznej. Dzisiejsze danie to moja propozycja na ciepły posiłek. Za każdym razem postaram się umieszczać kaloryczność posiłku przeze mnie proponowanego.</p>
      <p>Krewetki są źródłem łatwo przyswajalnego białka, są lekkostrawne o niskiej zawartości tłuszczu. Niska kaloryczność jest też powodem, dla którego warto włączyć je do diety (100g / 86kcal). Zawierają: witaminy z grupy B i znajdziesz w nich również jod, wapń, selen, fluor, żelazo, magnez, cynk.</p>
      <p>Skład:</p>
      <p>* 200g krewetek</p>
      <p>* sól</p>
      <p>* pieprz</p>
      <p>* cytryna/limonka</p>
      <p>* ulubione zioła</p>
      <p>* czosnek</p>
      <p>* pietruszka</p>
      <p>* łyżeczka oleju rzepakowego</p>
      <p>Sos czosnkowy:</p>
      <p>* 100g jogurtu naturalnego 0%</p>
      <p>* 1 łyżka majonezu light (płaska)</p>
      <p>* ząbek czosnku</p>
      <p>* wegeta</p>
      <p>Składniki na sos czosnkowy należy wymieszać ze sobą dodając zmiażdżony ząbek czosnku.</p>
      <p>Najprostszą metodą przyrządzenia krewetek to doprawienie ich solą, pieprzem, odrobiną cytryny/limonki oraz ulubionymi ziołami i usmażenie ich na odrobinie oleju wraz z czosnkiem. Do dania wybierz ten rodzaj pieczywa, który będzie dla Ciebie odpowiedni. Ja wybrałem chleb razowy zapieczony w tosterze. Smacznego!</p>
      <p>Kaloryczność dania: około 323kcal!</p>
      `
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

  updateImgUrl(arr: Array<Blog>) {
    arr.forEach(el => {
      el.imageUrl = `assets/img/blog/thumb/${el.image}-thumb.jpg`;
    });
  }

  loadOlder() {
    this.lastLoadedImg = this.loadedImg;
    this.blogList = this.blogListInit.slice(0, this.loadedImg);
    this.loadedImg += this.step;
    if (this.lastLoadedImg >= this.blogListInit.length) {
      this.loadOlders = false;
    }
    this.updateImgUrl(this.blogList);
  }

  openModal(item: Blog) {
    const modalRef = this.modalService.open(ModalBlogComponent, { size: 'lg' });
    modalRef.componentInstance.item = item;
  }
}
