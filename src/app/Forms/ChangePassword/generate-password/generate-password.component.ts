import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.css']
})
export class GeneratePasswordComponent implements OnInit {

  constructor(public service:ServiceService,private toastr:ToastrService,private router: Router) { }

  CloseForm:boolean = true ;
  ActiveVerificarCodigo:boolean;
  user:any;
  UserDetail;

  ngOnInit(): void {
  }

  onSubmit(){  
    this.service.PostGenerarCodigo().subscribe(
      (res:any) =>{     
        if(res.length == 1){
          this.toastr.success("Se envio el correo con exito");
          this.UserDetail = res;
          this.user = this.UserDetail[0];
          this.ActiveVerificarCodigo = true ;
          this.CloseForm = false;
        } else {this.toastr.error("No se pudo enviar el correo");}
        
      },
      err => {console.log(err); if(err.status == 0){this.toastr.error("No se pudo enviar el correo");}});

    }

}
