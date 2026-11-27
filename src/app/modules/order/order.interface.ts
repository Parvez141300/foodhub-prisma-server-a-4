export interface IGetAllOrQueryOrderPayload {
    search: string;
    page: number;
    limit: number;
    skip: number;
    sort_by: string;
    sort_order: string;
}