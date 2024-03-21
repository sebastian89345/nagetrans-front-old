import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterdriversdocument'
})
export class FilterdriversdocumentPipe implements PipeTransform {

  transform(lista: any[],texto: string): any[] {
    if(!texto) return lista
    debugger;
    
    return lista.filter(data => 
      data.driversUserName.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.afpDescripcion.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.arlDescripcion.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.cajaCompensacionDescripcion.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.epsDescripcion.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.inicioLicencia.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.phoneNumber.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.numeroDeLicencia.toString().toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.venciminentoLicencia.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) 
      )
  }

}
