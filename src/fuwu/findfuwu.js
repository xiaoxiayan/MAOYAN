// 处理数据文件
import http from '../utils/http'
//引入API地址文件
import API from '../api'

export function searchMovie(message){
   return  new Promise ((resolve,reject)=>{
       http({
           url:API.FIND_API,
           method:'GET',
           data:{
            kw :message,
            cityId:30, 
             stype :-1
           }
       })
       .then(({data,status})=>{
        if(status != 200){
            //请求失败
            return;
        }
        
        var obj = {}
        if(data.movies){
           obj.newData = data.movies.list.map(item=>{
                //简写对象，当对象的值是一个变量的时候
                let{nm,enm,cat,rt,sc,img} = item
                img = img.replace(/w.h/, '128.180');
                return {nm,enm,cat,rt,sc,img}
            })
            if(data.movies.total){
                 obj.moreMovies = data.movies.total
            }
        }
        if(data.cinemas){
            obj.DataCinemas = data.cinemas.list.map(item=>{
                let{id,nm,addr,distance,sellPrice} = item
                return {id,nm,addr,distance,sellPrice}
            })
            if(data.cinemas.total){
              obj.moreCinemas = data.cinemas.total
            }
        }
       
        resolve({
           obj
        })
       })
   })

}