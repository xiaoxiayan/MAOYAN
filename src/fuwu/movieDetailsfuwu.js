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
                // let newData = {}
                //     let{id,img,cat,dra,photos,src,ver,snum,pubDesc,fra,dur,sc,enm} = data
                data = data.detailMovie
                resolve(data)
        })
    })
  }
//获取下面影院,
export function movieDetailsCinemas(cid,movieid){
    return new Promise((res,rej)=>{
        let day = new Date(+new Date() + 8 * 3600 * 1000).toISOString().split('T')[0]
        let time = Date.now();
        http({
            url:API.MOVIEDETAILS_CINEMAS,
            method:'POST',
            data:{
                forceUpdate:time,
                    cityId: cid,
					day: day,
					limit: 20,
					movieId: movieid,
					offset: 0,				
					updateShowDay: true
            }
        }).then(({data,status})=>{
            if(status != 200){
                //请求失败
            }
            console.log(data)
            res(data)
        })

    })

}

//获取详情页 点入 电影院的数据，传入电影ID，传入影院ID
  export function cinameDet(mid, cid){
    return new Promise((resolve, reject)=>{
        console.log(API.CINAMEDETAIL_API)
        http({
            url: API.CINAMEDETAIL_API,
            method: 'GET',
            data: {
            	  movieId: mid,
                  cinemaId: cid
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
            }
            console.log("电影列表",data)
            resolve(data)
        })
        .catch(error=>{
            //请求失败
        })

    })
}
