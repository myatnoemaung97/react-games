import { useEffect, useState } from "react";

export default function useParamsBuilder(value) {
  const [options, setOptions] = useState(value);
  const [params, setParams] = useState('');

  useEffect(() => {
    setParams(() => newParams())
  }, [options]) 


  function newParams() {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(options)) {
      if (value) {
        params.append(key, value)
      }
    }

    return params.toString();
  }

  function updateParams(key, value) {
    setOptions(prevOptions => {
      return { ...prevOptions, [key]: value }
    })
  }

  return [params, updateParams];
}