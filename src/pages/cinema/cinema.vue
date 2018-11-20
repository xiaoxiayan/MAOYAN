<template>
<div>
    <div class='page' id="cinemas">
    <app-header title='影院'></app-header>
    <header class="sub-header">
        <span class="city-icon" @click="chooseCity()">
                {{city}}              
        </span>
       <input type="text" name="" id=""  placeholder="搜影院">
       <div></div>
    </header>
   <div class="choose">
            <div class="CC">全城</div>
            <div class="CC">品牌</div>
            <div class="CC">特色</div> 
    </div> 
    <app-content>
        <ul>
          <li v-for="item in cinemasList" :key = item.id>
              <div class="title">
                <span>{{item.nm}}</span>
                <span>{{item.sellPrice}}</span>
                <span>元起</span>
              </div>
              <div class="address"> 
                  <span> {{item.addr}} </span>
                    <span> {{item.distance}} </span>
              </div>

          </li>
        </ul>
    </app-content>
    </div> 
</div>
</template>

<script>
import { getcinemas } from "../../fuwu/cinemasfuwu.js";
import {mapState} from 'vuex'

export default {
  data() {
    return {
      cinemasList: []
    };
  },
  computed: {
        ...mapState(['city'])
  },
  watch:{
      cityID(){
        initData()
      }
  },
  methods:{
      initData(){
            getcinemas(this.cityID).then(result => {
            this.cinemasList = result;
           });
      },
      chooseCity(){
        this.$router.push('cinemas/cityList')
      }
  },

  created() {
     this.initData()
  }
};
</script>

<style lang='scss' scoped>
.sub-header {
  width: 100%;
  height: 44px;
  border-bottom: 1px solid #e6e6e6;
  position: absolute;
  left: 0;
  top: 44px;
  color: #666;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  .city-icon {
    // flex: 1;
    text-align: center;
    line-height: 44px;
    &::after {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-top: 6px solid #666;
      transform: translateY(4px);
    }
  }
}
.choose {
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  position: absolute;
  top: 88px;
  display: flex;
  border-bottom: 1px solid #e6e6e6;
  .CC {
    width: 33%;
       &::after {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-top: 6px solid #666;
      transform: translateY(4px);
    }
  }
}
.content {
  position: absolute;
  top: 132px;
  bottom: 49px;
  li {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #e6e6e6;
    .title {
      line-height: 23px;
      font-size: 16px;
      color: #000;
    }
  }
}
</style>