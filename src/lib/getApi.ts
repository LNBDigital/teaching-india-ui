// lib/helperData.ts
import { apiRequest } from "src/lib/api";
import { environment } from "src/lib/env";
import Cookie from "js-cookie";


export const getHelperData = async <T>(endpoint:string):Promise<T> => { 
    const data = await apiRequest<{data :T}>(
      `${environment.API_PROD}helper/${endpoint}`,
      { method: "GET" }
    );
        if (!data.data) {
    throw new Error("No data returned from API");
  }
    return data.data.data;
};

export const getPrefetchData = async <T>(endpoint: string): Promise<T> => {
  const data = await apiRequest<{ data: T }>(
    `${environment.API_PROD + endpoint}`,
    { method: "GET" },
    { Authorization: `Bearer ${Cookie.get("authToken")}` }
  );
    if (!data.data) {
    throw new Error("No data returned from API");
  }
  return data.data.data;
};