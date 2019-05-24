import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { ModalBlogComponent } from './modules/ciekawostki/modal-people/modal-blog.component';
import { ModalPeopleComponent } from './modules/metamorfozy/components/modal-people/modal-people.component';
import { ModalMediaComponent } from './modules/poradnia/components/modal-media/modal-media.component';
import { ModalSpotkaniaComponent } from './modules/poradnia/components/modal-spotkania/modal-spotkania.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ModalSpotkaniaComponent,
    ModalMediaComponent,
    ModalPeopleComponent,
    ModalBlogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ ModalSpotkaniaComponent, ModalMediaComponent, ModalPeopleComponent, ModalBlogComponent ]

})
export class AppModule { }
