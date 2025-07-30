export interface ApiTypeError {
  message?: string;
  errors?: Record<string, string[]> | string;
}
export interface ApiTypeStatus {
  data: {
    status?:string;
    profile_completed?: string;
    token?: string;
    action?: string;
    data?:string[] | number[];
  };
  [key: string]: unknown;
}

