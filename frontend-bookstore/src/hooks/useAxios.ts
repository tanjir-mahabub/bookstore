import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Book {
    id: number;
    title: string;
    writer: string;
    coverImage: string;
    point: number;
    tags: string[];
  }
    
  interface ApiResponse {
    data: Book[];
  }
  
  const useAxios = (url: string) => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<ApiResponse>(url);
          setData(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error as Error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url]);
  
    return { data, loading, error };
};

export default useAxios;
