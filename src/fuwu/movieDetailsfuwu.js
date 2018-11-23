// 处理数据文件
import http from '../utils/http'
//引入API地址文件
import API from '../api'
//请求详情数据
export function getMovieDetails(id) {
    return new Promise ((resolve,reject)=>{
            http({
            url : API.GET_MOVIEDETAILS_API,
            data:{ movieId:id},
            method:'GET'
        }).then(({data,status})=>{
                if(status != 200){
                    return;
                }
                let newData = Object.keys(data.detailMovie)
                newData.map(item =>{
                    let{id,img,cat,dra,photos,src,ver,snum,pubDesc,fra,dur,sc,enm} = item
                    return{id,img,cat,dra,photos,src,ver,snum,pubDesc,fra,dur,sc,enm}
                })
                console.log(newData)
                resolve(newData)
        })
    })
  }
