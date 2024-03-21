import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../shared/service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(public service:ServiceService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(){  
    this.service.PostCorreoContacto().subscribe(
      (res:any) =>{        
        this.toastr.success('Se envio el mensaje con el mensaje');
      },
      err => {console.log(err);  if(err.status == 0){this.toastr.error("La contraseña debe contener numeros y letras") }  });
    }

    ToHome(){
     document.getElementById('homeContacto').scrollIntoView();
    }
 
    Quienessomos(){
      document.getElementById('Quienessomos').scrollIntoView();
    }

    Servicios(){
      document.getElementById('Servicios').scrollIntoView();
    }

    Clientes(){
       document.getElementById('Clientes').scrollIntoView();
    }
         
    Contactos(){
      document.getElementById('Contactos').scrollIntoView();
    }     
         

}
