import {  useCallback, useEffect, useRef } from "react"
import { useState } from "react";


export const HttpHook = () =>{

    

   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<string|null>(null);
   const activeHttpRequests = useRef<AbortController[]>([])
  
  
   const SendRequest = useCallback(
  
  async (Url:string,method:string = 'GET', body?: FormData |string | null ,headers:HeadersInit = {}) => {
      
     setIsLoading(true)
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
         setIsLoading(false)

          return responseData;

        }catch(err){
        const message = err instanceof Error ? err.message : 'network error'
        setError(message)
       throw err
        } finally{
            setIsLoading(false)
        }
            
        
  },[]

    );
 
    function ClearError(){
        setError(null)
    }

    useEffect(() => {
        return () => {
         activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    }; 
},[])

    return {isLoading,error,ClearError,SendRequest};
    
}