import axios from "axios";

export async function apiRequest<T>(
  url: string,
  options: RequestInit = {},
  header: HeadersInit = {}
): Promise<{ data?: T,error?:T }> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...header,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw data; // just throw the response body directly
    }
    return { data };
  } catch (error) {
    throw error; // re-throw for the caller to handle
  }
}

interface PostType{
url:string;
data?:Record<string, string[]> | string;
}

export async function axiosPost({url,data}:PostType){
  try {
    const res = await axios.post(url,data,{
      headers:{
        Accept: 'application/json',
      }
    })

    if (res) {
      console.log(res,"sdsdsd")
    }
  } catch (err) {
     console.log(err)
     throw err;
  }
}

interface AxiosPostType{
  url:string | null;
  data:string[] | string | null; 
}

