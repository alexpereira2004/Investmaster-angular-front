import { Sort } from "./sort";
import { Pageable } from "./pageable";

export class PageSpring {
  content!: any[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean
}
