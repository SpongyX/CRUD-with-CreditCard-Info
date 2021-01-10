import { UserService } from 'src/app/shared/user.service';
import { PaymentDetail } from './../../Shared/payment-detail.model';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles: [
  ]
})
export class PaymentDetailListComponent implements OnInit {

  constructor(public service : UserService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }
  populateForm(pd:PaymentDetail){
    this.service.formData= Object.assign({}, pd);
  }
  onDelete(PMId){
    if(confirm('Are you sure to delete this record?')){
    this.service.deletePaymentDetail(PMId)
    .subscribe(res =>{
      this.service.refreshList();
      this.toastr.warning('Deleted Successfully' , 'Payment Detail Register');
    },
      err => {
        console.log(err);
      }
    )
  }
}
}
