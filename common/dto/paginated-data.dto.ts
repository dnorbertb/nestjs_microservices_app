export class PaginatedData<T> {
  docs: Array<T>;
  currentPage: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  nextPage: number | null;
  previousPage: number | null;

  constructor(data: PaginatedData<T>) {
    Object.assign(this, data);
  }
}
