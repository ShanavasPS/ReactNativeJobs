import {useState, useEffect} from 'react';
import axios from "axios";

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': 'f6cf1191f1mshe5cf137643ae59fp1ff23fjsn63391004fca6',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query }
    };

    const fetchData = async () => {
        console.log("trying to fetch data");
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data.data)
            console.log("call success");
            console.log(response.data);
        } catch (error) {
            console.log("call failed");
            setError(error);
            console.error(error);
        } finally {
            console.log("call finally");
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };
}

export default useFetch;