
import axios from "axios";
import { config } from "src/config";


export default function post(params: IPost) {
  const { data, url: routeTo, method = 'POST' } = params;
  console.log(`serverUrl is ${config.SERVER_URL}`);
  return (
    axios({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${params.token}`,
      },
      method: method,
      url: `${config.SERVER_URL}${routeTo}`,
      data: data || {},
    })
  )
}

interface IPost {
  data: any
  url?: string
  method?: any,
  token?: string
}

