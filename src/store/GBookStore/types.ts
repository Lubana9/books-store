export type GetBooksParam = {
  BookName: string;
};

export interface IGBookStore {
  getBooksList(params: GetBooksParam): Promise<void>;
}
