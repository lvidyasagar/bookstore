import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'enlight';
  routes = [
    {name: 'Search', path: '/search', icon: 'search'},
    {name: 'Cart', path: '/cart', icon: 'shopping_cart'},
    {name: 'My Collections', path: '/collections', icon: 'dns'},
  ];

  constructor(public mediaObserver: MediaObserver){

  }
  ngOnInit(): void {

  }

}
