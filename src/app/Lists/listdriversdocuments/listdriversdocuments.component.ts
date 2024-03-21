import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-listdriversdocuments',
  templateUrl: './listdriversdocuments.component.html',
  styleUrls: ['./listdriversdocuments.component.css']
})
export class ListdriversdocumentsComponent implements OnInit {

  constructor(private router: Router,private service:ServiceService,private toastr:ToastrService,public services:ServiceService) { }

  CloseList:boolean = true;
  ActiveNewForm:boolean;
  userDetails;
  Details;
  active:any;
  user:any;
  ActiveListCheck:boolean;
  ActiveListCheckEdit:boolean;
  DetailDocument = sessionStorage.getItem('DetailsDocumentsDrivers'); 
  DetailDocumentsDribersUsuario = sessionStorage.getItem('DetailDocumentsDriversUsuario');
  p:number = 1;
  filtro_valor = '';
  listcheck;

  get(){
    if(this.DetailDocument == "0"){
      //Normal
      this.ActiveListCheck = true ;
      this.ActiveListCheckEdit = true;
      this.service.getDriversDocuments().subscribe(
      res => {
       
       this.userDetails = res;
       this.PintarGrilla(this.p);

      }, 
      err =>{
       console.log(err);
      },
    ); 

  } else if (this.DetailDocument == "1"){
   //editar del check 
   this.ActiveListCheck = false ;
   this.ActiveListCheckEdit = true;
   this.service.getDriversDocuments().subscribe(
    res => {
      this.Details = res;
      
      let detail = this.Details.find(element => element.driversPKid === this.DetailDocumentsDribersUsuario)
      this.userDetails = [detail];
    }, 
    err =>{
     console.log(err);
    },
  );
    } else if (this.DetailDocument == "2"){
//Formulario de la lista de chequeo pero del usuario vehiculo
   this.ActiveListCheck = false ;
   this.ActiveListCheckEdit = true;
   this.service.getDriversDocuments().subscribe(

    res => {

     this.listcheck = res;
     var datas = this.services.formModelCheck.value.FKUserdriver;
     var result = this.listcheck.filter(word => word.driversPKid == datas);
     this.userDetails = [result[0]];
     this.PintarGrilla(this.p)

    }, 
    err =>{
     console.log(err);
    },
  );
 }
 
}

/* 
   this.service.getDriversDocuments().subscribe(
      res => {
        this.userDetails = res;
        
        setTimeout(function(){ 
          for (let index = 0; index < document.querySelectorAll('tbody')[1].rows.length; index++) {
            this.fechainiLicencia = new Date(document.querySelectorAll('tbody')[1].rows[index].cells[7].innerText);
            this.fechafinLicencia = new Date(document.querySelectorAll('tbody')[1].rows[index].cells[8].innerText);
            var diasdif= this.fechafinLicencia.getTime()-this.fechainiLicencia.getTime();
            var contdias = Math.round(diasdif/(1000*60*60*24));
            var diasNotificarLicencia = contdias - 8 ;
            var notificar = new Date(this.fechainiLicencia);
            notificar.setDate(notificar.getDate()+diasNotificarLicencia)
            this.date = new Date();
            if (this.date >= notificar){
              document.querySelectorAll('tbody')[1].rows[index].cells[8].style.backgroundColor = "yellow"
              }
          }
      }, 1000);
        
      }, 
      err =>{
       console.log(err);
      },
    ); 
*/
    

  PintarGrilla(p){

    setTimeout(function(){ 
      
      for (let index = 0; index < document.querySelectorAll('tbody')[0].rows.length; index++) {
        this.date = new Date();

        this.iniciolicencia = document.querySelectorAll('tbody')[0].rows[index].cells[7].innerText;
        this.vencimientolicencia = document.querySelectorAll('tbody')[0].rows[index].cells[8].innerText;
        this.fechainiLicencia = new Date(this.iniciolicencia.substring(3,5) + "-" + this.iniciolicencia.substring(0,2) + "-" + this.iniciolicencia.substring(6,10));
        this.fechafinLicencia = new Date(this.vencimientolicencia.substring(3,5) + "-" + this.vencimientolicencia.substring(0,2) + "-" + this.vencimientolicencia.substring(6,10));
        var diasdif= this.fechafinLicencia.getTime()-this.fechainiLicencia.getTime();
        var contdias = Math.round(diasdif/(1000*60*60*24));
        var diasNotificarLicencia = contdias - 8 ;
        var notificar = new Date(this.fechainiLicencia);
        notificar.setDate(notificar.getDate()+diasNotificarLicencia)
 
        if (this.date >= notificar){
          document.querySelectorAll('tbody')[0].rows[index].cells[8].style.backgroundColor = "yellow"
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
    this.ActiveNewForm = true;
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
      this.ActiveNewForm = true;
    }
  
    delete(item){
      if(confirm("Estas seguro de eliminarlo")){
        this.service.deleteDriversDocuments(item.pKid).subscribe(data =>{
          this.toastr.success("Se elimino con exito");
          this.get();
        })
      }
    }

}
