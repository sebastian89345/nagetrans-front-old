import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-get-codigo',
  templateUrl: './get-codigo.component.html',
  styleUrls: ['./get-codigo.component.css']
})
export class GetCodigoComponent implements OnInit {
  CloseForm:boolean = true;
  ActiveVerificarCodigo:boolean;
  @Input() 
  user:any;
  VerificarCodigo;
  Codigo;
  sendcodigo:any;

  constructor(public service:ServiceService,private toastr:ToastrService,private router: Router) { }

  
 ngOnInit(): void {
   
  }


  onSubmit(){
  var body = {
  UserName :this.user.userName
 }
    this.service.PostVerificarCodigo(body).subscribe(
      (res:any) =>{   
      this.VerificarCodigo = res;   
      this.Codigo = this.service.formModelVerificarCodigo.value.Codigo;
      debugger;
      if(this.VerificarCodigo[0].codigo == this.Codigo){
        this.toastr.success("Codigo correcto");
        this.sendcodigo = this.VerificarCodigo;
        this.CloseForm = false;
        this.ActiveVerificarCodigo = true;
      } else {
        this.toastr.error("Codigo incorrecto")
      }
    },
      err => {console.log(err); });

  }
}
