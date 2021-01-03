import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { CardComponent } from './components/card/card.component';
import { DetailComponent } from './components/detail/detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PosterPipe } from './pipes/poster.pipe';
import { BackdropPipe } from './pipes/backdrop.pipe';
import { FavComponent } from './components/fav/fav.component';
import { FavsComponent } from './pages/favs/favs.component';
import { EmptyFavsComponent } from './components/empty-favs/empty-favs.component';
import { BtnThemeComponent } from './components/btn-theme/btn-theme.component';
import { SecuredPipe } from './pipes/secured.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    FooterComponent,
    LoginComponent,
    CardComponent,
    DetailComponent,
    NavbarComponent,
    PosterPipe,
    BackdropPipe,
    FavComponent,
    FavsComponent,
    EmptyFavsComponent,
    BtnThemeComponent,
    SecuredPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
