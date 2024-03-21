import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-listconductor',
  templateUrl: './listconductor.component.html',
  styleUrls: ['./listconductor.component.css']
})
export class ListconductorComponent implements OnInit {

  CloseList:boolean = true;
  ActiveNewEmployee:boolean;
  userDetails;
  user:any;
  p:number = 1;
  filtro_valor = '';

  constructor(private router: Router,private service:ServiceService,private toastr:ToastrService,public services:ServiceService) { }

  getUser(){
    this.service.getListConductor().subscribe(
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

  ActiveNewFormConductor(){
    this.CloseList = false;
    this.ActiveNewEmployee = true;
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
    this.ActiveNewEmployee = true;
  }

  delete(item){
    if(confirm("Estas seguro de eliminarlo")){
      debugger;
      this.service.deleteEmployee(item.id).subscribe(data =>{
        this.toastr.success("Se elimino con exito");
        this.getUser();
      })
    }
  }

}
