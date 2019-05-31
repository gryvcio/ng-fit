import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'poradnia', loadChildren: () => import('./modules/poradnia/poradnia.module').then(m => m.PoradniaModule) },
  { path: 'oferta', loadChildren: () => import('./modules/oferta/oferta.module').then(m => m.OfertaModule) },
  { path: 'metamorfozy', loadChildren: () => import('./modules/metamorfozy/metamorfozy.module').then(m => m.MetamorfozyModule) },
  { path: 'ciekawostki', loadChildren: () => import('./modules/ciekawostki/ciekawostki.module').then(m => m.CiekawostkiModule) },
  { path: 'kontakt', loadChildren: () => import('./modules/kontakt/kontakt.module').then(m => m.KontaktModule) }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
