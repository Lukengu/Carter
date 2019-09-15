import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WatchlistComponent } from './watchlist.component';


const routes: Routes = [
   {
    path: '',
    component: WatchlistComponent,
    data: {
      title: 'Watch list'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchlistRoutingModule { }
