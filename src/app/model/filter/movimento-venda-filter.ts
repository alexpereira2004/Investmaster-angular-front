export interface MovimentoVendaFilter {
  id?: number;
  dataAquisicaoInicio?: string;
  dataAquisicaoFinal?: string;
  dataVendaInicio?: string;
  dataVendaFinal?: string;
  ativoCodigo?: string;
  sort?: string;
  page?: number;
  size?: number;
}
