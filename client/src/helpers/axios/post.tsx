
import axios from "axios";
import { config } from "src/config";

export default function post(params: IPost) {
  const { payload, url: routeTo } = params;
  console.log(`serverUrl is ${config.SERVER_URL}`);
  return (
    axios({
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      url: `${config.SERVER_URL}${routeTo}`,
      data: payload
    })
  )
}

interface IPost {
  payload: any
  url?: string
}