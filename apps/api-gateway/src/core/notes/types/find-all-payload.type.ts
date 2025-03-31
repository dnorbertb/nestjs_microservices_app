export type FindAllPayload = {
  ownerId: number;
  page?: number;
  perPage?: number;
  search?: string;
  sortOrder?: 'ASC' | 'DESC';
  sortBy?: 'updatedAt' | 'createdAt';
};
