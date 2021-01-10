import { PaymentDetail } from './payment-detail.model';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'http://localhost:62857/api';
  readonly rootUrl = 'http://localhost:62857/api';

  formData: PaymentDetail;
  list : PaymentDetail[];

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  
  login(formData) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }

     // tslint:disable-next-line: typedef
     postPaymentDetail(){
      return this.http.post(this.rootUrl + '/PaymentDetail' , this.formData);
       }
       putPaymentDetail(){
        return this.http.put(this.rootUrl + '/PaymentDetail/'+ this.formData.PMId , this.formData);
         }
         deletePaymentDetail(id){
          return this.http.delete(this.rootUrl + '/PaymentDetail/'+ id );
           }
    
      refreshList(){
        this.http.get(this.rootUrl + '/PaymentDetail')
        .toPromise()
        .then(res => this.list = res as PaymentDetail[] );
      }
}