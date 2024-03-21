import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-form-list-check',
  templateUrl: './form-list-check.component.html',
  styleUrls: ['./form-list-check.component.css']
})
export class FormListCheckComponent implements OnInit {

  DetailsDocumentsVehicle:string = "0";
  CloseForm:boolean = true;
 // ActiveListEmployee:boolean = false;
  @Input() 
  user:any;
  userDetails;
  vehicleDetails;
  titulo:string;
  ActiveUpdate:boolean;
  ActiveGuard:boolean;
  ActiveListVehicleDocuments:boolean = false;
  ActiveListDriverDocuments:boolean = false;
  ActiveListCheck:boolean = false;
  listcheck;
  filterPost = '';
  filtro_valor = '';
  date;

  constructor(public service:ServiceService,private toastr:ToastrService,private fb:FormBuilder,public services:ServiceService) { }

  loadUpdate(){
    if(this.user.active == "0"){
      //actualizar
      this.titulo = "Actualizar";
      this.ActiveUpdate = true;
    //  this.ActiveListVehicleDocuments = true;
    //  this.ActiveListDriverDocuments = true;

      this.service.getListConductor().subscribe(
       
        res => {
          this.userDetails = res;
        }, 
        err =>{
         console.log(err);
        },
      );
  
      this.service.getListVehicle().subscribe(
         
        res => {
          this.vehicleDetails = res;
        }, 
        err =>{
         console.log(err);
        },
      );
        var vencimientoExtintor = this.user.dataItem.vencimientoExtintor;
        var day = vencimientoExtintor.substring(0,2);
        var month = vencimientoExtintor.substring(3,5);
        var year = vencimientoExtintor.substring(6,10);
        var fechavencimientoExtintor = year + "-" + month + "-" + day
        this.service.formModelCheck.patchValue({
          FKUserdriver:this.user.dataItem.fkUserdriver,
          FKUserVehicle:this.user.dataItem.fkUserVehicle,
          KMActual:this.user.dataItem.kmActual,
          CambioAceite:this.user.dataItem.cambioAceite,
          IndicadorAceiteDeMotor:this.user.dataItem.indicadorAceiteDeMotor,
          NivelDeDombustible:this.user.dataItem.nivelDeDombustible,
          Pito:this.user.dataItem.pito,
          IndicadorBateria:this.user.dataItem.indicadorBateria,
          FrenoDeEmergencia:this.user.dataItem.frenoDeEmergencia,
          CojineriaySillas:this.user.dataItem.cojineriaySillas,
          Limpiabrisas:this.user.dataItem.limpiabrisas,
          LucesInternas:this.user.dataItem.lucesInternas,
          TableroVelocimetroInstrumentos:this.user.dataItem.tableroVelocimetroInstrumentos,
          AceiteMotor:this.user.dataItem.aceiteMotor,
          AceiteHidraulicoDireccion:this.user.dataItem.aceiteHidraulicoDireccion,
          LiquidoRefrigerante:this.user.dataItem.liquidoRefrigerante,
          LiquidoDeFrenos:this.user.dataItem.liquidoDeFrenos,
          TapaDeCombustible:this.user.dataItem.tapaDeCombustible,
          TensionDeCorreas:this.user.dataItem.tensionDeCorreas,
          VidriosyEspejos:this.user.dataItem.vidriosyEspejos,
          LucesAltasyBajas:this.user.dataItem.lucesAltasyBajas,
          LucesDireccionales:this.user.dataItem.lucesDireccionales,
          PlacasyLogos:this.user.dataItem.placasyLogos,
          Llantas:this.user.dataItem.llantas,
          DispositivoDeVelocidad:this.user.dataItem.dispositivoDeVelocidad,
          CinturonesDeSeguridad:this.user.dataItem.cinturonesDeSeguridad,
          Botiquin:this.user.dataItem.botiquin,
          Extintor:this.user.dataItem.extintor,
          EquipoDeCarretera:this.user.dataItem.equipoDeCarretera,
          LlantaDeRepuesto:this.user.dataItem.llantaDeRepuesto,
          Carpa:this.user.dataItem.carpa,
          VencimientoExtintor:fechavencimientoExtintor,
          Observacion:this.user.dataItem.observacion
      });

        setTimeout(function(){ 
        var FKUserVehicle = <HTMLSelectElement> document.getElementById("FKUserVehicle");
        var btnActualizarCheck = <HTMLButtonElement> document.getElementById("btnActualizarCheck");
        btnActualizarCheck.disabled = false;
        FKUserVehicle.disabled = true;
        }, 120);

    } else if(this.user.active == "1"){
     //Guardar
     this.ActiveGuard = true;
     this.titulo = "Registrar";
     this.ActiveListVehicleDocuments = true;
    // this.ActiveListDriverDocuments = true;

     this.service.getListConductor().subscribe(
       
      res => {
        this.userDetails = res;
        
        this.service.formModelCheck.reset();

     this.service.formModelCheck.patchValue({
        FKUserVehicle : this.user.data.id,
        FKUserdriver : this.userDetails[0].id,
        Llantas : "Malo",
        IndicadorAceiteDeMotor :"Malo",
        NivelDeDombustible :"Malo",
        Pito :"Malo",
        IndicadorBateria :"Malo",
        FrenoDeEmergencia :"Malo",
        CojineriaySillas :"Malo",
        Limpiabrisas :"Malo",
        LucesInternas :"Malo",
        TableroVelocimetroInstrumentos :"Malo",
        AceiteMotor :"Malo",
        AceiteHidraulicoDireccion :"Malo",
        LiquidoRefrigerante :"Malo",
        LiquidoDeFrenos :"Malo",
        TapaDeCombustible :"Malo",
        TensionDeCorreas :"Malo",
        VidriosyEspejos :"Malo",
        LucesAltasyBajas :"Malo",
        LucesDireccionales :"Malo",
        PlacasyLogos :"Malo",
        DispositivoDeVelocidad :"Malo",
        CinturonesDeSeguridad :"Malo",
        Botiquin :"Malo",
        Extintor :"Malo",
        EquipoDeCarretera :"Malo",
        LlantaDeRepuesto :"Malo",
        Carpa :"Malo"
        });
      }, 
      err =>{
       console.log(err);
      },
    );

    this.service.getListVehicle().subscribe(
       
      res => {
        this.vehicleDetails = res;
      }, 
      err =>{
       console.log(err);
      },
    );
    
      setTimeout(function(){ 
        var btnGuardarCheck = <HTMLButtonElement> document.getElementById("btnGuardarCheck");
        var FKUserVehicle = <HTMLSelectElement> document.getElementById("FKUserVehicle");
        FKUserVehicle.disabled = true;
        btnGuardarCheck.disabled = false;
       }, 120);
      
    }

    if (this.user.DetailsDocuments == "3"){
      sessionStorage.setItem("DetailsDocumentsVehicle","1"); 
      sessionStorage.setItem("DetailsDocumentsDrivers","1");
      sessionStorage.setItem("DetailDocumentsVehicleUsuario",this.user.dataItem.fkUserVehicle);
      sessionStorage.setItem("DetailDocumentsDriversUsuario",this.user.dataItem.fkUserdriver);
    }
  }


 ngOnInit(): void {

  this.loadUpdate();

    this.services.formModelCheck.get('FKUserdriver').valueChanges.pipe(debounceTime(300)).subscribe(data =>{

      //Buscar como organizar esto
     this.service.getListConductor().subscribe(
       
      res => {
        this.ActiveListDriverDocuments = false;
      }, 
      err =>{
       console.log(err);
      },
    );


    setTimeout(()=>{      
        
      this.service.getListConductor().subscribe(
       
        res => {
          if (this.user.active == "1"){
            this.ActiveListDriverDocuments = true;
          }
          
        }, 
        err =>{
         console.log(err);
        },
      );

 }, 3000);
      
      
   });
 }

  onSubmit(){  
    this.service.RegisterListCheck().subscribe(
      
      (res:any) =>{        
        if(res == "Se guardo con exito"){
          this.toastr.success('Se guardo con exito');
          this.service.formModelCheck.reset();
          this.service.formModelCheck.patchValue({
            FKUserVehicle : this.user.data.id,
            FKUserdriver : this.userDetails[0].id,
            Llantas : "Malo",
            IndicadorAceiteDeMotor :"Malo",
            NivelDeDombustible :"Malo",
            Pito :"Malo",
            IndicadorBateria :"Malo",
            FrenoDeEmergencia :"Malo",
            CojineriaySillas :"Malo",
            Limpiabrisas :"Malo",
            LucesInternas :"Malo",
            TableroVelocimetroInstrumentos :"Malo",
            AceiteMotor :"Malo",
            AceiteHidraulicoDireccion :"Malo",
            LiquidoRefrigerante :"Malo",
            LiquidoDeFrenos :"Malo",
            TapaDeCombustible :"Malo",
            TensionDeCorreas :"Malo",
            VidriosyEspejos :"Malo",
            LucesAltasyBajas :"Malo",
            LucesDireccionales :"Malo",
            PlacasyLogos :"Malo",
            DispositivoDeVelocidad :"Malo",
            CinturonesDeSeguridad :"Malo",
            Botiquin :"Malo",
            Extintor :"Malo",
            EquipoDeCarretera :"Malo",
            LlantaDeRepuesto :"Malo",
            Carpa :"Malo",
          })
        } else if(res == "No se guardo"){
          this.toastr.error('Se guardo con exito');
        }
      },
      err => {console.log(err);});
}

    ReturnListUpdate(){
      this.CloseForm = false;
      this.ActiveListCheck = true;
      this.ActiveListVehicleDocuments = false;
      this.ActiveListDriverDocuments = false;
    }

    update(){
      var val = {
        PKid : this.user.dataItem.pKid,
        FKUserVehicle :  this.service.formModelCheck.value.FKUserVehicle,
        FKUserdriver :this.service.formModelCheck.value.FKUserdriver,
        KMActual :this.service.formModelCheck.value.KMActual,
        CambioAceite :this.service.formModelCheck.value.CambioAceite,
        IndicadorAceiteDeMotor :this.service.formModelCheck.value.IndicadorAceiteDeMotor,
        NivelDeDombustible :this.service.formModelCheck.value.NivelDeDombustible,
        Pito :this.service.formModelCheck.value.Pito,
        IndicadorBateria :this.service.formModelCheck.value.IndicadorBateria,
        FrenoDeEmergencia :this.service.formModelCheck.value.FrenoDeEmergencia,
        CojineriaySillas :this.service.formModelCheck.value.CojineriaySillas,
        Limpiabrisas :this.service.formModelCheck.value.Limpiabrisas,
        LucesInternas :this.service.formModelCheck.value.LucesInternas,
        TableroVelocimetroInstrumentos :this.service.formModelCheck.value.TableroVelocimetroInstrumentos,
        AceiteMotor :this.service.formModelCheck.value.AceiteMotor,
        AceiteHidraulicoDireccion :this.service.formModelCheck.value.AceiteHidraulicoDireccion,
        LiquidoRefrigerante :this.service.formModelCheck.value.LiquidoRefrigerante,
        LiquidoDeFrenos :this.service.formModelCheck.value.LiquidoDeFrenos,
        TapaDeCombustible :this.service.formModelCheck.value.TapaDeCombustible,
        TensionDeCorreas :this.service.formModelCheck.value.TensionDeCorreas,
        VidriosyEspejos :this.service.formModelCheck.value.VidriosyEspejos,
        LucesAltasyBajas :this.service.formModelCheck.value.LucesAltasyBajas,
        LucesDireccionales :this.service.formModelCheck.value.LucesDireccionales,
        PlacasyLogos :this.service.formModelCheck.value.PlacasyLogos,
        Llantas :this.service.formModelCheck.value.Llantas,
        DispositivoDeVelocidad :this.service.formModelCheck.value.DispositivoDeVelocidad,
        CinturonesDeSeguridad :this.service.formModelCheck.value.CinturonesDeSeguridad,
        Botiquin :this.service.formModelCheck.value.Botiquin,
        Extintor :this.service.formModelCheck.value.Extintor,
        EquipoDeCarretera :this.service.formModelCheck.value.EquipoDeCarretera,
        LlantaDeRepuesto :this.service.formModelCheck.value.LlantaDeRepuesto,
        Carpa :this.service.formModelCheck.value.Carpa,
        VencimientoExtintor :this.service.formModelCheck.value.VencimientoExtintor,
        Observacion : this.service.formModelCheck.value.Observacion
      };
        this.service.updateListCheck(val).subscribe(res =>{
        this.toastr.success("se actualizo con exito");
      },
      err => {this.toastr.error("Error al actualizar"),console.log(err);});
    }
  
}
