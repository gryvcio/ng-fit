import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './modules/home/home.module#HomeModule' },
  { path: 'poradnia', loadChildren: './modules/poradnia/poradnia.module#PoradniaModule' },
  { path: 'oferta', loadChildren: './modules/oferta/oferta.module#OfertaModule' },
  { path: 'metamorfozy', loadChildren: './modules/metamorfozy/metamorfozy.module#MetamorfozyModule' },
  { path: 'ciekawostki', loadChildren: './modules/ciekawostki/ciekawostki.module#CiekawostkiModule' },
  { path: 'kontakt', loadChildren: './modules/kontakt/kontakt.module#KontaktModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
