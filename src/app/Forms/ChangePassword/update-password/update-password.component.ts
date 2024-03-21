import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  CloseForm:boolean = true ;
  @Input() 
  sendcodigo:any;

  constructor(public service:ServiceService,private toastr:ToastrService,private router: Router) { }
 

  ngOnInit(): void {
  }

  onSubmit(){

  var body = {
    Id :this.sendcodigo[0].id,
    Password :this.service.formModelChangePassword.value.Passwords.Password
  };
  debugger;
    this.service.UpdateChangePassword(body).subscribe(res =>{
    this.toastr.success("se actualizo con exito");
    this.router.navigateByUrl('GeneratePassword');
  },
  err => {this.toastr.error("Error al actualizar"),console.log(err);});

 }

 
}
