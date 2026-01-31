
type PaginationAndSortingOptions = {
    page?: string;
    limit?: string;
    sort_by?: string;
    sort_order?: string;
}



export const paginationAndSortingHelper = (options: PaginationAndSortingOptions) => {
    const page = Number(options.page);
    const limit = Number(options.limit);
    const skip = (page - 1) * limit;
    const sort_by = options.sort_by || "created_at";
    const sort_order = options.sort_order || "desc";

    return { page, limit, skip, sort_by, sort_order };
}