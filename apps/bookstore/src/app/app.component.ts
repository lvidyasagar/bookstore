import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { ApiService } from './shared/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'enlight';
  routes = [
    {name: 'Search', path: '/search', icon: 'search'},
    {name: 'Cart', path: '/cart', icon: 'shopping_cart'},
    {name: 'My Collections', path: '/book-collection', icon: 'dns'},
  ];
  cartLength: number=0;
  subscription!: Subscription;

  constructor(public mediaObserver: MediaObserver,private apiService:ApiService){

  }
  ngOnInit(): void {
    this.subscription=this.apiService.cartSubject.subscribe((cartItems)=>this.cartLength=cartItems);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
