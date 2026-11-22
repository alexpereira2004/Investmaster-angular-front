import Swal from 'sweetalert2';

export class AlertaUtil {

  static erro(mensagem: string, titulo = 'Oops...'): void {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensagem,
      footer: ''
    });
  }

  static sucesso(mensagem: string, titulo = 'Sucesso!'): void {
    Swal.fire({
      icon: 'success',
      title: titulo,
      text: mensagem,
      footer: ''
    });
  }
}
