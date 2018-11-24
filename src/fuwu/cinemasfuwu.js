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
                        console.log(data)
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
// 全城/品牌/特色设置
export function setCityAndBrandAndService(id){
    return new Promise((resolve, reject)=>{
        http({
            url: API.SETCITY_BRAND_API,
            method: 'GET',
            data: {
                ci: id
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                return;
            }
            
            // console.log(data.brand);
            // console.log(data.district);
            // console.log(data.service);
            // console.log(data.subway);
            // console.log(data.timeRanges);
            resolve({
                brand: data.brand,
                district: data.district,
                service: data.service,
                subway: data.subway,
                timeRanges: data.timeRanges
            })
        })
    })
}
//获取特色厅数据
export function getServiceData(id){
    return new Promise((resolve, reject)=>{
        http({
            url:API.GET_TST_API,
            method:'GET',
            ci:id
        })
        .then(({data, status})=>{
            if(status != 200){
                return;
            }
            resolve(data.hallType);
        })
        .catch((error)=>{
            console.log(error);
        })
    })
}