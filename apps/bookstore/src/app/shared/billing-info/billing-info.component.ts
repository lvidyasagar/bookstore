import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss']
})
export class BillingInfoComponent implements OnInit {
  BillForm!: FormGroup;
  pendingPaymentBooks: NavigationExtras | undefined;
  
  constructor(private apiService:ApiService,private router:Router) { 
    this.BillForm=new FormGroup({
      name:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      phone:new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      address:new FormControl('')
    })
    this.pendingPaymentBooks=this.router.getCurrentNavigation()?.extras;
  }

  

  ngOnInit(): void {
  }

  get name() { return this.BillForm.get('name') }
  get email() { return this.BillForm.get('email') }
  get phone() { return this.BillForm.get('phone') }

  submitBill(){
    if(this.BillForm.valid && (this.pendingPaymentBooks && this.pendingPaymentBooks.state)){
        this.apiService.saveToMyBookCollections(this.pendingPaymentBooks.state?.books);
        if(this.pendingPaymentBooks.state.removeCart){
          this.apiService.cartBooks=[];
          this.apiService.updateCartCount();
        }
        this.router.navigate(['/book-collection'])
      }
      else
        alert('No Books were added to cart');
    }

}
