export interface IOutputObject<T> {
  totalRecords: number;
  data: T;
  status: number;
  message: string;
}
