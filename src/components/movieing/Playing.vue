<template>
<app-content :style="{top: '88px', bottom: '49px'}" @loadmore="loadMoreData" :canLoadMore="canLoadMore" >
<ul class="playing">
    <li class="playing-item" v-for="item in playingList" :key="item.id"  @click="IntoMovie({name:item.nm,id:item.id,rt:item.rt})" >
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
</app-content>
        
</template>

<script>
// 引入加载数据和加载更多功能
import { getPlayingList,getMorePlayingList } from "../../fuwu/moviefuwu.js";
export default {
data(){
    return{
    playingList: [],
    playingIDS:{} ,
    canLoadMore: true    
    }
},
methods:{
    // 加载更多数据
    loadMoreData(){
            this.canLoadMore = false;
        // 取得要加载的数据ids
        let ids = [...this.playingIDS];
        // 加载的数据是后10条
        ids = ids.splice(this.playingList.length,10)
        let movieId = ids.join(',')
        // 刷新加载数据，加载完成之前不给再发送请求
         this.canLoadMore = false;
        // 执行加载更多数据的函数
    getMorePlayingList(movieId).then(result => {
        this.playingList = [...this.playingList, ...result];
         if(this.playingList.length >= this.playingIDS.length){
                    //加载完毕
                    this.canLoadMore = false;
                }else{
                    //还可以继续加载
                    this.canLoadMore = true;
                }
    })  
    },
    IntoMovie(data){
         this.$router.push({name:'MovieDetails',params:data})
    }

},
created(){
        //初始化请求数据
        getPlayingList().then(({data, ids})=>{
            this.playingList = data;
            this.playingIDS = ids;
        })
    }
}
</script>

<style lang="scss" scoped>
.playing-item{
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
