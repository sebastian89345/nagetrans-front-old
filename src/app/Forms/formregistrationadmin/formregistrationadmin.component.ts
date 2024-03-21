import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-formregistrationadmin',
  templateUrl: './formregistrationadmin.component.html',
  styleUrls: ['./formregistrationadmin.component.css']
})
export class FormregistrationadminComponent implements OnInit {

  constructor(public service:ServiceService,private toastr:ToastrService,private fb:FormBuilder) { }

  CloseForm:boolean = true;
  ActiveListAdmin:boolean = false;
  @Input() 
  user:any;
  titulo:string;
  activeLabel:boolean;

  ngOnInit(): void {
    this.loadUpdate();
  }

    loadUpdate(){
      if(this.user.active == "1"){
        //actualizar
          this.activeLabel = false;
          this.titulo = "Actualizar"; 
          this.service.formModelAdmin.patchValue({
          UserName : this.user.dataItem.userName,
          Email:this.user.dataItem.email,
          PhoneNumber : this.user.dataItem.phoneNumber,
          Names :this.user.dataItem.names,
          Surnames :this.user.dataItem.surnames
          });

          setTimeout(function(){ 
            var InputUserName = <HTMLInputElement> document.getElementById("InputUserName");
            var btnGuardar = <HTMLButtonElement> document.getElementById("btnGuardar");
            InputUserName.disabled = true;
            btnGuardar.disabled = true;
          }, 120);

      } else if (this.user.active == "0"){
        //guardar
        this.activeLabel = true;
        this.titulo = "Registrar";
        this.service.formModelAdmin.reset();

        setTimeout(function(){ 
            var btnGuardar = <HTMLButtonElement> document.getElementById("btnGuardar");
            var element = <HTMLButtonElement> document.getElementById("btnActualizar");
            element.disabled = true;
            btnGuardar.disabled = false;
         }, 120);
        
      }
    }

  ActiveListmAdin(){
    this.CloseForm = false;
    this.ActiveListAdmin = true;
    }

  onSubmit(){  
    this.service.RegisterAdmin().subscribe(
      (res:any) =>{        
        if(res.succeeded){
          
          this.service.formModelAdmin.reset();
          this.toastr.success('Se guardo con exito');
        } else {
          res.errors.forEach(element => {
            
            switch (element.code) {

                case 'DuplicateUserName':
                this.toastr.error('Este usuario ya esta siendo usado');
                break;

                case 'DuplicateEmail':
                this.toastr.error('Este correo ya esta siendo usado');
                break;
            
                case 'PasswordRequiresUpper':
                  this.toastr.error('la contraseña debe llevar una mayuscula al comienzo');
                  break;
                
              default:
               this.toastr.error('Registro fallido');
                break;
            }


          });
        }
      },
      err => {console.log(err);  if(err.status == 0){this.toastr.error("La contraseña debe contener numeros y letras") }  });

    }

    

    update(){
      var val = {
        UserName: this.service.formModelAdmin.value.UserName,
        Email: this.service.formModelAdmin.value.Email,
        Names: this.service.formModelAdmin.value.Names,
        Surnames: this.service.formModelAdmin.value.Surnames,
        PhoneNumber: this.service.formModelAdmin.value.PhoneNumber
      };
        this.service.updateAdmin(val).subscribe(res =>{
        this.toastr.success("se actualizo con exito");
      },
      err => {this.toastr.error("Error al actualizar"),console.log(err);});
    }

}
