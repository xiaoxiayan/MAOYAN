<template>
<div>
    <div class='page' id="cinemas">
    <app-header title='影院'></app-header>
    <header class="sub-header">
        <span class="city-icon" @click="chooseCity()">
                {{city}}              
        </span>
        <div class="find">  <span>搜影院</span></div>
       
    </header>
   <div class="choose">
            <div class="CC" @click="CityAction()">全城</div>
            <div class="CC" @click="BrandAction()">品牌</div>
            <div class="CC" @click="TcAction()">特色</div> 
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
    <router-view></router-view>
</div>
</template>

<script>
import { getcinemas,setCityAndBrandAndService,getServiceData } from "../../fuwu/cinemasfuwu.js";
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
      },
      
  },
  methods:{
      initData(){
            getcinemas(this.cityID).then(result => {
            this.cinemasList = result;
           });
      },
      chooseCity(){
        console.log('选择了城市')
        this.$router.push('/cinema/cityList')
      },
      CityAction(){
        console.log('全城');
        this.$router.push('/cinema/setCom')
        
      },
      BrandAction(){
        console.log('品牌')
        this.$router.push('/cinema/brandCom')
        
      },
      TcAction(){
        console.log('特色')
        this.$router.push('/cinema/serviceCom')
        
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
  .find{
    width: 60%;
    margin-top:5px;
    align-items: center;
    height: 28px;
    font-size: 13px;
    color: #b2b2b2;
    margin-left: 18px;
    border: .5px solid #e6e6e6;
    border-radius: 5px;
    text-align: center;
    line-height: 28px;
  }
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