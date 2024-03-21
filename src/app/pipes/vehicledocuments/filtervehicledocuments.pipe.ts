import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtervehicledocuments'
})
export class FiltervehicledocumentsPipe implements PipeTransform {

  transform(lista: any[],texto: string): any[] {
    if(!texto) return lista
   
 return lista.filter(data => 
      data.userName.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.extracto.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fecha.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaInicioExtracto.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaInicioRevisionPreventiva.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaInicioSegurorccece.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaInicioSoat.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaInicioTarjetadePropiedades.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaInicioTarjetadeoperaciones.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaInicioTecnicomecanica.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaVencientoSegurorccece.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaVencientoSoat.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaVencientoTarjetadePropiedades.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaVencientoTarjetadeoperaciones.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaVencientoTecnicomecanica.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaVencimientoExtracto.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.fechaVencimientoRevisionPreventiva.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.revisionPreventiva.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.segurorccece.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.soat.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.tarjetadePropiedades.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.tarjetadeoperaciones.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.tecnicomecanica.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.userName.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) 
      )
    }

}
