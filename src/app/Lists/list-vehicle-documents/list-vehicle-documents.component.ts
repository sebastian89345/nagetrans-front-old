import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list-vehicle-documents',
  templateUrl: './list-vehicle-documents.component.html',
  styleUrls: ['./list-vehicle-documents.component.css']
})
export class ListVehicleDocumentsComponent implements OnInit {

  constructor(private router: Router,private service:ServiceService,private toastr:ToastrService,public services:ServiceService) { }

  CloseList:boolean = true;
  ActiveNewFormVehicleDocuments:boolean;
  userDetails;
  Details;
  active:any;
  user:any;
  ActiveListCheck:boolean;
  ActiveListCheckActualizar:boolean;
  DetailDocument = sessionStorage.getItem('DetailsDocumentsVehicle'); 
  DetailDocumentsVehicleUsuario = sessionStorage.getItem('DetailDocumentsVehicleUsuario');
  p:number = 1;
  filtro_valor = '';

  get(){
    
    if(this.DetailDocument == "0"){
      //Normal
      this.ActiveListCheck = true;
      this.ActiveListCheckActualizar = true;
      this.service.getAllVehicleDocuments().subscribe(
        res => {
          this.userDetails = res;
          
          this.PintarGrilla(this.p);
          }, 
        err =>{
         console.log(err);
        },
      );
    } else if (this.DetailDocument == "1"){
      //el editar de la lista de chequeo
      this.ActiveListCheck = false;
      this.ActiveListCheckActualizar = true;
      this.service.getAllVehicleDocuments().subscribe(
        res => {
        this.Details = res;
        let detail = this.Details.find(element => element.fkVehiculo === this.DetailDocumentsVehicleUsuario)
         this.userDetails = [detail];
         this.PintarGrilla(this.p);
        }, 
        err =>{
         console.log(err);
        },
      );
    }
    
  }

  PintarGrilla(p){

    setTimeout(function(){ 
      for (let index = 0; index < document.querySelectorAll('tbody')[0].rows.length; index++) {

        //Fecha actual
        this.date = new Date();

        //Soat
        this.fechainicioSoat = document.querySelectorAll('tbody')[0].rows[index].cells[8].innerText;
        this.VencimientoSoat = document.querySelectorAll('tbody')[0].rows[index].cells[9].innerText;
        this.inicioSoat = new Date(this.fechainicioSoat.substring(3,5) + "-" + this.fechainicioSoat.substring(0,2) + "-" + this.fechainicioSoat.substring(6,10));
        this.finSoat = new Date(this.VencimientoSoat.substring(3,5) + "-" + this.VencimientoSoat.substring(0,2) + "-" + this.VencimientoSoat.substring(6,10));
        var diasdifSoat= this.finSoat.getTime()-this.inicioSoat.getTime();
        var contdiasSoat = Math.round(diasdifSoat/(1000*60*60*24));
        var diasNotificarSoat = contdiasSoat - 5 ;
        var notificarSoat = new Date(this.inicioSoat);
        notificarSoat.setDate(notificarSoat.getDate()+diasNotificarSoat)
        
        //Tecnicomecanica
        this.fechainicioTecnicomecanica = document.querySelectorAll('tbody')[0].rows[index].cells[10].innerText ;
        this.fechafinTecnicomecanica = document.querySelectorAll('tbody')[0].rows[index].cells[11].innerText ;
        this.inicioTecnicomecanica = new Date(this.fechainicioTecnicomecanica.substring(3,5) + "-" + this.fechainicioTecnicomecanica.substring(0,2) + "-" + this.fechainicioTecnicomecanica.substring(6,10));
        this.finTecnicomecanica = new Date(this.fechafinTecnicomecanica.substring(3,5) + "-" + this.fechafinTecnicomecanica.substring(0,2) + "-" + this.fechafinTecnicomecanica.substring(6,10));
        var diasdifTecnicomecanica= this.finTecnicomecanica.getTime()-this.inicioTecnicomecanica.getTime();
        var contdiasTecnicomecanica = Math.round(diasdifTecnicomecanica/(1000*60*60*24));
        var diasNotificarTecnicomecanica = contdiasTecnicomecanica - 5 ;
        var notificarTecnicomecanica = new Date(this.inicioTecnicomecanica);
        notificarTecnicomecanica.setDate(notificarTecnicomecanica.getDate()+diasNotificarTecnicomecanica)
        
        //Tarjeta de operaciones
        this.fechainiciotarjetadeoperaciones = document.querySelectorAll('tbody')[0].rows[index].cells[12].innerText;
        this.fechafintarjetadeoperaciones = document.querySelectorAll('tbody')[0].rows[index].cells[13].innerText;
        this.iniciotarjetadeoperaciones = new Date(this.fechainiciotarjetadeoperaciones.substring(3,5) + "-" + this.fechainiciotarjetadeoperaciones.substring(0,2) + "-" + this.fechainiciotarjetadeoperaciones.substring(6,10));
        this.fintarjetadeoperaciones = new Date(this.fechafintarjetadeoperaciones.substring(3,5) + "-" + this.fechafintarjetadeoperaciones.substring(0,2) + "-" + this.fechafintarjetadeoperaciones.substring(6,10));
        var diasdiftarjetadeoperaciones= this.fintarjetadeoperaciones.getTime()-this.iniciotarjetadeoperaciones.getTime();
        var contdiastarjetadeoperaciones = Math.round(diasdiftarjetadeoperaciones/(1000*60*60*24));
        var diasNotificartarjetadeoperaciones = contdiastarjetadeoperaciones - 90 ;
        var notificartarjetadeoperaciones = new Date(this.iniciotarjetadeoperaciones);
        notificartarjetadeoperaciones.setDate(notificartarjetadeoperaciones.getDate()+diasNotificartarjetadeoperaciones)
        
        //Seguro Rce Rcc
        this.fechainicioSeguroRceRcc = document.querySelectorAll('tbody')[0].rows[index].cells[14].innerText;
        this.fechafinSeguroRceRcc = document.querySelectorAll('tbody')[0].rows[index].cells[15].innerText;
        this.inicioSeguroRceRcc = new Date(this.fechainicioSeguroRceRcc.substring(3,5) + "-" + this.fechainicioSeguroRceRcc.substring(0,2) + "-" + this.fechainicioSeguroRceRcc.substring(6,10));
        this.finSeguroRceRcc = new Date(this.fechafinSeguroRceRcc.substring(3,5) + "-" + this.fechafinSeguroRceRcc.substring(0,2) + "-" + this.fechafinSeguroRceRcc.substring(6,10));
        var diasdifSeguroRceRcc= this.finSeguroRceRcc.getTime()-this.inicioSeguroRceRcc.getTime();
        var contdiasSeguroRceRcc = Math.round(diasdifSeguroRceRcc/(1000*60*60*24));
        var diasNotificarSeguroRceRcc = contdiasSeguroRceRcc - 8 ;
        var notificarSeguroRceRcc = new Date(this.inicioSeguroRceRcc);
        notificarSeguroRceRcc.setDate(notificarSeguroRceRcc.getDate()+diasNotificarSeguroRceRcc)
        
        //Extracto
        this.fechainicioExtracto = document.querySelectorAll('tbody')[0].rows[index].cells[16].innerText;
        this.fechafinExtracto = document.querySelectorAll('tbody')[0].rows[index].cells[17].innerText;
        this.inicioExtracto = new Date(this.fechainicioExtracto.substring(3,5) + "-" + this.fechainicioExtracto.substring(0,2) + "-" + this.fechainicioExtracto.substring(6,10));
        this.finExtracto = new Date(this.fechafinExtracto.substring(3,5) + "-" + this.fechafinExtracto.substring(0,2) + "-" + this.fechafinExtracto.substring(6,10));
        var diasdifExtracto= this.finExtracto.getTime()-this.inicioExtracto.getTime();
        var contdiasExtracto = Math.round(diasdifExtracto/(1000*60*60*24));
        var diasNotificarExtracto = contdiasExtracto - 4 ;
        var notificarExtracto = new Date(this.inicioExtracto);
        notificarExtracto.setDate(notificarExtracto.getDate()+diasNotificarExtracto)
        
        //Revivison preventiva
        this.fechainicioRevisionPreventiva = document.querySelectorAll('tbody')[0].rows[index].cells[18].innerText;
        this.fechafinRevisionPreventiva = document.querySelectorAll('tbody')[0].rows[index].cells[19].innerText;
        this.inicioRevisionPreventiva = new Date(this.fechainicioRevisionPreventiva.substring(3,5) + "-" + this.fechainicioRevisionPreventiva.substring(0,2) + "-" + this.fechainicioRevisionPreventiva.substring(6,10));
        this.finRevisionPreventiva = new Date(this.fechafinRevisionPreventiva.substring(3,5) + "-" + this.fechafinRevisionPreventiva.substring(0,2) + "-" + this.fechafinRevisionPreventiva.substring(6,10));
        var diasdifRevisionPreventiva= this.finRevisionPreventiva.getTime()-this.inicioRevisionPreventiva.getTime();
        var contdiasRevisionPreventiva = Math.round(diasdifRevisionPreventiva/(1000*60*60*24));
        var diasNotificarRevisionPreventiva = contdiasRevisionPreventiva - 5 ;
        var notificarRevisionPreventiva = new Date(this.inicioRevisionPreventiva);
        notificarRevisionPreventiva.setDate(notificarRevisionPreventiva.getDate()+diasNotificarRevisionPreventiva)
        
        //Condicionales
        if (this.date >= notificarSoat){
          document.querySelectorAll('tbody')[0].rows[index].cells[9].style.backgroundColor = "yellow"
          }
        if (this.date >= notificarTecnicomecanica){
          document.querySelectorAll('tbody')[0].rows[index].cells[11].style.backgroundColor = "yellow"
          }
        if (this.date >= notificartarjetadeoperaciones){
          document.querySelectorAll('tbody')[0].rows[index].cells[13].style.backgroundColor = "yellow"
        }
        if (this.date >= notificarSeguroRceRcc){
          document.querySelectorAll('tbody')[0].rows[index].cells[15].style.backgroundColor = "yellow"
        }
        if (this.date >= notificarExtracto){
          document.querySelectorAll('tbody')[0].rows[index].cells[17].style.backgroundColor = "yellow"
        }
        if (this.date >= notificarRevisionPreventiva){
          document.querySelectorAll('tbody')[0].rows[index].cells[19].style.backgroundColor = "yellow"
        }
          
      }
  }, 1000);

  }

  ngOnInit(): void {
    this.get();
    this.services.formModelSearch.get('search').valueChanges.pipe(debounceTime(300)).subscribe(data =>{
      this.filtro_valor = data;
      this.PintarGrilla(this.p);
    });
  }

  ActiveNewFormDocuments(){
  this.CloseList = false;
  this.ActiveNewFormVehicleDocuments = true;
  this.user = {
    active : "2"
  }
  }

  update(dataItem){
    this.user = {
        dataItem,
        active : "1"
    } 
    this.CloseList = false;
    this.ActiveNewFormVehicleDocuments = true;
  }

  delete(item){
    if(confirm("Estas seguro de eliminarlo")){
      this.service.deleteVehicleDocuments(item.pKid).subscribe(data =>{
        this.toastr.success("Se elimino con exito");
        this.get();
      })
    }
  }
}
