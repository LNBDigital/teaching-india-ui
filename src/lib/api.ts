import axios from "axios";
import { ErrorResponse } from "react-router";

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


  // const formHandler = async (e:React.FormEvent) =>{
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(`${environment.API_PROD}registration`,formData,{
  //       headers:{
  //         "Accept":"application/json"
  //       }
  //     })
  //     if (res.data && res.data.status  === "success") {
  //        sessionStorage.setItem(
  //         "registerOTPData",
  //         JSON.stringify({ ...res.data, isLogin: false })
  //       );
  //       setVerifyScreen(true);
  //     }
  //   } catch (error) {
      
  //     if (error && error.response.data.errors ) {
  //       const err = error.response.data.errors
  //       if (typeof err === "object"){
  //         setErrors(err as Record<string, string[]>);
  //       }
  //     }
  //   }
  // }