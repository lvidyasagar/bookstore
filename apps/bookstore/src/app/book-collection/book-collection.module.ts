import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookCollectionRoutingModule } from './book-collection-routing.module';
import { BookCollectionComponent } from './book-collection.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BookCollectionComponent
  ],
  imports: [
    CommonModule,
    BookCollectionRoutingModule,
    SharedModule
  ]
})
export class BookCollectionModule { }
