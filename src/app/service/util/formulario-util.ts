import { FormGroup } from '@angular/forms';

export class FormularioUtil {

  static estaVazio(
    form: FormGroup,
    valoresPadrao: Record<string, unknown> = {}
  ): boolean {
    const raw = form.getRawValue();

    return Object.keys(raw).every((campo) => {
      const valorAtual = raw[campo];
      const padrao = campo in valoresPadrao ? valoresPadrao[campo] : '';

      if (typeof valorAtual === 'string') {
        return valorAtual.trim() === String(padrao ?? '').trim();
      }

      if (typeof valorAtual === 'boolean') {
        return valorAtual === Boolean(padrao);
      }

      return valorAtual === padrao || valorAtual === null || valorAtual === undefined || valorAtual === '';
    });
  }
}
