import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-formlogin',
  templateUrl: './formlogin.component.html',
  styleUrls: ['./formlogin.component.css']
})
export class FormloginComponent implements OnInit {

  formModel = {
    UserName:'',
    Password:''
  }

  constructor(private service:ServiceService,private router: Router,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm)
  {
   this.service.login(form.value).subscribe(
   (res:any)=>{
     localStorage.setItem('token',res.token);
     
         this.router.navigateByUrl('home');
   },
   err => {
     if(err.status == 400){
       this.toastr.error('Usuario o contraseña incorrecta');
     }
     else{
       console.log(err);
       
     }
   }
   );
  }

}
