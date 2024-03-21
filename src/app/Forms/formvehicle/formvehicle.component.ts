import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-formvehicle',
  templateUrl: './formvehicle.component.html',
  styleUrls: ['./formvehicle.component.css']
})
export class FormvehicleComponent implements OnInit {

  CloseForm:boolean = true;
  ActiveListVehicle:boolean = false;
  @Input() 
  user:any;
  titulo:string;
  BrandDetails;
  ClassDetails;
  ModelDetails;
  ActiveLabel:boolean;
  
  constructor(public service:ServiceService,private toastr:ToastrService,private fb:FormBuilder) { }

  loadUpdate(){
    if(this.user.active == "1"){
      //actualizar
        this.ActiveLabel = false;
        this.titulo = "Actualizar"; 
        this.service.formModelVehicle.patchValue({
        UserName : this.user.dataItem.userName,
        FKBrand : this.user.dataItem.pKid,
        FKModel : this.user.dataItem.pKid1,
        FKClass : this.user.dataItem.pKid2 
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
      this.service.formModelVehicle.reset();
        this.service.formModelVehicle.patchValue({
          FKBrand : 2,
          FKClass : 2, 
          FKModel : 2
        })
      setTimeout(function(){ 

        var btnGuardar = <HTMLButtonElement> document.getElementById("btnGuardar");
        var element = <HTMLButtonElement> document.getElementById("btnActualizar");
        element.disabled = true;
        btnGuardar.disabled = false;
        
       }, 120);
      
    }
  }

  getBrand(){
    this.service.getListBrand().subscribe(
      res => {
        this.BrandDetails = res;
      }, 
      err =>{
       console.log(err);
      },
    );
  }

  getClass(){
    this.service.getListClass().subscribe(
      res => {
        this.ClassDetails = res;
      }, 
      err =>{
       console.log(err);
      },
    );
  }

  getModel(){
    this.service.getListModel().subscribe(
      res => {
        this.ModelDetails = res;
      }, 
      err =>{
       console.log(err);
      },
    );
  }

  ngOnInit(): void {
    this.getBrand();
    this.getModel();
    this.getClass();
    this.loadUpdate();
  }

  
ListVehicle(){
  this.CloseForm = false;
  this.ActiveListVehicle = true;
  }

onSubmit(){  
  this.service.RegisterVehicle().subscribe(
    (res:any) =>{        
      if(res.succeeded){
        this.service.formModelVehicle.reset();
        this.service.formModelVehicle.patchValue({
          FKBrand : 2,
          FKClass : 2, 
          FKModel : 2
        })
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
    err => {console.log(err); if(err.status == 0){this.toastr.error("La contraseña debe contener numeros y letras") } });

  }

  update(){
    var val = {
      UserName: this.service.formModelVehicle.value.UserName,
      FKBrand: this.service.formModelVehicle.value.FKBrand,
      FKClass: this.service.formModelVehicle.value.FKClass,
      FKModel: this.service.formModelVehicle.value.FKModel
    };
      this.service.updateVehicle(val).subscribe(res =>{
      this.toastr.success("se actualizo con exito");
    },
    err => {this.toastr.error("Error al actualizar"),console.log(err);});
  }
  
}
