import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-formdriversdocuments',
  templateUrl: './formdriversdocuments.component.html',
  styleUrls: ['./formdriversdocuments.component.css']
})
export class FormdriversdocumentsComponent implements OnInit {

  constructor(public service:ServiceService,private toastr:ToastrService,private fb:FormBuilder) { }

  CloseForm:boolean = true;
  ActiveListVehicleDocuments:boolean = false;
  @Input() 
  user:any;
  titulo:string;
  DocumentsDetails;
  ArlDetails;
  AfpDetails;
  EpsDetails;
  CajaDeCompensacionDetails;
  ActiveUpdateButton:boolean;
  ActiveSaveButton:boolean;
  date;
  inicioLicencia;
  dayinicioLicencia;
  monthinicioLicencia;
  yearinicioLicencia;
  fechavenInicioLicencia;
  venciminentoLicencia;
  dayvenciminentoLicencia;
  monthvenciminentoLicencia;
  yearvenciminentoLicencia;
  fechavenciminentoLicencia;

  loadUpdate(){
    if(this.user.active == "1"){
      //actualizar
      this.ActiveUpdateButton = true;
      this.titulo = "Actualizar";
      this.service.getListConductor().subscribe(
        res => {
          this.DocumentsDetails = res;
          this.service.formModelDriversDocuments.reset();
          
           //Inicio de la licencia
          this.inicioLicencia = this.user.dataItem.inicioLicencia
          this.dayinicioLicencia = this.inicioLicencia.substring(0,2);
          this.monthinicioLicencia = this.inicioLicencia.substring(3,5);
          this.yearinicioLicencia = this.inicioLicencia.substring(6,10);
          this.fechavenInicioLicencia = this.yearinicioLicencia + "-" + this.monthinicioLicencia + "-" + this.dayinicioLicencia

          //vencimiento de la licencia 
          this.venciminentoLicencia = this.user.dataItem.venciminentoLicencia
          this.dayvenciminentoLicencia = this.venciminentoLicencia.substring(0,2);
          this.monthvenciminentoLicencia = this.venciminentoLicencia.substring(3,5);
          this.yearvenciminentoLicencia = this.venciminentoLicencia.substring(6,10);
          this.fechavenciminentoLicencia = this.yearvenciminentoLicencia + "-" + this.monthvenciminentoLicencia + "-" + this.dayvenciminentoLicencia

          //cargar los datos para el actulizar
          this.service.formModelDriversDocuments.patchValue({
            FKDrivers : this.user.dataItem.driversPKid,
            NumeroDeLicencia:this.user.dataItem.numeroDeLicencia,
            FKArl :this.user.dataItem.fkArl,
            InicioLicencia :this.fechavenInicioLicencia,
            VenciminentoLicencia :this.fechavenciminentoLicencia,
            FKEps :this.user.dataItem.fkEps,
            FKAfp :this.user.dataItem.fkAfp,
            FKCajaDeCompensacion :this.user.dataItem.fkCajaDeCompensacion
          });
        }, 
        err =>{
         console.log(err);
        },
      );
      setTimeout(function(){ 
        
        var FKDrivers = <HTMLInputElement> document.getElementById("FKDrivers");
        FKDrivers.disabled = true;
        }, 1000);

    } else if(this.user.active == "2"){
     //Guardar
     this.titulo = "Registrar";
     this.ActiveSaveButton = true;
     this.service.getListConductor().subscribe(
      res => {
        
        this.DocumentsDetails = res;
        this.service.formModelDriversDocuments.reset();
        this.service.formModelDriversDocuments.patchValue({
          FKDrivers : this.DocumentsDetails[0].id,
          TiempoVencimientoLicencia : 1,
          FKArl :1,
          FKEps :1,
          FKAfp :1,
          FKCajaDeCompensacion :1
        });
      }, 
      err =>{
       console.log(err);
      },
    );

     setTimeout(function(){ 
      var btnGuardar = <HTMLButtonElement> document.getElementById("btnGuardarDriverDocument");
      btnGuardar.disabled = false;
       }, 120);
      
    }
  }

  getArl(){
    this.service.getListArl().subscribe(
      res => {
        this.ArlDetails = res;
      }, 
      err =>{
       console.log(err);
      },
    );
  }

  getAfp(){
    this.service.getListAfp().subscribe(
      res => {
        this.AfpDetails = res;
      }, 
      err =>{
       console.log(err);
      },
    );
  }

  getEps(){
    this.service.getListEps().subscribe(
      res => {
        this.EpsDetails = res;
      }, 
      err =>{
       console.log(err);
      },
    );
  }

  getCajaDeCompensacion(){
    this.service.getListCajaDeCompensacion().subscribe(
      res => {
        this.CajaDeCompensacionDetails = res;
      }, 
      err =>{
       console.log(err);
      },
    );
  }

  ngOnInit(): void {
    this.getArl();
    this.getAfp();
    this.getEps();
    this.getCajaDeCompensacion();
    this.loadUpdate();
  }

  onSubmit(){  
    this.service.PostDriversDocuments().subscribe(
      (res:any) =>{        
        if(res == "Se guardo con exito"){
          this.toastr.success('Se guardo con exito');
          this.service.formModelDriversDocuments.reset();
          this.service.formModelDriversDocuments.patchValue({
            FKDrivers : this.DocumentsDetails[0].id,
            FKArl :1,
            FKEps :1,
            FKAfp :1,
            FKCajaDeCompensacion :1
          });
        } else {
          this.toastr.error('Error al guardar');
        }
      },
      err => {console.log(err);});
    }

    ReturnList(){
      this.CloseForm = false;
      this.ActiveListVehicleDocuments = true;
    }

    update(){
    var val = {
        PKid :this.user.dataItem.pKid,
        FKDrivers : this.service.formModelDriversDocuments.value.FKDrivers,
        NumeroDeLicencia:this.service.formModelDriversDocuments.value.NumeroDeLicencia,
        FKArl :this.service.formModelDriversDocuments.value.FKArl,
        InicioLicencia :this.service.formModelDriversDocuments.value.InicioLicencia,
        VenciminentoLicencia :this.service.formModelDriversDocuments.value.VenciminentoLicencia,
        FKEps :this.service.formModelDriversDocuments.value.FKEps,
        FKAfp :this.service.formModelDriversDocuments.value.FKAfp,
        FKCajaDeCompensacion :this.service.formModelDriversDocuments.value.FKCajaDeCompensacion
      };
        this.service.updateDriversDocuments(val).subscribe(res =>{
        this.toastr.success("se actualizo con exito");
      },
      err => {this.toastr.error("Error al actualizar"),console.log(err);});
    }
}
