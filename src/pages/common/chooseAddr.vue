<template>
<div>
    <div class="choose">
    <div v-for='(item,index) in choose' 
    :key = index  
    :class="{active: navIndex==index}" 
    class="CC" 
    @click="CityAction(index)"
    >{{item}}</div>
    </div>
    <setCom  v-show="navIndex == 0"/>
    <BrandCom v-show="navIndex == 1"/>
    <ServiceCom v-show="navIndex == 2"/>
    </div>
</template>

<script>
import BrandCom from '../../components/cinemaSetCom/brandCom'
import ServiceCom from '../../components/cinemaSetCom/serviceCom'
import SetCom from '../../components/cinemaSetCom/setCom.vue'
export default {
 data() {
    return {
      choose:['全城','品牌','特色'],
      isshow:false,
      navIndex : null,
      sIndex : ''
    }
},
 methods:{
      CityAction(index){
        console.log(index);
        if (this.navIndex != index ){
          this.navIndex = index
          this.sIndex = index
        }else{
          this.navIndex = null
          this.sIndex = ''   
        }
      }
  }
}
</script>

<style lang="scss" scoped>
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
</style>

