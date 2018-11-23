//开发环境
const SAT_HOST = 'http://localhost:8080';
//测试
const UAT_HOST = 'http://10.213.12.98:8080';
//生产
const PRO_HOST = 'https://m.maoyan.com';


/*
正在热映的接口
参数： token 用户标识
*/
const PLAYING_API = '/ajax/movieOnInfoList';

/*
更多正在热映数据的接口
参数：
    token 用户标识
    movieIds  请求的电影id
*/
const MORE_PLAYING_API = '/ajax/moreComingList';



/*
最受期待的电影数据接口
参数：ci 城市id
     limit   数据长度
     offset   数据偏移量
     token  用户标识
*/
const MOST_EXPECTED_API = '/ajax/mostExpected';


/*
加载更多即将上映的接口
参数 ci
     token
     limit=10
     offset
*/
const MORE_EXPECTED_API = '/ajax/mostExpected'

/*
即将上映的接口
参数： ci   城市id
      token   用户标识
      limit   数据长度
*/
const COMING_API = '/ajax/comingList';


/*
加载更多即将上映的接口
参数 ci
     token
     limit=10
     movieIds
*/
const MORE_COMING_API = '/ajax/moreComingList'

/*
获取影院的接口
参数 day=2018-11-15
     offset=0
     limit=20
     item=&updateShowDay=true&reqId=1542287031403
     cityId=30
*/
const GETCINEMA_API = '/ajax/cinemaList'





/*
搜索的接口
参数 kw: 
    cityId: 30
    stype: 2
*/
const SEARCH_API = '/ajax/search'



/*
城市列表接口
*/
const CITY_LIST_API = '/dianying/cities.json';


/*
全城/品牌/特色接口
参数: ci=1

*/
const SET_DIS_BRAND_SERVICE_API = '/ajax/filterCinemas'


/*
获取特色厅数据
参数 ci=30
*/

const GET_TST_API = '/ajax/filterCinemas'

/*
获取点击的电影数据
参数 movieId=42964
*/
const DETAIL_MOVIE_API = '/ajax/detailmovie'

/*
获取播放时间的接口
参数 forceUpdate=1542613465679
*/
const GET_TIME_API = '/ajax/movie'


/*
获取电影详情页里面的电影院列表
参数 ?forceUpdate=1542791288195
*/
const GET_CINEMA_LIST_API = '/ajax/movie'


export default {
    SAT_HOST,
    UAT_HOST,
    PRO_HOST,
    PLAYING_API,
    MORE_PLAYING_API,
    MOST_EXPECTED_API,
    MORE_EXPECTED_API,
    COMING_API,
    MORE_COMING_API,
    GETCINEMA_API,
    SEARCH_API,
    CITY_LIST_API,
    SET_DIS_BRAND_SERVICE_API,
    GET_TST_API,
    DETAIL_MOVIE_API,
    GET_TIME_API,
    GET_CINEMA_LIST_API
}


