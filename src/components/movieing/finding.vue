<template>
<app-content :style="{top: '88px', bottom: '49px'}" @loadmore="loadMoreData" :canLoadMore="canLoadMore" >
<ul class="playing">
    <li class="playing-item" v-for="item in playingList" :key="item.id">
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
        console.log('需要加载更多数据')
            this.canLoadMore = false;
        console.log(this.playingIDS)
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