export interface APIPagination<T> {
    page: number;
    per_page: number;
    page_count: number;
    total_count: number;
    items: T[];
}
