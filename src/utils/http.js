// 封装处理发送ajax的文件
// 引入vue 中使用的ajax插件。axios

import axios from 'axios'
import API from '../api'

export default function http({url,method,data}){
    let options = {
        url:url,
        method:method,
        baseURL:API.SAT_HOST,
        withCredentials:false
    };
    //因为axios插件 对GET,POST两种请求的方式需要的data不用。
    if(method == 'GET'){
        options.params = data
    }else if(method == 'POST'){
        options.data = data
    }
    // 要把请求发送出去
return axios(options);
}


