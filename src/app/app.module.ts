import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from '../service/messaging.service';
import { environment } from '../environments/environment';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule} from '@angular/forms' 


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { LibraryComponent } from './components/library/library.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { ToolsComponent } from './components/tools/tools.component';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { HttpClientModule } from '@angular/common/http';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';    
import { ToastrModule } from 'ngx-toastr';
import { NotificationComponent } from './components/notification/notification.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

import { ErrorMessageComponent } from './error-message/error-message.component'; 
import { ValidationService } from './validation.service';
import { SignupComponent } from './components/user/signup/signup.component';
import { LoginComponent } from './components/user/login/login.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './auth.guard';
import { SongsComponent } from './components/library/songs/songs.component';
import { AlbumComponent } from './components/library/album/album.component';
import { ArtistComponent } from './components/library/artist/artist.component';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LibraryComponent,
    DiscoverComponent,
    WhoWeAreComponent,
    ToolsComponent,
    PrivacyComponent,
    LoginComponent,
    NotificationComponent,
    FavoriteComponent,
    ErrorMessageComponent,
    UserComponent,
    SignupComponent,
    SongsComponent,
    AlbumComponent,
    ArtistComponent,
    PlayerComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    
    AppRoutingModule,
    NgbModule,

    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxUsefulSwiperModule,
   
    FormsModule,
    ReactiveFormsModule,

    ToastrModule.forRoot({
      easeTime: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-center'
    })  

   
 
  ],
  providers: [MessagingService,AsyncPipe ,AuthGuard , ValidationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
