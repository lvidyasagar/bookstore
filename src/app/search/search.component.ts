import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Books } from '../shared/models/Books';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent{

  searchForm!:FormGroup;
  books: any;
  books$!: Observable<Books>;

  constructor(private apiService: ApiService) {
    this.searchForm=new FormGroup({
      searchString: new FormControl('',Validators.required)
    })
   }

  get searchString(){ return this.searchForm.get('searchString'); }

  searchBooks(){
    if(this.searchString){
      this.books$= this.apiService.getBooksBySearch(this.searchString.value);
     }
  }

  clearSearchString(){
    this.searchForm.reset();
  }

  trackByBookTitle(index: number, book: any): string {
    return book.volumeInfo.title;
  }

  test(){
    alert('asd');
  }

  getAuthourName(authors:string[]):string{
    let result="";
    if(authors.length > 0){
      for(let i=0;i<=authors.length-1;i++){
        if(i == authors.length -1 && authors.length > 1)
          result+=" and ";
        result+=authors[i] +" ";
      }
      return result;
    }
    else
      return "";
    
  }
}
