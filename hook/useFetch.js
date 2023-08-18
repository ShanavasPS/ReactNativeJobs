import {useState, useEffect} from 'react';
import axios from "axios";

const useFetch = (endpoint, query) => {
    console.log("Inside useFetch");
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': '71a318e1b0msha00a9fed79e486ep1c9ccbjsnf0a201fe8c96',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query }
    };

    const fetchData = async () => {
        console.log("trying to fetch data from ", endpoint);
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