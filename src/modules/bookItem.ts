export type BookItemApi = {
  id: string;
  volumeInfo: {
    title: string;
    publishedDate: string;
    categories: Array<string>;
    imageLinks: {
      thumbnail: string;
    };
  };
};

export type BookItemModule = {
  id: string;
  volumeInfo: {
    title: string;
    publishedDate: string;
    categories: Array<string>;
    imageLinks: {
      thumbnail: string;
    };
  };
};

export const normalizeItem = (from: BookItemApi): BookItemModule => ({
  id: from.id,
  volumeInfo: from.volumeInfo,
});
