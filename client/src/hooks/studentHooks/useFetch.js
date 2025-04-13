import axios from 'axios';
import React,{useState,useEffect} from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( ()=>{

        const fetchData = async () => {
            try{

                const response =await axios.get(url,
                    {headers:{
                            authorization: `Bearer ${localStorage.getItem('token')}`,
                        }});
                setData(response.data);
                console.log("from use fetch",response.data);
            }catch (error) {
                console.log(error.message);
                setError(error);
            }finally {
                setLoading(false);
            }
        }
      fetchData();

    },[url])

return[data,loading,error]


}

export default useFetch;