import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-formconductor',
  templateUrl: './formconductor.component.html',
  styleUrls: ['./formconductor.component.css']
})
export class FormconductorComponent implements OnInit {

  CloseForm:boolean = true;
  ActiveListEmployee:boolean = false;
  @Input() 
  user:any;
  titulo:string;
  ActiveLabel:boolean;

  constructor(public service:ServiceService,private toastr:ToastrService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.loadUpdate();
  }

  loadUpdate(){
    if(this.user.active == "1"){
      //actualizar
        this.ActiveLabel = false;  
        this.titulo = "Actualizar"; 
        this.service.formModelDrivers.patchValue({
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
      this.ActiveLabel = true;
      this.titulo = "Registrar";
      this.service.formModelDrivers.reset();

      setTimeout(function(){ 
        var btnGuardar = <HTMLButtonElement> document.getElementById("btnGuardar");
        var btnActualizar = <HTMLButtonElement> document.getElementById("btnActualizar");
        btnActualizar.disabled = true;
        btnGuardar.disabled = false;
        
       }, 120);
      
    }
  }

  onSubmit(){  
    debugger;
    this.service.RegisterEmployee().subscribe(
      (res:any) =>{        
        if(res.succeeded){
          this.service.formModelDrivers.reset();
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
      err => {debugger; console.log(err); if(err.status == 0){this.toastr.error("La contraseña debe contener letras y numeros")} });

    }

    update(){
      var val = {
        UserName: this.service.formModelDrivers.value.UserName,
        Email: this.service.formModelDrivers.value.Email,
        Names: this.service.formModelDrivers.value.Names,
        Surnames: this.service.formModelDrivers.value.Surnames,
        PhoneNumber: this.service.formModelDrivers.value.PhoneNumber
      };
        this.service.updateEmployee(val).subscribe(res =>{
        this.toastr.success("se actualizo con exito");
      },
      err => {this.toastr.error("Error al actualizar"),console.log(err);});
    }

    ListEmployee(){
      this.CloseForm = false;
      this.ActiveListEmployee = true;
      }

}
