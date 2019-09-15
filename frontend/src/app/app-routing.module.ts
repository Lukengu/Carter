import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './containers';

const routes: Routes = [
	{
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'search',
        loadChildren: './views/search/search.module#SearchModule',
      },
	   {
        path: 'favourites',
        loadChildren: './views/favourites/favourites.module#FavouritesModule',
      },
	   {
        path: 'watchlist',
        loadChildren: './views/watchlist/watchlist.module#WatchlistModule',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
