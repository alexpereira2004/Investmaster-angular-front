import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpj'
})
export class CnpjPipe implements PipeTransform {

  transform(value: string | number | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }

    // Remove qualquer caractere não numérico e garante 14 dígitos (com zeros à esquerda se vier sem)
    const digitos = String(value).replace(/\D/g, '').padStart(14, '0');

    if (digitos.length !== 14) {
      return String(value);
    }

    return digitos.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }

}
