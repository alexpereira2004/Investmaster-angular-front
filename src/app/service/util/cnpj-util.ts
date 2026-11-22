import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CnpjUtil {

  static validator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const raw = control.value;
      if (!raw) {
        return null;
      }

      return CnpjUtil.isValid(String(raw)) ? null : { invalidCnpj: true };
    };
  }

  static isValid(value: string): boolean {
    const clean = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (clean.length !== 14) {
      return false;
    }

    const digits = value.replace(/\D/g, '');

    // Validação dos dígitos verificadores quando for puramente numérico de 14 dígitos
    if (/^\d{14}$/.test(digits)) {
      if (/^(\d)\1{13}$/.test(digits)) {
        return false;
      }

      const calcDigit = (base: string, weights: number[]): number => {
        const sum = base
          .split('')
          .reduce((acc, ch, idx) => acc + Number(ch) * weights[idx], 0);
        const mod = sum % 11;
        return mod < 2 ? 0 : 11 - mod;
      };

      const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

      const d1 = calcDigit(digits.slice(0, 12), w1);
      const d2 = calcDigit(digits.slice(0, 12) + d1, w2);

      return Number(digits[12]) === d1 && Number(digits[13]) === d2;
    }

    // Mantém compatibilidade com CNPJs alfanuméricos de 14 caracteres
    return true;
  }
}
