// 配置 发送请求需要的API接口，根据文档

// 一般常亮命名用纯大写
const SAT_HOST = 'http://localhost:8080';



// 正在热映的接口
// 参数：token 用户标识
const PLAYING_API ='/ajax/movieOnInfoList';

// 加载更多的接口
//参数：
// token 用户标识
// movieIds  请求的电影id
const MORE_PLAYING_API = '/ajax/moreComingList'

/*
最受期待的电影数据接口
参数：ci 城市id
     limit   数据长度
     offset   数据偏移量
     token  用户标识
*/
const MOST_EXPECTED_API = '/ajax/mostExpected';


//即将上映的接口

const COMING_API = '/ajax/comingList'

//搜索电影和电影院数据
// 参数 kw  输入内容
//     cityId  城市ID
//     stype  消息类型？

const FIND_API = '/ajax/search'

export default 
{
    SAT_HOST,
    PLAYING_API,
    MORE_PLAYING_API,
    COMING_API,
    MOST_EXPECTED_API,
    FIND_API


}