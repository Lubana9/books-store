export enum HTTPMethod {
  get = "GET",
  post = "POST",
}

export type RequestParams<ReqT> = {
  method: HTTPMethod;
  endpoint: string;
  headers: Record<string, string>;
  data: ReqT;
};

export enum StatusHTTP {
  unexpectedErorr = "Unexpected_Erorr",
}

export type ApiResponse<SuccessT, ErrorT> =
  | {
      success: true;
      data: SuccessT;
      status: number;
    }
  | {
      success: false;
      data: ErrorT;
      status: number;
    }
  | {
      success: false;
      data: any;
      status: StatusHTTP;
    };

export interface IApiStore {
  readonly baseUrl: string;

  request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>>;
}
