<template>
  <app-content :style="{top: '88px', bottom: '49px'}" @loadmore="loadMoreData" :canLoadMore="canLoadMore">
<div class="coming">
    <div class="expected">
        <p class="title">近期最受期待</p>
        <h-scroll class="expected-list">
            <li  class="expected-item" v-for="item in expectedList" :key="item.id"> 
                <img :src="item.img | replaceWH(85, 115)"/>
                <p class="wantlook">
                    {{item.wish}}人想看
                </p>

            </li>
        </h-scroll>
    </div>
    <div v-for="(list, key) in comingMap" :key="key">
        <p class="wantLook-day">{{key}}</p>
        <ul>
            <li v-for="item in list" :key="item.id" class="coming-item">
                 <div class="item-img">
                     <img :src="item.img"/>
                </div>
         <div class="item-content">
            <div class="title"><div class="nm">{{item.nm}} </div><div :class="item.version"></div></div>
            <p v-if="item.globalReleased">观众评 <span class="sc">{{item.sc}}</span></p>
            <p v-else>
              <span class="sc"> {{item.wish}} </span>  人想看
            </p>
            <p>主演:<span>{{item.star}}</span></p>
            <p>{{item.showInfo}}</p>
        </div>
        <div class="btn" v-if="item.globalReleased">购票</div>
        <div class='btn comingbtn' v-else>预售</div>
         </li>
       


            
        </ul>
    </div>

</div>
</app-content>
        
</template>

<script>
//引入过滤器，可以自定义各种组件
import '../../utils/filter'
import { getComingList,getMostExpectedData,getmorecoming } from "../../fuwu/moviefuwu.js";

export default {
data(){
        return {
            expectedList: [],
            comingMap: {},
            comingIDS:{},    
            canLoadMore: true,
            comingmore:[]    
            
        }
    },
methods:{
    // 加载更多数据
    loadMoreData(){
        console.log('需要加载更多数据')
            this.canLoadMore = false;
        
          
    //     // 取得要加载的数据ids
        let ids = [...this.comingIDS];        
        // console.log( this.comingmore.length)
    //     // 加载的数据是后10条
        ids = ids.splice(this.comingmore.length,10)
        let movieId = ids.join(',')
    //     // 刷新加载数据，加载完成之前不给再发送请求
         this.canLoadMore = false;
        // console.log(movieId)
    //         // 执行加载更多数据的函数
    getmorecoming(movieId).then(result => {
        this.comingMap =Object.assign(this.comingMap,result[0])  
        this.comingmore = [...this.comingmore,...result[1]] 
        console.log(this.comingMap)
         if(this.comingmore.length >= this.comingIDS.length){
                    //加载完毕
                    this.canLoadMore = false;
                }else{
                    //还可以继续加载
                    this.canLoadMore = true;
                }
    })
        
    }
},
created(){
     getComingList().then(({
         data, ids,newData
     })=>{
            this.comingMap =data;
            this.comingIDS =ids
            this.comingmore = newData
        })
     getMostExpectedData().then(result =>{
        this.expectedList = result;
    })
}
    
};
</script>

<style lang="scss" scoped>
.expected{
    padding: 10px 15px;
    .title{
        margin-bottom: 12px;
        font-size: 14px;
    }
    .expected-item{
        display: inline-block;
        overflow: hidden;
        margin-right: 12px;
        // position: relative;
        img{
        width: 85px;
        height: 115px;
        width: 100%;
        // position: relative;
        }
        .wantlook{
            font-weight: 700;
            font-size: 12px;
            color:rgb(250, 175, 0);
            // position: absolute;  
            z-index: 10;
        }
    }
}
.wantLook-day{
    padding: 12px 15px 0;
    margin: 0;
    font-size: 14px;
    color: #333;
}
.coming-item{
    display: flex;
    padding: 10px;
    justify-content: space-between;
    .item-img{
        width: 64px;
        img{
            width: 100%;
        }
    }
    .item-content{
        display: flex;
        width: 55%;
        font-size: 13px;
        // flex: 1;
        margin-left: 5px;
        border-bottom: 1px solid #e6e6e6;
        flex-direction: column;
        justify-content: space-between;
       p{
            white-space:nowrap;
             overflow:hidden;
            text-overflow:ellipsis;
       }
       .title{ 
             display: flex;      
            //  position: relative;
            .nm{
            //  display: inline-block;
            float: left;
            margin-right: 5px;
            font-size: 17px;
             white-space:nowrap;
             overflow:hidden;
            text-overflow:ellipsis;
            max-width: 70%;
            font-weight: 700;
                  }
           .v3d{
                float: left;
                width: 30%;
                font-size: 14px;
                height: 14px;
                background: url('../../assets/下载.png')no-repeat;
                background-size: 100%;
                // position: absolute;
                margin-top: 5px;
                }

       }
       
        .sc{
            color:rgb(250, 175, 0);
            font-weight: 700;
        }
    }
    .btn{
        width: 47px;
        height: 27px;
        line-height: 27px;
        text-align: center;
        background: red;
        color: #fff;
        font-size: 12px;
        border-radius: 5px;
        margin-top: 10%;
    }
    .comingbtn{
        background: blueviolet
    }
}

</style>