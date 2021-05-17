import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { Books } from '../shared/models/Books';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy{

  searchForm!:FormGroup;
  books!: Books;
  subscription!:Subscription;

  constructor(private apiService: ApiService, private router:Router,private dialog:MatDialog) {
    this.searchForm=new FormGroup({
      searchString: new FormControl('',Validators.required)
    })
   }
  
  get searchString(){ return this.searchForm.get('searchString'); }

  searchBooks(){
    if(this.searchString){
     this.subscription= this.apiService.getBooksBySearch(this.searchString.value).subscribe((books)=>{
        this.books=books;
        if(this.books.items == undefined || this.books.items?.length == 0){
          this.openDialog();
        }
      });
     }
  }


  redirectToBookDetail(bookId:string){
    this.router.navigate(['book-detail',bookId]);
  }
  
  openDialog(): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '40%',
      height: '200px',
      data: {heading:'Something went wrong ',message:'No books were found with the serch criteria.',buttonText:'Close'}
    });

  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

}
