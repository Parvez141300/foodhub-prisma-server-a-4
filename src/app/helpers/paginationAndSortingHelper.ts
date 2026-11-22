
type PaginationAndSortingOptions = {
    page?: string;
    limit?: string;
    sort_by?: string;
    sort_order?: string;
}



export const paginationAndSortingHelper = (options: PaginationAndSortingOptions) => {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (page - 1) * limit || 0;
    const sort_by = options.sort_by || "created_at";
    const sort_order = options.sort_order || "desc";

    return { page, limit, skip, sort_by, sort_order };
}