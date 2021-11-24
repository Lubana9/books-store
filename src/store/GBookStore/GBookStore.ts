/* eslint-disable no-console */
import { BookItemApi, BookItemModule } from "@modules/bookItem";
import { normalizeItem } from "@modules/bookItem";
import { Meta } from "@utils/Meta";
import { ILocalStore } from "@utils/UseLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import {
  CollectionModel,
  getIniitCollectionModels,
  linearizedCollection,
  normalaizCollection,
} from "../../modules/shared/collection";
import ApiStore from "../ApiStore";
import { HTTPMethod } from "../ApiStore/types";
import { GetBooksParam, IGBookStore } from "./types";
const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";

type PrivateFilds =
  | "_list"
  | "_meta"
  | "_value"
  | "_book"
  | "_pageNumber"
  | "_sort"
  | "_selectedBook";
export default class GBookStore implements IGBookStore, ILocalStore {
  private readonly apiStore = new ApiStore(baseUrl);
  private _list: CollectionModel<number, BookItemModule> =
    getIniitCollectionModels();
  private _book: BookItemModule[] = [];
  private _selectedBook: BookItemModule | null = null;
  private _meta: Meta = Meta.initial;
  private _value: string = "";
  private _sort: string = "";
  constructor() {
    makeObservable<GBookStore, PrivateFilds>(this, {
      _list: observable.ref,
      _book: observable,
      _meta: observable,
      _value: observable,
      _sort: observable,
      _pageNumber: observable,
      _selectedBook: observable,
      list: computed,
      meta: computed,
      selectedBook: computed,
      getBooksList: action,
      setValue: action,
      setList: action,
      setSort: action,
    });
  }

  get list(): BookItemModule[] {
    return linearizedCollection(this._list);
  }
  get meta(): Meta {
    return this._meta;
  }

  get value(): string {
    return this._value;
  }

  get selectedBook(): BookItemModule | null {
    return this._selectedBook;
  }
  get sort() {
    return this._sort;
  }
  setValue(value: string): string {
    return (this._value = value);
  }
  setList(book: BookItemModule[]) {
    this._book = book;
  }
  setSort(sort: string) {
    return (this._sort = sort);
  }
  async getBooksList(params: GetBooksParam): Promise<void> {
    this._meta = Meta.loading;
    this._list = getIniitCollectionModels();
    const response = await this.apiStore.request<BookItemApi[]>({
      method: HTTPMethod.get,
      data: {},
      headers: {},
      endpoint: `${params.BookName}&maxResults=40`,
    });

    runInAction(() => {
      if (response.success) {
        try {
          const list: BookItemModule[] = [];
          for (const item of response.data) {
            list.push(normalizeItem(item));
          }
          this._meta = Meta.succses;
          this._list = normalaizCollection(list, (item: any) => item.id);
          return;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
          this._meta = Meta.error;
          this._list = getIniitCollectionModels();
        }
      }
    });
  }

  destroy() {}
}
