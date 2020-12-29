import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { LibraryComponent } from './components/library/library.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ToolsComponent } from './components/tools/tools.component';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { LoginComponent } from './components/user/login/login.component';
import { UserComponent } from './components/user/user.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { AuthGuard } from './auth.guard';
import { SongsComponent } from './components/library/songs/songs.component';
import { ArtistComponent } from './components/library/artist/artist.component';
import { AlbumComponent } from './components/library/album/album.component';
import { ResetpasswordComponent } from './components/user/resetpassword/resetpassword.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/Home',
    pathMatch:'full'

  },
  {
    path: 'Libaray',
    redirectTo:'/Libaray/songs',
    pathMatch:'full'

  },  
  {
    path: 'NavBar',
    component:  NavbarComponent
    },
    {
      path: 'Home',
      component:  HomeComponent 
    },
    {
      path: 'Programms',
      component: DiscoverComponent , canActivate:[AuthGuard]
    },
    {
      path: 'Privacy',
      component: PrivacyComponent 
    }
    ,
    {
      path: 'Tools',
      component: ToolsComponent , canActivate:[AuthGuard]
    },
    {
      path: 'restpassword',
      component: ResetpasswordComponent , canActivate:[AuthGuard]
    },
    {
      path: 'WhoWeAre',
      component: WhoWeAreComponent
    },
    {
      path: 'login',  component: UserComponent,
      children: [{
        path: '', component: LoginComponent
      }]
    },
    {
      path: 'signup',  component: UserComponent,
      children: [{
        path: '', component: SignupComponent
      }]
    },
    {
      path: 'Libaray', component: LibraryComponent , canActivate:[AuthGuard] ,
      children: [{
        path: 'songs', component: SongsComponent , canActivate:[AuthGuard]
      }]
    },
    
    {
      path: 'Libaray', component: LibraryComponent , canActivate:[AuthGuard],
      children: [{
        path: 'artist', component: ArtistComponent , canActivate:[AuthGuard]
      }]
    },

    {
      path: 'Libaray', component: LibraryComponent , canActivate:[AuthGuard],
      children: [{
        path: 'albums', component: AlbumComponent , canActivate:[AuthGuard]
      }]
    },
    {
      path: 'Libaray', component: LibraryComponent, canActivate:[AuthGuard],
      children: [{
        path: 'albums/:id', component: AlbumComponent , canActivate:[AuthGuard]
      }]
    },

    {
      path: 'Favorite',
      component: FavoriteComponent,
      canActivate:[AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
