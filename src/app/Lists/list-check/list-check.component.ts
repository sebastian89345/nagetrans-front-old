import { Component, OnInit, ViewChild,AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/shared/service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {Listcheck} from '../../Model/listcheck'
import { Cell, Columns, Img, ITable, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { data } from 'jquery';

@Component({
  selector: 'app-list-check',
  templateUrl: './list-check.component.html',
  styleUrls: ['./list-check.component.css']
})
export class ListCheckComponent implements OnInit {
  cambioAceite: any;
  ProximocambioAceite: number;
  kmActual: any;
  Details;
  dataSources;
  p:number = 1;
  index:number=1; 
  listcheck:any;
  filtro_valor = '';

  constructor(private router: Router,private service:ServiceService,private toastr:ToastrService,public services:ServiceService) { }

  columnsToDisplay = ['userNameVehiculo','userNameConductor','kmActual','cambioAceite',
  'llantas','neumaticos','cinturonesDeSeguridad','puertas','asientos','espejosRetrovisores'
  ,'kitDeCarreteras','sistemaDeLuces','primerosAuxilios','llantasDeRepuesto',
  'parabrisas','vidrios','limpiaparabrisas','refrigeranteoAgua','aceiteDelMotor',
  'aceiteHidraulico','liquidoDeFrenos','bateria','fecha','observaciones','Actualizar',
  'Eliminar'];

  @ViewChild(MatPaginator) paginator : MatPaginator;
  CloseList:boolean = true;
  ActiveNewFormListCheck:boolean;
  userDetails;
  active:any;
  user:any;
  Detail;
  dataSource;
  
  get(){
    this.service.getAllListCheckModel().subscribe(
      res => {
      
        this.userDetails = res;
        /* 
        for (let index = 0; index < this.userDetails.length; index++) {

          var day = this.userDetails[index].fecha.substring(2,3) ;

          var month = this.userDetails[index].fecha.substring(0,1) ;

          var yearHour = this.userDetails[index].fecha.substring(4,19);

          var fecha = day + '-' + month + '-' + yearHour ;
          
          this.userDetails[index].fecha = fecha ;
        }
        this.userDetails.sort();
        */
        this.userDetails.map(re => { 
        re.checked = false;
        re.index = 0;
        });
      
      for (let index = 0; index < this.userDetails.length; index++) {
        this.userDetails[index].index = index + 1 ; 
       }
   }, 
      err =>{
       console.log(err);
      },
    );

  }

  ngOnInit(): void {
    this.get();
  this.services.formModelSearch.get('search').valueChanges.pipe(debounceTime(300)).subscribe(data =>{
    this.filtro_valor = data;
    this.ngAfterViewInit();
  });
  }

//Este evento o ciclo de vida de angular se ejecuta despues del NgOnit 
  ngAfterViewInit() {
    this.service.getAllListCheckModel().subscribe(
      res => {

        this.Detail = res;
        for (let index = 0; index <document.querySelectorAll('tbody')[0].rows.length; index++) {

          this.cambioAceite = document.querySelectorAll('tbody')[0].rows[index].cells[4].innerText ;

          this.ProximocambioAceite = this.cambioAceite - 500 ;

          this.kmActual = document.querySelectorAll('tbody')[0].rows[index].cells[3].innerText ;
          
          if ( this.kmActual >= this.ProximocambioAceite)
          {
            document.querySelectorAll('tbody')[0].rows[index].cells[4].style.backgroundColor = "yellow" ;
          }
          this.userDetails.map(re => { 
            re.checked = false;
          });
      }
    }, 
      err =>{
       console.log(err);
      },
    );
  }
 
  update(dataItem){
    this.user = {
        dataItem,
        active : "0",
        DetailsDocuments:"3"
    } 
    this.CloseList = false;
    this.ActiveNewFormListCheck = true;
  }

  onePage(){
    this.service.getAllListCheckModel().subscribe(
      res => {
        this.userDetails = res;
      }, 
      err =>{
       console.log(err);
      },
    );
  }

  delete(item){
    if(confirm("Estas seguro de eliminarlo")){
      this.service.deleteListCheck(item.pKid).subscribe(data =>{
        this.toastr.success("Se elimino con exito");
        this.get();
      })
    }
  }

  PageChanged(p){
    this.ngAfterViewInit();
  }

  Seleccionar(dataItem,i){

    if (dataItem.checked == true){
      dataItem.checked = false;
      document.querySelectorAll('tbody')[0].rows[i].style.backgroundColor = "white";
    } else if(dataItem.checked == false){
      dataItem.checked = true;
      document.querySelectorAll('tbody')[0].rows[i].style.backgroundColor = "yellow";
    }

  }

   async GenerarPdf(){
    const pdf = new PdfMakeWrapper();
    const data = this.exportData();
    let cm = data[0];
    let nombreCompleto = cm.names + ' ' + cm.surnames
   pdf.add( 
      new Table([
        [ 
            new Table([
            [
                await new Img('../../assets/img/logpeq.jpeg').build(),
                new Txt('INSPECCIÓN PREOPERACIONAL VEHÍCULOS').fontSize(13).alignment('center').margin([10,10]).bold().end, 
                new Txt('CODIGO GTH_SG-SST_08 VERSION 02').fontSize(8).alignment('center').bold().end 
            ]
            ])
            .heights(rowIndex =>{
              return rowIndex === 0 ? 50 : 0;
            })
            .widths([110,300,70])
            .end 
        ],
        [
          new Table([
            [
              new Txt('Fecha:'+cm.fecha).fontSize(15).bold().end,
              new Txt('PLACA:' + cm.placa).fontSize(15).bold().end,
              new Txt('MODELO:'+cm.modelo).fontSize(15).bold().end
            ],
            [
              new Txt('Nombre del conductor:'+nombreCompleto).fontSize(8).bold().end,
              new Txt('Vencimiento Licencia:'+cm.venciminentoLicencia).fontSize(8).bold().end,
              new Txt('EPS/ARL:'+cm.eps).fontSize(8).bold().end
            ],
            [
              new Txt('Tarjeta de operación:'+cm.fechaVencientoTarjetadeoperaciones).fontSize(8).bold().end,
              new Txt('R.Técnico mecánica:'+cm.fechaVencientoTecnicomecanica).fontSize(8).bold().end,
              new Txt('Revision preventiva:'+cm.fechaVencimientoRevisionPreventiva).fontSize(8).bold().end
            ],
            [
              new Txt('Poliza contractual:'+cm.fechaVencientoSegurorccece).fontSize(8).bold().end,
              new Txt('SOAT:'+cm.fechaVencientoSoat).fontSize(8).bold().end,
              new Txt('').fontSize(8).bold().end
            ],
            [
              new Txt('Extracto de contrato No:').fontSize(8).bold().end,
              new Txt('Inicio:'+cm.fechaInicioExtracto).fontSize(8).bold().end,
              new Txt('Fin:'+cm.fechaVencimientoExtracto).fontSize(8).bold().end
            ]
          ])
          .widths([160,160,160])
          .end
        ],
        [
          new Table([
            [
              new Txt('KILOMETRAJE ACTUAL:'+cm.kmActual).fontSize(8).bold().end,
              new Txt('KILOMETRAJE CAMBIO ACEITE:'+cm.cambioAceite).fontSize(8).bold().end
            ]
          ])
          .widths([245,245])
          .end
        ],
        [
          new Table ([
            [
                new Txt('INSPECCION INTERNA').alignment('center').fontSize(10).bold().end
            ]
          ])
          .widths([500])
          .layout({
            fillColor:(rowIndex:number, node:any, columnIndex:number)=>{
              return rowIndex === 0 ? '#8BB5E4' : '' ;
          }
          })
          .end
        ],
        [
           new Table([
              [
                new Txt('Indicador aceite de motor').fontSize(8).bold().end,
                new Txt(cm.indicadorAceiteDeMotor).alignment('center').fontSize(8).bold().end
              ],
              [
                new Txt('Nivel de combustible').fontSize(8).bold().end,
                new Txt(cm.nivelDeDombustible).alignment('center').fontSize(8).bold().end
              ],
              [
                new Txt('Pito').fontSize(8).bold().end,
                new Txt(cm.pito).alignment('center').fontSize(8).bold().end
              ],
              [
                new Txt('Indicador Batería').fontSize(8).bold().end,
                new Txt(cm.indicadorBateria).alignment('center').fontSize(8).bold().end
              ],
              [
                new Txt('Freno de emergencia').fontSize(8).bold().end,
                new Txt(cm.frenoDeEmergencia).alignment('center').fontSize(8).bold().end
              ],
              [
                new Txt('Cojineria y Sillas').fontSize(8).bold().end,
                new Txt(cm.cojineriaySillas).alignment('center').fontSize(8).bold().end
              ],
              [
                new Txt('Limpiabrisas (Estado, nivel de agua)').fontSize(8).bold().end,
                new Txt(cm.limpiabrisas).alignment('center').fontSize(8).bold().end
              ],
              [
                new Txt('Luces internas').fontSize(8).bold().end,
                new Txt(cm.lucesInternas).alignment('center').fontSize(8).bold().end
              ],
              [
                new Txt('Tablero velocimetro instrumentos').fontSize(8).bold().end,
                new Txt(cm.tableroVelocimetroInstrumentos).alignment('center').fontSize(8).bold().end
              ]
           ])
           .widths([245,245])
           .end
        ],
        [
           new Table([
             [
              new Txt('INSPECCION EXTERNA').alignment('center').fontSize(10).bold().end
             ]
           ])
           .widths([500])
           .layout({
            fillColor:(rowIndex:number, node:any, columnIndex:number)=>{
              return rowIndex === 0 ? '#8BB5E4' : '' ;
          }
          })
           .end
        ],
        [
          new Table([
            [
              new Txt('Nivel de aceite Motor').fontSize(8).bold().end,
              new Txt(cm.aceiteMotor).alignment('center').fontSize(8).bold().end
            ],
            [
              new Txt('Nivel de aceite hidráulico dirección').fontSize(8).bold().end,
              new Txt(cm.aceiteHidraulicoDireccion).alignment('center').fontSize(8).bold().end
            ],
            [
              new Txt('Nivel liquido refrigerante').fontSize(8).bold().end,
              new Txt(cm.liquidoRefrigerante).alignment('center').fontSize(8).bold().end
            ],
            [
              new Txt('Nivel liquido de frenos').fontSize(8).bold().end,
              new Txt(cm.liquidoDeFrenos).alignment('center').fontSize(8).bold().end
            ],
            [
              new Txt('Tapa de combustible').fontSize(8).bold().end,
              new Txt(cm.tapaDeCombustible).alignment('center').fontSize(8).bold().end
            ],
            [
              new Txt('Tension de correas').fontSize(8).bold().end,
              new Txt(cm.tensionDeCorreas).alignment('center').fontSize(8).bold().end
            ],
            [
              new Txt('Vidrios y espejos').fontSize(8).bold().end,
              new Txt(cm.vidriosyEspejos).alignment('center').fontSize(8).bold().end
            ],
            [
              new Txt('Luces altas y bajas').fontSize(8).bold().end,
              new Txt(cm.lucesAltasyBajas).alignment('center').fontSize(8).bold().end
            ],
            [
              new Txt('Luces direccionales(delanteras-traseras)').fontSize(8).bold().end,
              new Txt(cm.lucesDireccionales).alignment('center').fontSize(8).bold().end
            ],
            [
              new Txt('Placas y Logos').fontSize(8).bold().end,
              new Txt(cm.placasyLogos).alignment('center').fontSize(8).bold().end
            ],
            [
              new Txt('Llantas (Desgaste, presión de aire)').fontSize(8).bold().end,
              new Txt(cm.llantas).alignment('center').fontSize(8).bold().end
            ]
          ])
          .widths([245,245])
          .end
        ],
        [
          new Table([
            
            [
              new Txt('REVISION DE FUNCIONAMIENTO Y SEGURIDAD').alignment('center').fontSize(10).bold().end,
            ]
          ])
          .widths([500])
           .layout({
            fillColor:(rowIndex:number, node:any, columnIndex:number)=>{
              return rowIndex === 0 ? '#8BB5E4' : '' ;
          }
          })
          .end
        ],
        [
          new Table([
            [
              new Txt('Dispositivo de velocidad').fontSize(8).bold().end,
              new Txt(cm.dispositivoDeVelocidad).alignment('center').fontSize(8).bold().end
            ],
            [
              new Txt('Cinturones de seguridad').fontSize(8).bold().end,
              new Txt(cm.cinturonesDeSeguridad).alignment('center').fontSize(8).bold().end
            ],
            [
              new Txt('Botiquin').fontSize(8).bold().end,
              new Txt(cm.botiquin).alignment('center').fontSize(8).bold().end
            ],
            [
              new Txt('Estado de la carpa,cierres y correas').fontSize(8).bold().end,
              new Txt(cm.carpa).alignment('center').fontSize(8).bold().end
            ],
            [
              new Txt('Extintor Estado').fontSize(8).bold().end,
              new Txt(cm.extintor).alignment('center').fontSize(8).bold().end
            ],
            [
              new Txt('Fecha Vencimiento').fontSize(8).bold().end,
              new Txt(cm.vencimientoExtintor).alignment('center').fontSize(8).bold().end
            ],
            [
              new Txt('Equipo de Carretera').fontSize(8).bold().end,
              new Txt(cm.equipoDeCarretera).alignment('center').fontSize(8).bold().end
            ],
            [
              new Txt('Llanta de repuesto').fontSize(8).bold().end,
              new Txt(cm.llantaDeRepuesto).alignment('center').fontSize(8).bold().end
            ]
          ])
          .widths([245,245])
          .end
        ],
        [
          new Table([
            [
              new Txt('NOMBRE DEL RESPONSABLE:').fontSize(10).bold().end
            ],
            [
              new Txt('Observaciones:'+cm.observacion).fontSize(8).bold().end
            ]
          ])
          .widths([500])
           .layout({
            fillColor:(rowIndex:number, node:any, columnIndex:number)=>{
              return rowIndex === 0 ? '#8BB5E4' : '' ;
          }
          })
          .end
        ]
    ])
    .layout('noBorders')
    .end

     );
    pdf.create().open(); 
  }

  exportData() {
    const result = this.userDetails.filter(element => element.checked == true)
    return result;  
 }
  
}

