import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Items } from '../../shared/models/Books';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit, OnDestroy {
  starCount: number=5;
  ratingArr:number[]=[];
  subscription!: Subscription;
  book!: Items;
  cartFlag: boolean=false;

  constructor(private apiService:ApiService,private route:ActivatedRoute,private router:Router) { }
  

  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    this.subscription=this.apiService.getCurrentBookById(this.route.snapshot.params['id']).subscribe((book)=>{
      this.book=book;
    })
  }

  showIcon(index:number):string{
    if(this.isFloat(this.book?.volumeInfo.averageRating) && Math.floor(this.book?.volumeInfo.averageRating) == index + 1)
      return 'star_half';
    else if (this.book?.volumeInfo.averageRating >= index + 1) 
      return 'star';
    else 
      return 'star_border';
  }

   isFloat(value:number):boolean{
    return Number(value) === value && value % 1 !== 0;
  }


  addToCart(){
    this.apiService.setCartBooks(this.book);
    this.apiService.updateCartCount();
    this.cartFlag=true;
  }

  buyNow(){
    this.router.navigateByUrl('/bill',{state:{"books":[this.book],"removeCart":false}});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
