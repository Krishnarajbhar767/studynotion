import axios from "axios";

export const axiosInstance = axios.create({});
export const apiConncetor = (methode,url,bodyData,headers,params)=>{
return axiosInstance({
        method:`${methode}`,
        url:`${url}`,
        data:bodyData ? bodyData :null,
        headers:headers ? headers :null,
        params:params ? params :null
})
}

