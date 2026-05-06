import { useCallback, useEffect, useRef } from "react"



export const HttpHook = () =>{

    const activeHttpRequests = useRef([])


    const HttpRequest = useCallback(
  async (Url,method = 'GET', body=null,headers= {}) => {
        const httpAbortCtrl = new AbortController()
        activeHttpRequests.current.push(httpAbortCtrl)

        try{
              
             const response = await fetch(Url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
            reqCtrl => reqCtrl !== httpAbortCtrl
        ) 
        if(!response.ok){
            throw new Error(responseData.message)
        }

          return responseData;

        }catch(e){
            throw new Error('request failed!')
        }
  },[]

    );

    useEffect(() => {
        return () => {
         activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    } })

    return {HttpRequest};
    
}