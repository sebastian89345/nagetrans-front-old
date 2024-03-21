import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../shared/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
//listas de los formularios
  ActiveListAdmin:boolean;
  ActiveListConductor:boolean;
  ActiveListVehicle:boolean;
  ActiveListCheck:boolean;
  ActiveFormListCheck:boolean;
  ActiveListPapelesVehiculos:boolean;
  ActiveListPapelesConductor:boolean;
//esconder los componentes
  ActiveAdmin:boolean;
  ActiveConductores:boolean;
  ActiveVehiculos:boolean;
  ActiveListaChequeo:boolean;
  ActivePapelesConductor:boolean;
  ActivePapelesVehiculos:boolean;
  //donde cargo los gets
  userDetails;
  detail;
  DocumentVehicleDetail;
  activeformListCheck;
  Date = new Date();
  user:any;
  DosMesesSoatFullyer;
  DosMesesSoatDate;
  //Logo
  ActiveLogo:boolean = true;

  constructor(private router: Router,private service:ServiceService,private toastr:ToastrService) { }

  getUser(){
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
        var role = this.userDetails.role[0];
        if(role == "Admin"){
          this.ActiveAdmin = true;
          this.ActiveConductores = true;
          this.ActiveVehiculos = true;
          this.ActiveListaChequeo = true;
          this.ActivePapelesConductor = true;
          this.ActivePapelesVehiculos = true;
          this.user = {
            active : "1",
            data: this.userDetails
          }
        } else if(role == "Empleado"){
          this.ActiveAdmin = false;
          this.ActiveConductores = false;
          this.ActiveVehiculos = false;
          this.ActiveListaChequeo = false;
          this.ActivePapelesConductor = true;
          this.ActivePapelesVehiculos = false;
        } else if(role == "Vehiculo"){
          this.ActiveAdmin = false;
          this.ActiveConductores = false;
          this.ActiveVehiculos = false;
          this.ActiveListaChequeo = true;
          this.ActivePapelesConductor = false;
          this.ActivePapelesVehiculos = false;
          sessionStorage.setItem("DetailDocumentsVehicleUsuario",this.userDetails.id);
          this.user = {
            active : "1",
            data: this.userDetails
          }
        }
      }, 
      err =>{
       console.log(err);
       if (err.status == 401){
        this.toastr.error("Session caducada");
        localStorage.removeItem('token');
        this.router.navigate(['Login']);
       }
      },
    );
  }

  ngOnInit(): void {
    this.getUser();
  }

    ActiveListAdminMethod(){
    this.ActiveListAdmin = true;
    this.ActiveListConductor = false;
    this.ActiveListVehicle = false;
    this.ActiveListCheck = false
    this.ActiveListPapelesVehiculos = false;
    this.ActiveListPapelesConductor = false;
    this.ActiveLogo = false;
    }
    ActivelistConductorMethod(){
      this.ActiveListConductor = true;
      this.ActiveListAdmin = false;
      this.ActiveListVehicle = false;
      this.ActiveListCheck = false;
      this.ActiveListPapelesVehiculos = false;
      this.ActiveListPapelesConductor = false;
      this.ActiveLogo = false;
    }
    ActivelistVehiculoMethod(){
      this.ActiveListConductor = false;
      this.ActiveListAdmin = false;
      this.ActiveListVehicle = true;
      this.ActiveListCheck = false;
      this.ActiveListPapelesVehiculos = false;
      this.ActiveListPapelesConductor = false;
      this.ActiveLogo = false;
    }
    ActivelistCheckMethod(){
      var role = this.userDetails.role[0];
      this.ActiveListConductor = false;
      this.ActiveListAdmin = false;
      this.ActiveListVehicle = false;
      this.ActiveListPapelesVehiculos = false;
      this.ActiveListPapelesConductor = false;
      this.ActiveLogo = false;
      sessionStorage.setItem('DetailsDocumentsVehicle','1');
      sessionStorage.setItem('DetailsDocumentsDrivers','2'); 
      if(role == "Admin"){
        this.ActiveListCheck = true;
      } else if (role == "Vehiculo")
      {
         this.ActiveFormListCheck = true;
      }
    }
    ActivePapelesVehiculoMethod(){
      this.ActiveListConductor = false;
      this.ActiveListAdmin = false;
      this.ActiveListVehicle = false;
      this.ActiveListCheck = false;
      this.ActiveListPapelesVehiculos = true;
      this.ActiveListPapelesConductor = false;
      this.ActiveLogo = false;
      sessionStorage.setItem('DetailsDocumentsVehicle','0');
    }

    ActivePapelesConductorMethod(){
      this.ActiveListConductor = false;
      this.ActiveListAdmin = false;
      this.ActiveListVehicle = false;
      this.ActiveListCheck = false;
      this.ActiveListPapelesVehiculos = false;
      this.ActiveListPapelesConductor = true;
      this.ActiveLogo = false;
      sessionStorage.setItem("DetailsDocumentsDrivers","0");
    }

    onLogout(){
      localStorage.removeItem('token');
      this.router.navigate(['Login']);
     }

     CloseMenu(){
      var sidebarcontainer = <HTMLDivElement> document.getElementById("sidebar-container");
      var nav = <HTMLButtonElement> document.getElementById("nav");
      nav.style.cssText += ';display:block !important;'
      sidebarcontainer.style.cssText += ';display:none !important;'
     }

     ActiveMenu(){
      var sidebarcontainer = <HTMLDivElement> document.getElementById("sidebar-container");
      var nav = <HTMLButtonElement> document.getElementById("nav");
      nav.style.cssText += ';display:none !important;'
      sidebarcontainer.style.cssText += ';display:block !important;'
     }
}
