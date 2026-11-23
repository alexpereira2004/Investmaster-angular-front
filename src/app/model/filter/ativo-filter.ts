export interface AtivoFiltro {
  codigo?: string | null;
  seguindo?: number | null;
  exclusivo?: boolean;
  page?: number;
  size?: number;
  sort?: string | null;
}
