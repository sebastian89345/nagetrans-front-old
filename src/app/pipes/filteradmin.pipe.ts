import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteradmin'
})
export class FilteradminPipe implements PipeTransform {

  transform(lista: any[],texto: string): any[] {
    if(!texto) return lista
    
    return lista.filter(data => 
      data.userName.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.email.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.phoneNumber.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.names.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.surnames.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) ||
      data.date.toLocaleLowerCase().includes(texto.toLocaleLowerCase()) 
      )
    }
}
