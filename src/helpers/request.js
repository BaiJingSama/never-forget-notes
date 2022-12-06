import axios from "axios";
import { Message } from "element-ui";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
// 对于所有的post请求统一设置Content-Type

axios.defaults.baseURL = "https://note-server.hunger-valley.com";
// 接口的url

axios.defaults.withCredentials = true;
// 设置跨域

export default function request(url, type = "GET", data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
      validityStates(status) {
        return (status >= 200 && status < 300) || status === 400;
      }
    };
    if (type.toLowerCase() === "get") {
      option.params = data;
    } else {
      option.data = data;
    }
    axios(option)
      .then(res => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          console.log("1");
          Message.error(res.data.msg);
          reject(res.data);
        }
      })
      .catch(err => {
        Message.error(err.response.data.msg || "网络异常");
        reject({ msg: err.response.data.msg });
      });
  });
}
