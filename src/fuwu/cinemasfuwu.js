// 处理数据文件
import http from '../utils/http'
//引入API地址文件
import API from '../api'


export function getcinemas (cityId){
        return new Promise ((resolve,reject)=>{

            let time = new Date(+new Date() + 8 * 3600 * 1000).toISOString().split('T')[0]
                    http({
                        url:API.CINEMAS_API,
                        method:'GET',
                        data:{
                            day:time,
                            limit:20,
                            cityId
                        }
                    })
                    .then(({data,status})=>{
                        if(status != 200){
                        //请求失败
                        return
                        }
                        let newData = data.cinemas.map(item=>{
                            let {id,addr,distance,nm,sellPrice,hallType} =item
                            return {id,addr,distance,nm,sellPrice,hallType}
                        })
                        resolve(newData)
                })
                .catch(error=>{
                    console.log(error)
                })  
        })
}