import { useEffect, useState } from "react";

const useFetch = (url)=>{

    const [serverError, setServerError] = useState(false);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{

        const abortControl = new AbortController();

        setTimeout(()=> {
            fetch(url, { signal: abortControl.signal })
            .then((res)=>{
                setServerError(false)
                if(!res.ok) {
                    throw Error('Bad response from server')
                }
                return res.json();
            })
            .then(data => {
                console.info(data);
                setData(data);
                setIsLoading(false);
            })
            .catch(err =>{
                if (err.name === "AbortError") {
                    console.warn('fetch operation aborted')
                } else {
                    setIsLoading(false);
                    console.error('Error while fetching from json-server:',err.message)
                    setServerError(true)
                }
            })
        },300)

        return ()=> abortControl.abort();

    },[url])
    return {data, setData, isLoading, serverError};
}

export default useFetch;