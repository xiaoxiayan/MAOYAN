<template>
<div>
    <div class='page' id="cinemas">
    <app-header title='影院'></app-header>
    <header class="sub-header">
        <span class="city-icon" @click="chooseCity()">
                {{city}}              
        </span>
        <div class="find"><span>搜影院</span></div>
       
    </header>
   <div class="choose">
    <div v-for='(item,index) in choose' 
    :key = index  
    :class="{active: navIndex==index}" 
    class="CC" 
    @click="CityAction(index)"
    >{{item}}</div>
    </div> 
    <app-content>
        <ul>
          <li v-for="item in cinemasList" :key = item.id @click='IntoMovie()'>
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
    <setCom  v-show="navIndex == 0"/>
    <BrandCom v-show="navIndex == 1"/>
    <ServiceCom v-show="navIndex == 2"/>
</div>
</template>

<script>
import {getcinemas,setCityAndBrandAndService,getServiceData} from "../../fuwu/cinemasfuwu.js";
import {mapState} from 'vuex'
import BrandCom from '../../components/cinemaSetCom/brandCom'
import ServiceCom from '../../components/cinemaSetCom/serviceCom'
import SetCom from '../../components/cinemaSetCom/setCom.vue'
export default {
  components:{
    'setCom':SetCom,
    'BrandCom':BrandCom,
    'ServiceCom':ServiceCom
  },
  data() {
    return {
      choose:['全城','品牌','特色'],
      cinemasList: [],
      isshow:false,
      navIndex : null,
      sIndex : ''
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
      CityAction(index){
        console.log(index);
        if (this.navIndex != index ){
          this.navIndex = index
          this.sIndex = index
        }else{
          this.navIndex = null
          this.sIndex = ''   
        }
      },
     IntoMovie(){
            console.log('点解了')
            this.$router.push('./MovieDetails')
    }
      
      
  },
  created() {
     this.initData()
     this.$center.$on('close',(data)=>{
       console.log('监听到了',data)
       this.navIndex = data
     })
     this.$center.$on('setCity',(data)  => {
       console.log(data)
       this.choose.splice(this.sIndex,1,data)
     })
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