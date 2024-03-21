import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { FormloginComponent } from './Forms/formlogin/formlogin.component';
import { HomeComponent } from './home/home.component';
import { GeneratePasswordComponent } from './Forms/ChangePassword/generate-password/generate-password.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [

  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'Login',component:FormloginComponent},
  {path:'GeneratePassword',component:GeneratePasswordComponent},
  {path:'Index',component:IndexComponent},
  {path:'', pathMatch:'full',redirectTo:'Index'},
  {path:'**', pathMatch:'full',redirectTo:'Index'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
