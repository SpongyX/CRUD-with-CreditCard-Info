import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './user/registration/registration.component';

const routes: Routes = [
  {path:'', redirectTo:'/user/login', pathMatch:'full'},
{
  path: 'user', component: UserComponent,
  children:[
    {path: 'registration', component: RegistrationComponent},
    { path: 'login', component: LoginComponent }
  ]
},
{path:'home',component:HomeComponent,canActivate:[AuthGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
