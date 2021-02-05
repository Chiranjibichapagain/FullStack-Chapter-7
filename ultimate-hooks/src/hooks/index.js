import { useState, useEffect } from 'react'
import axios from "axios";

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([]);
    const [fetch, setFetch] = useState(false)

  useEffect(() => {
    getData()
  }, [fetch]);
    
    const getData = async() => {
        await axios.get(baseUrl).then((response) => {
        setResources(response.data);
        });
    }
    
    const create = async (resource) => {
        try {
            const { data } = await axios.post(`${baseUrl}`, resource)
            resources.concat(data)
            setFetch(!fetch)
        } catch (error) {
           console.log(error.message) 
        }
    };
  
  const service = {
    create,
  };

  return [resources, service];
};


export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };
  return {
    type,
    value,
    onChange,
  };
};