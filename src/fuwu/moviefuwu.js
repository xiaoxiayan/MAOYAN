// 处理数据文件
import http from '../utils/http'
//引入API地址文件
import API from '../api'
//请求热映参数
export function getPlayingList(){
    return new Promise((resolve, reject)=>{
        http({
            url: API.PLAYING_API,
            method: 'GET',
            data: {
                token: ''
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            let newData = data.movieList.map(item=>{
                let {id, nm, img, version, sc, star, showInfo, globalReleased,wish} = item;
                img = img.replace(/w.h/, '128.180');
                return {id, nm, img, version, sc, star, showInfo, globalReleased,wish};
            })
            //返回参数以及ID，用来加载更多的数据
            resolve({
                data: newData,
                ids: data.movieIds
            });
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}
// 正在热映，向下滑动加载更(多内容
export function getMorePlayingList(ids){
    return new Promise((resolve,reject)=>{
    // console.log(ids)       
        http({
            url:API.MORE_PLAYING_API,
            method:'GET',
            data:{
                token :'',
                movieIds :ids
            }
        })
        .then(({data,status})=>{
              
            //数据有限，所以会出现请求失败
            if(status !=200){
                return
            }
            // console.log(data);
            let newData = data.coming.map(item =>{
                let {id, nm, img, version, sc, star, showInfo, globalReleased,wish} = item;
                img = img   .replace(/w.h/, '128.180');
                return {id, nm, img, version, sc, star, showInfo, globalReleased,wish};
            })
            resolve(newData);
            
        })
        .catch(error => {
            console.log(error)
        })
    })
    
}

//请求即将上映的参数
export function getComingList(ci){
    return new Promise((resolve, reject)=>{
        http({
            url: API.COMING_API,
            method: 'GET',
            data: {
               ci, //城市代号
               token:'',
            //    limit:10,
            //    movieIds:1212293
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            let newData = data.coming.map(item=>{
                let {id,comingTitle, img, nm, wish, star, showInfo, globalReleased, version} = item;
                img = img.replace(/w.h/, '128.180');
               
                return {id,comingTitle, img, nm, wish, star, showInfo, globalReleased, version};
            })
             //对数据进行分类
             let dataMap = {};
             newData.map(item=>{
                 if(!dataMap[item.comingTitle]){
                     dataMap[item.comingTitle] = [];
                 }
                 dataMap[item.comingTitle].push(item);
             })
             
             resolve({
                 data :dataMap,
                 ids : data.movieIds,
                 newData:newData
                 
             });
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

// 请求最受期待的电影数据
export function getMostExpectedData(ci){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MOST_EXPECTED_API,
            method: 'GET',
            data: {
                ci,
                limit: 10,
                offset: 0,
                token: ''
            }
        })
        .then(({data, status})=>{
            if(status != 200)
                //请求失败
                return;
            //请求成功
            resolve(data.coming);
        })
        .catch(error=>{
            //请求失败
        })
    })
}

//请求更多的即将上映
export function getmorecoming(ids){
    return new Promise((resolve,reject)=>{
        // console.log(ids)       
            http({
                url:API.MORE_PLAYING_API,
                method:'GET',
                data:{
                    token :'',
                    movieIds :ids
                }
            })
            .then(({data,status})=>{
                //数据有限，所以会出现请求失败
                if(status !=200){
                    return
                }

                let newData = data.coming.map(item=>{
                    let {id,comingTitle, img, nm, wish, star, showInfo, globalReleased, version} = item;
                    img = img.replace(/w.h/, '128.180');
                    return {id,comingTitle, img, nm, wish, star, showInfo, globalReleased, version};
                })
                // 得到数据，对数据进行处理
                 //对数据进行分类
                // console.log(data)
             let dataMap = {};
             newData.map(item=>{
                 if(!dataMap[item.comingTitle]){
                     dataMap[item.comingTitle] = [];
                 }
                 dataMap[item.comingTitle].push(item);
             })
            //  console.log(dataMap);
             resolve([dataMap,newData]);
            })
            .catch(error => {
                console.log(error)
            })
        })
}

