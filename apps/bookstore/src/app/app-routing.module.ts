import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingInfoComponent } from './shared/billing-info/billing-info.component';
import { BookDetailComponent } from './shared/book-detail/book-detail.component';

const routes: Routes = [
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'book-collection', loadChildren: () => import('./book-collection/book-collection.module').then(m => m.BookCollectionModule) },
  { path: 'book-detail/:id', component: BookDetailComponent },
  { path: 'bill', component: BillingInfoComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
