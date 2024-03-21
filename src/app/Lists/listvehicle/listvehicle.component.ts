import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-listvehicle',
  templateUrl: './listvehicle.component.html',
  styleUrls: ['./listvehicle.component.css']
})
export class ListvehicleComponent implements OnInit {

  CloseList:boolean = true;
  ActiveNewVehicle:boolean;
  userDetails;
  user:any;
  p:number = 1;
  filtro_valor = '';

  constructor(private router: Router,private service:ServiceService,private toastr:ToastrService,public services:ServiceService) { }


  getUser(){
    this.service.getListVehicle().subscribe(
      res => {
        this.userDetails = res;
      }, 
      err =>{
       console.log(err);
      },
    );
  }

  ngOnInit(): void {
    this.getUser();
    this.services.formModelSearch.get('search').valueChanges.pipe(debounceTime(300)).subscribe(data =>{
      this.filtro_valor = data;
    });
  }

  ActiveNewFormVehicle(){
    this.CloseList = false;
    this.ActiveNewVehicle = true;
    this.user = {
      active : "0"
    }
   }

   update(dataItem){
    this.user = {
        dataItem,
        active : "1"
    } 
    this.CloseList = false;
    this.ActiveNewVehicle = true;
  }

  delete(item){
    if(confirm("Estas seguro de eliminarlo")){
      debugger;
      this.service.deleteVehicle(item.id).subscribe(data =>{
        this.toastr.success("Se elimino con exito");
        this.getUser();
      })
    }
  }

  

}
