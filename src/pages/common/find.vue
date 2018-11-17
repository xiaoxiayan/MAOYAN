<template>
    <div id="find" class="page">
        <app-header title='猫眼电影'>
            <span slot="left" @click="comback()"> &lt;</span>
        </app-header>
        <div class="searchBox">
        <div class="search">
            <img src="../../assets/search.png" alt="">
            <input type="text" name="" id="" placeholder="搜电影、搜影院" v-model="message" >
        </div>
            <span class="cancel" @click="comback()">取消</span>
        </div>
        <!-- 搜索出来的内容 -->
        <app-content :style="{top: '93px', bottom: '49px'}"  v-if="message">
        <div class="type">电影/电视剧/综艺</div>
        <ul class="finding">
          <li class="finding-item" v-for="item in findList" :key="item.id">
            <div class="item-img">
             <img :src="item.img"/>
            </div>
            <div class="item-content">
              <div class="nm">{{item.nm}} </div>
             <p class="movie-name">{{item.enm}}</p>
             <p>
              {{item.cat}}
             </p>
             <p>
              {{item.rt}}
             </p>
            </div>
       <div class="fen" v-if="item.sc != 0">
         {{item.sc}} 
          <span>分</span>   
        </div>
        <div v-else>暂无评分</div>
    </li>
</ul>
<ul class="cinemas">
        <div class="type">影院</div>
      <li class="cinemasList" v-for= 'item in cinemas' :key = 'item.id'>
        <div> 
            <div class="title">{{item.nm}} </div>
            <span>
              {{item.sellPrice}}元起
            </span>
          
        </div>
        <p>{{item.addr}} 
           <span>
          {{item.distance}}
           </span>
        </p>
     
      </li>
</ul>
</app-content>
</div>      
</template>

<script>
import {searchMovie} from '../../fuwu/findfuwu.js';
export default {
    data(){
        return{
           message:'',
           findList:[],
           cinemas:[],
           findListmore:'',
           cinemasmore:''
        }
    },
  methods: {
    comback() {
      this.$router.back();
    }
  },
  watch:{
    
      message:function(){
        setTimeout(() => {
            searchMovie(this.message).then(result=>{
            console.log(result)
            this.findList = result.obj.newData,
            this.cinemas =result.obj.DataCinemas,
            this.findListmore= result.obj.moreCinemas,
            this.cinemasmore = result.obj.moreMovies
            console.log(this.findList)
        })
          
        }, 500);
      



      }
  },
}
</script>

<style lang="scss" scoped>
#find {
  width: 100%;
  z-index: 10;
  height: 100%;
  position: absolute;
  background: #fff;
  .searchBox {
    width: 100%;
    margin-top: 44px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e5e5e5;
    padding: 8px 0 8px 10px;
    display: flex;

    .search {
      width: 80%;
      display: flex;
      height: 30px;
      border: 1px solid #e6e6e6;
      border-radius: 5px;
      background-color: #fff;
      img {
         margin: 5px;
        width: 15px;
        height: 15px;
      }
      input {
        outline: none;
        border: none;
        height: 28px;
      }
    }
    .cancel {
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      font-size: 16px;
      color: #f03d37;
    }
  }
  .type{
    height: 40px;
    font-weight:400;
    color:#999;
    margin-left: 12px;
    line-height: 40px;
    font-size: 14px;
  }
  .finding{
    width: 100%;
    .finding-item{
    box-sizing: border-box;
    width: 100%;
    padding: 12px;
    border-top: 1px solid #e6e6e6;
    // height: 103px;
    display: flex;
    justify-content: space-between;
    position: relative;
   .item-img{
    margin-right: 10px;
    width: 64px;
    height: 90px;
  
    img{
    width: 64px;
    height: 90px;
    }
    }
    .item-content{
     width: 57%;
     
    .nm{
      font-weight: 700;
      font-size: 17px;
       white-space:nowrap;
       overflow:hidden;
       text-overflow:ellipsis;
       margin-bottom:5px;
    }
    P{
      margin-top: 2px;
      font-size: 13px;
      color: #666;
      white-space:nowrap;
       overflow:hidden;
       text-overflow:ellipsis;
    }
    }
   
    }
    .fen{
      width: 20%;
      color: #fa0;
      font-size: 16px;

      right:0;
      span{
      
        font-size:10px ;
      }
    }

  }
}
</style>
