import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-form-vehicle-documents',
  templateUrl: './form-vehicle-documents.component.html',
  styleUrls: ['./form-vehicle-documents.component.css']
})
export class FormVehicleDocumentsComponent implements OnInit {

  constructor(public service:ServiceService,private toastr:ToastrService,private fb:FormBuilder) { }
  CloseForm:boolean = true;
  ActiveListVehicleDocuments:boolean = false;
  @Input() 
  user:any;
  titulo:string;
  vehicleDetails;
  date;
  //fechas organizadas
  //InicioSoat;

  loadUpdate(){
    if(this.user.active == "1"){
      //actualizar
      this.titulo = "Actulizar"
      this.service.getListVehicle().subscribe(
        res => {
          this.vehicleDetails = res;
        }, 
        err =>{
         console.log(err);
        },
      );
      
      //Inicio Soat
      var InicioSoat = this.user.dataItem.fechaInicioSoat ;
      var dayinicioSoat = InicioSoat.substring(0,2);
      var monthinicioSoat = InicioSoat.substring(3,5);
      var yearinicioSoat = InicioSoat.substring(6,10);
      var fechavenInicioSoat = yearinicioSoat + "-" +  monthinicioSoat + "-" + dayinicioSoat ;

      //Inicio Tecnicomecanica
      var InicioTecnicomecanica = this.user.dataItem.fechaInicioTecnicomecanica ;
      var dayinicioTecnicomecanica = InicioTecnicomecanica.substring(0,2);
      var monthinicioTecnicomecanica = InicioTecnicomecanica.substring(3,5);
      var yearinicioTecnicomecanica = InicioTecnicomecanica.substring(6,10);
      var fechavenInicioTecnicomecanica = yearinicioTecnicomecanica + "-" +  monthinicioTecnicomecanica + "-" + dayinicioTecnicomecanica ;

      //Inicio tarjeta de operaciones
      var InicioTarjetadeoperaciones = this.user.dataItem.fechaInicioTarjetadeoperaciones ;
      var dayinicioTarjetadeoperaciones = InicioTarjetadeoperaciones.substring(0,2);
      var monthinicioTarjetadeoperaciones = InicioTarjetadeoperaciones.substring(3,5);
      var yearinicioTarjetadeoperaciones = InicioTarjetadeoperaciones.substring(6,10);
      var fechavenInicioTarjetadeoperaciones = yearinicioTarjetadeoperaciones + "-" +  monthinicioTarjetadeoperaciones + "-" + dayinicioTarjetadeoperaciones ;

      //Inicio seguro rce rcc
      var InicioSegurorccece = this.user.dataItem.fechaInicioSegurorccece ;
      var dayinicioSegurorccece = InicioSegurorccece.substring(0,2);
      var monthinicioSegurorccece = InicioSegurorccece.substring(3,5);
      var yearinicioSegurorccece = InicioSegurorccece.substring(6,10);
      var fechavenInicioSegurorccece = yearinicioSegurorccece + "-" +  monthinicioSegurorccece + "-" + dayinicioSegurorccece ;

      //Inicio extracto
      var InicioExtracto = this.user.dataItem.fechaInicioExtracto ;
      var dayinicioExtracto = InicioExtracto.substring(0,2);
      var monthinicioExtracto = InicioExtracto.substring(3,5);
      var yearinicioExtracto = InicioExtracto.substring(6,10);
      var fechavenInicioExtracto = yearinicioExtracto + "-" +  monthinicioExtracto + "-" + dayinicioExtracto ;

      //Inicio revision preventiva
      var InicioRevisionPreventiva = this.user.dataItem.fechaInicioRevisionPreventiva ;
      var dayinicioRevisionPreventiva = InicioRevisionPreventiva.substring(0,2);
      var monthinicioRevisionPreventiva = InicioRevisionPreventiva.substring(3,5);
      var yearinicioRevisionPreventiva = InicioRevisionPreventiva.substring(6,10);
      var fechavenInicioRevisionPreventiva = yearinicioRevisionPreventiva + "-" +  monthinicioRevisionPreventiva + "-" + dayinicioRevisionPreventiva ;

      //Vencimiento Soat
      var VencimientoSoat = this.user.dataItem.fechaVencientoSoat ;
      var dayVencimientoSoat = VencimientoSoat.substring(0,2);
      var monthVencimientoSoat = VencimientoSoat.substring(3,5);
      var yearVencimientoSoat = VencimientoSoat.substring(6,10);
      var fechavenVencimientoSoat = yearVencimientoSoat + "-" +  monthVencimientoSoat + "-" + dayVencimientoSoat ;

      //Vencimiento Tecnicomecanica
      var VencimientoTecnicomecanica = this.user.dataItem.fechaVencientoTecnicomecanica ;
      var dayVencimientoTecnicomecanica = VencimientoTecnicomecanica.substring(0,2);
      var monthVencimientoTecnicomecanica = VencimientoTecnicomecanica.substring(3,5);
      var yearVencimientoTecnicomecanica = VencimientoTecnicomecanica.substring(6,10);
      var fechavenVencimientoTecnicomecanica = yearVencimientoTecnicomecanica + "-" +  monthVencimientoTecnicomecanica + "-" + dayVencimientoTecnicomecanica ;

      //Vencimiento Tarjeta de operaciones
      var VencimientoTarjetadeoperaciones = this.user.dataItem.fechaVencientoTarjetadeoperaciones ;
      var dayVencimientoTarjetadeoperaciones = VencimientoTarjetadeoperaciones.substring(0,2);
      var monthVencimientoTarjetadeoperaciones = VencimientoTarjetadeoperaciones.substring(3,5);
      var yearVencimientoTarjetadeoperaciones = VencimientoTarjetadeoperaciones.substring(6,10);
      var fechavenVencimientoTarjetadeoperaciones = yearVencimientoTarjetadeoperaciones + "-" +  monthVencimientoTarjetadeoperaciones + "-" + dayVencimientoTarjetadeoperaciones ;

      //vencimiento seguro rcc rce  
      var VencimientoSegurorccece = this.user.dataItem.fechaVencientoSegurorccece ;
      var dayVencimientoSegurorccece = VencimientoSegurorccece.substring(0,2);
      var monthVencimientoSegurorccece = VencimientoSegurorccece.substring(3,5);
      var yearVencimientoSegurorccece = VencimientoSegurorccece.substring(6,10);
      var fechavenVencimientoSegurorccece = yearVencimientoSegurorccece + "-" +  monthVencimientoSegurorccece + "-" + dayVencimientoSegurorccece ;

      //Vencimiento extracto
      var VencimientoExtracto = this.user.dataItem.fechaVencimientoExtracto ;
      var dayVencimientoExtracto = VencimientoExtracto.substring(0,2);
      var monthVencimientoExtracto = VencimientoExtracto.substring(3,5);
      var yearVencimientoExtracto = VencimientoExtracto.substring(6,10);
      var fechavenVencimientoExtracto = yearVencimientoExtracto + "-" +  monthVencimientoExtracto + "-" + dayVencimientoExtracto ;

      //Vencimiento revision preventiva
      var VencimientoRevisionPreventiva = this.user.dataItem.fechaVencimientoRevisionPreventiva ;
      var dayVencimientoRevisionPreventiva = VencimientoRevisionPreventiva.substring(0,2);
      var monthVencimientoRevisionPreventiva = VencimientoRevisionPreventiva.substring(3,5);
      var yearVencimientoRevisionPreventiva = VencimientoRevisionPreventiva.substring(6,10);
      var fechavenVencimientoRevisionPreventiva = yearVencimientoRevisionPreventiva + "-" +  monthVencimientoRevisionPreventiva + "-" + dayVencimientoRevisionPreventiva ;


      this.service.formModelVehicleDocuments.patchValue({
        FKVehiculo :this.user.dataItem.fkVehiculo,
        Soat :this.user.dataItem.soat,
        Tecnicomecanica :this.user.dataItem.tecnicomecanica,
        Tarjetadeoperaciones :this.user.dataItem.tarjetadeoperaciones,
        TarjetadePropiedades :this.user.dataItem.tarjetadePropiedades,
        Segurorccece :this.user.dataItem.segurorccece,
        Extracto :this.user.dataItem.extracto,
        RevisionPreventiva :this.user.dataItem.revisionPreventiva,
        FechaInicioSoat :fechavenInicioSoat,
        FechaInicioTecnicomecanica :fechavenInicioTecnicomecanica,
        FechaInicioTarjetadeoperaciones :fechavenInicioTarjetadeoperaciones,
       // FechaInicioTarjetadePropiedades :this.user.dataItem.fechaInicioTarjetadePropiedades,
        FechaInicioSegurorccece :fechavenInicioSegurorccece,
        FechaInicioExtracto :fechavenInicioExtracto,
        FechaInicioRevisionPreventiva :fechavenInicioRevisionPreventiva,
        FechaVencientoSoat :fechavenVencimientoSoat,
        FechaVencientoTecnicomecanica :fechavenVencimientoTecnicomecanica,
        FechaVencientoTarjetadeoperaciones :fechavenVencimientoTarjetadeoperaciones,
       // FechaVencientoTarjetadePropiedades :this.user.dataItem.fechaVencientoTarjetadePropiedades,
        FechaVencientoSegurorccece :fechavenVencimientoSegurorccece,
        FechaVencientoExtracto :fechavenVencimientoExtracto,
        FechaVencimientoRevisionPreventiva :fechavenVencimientoRevisionPreventiva
        });
      setTimeout(function(){ 
        var btnGuardar = <HTMLButtonElement> document.getElementById("btnGuardar");
        var btnActualizar = <HTMLButtonElement> document.getElementById("btnActualizar");
        var FKVehiculo = <HTMLInputElement> document.getElementById("FKVehiculo");
        btnActualizar.disabled = false;
        FKVehiculo.disabled = true;
        btnGuardar.disabled = true;
        }, 200);

    } else if(this.user.active == "2"){
     //Guardar
     this.titulo = "Guardar";
     this.service.formModelVehicleDocuments.reset();
     this.service.getListVehicle().subscribe(
      res => {
        this.vehicleDetails = res;
        this.service.formModelVehicleDocuments.patchValue({
          FKVehiculo : this.vehicleDetails[0].id,
          Soat :"No",
          Tecnicomecanica :"No",
          Tarjetadeoperaciones :"No",
          TarjetadePropiedades :"No",
          Segurorccece :"No",
          Extracto :"No",
          Notificaciones:"No",
          RevisionPreventiva:"No"
        });
      }, 
      err =>{
       console.log(err);
      },
    );

     setTimeout(function(){ 
        var btnGuardar = <HTMLButtonElement> document.getElementById("btnGuardar");
        var btnActualizar = <HTMLButtonElement> document.getElementById("btnActualizar");
        var FKVehiculo = <HTMLInputElement> document.getElementById("FKVehiculo");
        FKVehiculo.disabled = false;
        btnActualizar.disabled = true;
        btnGuardar.disabled = false;
       }, 120);
      
    }
  }


  ngOnInit(): void {
    this.loadUpdate();
  }

  

  onSubmit(){  
    this.service.PostVehicleDocuments().subscribe(
      (res:any) =>{        
        if(res == "Se guardo con exito"){
          this.toastr.success('Se guardo con exito');
          this.service.formModelVehicleDocuments.reset();
          this.service.formModelVehicleDocuments.patchValue({
            FKVehiculo : this.vehicleDetails[0].id,
            Soat :"No",
            Tecnicomecanica :"No",
            Tarjetadeoperaciones :"No",
            TarjetadePropiedades :"No",
            Segurorccece :"No",
            Extracto :"No",
            Notificaciones:"No",
            RevisionPreventiva:"No"
          })
        } else if(res == "No se guardo"){
          this.toastr.error('Se guardo con exito');
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
        Soat :this.service.formModelVehicleDocuments.value.Soat,
        Tecnicomecanica :this.service.formModelVehicleDocuments.value.Tecnicomecanica,
        Tarjetadeoperaciones :this.service.formModelVehicleDocuments.value.Tarjetadeoperaciones,
        TarjetadePropiedades :this.service.formModelVehicleDocuments.value.TarjetadePropiedades,
        Segurorccece :this.service.formModelVehicleDocuments.value.Segurorccece,
        Extracto :this.service.formModelVehicleDocuments.value.Extracto,
        FechaInicioSoat :this.service.formModelVehicleDocuments.value.FechaInicioSoat,
        FechaInicioTecnicomecanica :this.service.formModelVehicleDocuments.value.FechaInicioTecnicomecanica,
        FechaInicioTarjetadeoperaciones :this.service.formModelVehicleDocuments.value.FechaInicioTarjetadeoperaciones,
        FechaInicioTarjetadePropiedades :this.service.formModelVehicleDocuments.value.FechaInicioTarjetadePropiedades,
        FechaInicioSegurorccece :this.service.formModelVehicleDocuments.value.FechaInicioSegurorccece,
        FechaInicioExtracto :this.service.formModelVehicleDocuments.value.FechaInicioExtracto,
        FechaVencientoSoat :this.service.formModelVehicleDocuments.value.FechaVencientoSoat,
        FechaVencientoTecnicomecanica :this.service.formModelVehicleDocuments.value.FechaVencientoTecnicomecanica,
        FechaVencientoTarjetadeoperaciones :this.service.formModelVehicleDocuments.value.FechaVencientoTarjetadeoperaciones,
        FechaVencientoTarjetadePropiedades :this.service.formModelVehicleDocuments.value.FechaVencientoTarjetadePropiedades,
        FechaVencientoSegurorccece :this.service.formModelVehicleDocuments.value.FechaVencientoSegurorccece,
        FechaVencientoExtracto :this.service.formModelVehicleDocuments.value.FechaVencientoExtracto,
        RevisionPreventiva :this.service.formModelVehicleDocuments.value.RevisionPreventiva,
        FechaInicioRevisionPreventiva :this.service.formModelVehicleDocuments.value.FechaInicioRevisionPreventiva,
        FechaVencimientoRevisionPreventiva :this.service.formModelVehicleDocuments.value.FechaVencimientoRevisionPreventiva
      };
        this.service.updateVehicleDocuments(val).subscribe(res =>{
        this.toastr.success("se actualizo con exito");
      },
      err => {this.toastr.error("Error al actualizar"),console.log(err);});
    }
}
