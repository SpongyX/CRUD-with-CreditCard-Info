import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: [
  ]
})
export class PaymentDetailComponent implements OnInit {

  constructor(public service: UserService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
        }
        // tslint:disable-next-line: typedef
        resetForm(form?: NgForm) {
          if (form != null)
            {
              form.form.reset();
            }
          this.service.formData = {
            PMId: 0,
            CardOwnerName: '',
            CardNumber: '',
            ExpirationDate: '',
            CVV: ''
          };
        }
        
    // tslint:disable-next-line: typedef
    onSubmit(form: NgForm) {
      // tslint:disable-next-line: no-unused-expression
      if (this.service.formData.PMId == 0){
    this.insertRecord(form);
    
      }
      else{
        //update
this.updateRecord(form);
      }

    }
      insertRecord(form:NgForm){
        this.service.postPaymentDetail().subscribe(
          res => {
          this.resetForm(form);
         this.toastr.success('Submited Successfully' , 'Payment Detail Register')
          this.service.refreshList();
        },
        err => {
          console.log(err);
        }
        );
      }
      updateRecord(form:NgForm){
        this.service.putPaymentDetail().subscribe(
          res => {
          this.resetForm(form);
          this.toastr.info('Updated Successfully' , 'Payment Detail Register')
          this.service.refreshList();

        },
        err => {
          console.log(err);
        }
        );
      }


}
  
