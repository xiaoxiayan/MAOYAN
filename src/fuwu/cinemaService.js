
import http from '../utils/http'
import API from '../api'



// 获取影院数据接口
export function getcinemaList(id){
    return new Promise((resolve, reject)=>{
        http({
            url: API.GETCINEMA_API,
            method: 'GET',
            data:{
                offset:0,
                cityId:id
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            // console.log(data);
            resolve(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    })
}



// 搜索影院的接口
export function searchCinema(kw, stype, id){
    return new Promise((resolve, reject)=>{
        http({
            url: API.SEARCH_API,
            method: 'GET',
            data: {
                cityId: id,
                kw: kw,
                stype: stype
            }
        })
        .then(({data, status})=>{
            // console.log(kw,stype, id);
            // console.log(API.SEARCH_API);
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            console.log(data.cinemas.list);
            let newData = data.cinemas.list.map(item=>{
                let {id, nm, sellPrice, addr, sell, snack, vipDesc, distance, hallType, endorse} = item;
                return {id, nm, sellPrice, addr, sell, snack, vipDesc, distance, hallType, endorse};
            })
            // console.log(newData)
            resolve(newData);
            // resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}


// 全城/品牌/特色设置
export function setCityAndBrandAndService(id){
    return new Promise((resolve, reject)=>{
        http({
            url: API.SET_DIS_BRAND_SERVICE_API,
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
            console.log(data);
            resolve(data.hallType);
        })
        .catch((error)=>{
            console.log(error);
        })
    })
}