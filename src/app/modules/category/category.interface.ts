export interface IgetAllOrQueryCategoryPayload {
    search: string;
    page: number;
    limit: number;
    skip: number;
    sort_by: string;
    sort_order: string;
}