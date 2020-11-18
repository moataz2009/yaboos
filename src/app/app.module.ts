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
import { LoginComponent } from './components/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';    
import { ToastrModule } from 'ngx-toastr';
import { NotificationComponent } from './components/notification/notification.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

import { ErrorMessageComponent } from './error-message/error-message.component'; 
import { ValidationService } from './validation.service';

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
    
  ],
  imports: [
    BrowserModule,
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
   
    ToastrModule.forRoot()  

   
 
  ],
  providers: [MessagingService,AsyncPipe , ValidationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
