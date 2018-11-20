<template>
<div>
<div class="page" id  = 'movie'>        
<app-header title="猪儿虫"></app-header>
    <header class="sub-header">
        <span class="city-icon" @click="chooseCity()">
                {{city}}
        </span>
        <nav class="nav">
            <li v-for="(navItem, index) in navList" :key="index"
                :class="{active: navIndex==index}" @click="navAction(index)">
                {{navItem}}
            </li>
        </nav>
        <span class="search-icon" @click="toFind()">
            <img src="../../assets/search.png"/>
        </span>
    </header>
    <!-- 内容 -->
    <keep-alive>
            <playing v-if="navIndex==0">
            </playing>
            <coming v-if="navIndex==1"/>
     </keep-alive>
</div>
    <router-view></router-view>
</div>
    
</template>

<script>
// 引入子组件
import playing from '../../components/movieing/Playing'
import Coming from '../../components/movieing/Coming'
//使用VUEX管理城市列表数据
import {mapState} from 'vuex'

//获取数据，引入操作数据的文件
export default {
   components: {
        'playing': playing,
        'coming': Coming,
    },
  data() {
    return {
      navList: ["正在热映", "即将上映"],
      navIndex: 0,
    
    };
  },
   computed: {
        ...mapState(['city'])
    },
  methods: {
    navAction(index) {
      this.navIndex = index;
    },
    // 进入搜索
    toFind(){
      console.log(11)
      this.$router.push('/movie/find')
    },
    //进入城市
    chooseCity(){
      console.log(1111)
        this.$router.push('movie/cityList')
    }
  },
 
}
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
  .city-icon {
    flex: 1;
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
  .nav {
    width: 60%;
    display: flex;
    li {
      flex: 1;
      text-align: center;
      line-height: 44px;
      font-weight: bold;
      &.active {
        color: #f03d37;
        border-bottom: 2px solid #f03d37;
      }
    }
  }
  .search-icon {
    flex: 1;
    img {
      width: 24px;
      margin: 10px auto;
    }
  }
}
</style>