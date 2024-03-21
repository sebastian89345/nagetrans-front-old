import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
const EXCEL_TYPE = 'application/vnd.openxmlfornats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx'


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

 // readonly ApiUrl = 'http://sebastian893-001-site1.ftempurl.com/api/';
 //  readonly ApiUrl = 'http://localhost:56179/api/';
    readonly ApiUrl = 'https://www.nagetranscore.com/api/';

  constructor(private fb:FormBuilder,public http:HttpClient) { }

  formModel = this.fb.group({
    UserName :['', Validators.required],
    FKBrand :['', Validators.required],
    FKClass :['', Validators.required],
    FKModel :['', Validators.required],
    Email :['',Validators.email],
    Names :['',Validators.required],
    Surnames :['',Validators.required],
    PhoneNumber :['',Validators.required],
    Passwords : this.fb.group({
    Password:['',[Validators.required,Validators.minLength(4)]],
    ConfirmPassword:['', Validators.required]
    },{validator: this.comparePasswords})
  });

  //admin
  formModelAdmin = this.fb.group({
    UserName :['', Validators.required],
    Email :['',Validators.email],
    Names :['',Validators.required],
    Surnames :['',Validators.required],
    PhoneNumber :['',Validators.required],
    Passwords : this.fb.group({
    Password:['',[Validators.required,Validators.minLength(4)]],
    ConfirmPassword:['', Validators.required]
    },{validator: this.comparePasswords})
  });

  //vehiculo
  formModelVehicle = this.fb.group({
    UserName :['', Validators.required],
    FKBrand :[''],
    FKClass :[''],
    FKModel :[''],
    Passwords : this.fb.group({
    Password:['',[Validators.required,Validators.minLength(4)]],
    ConfirmPassword:['', Validators.required]
    },{validator: this.comparePasswords})
  });

  //trabajador
  formModelDrivers = this.fb.group({
    UserName :['', Validators.required],
    Email :['',Validators.email],
    Names :['',Validators.required],
    Surnames :['',Validators.required],
    PhoneNumber :['',Validators.required],
    Passwords : this.fb.group({
    Password:['',[Validators.required,Validators.minLength(4)]],
    ConfirmPassword:['', Validators.required]
    },{validator: this.comparePasswords})
  });

  formModelCheck = this.fb.group({
    FKUserVehicle :['', Validators.required],
    FKUserdriver :['',Validators.required],
    KMActual :['', Validators.required],
    CambioAceite :['', Validators.required],
    IndicadorAceiteDeMotor :['', Validators.required],
    NivelDeDombustible :['', Validators.required],
    Pito :['', Validators.required],
    IndicadorBateria :['', Validators.required],
    FrenoDeEmergencia :['', Validators.required],
    CojineriaySillas :['', Validators.required],
    Limpiabrisas :['', Validators.required],
    LucesInternas :['', Validators.required],
    TableroVelocimetroInstrumentos :['', Validators.required],
    AceiteMotor :['', Validators.required],
    AceiteHidraulicoDireccion :['', Validators.required],
    LiquidoRefrigerante :['', Validators.required],
    LiquidoDeFrenos :['', Validators.required],
    TapaDeCombustible :['', Validators.required],
    TensionDeCorreas :['', Validators.required],
    VidriosyEspejos :['', Validators.required],
    LucesAltasyBajas :['', Validators.required],
    LucesDireccionales :['', Validators.required],
    PlacasyLogos :['', Validators.required],
    Llantas :['', Validators.required],
    DispositivoDeVelocidad :['', Validators.required],
    CinturonesDeSeguridad :['', Validators.required],
    Botiquin :['', Validators.required],
    KitParaDerrames :['', Validators.required],
    Carpa :['', Validators.required],
    Extintor :['', Validators.required],
    EquipoDeCarretera :['', Validators.required],
    LlantaDeRepuesto :['', Validators.required],
    VencimientoExtintor :['', Validators.required],
    Observacion : ['', Validators.required]
  });

  formModelVehicleDocuments = this.fb.group({
    PKid : [''],
    FKVehiculo :['', Validators.required],
    Soat :['', Validators.required],
    Tecnicomecanica :['',Validators.required],
    Tarjetadeoperaciones :['', Validators.required],
    TarjetadePropiedades :['', Validators.required],
    Segurorccece :['', Validators.required],
    Extracto :['', Validators.required],
    FechaInicioSoat :[''],
    FechaInicioTecnicomecanica :[''],
    FechaInicioTarjetadeoperaciones :[''],
    FechaInicioTarjetadePropiedades :[''],
    FechaInicioSegurorccece :[''],
    FechaInicioExtracto :[''],
    FechaVencientoSoat :[''],
    FechaVencientoTecnicomecanica :[''],
    FechaVencientoTarjetadeoperaciones :[''],
    FechaVencientoTarjetadePropiedades :[''],
    FechaVencientoSegurorccece :[''],
    FechaVencientoExtracto :[''],
    Notificaciones :[''],
    RevisionPreventiva :['', Validators.required],
    FechaInicioRevisionPreventiva :[''],
    FechaVencimientoRevisionPreventiva :['']
  });

  formModelDriversDocuments = this.fb.group({
    PKid :[''],
    FKDrivers :['', Validators.required],
    NumeroDeLicencia :['', Validators.required],
    VenciminentoLicencia :['', Validators.required],
    InicioLicencia :['', Validators.required],
    FKArl :['', Validators.required],
    FKEps :['', Validators.required],
    FKAfp :['', Validators.required],
    FKCajaDeCompensacion :['', Validators.required]
  });

  //Generar codigo
  formModelGenerateCodigo = this.fb.group({
    UserName :['', Validators.required]
  });

  //Verificar codigo
  formModelVerificarCodigo = this.fb.group({
    Codigo :['', Validators.required]
  });

  //Enviar correo
  formModelContacto = this.fb.group({
    Names :['', Validators.required],
    PhoneNumber :['', Validators.required],
    Email :['', Validators.required],
    Body :['', Validators.required]
  });

  //Cambiar Contraseña
  formModelChangePassword = this.fb.group({
   Passwords : this.fb.group({
    Password:['',[Validators.required,Validators.minLength(4)]],
    ConfirmPassword:['', Validators.required]
    },{validator: this.comparePasswords})
  });

  //Buscar para todos 
  formModelSearch = this.fb.group({
    search :['']
  });

  comparePasswords(fb:FormGroup){
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
  
      if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
        if(fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({passwordMismatch:true});
          else 
          confirmPswrdCtrl.setErrors(null);
      }
    }

  login(formData){
    return this.http.post(this.ApiUrl+'ApplicationAdmin/LoginAdmin',formData);
   }
   getUserProfile(){
    // var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
    // return this.http.get(this.ApiUrl+'ApplicationAdmin/GetUserProfileAdmin',{headers : tokenHeader});
    return this.http.get(this.ApiUrl+'ApplicationAdmin/GetUserProfile');
   }

   roleMatch(allowedRoles): boolean{
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if(userRole == element){
        isMatch = true;
        return false;
        }
    });
    return isMatch;
 }

   RegisterAdmin(){
    var body = {
      UserName: this.formModelAdmin.value.UserName,
      Email: this.formModelAdmin.value.Email,
      Names: this.formModelAdmin.value.Names,
      Surnames: this.formModelAdmin.value.Surnames,
      PhoneNumber: this.formModelAdmin.value.PhoneNumber,
      Password: this.formModelAdmin.value.Passwords.Password
    };
    return this.http.post(this.ApiUrl+'ApplicationAdmin/RegisterAdmin',body);
  }

   getListAdmin(){
   // var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
   // return this.http.get(this.ApiUrl+'ApplicationAdmin/ForAdmin',{headers : tokenHeader});
  return this.http.get(this.ApiUrl+'ApplicationAdmin/ForAdmin');
  }

  

  updateAdmin(val:any){
    return this.http.put(this.ApiUrl+'ApplicationAdmin/UpdateAdmin',val);
  }

  deleteAdmin(val:any){
    return this.http.delete(this.ApiUrl+'ApplicationAdmin/'+val);
  }

  //Employee
  RegisterEmployee(){
    var body = {
      UserName: this.formModelDrivers.value.UserName,
      Email: this.formModelDrivers.value.Email,
      Names: this.formModelDrivers.value.Names,
      Surnames: this.formModelDrivers.value.Surnames,
      PhoneNumber: this.formModelDrivers.value.PhoneNumber,
      Password: this.formModelDrivers.value.Passwords.Password
    };
    return this.http.post(this.ApiUrl+'ApplicationEmployee/RegisterEmployee',body);
  }

  getListConductor(){
    // var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
    // return this.http.get(this.ApiUrl+'ApplicationAdmin/ForAdmin',{headers : tokenHeader});
   // return this.http.get(this.ApiUrl+'/UserProfile');
   return this.http.get(this.ApiUrl+'ApplicationEmployee/ForEmployee');
   }

   updateEmployee(val:any){
    return this.http.put(this.ApiUrl+'ApplicationEmployee/UpdateEmployee',val);
  }

  deleteEmployee(val:any){
    return this.http.delete(this.ApiUrl+'ApplicationEmployee/'+val);
  }

  //Vehiculo
  RegisterVehicle(){
    var body = {
      UserName: this.formModelVehicle.value.UserName,
      FKBrand : this.formModelVehicle.value.FKBrand,
      FKClass : this.formModelVehicle.value.FKClass,
      FKModel : this.formModelVehicle.value.FKModel,
      Password: this.formModelVehicle.value.Passwords.Password
    };
    return this.http.post(this.ApiUrl+'ApplicationVehicle/RegisterVehicle',body);
  }

  getListVehicle(){
    // var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
    // return this.http.get(this.ApiUrl+'ApplicationAdmin/ForAdmin',{headers : tokenHeader});
   // return this.http.get(this.ApiUrl+'/UserProfile');
   return this.http.get(this.ApiUrl+'ApplicationVehicle/ForVehicle');
  }
  getListBrand(){
   return this.http.get(this.ApiUrl+'ApplicationVehicle/Brand');
  }
  getListClass(){
   return this.http.get(this.ApiUrl+'ApplicationVehicle/Class');
  }
  getListModel(){
   return this.http.get(this.ApiUrl+'ApplicationVehicle/Model');
  }
  updateVehicle(val:any){
    return this.http.put(this.ApiUrl+'ApplicationVehicle/UpdateVehicle',val);
  }
  deleteVehicle(val:any){
    return this.http.delete(this.ApiUrl+'ApplicationVehicle/'+val);
  }

  //ListCheck
  getAllListCheckModel(){
    return this.http.get(this.ApiUrl+'ApplicationDriversDailyLog/GetAllForListCheck');
   }

  RegisterListCheck(){
      var hoy = new Date();
      var fecha = ( hoy.getMonth() + 1 ) + '-' + hoy.getDate() + '-' + hoy.getFullYear();
      var hora =  hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
      var fechayhora = fecha + ' ' + hora ;
      var body = {
      FKUserVehicle : this.formModelCheck.value.FKUserVehicle,
      FKUserdriver : this.formModelCheck.value.FKUserdriver,
      KMActual:this.formModelCheck.value.KMActual,
      CambioAceite:this.formModelCheck.value.CambioAceite,
      IndicadorAceiteDeMotor :this.formModelCheck.value.IndicadorAceiteDeMotor,
      NivelDeDombustible :this.formModelCheck.value.NivelDeDombustible,
      Pito :this.formModelCheck.value.Pito,
      IndicadorBateria :this.formModelCheck.value.IndicadorBateria,
      FrenoDeEmergencia :this.formModelCheck.value.FrenoDeEmergencia,
      CojineriaySillas :this.formModelCheck.value.CojineriaySillas,
      Limpiabrisas :this.formModelCheck.value.Limpiabrisas,
      LucesInternas :this.formModelCheck.value.LucesInternas,
      TableroVelocimetroInstrumentos :this.formModelCheck.value.TableroVelocimetroInstrumentos,
      AceiteMotor :this.formModelCheck.value.AceiteMotor,
      AceiteHidraulicoDireccion :this.formModelCheck.value.AceiteHidraulicoDireccion,
      LiquidoRefrigerante :this.formModelCheck.value.LiquidoRefrigerante,
      LiquidoDeFrenos :this.formModelCheck.value.LiquidoDeFrenos,
      TapaDeCombustible :this.formModelCheck.value.TapaDeCombustible,
      TensionDeCorreas :this.formModelCheck.value.TensionDeCorreas,
      VidriosyEspejos :this.formModelCheck.value.VidriosyEspejos,
      LucesAltasyBajas :this.formModelCheck.value.LucesAltasyBajas,
      LucesDireccionales :this.formModelCheck.value.LucesDireccionales,
      PlacasyLogos :this.formModelCheck.value.PlacasyLogos,
      Llantas :this.formModelCheck.value.Llantas,
      DispositivoDeVelocidad :this.formModelCheck.value.DispositivoDeVelocidad,
      CinturonesDeSeguridad :this.formModelCheck.value.CinturonesDeSeguridad,
      Botiquin :this.formModelCheck.value.Botiquin,
      KitParaDerrames :this.formModelCheck.value.KitParaDerrames,
      Extintor :this.formModelCheck.value.Extintor,
      EquipoDeCarretera :this.formModelCheck.value.EquipoDeCarretera,
      LlantaDeRepuesto :this.formModelCheck.value.LlantaDeRepuesto,
      Carpa :this.formModelCheck.value.Carpa,
      VencimientoExtintor :this.formModelCheck.value.VencimientoExtintor,
      Observacion : this.formModelCheck.value.Observacion,
      Fecha: fechayhora
    };
    return this.http.post(this.ApiUrl+'ApplicationDriversDailyLog/RegisterListCheck',body);
  }
   updateListCheck(val:any){
     return this.http.put(this.ApiUrl+'ApplicationDriversDailyLog/UpdateListCheck',val);
   }
   deleteListCheck(val:any){
     return this.http.delete(this.ApiUrl+'ApplicationDriversDailyLog/'+val);
   }
  //VehicleDocuments
  getAllVehicleDocuments(){
    return this.http.get(this.ApiUrl+'ApplicationVehicleDocuments/ForDocumentVehicle');
   }
   PostVehicleDocuments(){
     var body = {
      FKVehiculo :this.formModelVehicleDocuments.value.FKVehiculo,
      Soat :this.formModelVehicleDocuments.value.Soat,
      Tecnicomecanica :this.formModelVehicleDocuments.value.Tecnicomecanica,
      Tarjetadeoperaciones :this.formModelVehicleDocuments.value.Tarjetadeoperaciones,
      TarjetadePropiedades :this.formModelVehicleDocuments.value.TarjetadePropiedades,
      Segurorccece :this.formModelVehicleDocuments.value.Segurorccece,
      Extracto :this.formModelVehicleDocuments.value.Extracto,
      FechaInicioSoat :this.formModelVehicleDocuments.value.FechaInicioSoat,
      FechaInicioTecnicomecanica :this.formModelVehicleDocuments.value.FechaInicioTecnicomecanica,
      FechaInicioTarjetadeoperaciones :this.formModelVehicleDocuments.value.FechaInicioTarjetadeoperaciones,
      FechaInicioTarjetadePropiedades :this.formModelVehicleDocuments.value.FechaInicioTarjetadePropiedades,
      FechaInicioSegurorccece :this.formModelVehicleDocuments.value.FechaInicioSegurorccece,
      FechaInicioExtracto :this.formModelVehicleDocuments.value.FechaInicioExtracto,
      FechaVencientoSoat :this.formModelVehicleDocuments.value.FechaVencientoSoat,
      FechaVencientoTecnicomecanica :this.formModelVehicleDocuments.value.FechaVencientoTecnicomecanica,
      FechaVencientoTarjetadeoperaciones :this.formModelVehicleDocuments.value.FechaVencientoTarjetadeoperaciones,
      FechaVencientoTarjetadePropiedades :this.formModelVehicleDocuments.value.FechaVencientoTarjetadePropiedades,
      FechaVencientoSegurorccece :this.formModelVehicleDocuments.value.FechaVencientoSegurorccece,
      FechaVencientoExtracto :this.formModelVehicleDocuments.value.FechaVencientoExtracto,
      RevisionPreventiva :this.formModelVehicleDocuments.value.RevisionPreventiva,
      FechaInicioRevisionPreventiva :this.formModelVehicleDocuments.value.FechaInicioRevisionPreventiva,
      FechaVencimientoRevisionPreventiva :this.formModelVehicleDocuments.value.FechaVencimientoRevisionPreventiva
    };
    return this.http.post(this.ApiUrl+'ApplicationVehicleDocuments/RegisterDocumentVehicle',body);
  }
  updateVehicleDocuments(val:any){
    return this.http.put(this.ApiUrl+'ApplicationVehicleDocuments/UpdateDocumentVehicle',val);
  }
  deleteVehicleDocuments(val:any){
    return this.http.delete(this.ApiUrl+'ApplicationVehicleDocuments/'+val);
  }

  //DriversDocuments
  getListAfp(){
    return this.http.get(this.ApiUrl+'ApplicationDriversDocuments/GetAfp');
   }
  getListArl(){
    return this.http.get(this.ApiUrl+'ApplicationDriversDocuments/getArl');
   }
  getListEps(){
    return this.http.get(this.ApiUrl+'ApplicationDriversDocuments/getEps');
   }
  getListCajaDeCompensacion(){
    return this.http.get(this.ApiUrl+'ApplicationDriversDocuments/getCajaDeCompensacion');
   }
  getDriversDocuments(){
    return this.http.get(this.ApiUrl+'ApplicationDriversDocuments/GetDriversDocuments');
   }

   PostDriversDocuments(){
    var body = {
    FKDrivers :this.formModelDriversDocuments.value.FKDrivers,
    NumeroDeLicencia :this.formModelDriversDocuments.value.NumeroDeLicencia,
    VenciminentoLicencia :this.formModelDriversDocuments.value.VenciminentoLicencia,
    InicioLicencia :this.formModelDriversDocuments.value.InicioLicencia,
    FKArl :this.formModelDriversDocuments.value.FKArl,
    FKEps :this.formModelDriversDocuments.value.FKEps,
    FKAfp :this.formModelDriversDocuments.value.FKAfp,
    FKCajaDeCompensacion :this.formModelDriversDocuments.value.FKCajaDeCompensacion
    };
    return this.http.post(this.ApiUrl+'ApplicationDriversDocuments/RegisterDriversDocuments',body);
  }
  updateDriversDocuments(val:any){
    return this.http.put(this.ApiUrl+'ApplicationDriversDocuments/UpdateDriversDocuments',val);
  }
  deleteDriversDocuments(val:any){
    return this.http.delete(this.ApiUrl+'ApplicationDriversDocuments/'+val);
  }

  //Post generar codigo
  PostGenerarCodigo(){
    var body = {
      UserName: this.formModelGenerateCodigo.value.UserName
    };
    return this.http.post(this.ApiUrl+'ApplicationAdmin/GeneratePassword',body);
  }

  //Post verificar codigo
  PostVerificarCodigo(body:any){
    return this.http.post(this.ApiUrl+'ApplicationAdmin/VerificarCodigo',body);
  }

  //update Change password
  UpdateChangePassword(body:any){
    return this.http.put(this.ApiUrl+'ApplicationAdmin/UpdatePassword',body);
    }

  exportToExcel(json:any,excelFineName:string):void {
  // const Worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  var prb =  XLSX.utils;
  var prbb = XLSX;
  var wscols = [{wpx: 200}];
  const Worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  Worksheet['!cols'] = wscols;
  Worksheet['!cols'][1] = {wpx: 200}  

   const Worbook : XLSX.WorkBook = {
     Sheets : { 'data' : Worksheet },
     SheetNames:['data']
   };
   

  const excelBuffer : any = XLSX.write(Worbook, { bookType: 'xlsx', type: 'array'});
  const Cells : any = XLSX.write(Worbook, { bookType: 'xlsx', type: 'array'});
  //Call method buffer and fileName
  this.saveAsExcel(excelBuffer , excelFineName)
  }

  private saveAsExcel(buffer: any, fileName: string): void{
   const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXT);
  }

  PostCorreoContacto(){
    var body = {
      Names: this.formModelContacto.value.Names,
      PhoneNumber :this.formModelContacto.value.PhoneNumber,
      Email :this.formModelContacto.value.Email,
      Body :this.formModelContacto.value.Body
    };
    return this.http.post(this.ApiUrl+'ApplicationAdmin/Contacto',body);
  }


}



