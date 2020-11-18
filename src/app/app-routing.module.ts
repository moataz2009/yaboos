import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { LibraryComponent } from './components/library/library.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ToolsComponent } from './components/tools/tools.component';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.component';
import { LoginComponent } from './components/login/login.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/Home',
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
      component: DiscoverComponent
    }
    ,
    {
      path: 'Libaray',
      component: LibraryComponent
    }
    ,
    {
      path: 'Privacy',
      component: PrivacyComponent
    }
    ,
    {
      path: 'Tools',
      component: ToolsComponent
    },
    {
      path: 'WhoWeAre',
      component: WhoWeAreComponent
    },
    {
      path: 'Home/login',
      component: LoginComponent
    },
    {
      path: 'Favorite',
      component: FavoriteComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
