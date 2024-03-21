import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtervehiculo'
})
export class FiltervehiculoPipe implements PipeTransform {

  transform(lista: any[],texto: string): any[] {
    if(!texto) return lista
    
    return lista.filter(data => 
      data.userName.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.date.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.descripcion.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.descripcion1.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.descripcion2.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) 
       )
    }

}
