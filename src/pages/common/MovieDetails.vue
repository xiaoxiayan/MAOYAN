<template>
   <div class="MovieDetails">
            <app-header :title=title>
                <span slot="left" @click="comback()"> &lt;</span>
            </app-header>
            <div class='details-box'>
                <img :src="MovieData.img | replaceWH(85, 115)"/>
                <div class="details-conter">
                   <p>{{MovieData.nm}}</p>
                   <p class="xiaoP">{{MovieData.enm}}</p>

                </div>
                <div class="details-right"> > </div>
            </div>

              <div class="details-cinemas">
                  <day></day>
           <div class="choose">
            <div v-for='(item,index) in choose' 
            :key = index  
            :class="{active: navIndex==index}" 
            class="CC" 
            @click="CityA()"
            >{{item}}</div>
            </div> 
              <div class="cinemas">
              <ul>
              <li v-for="(item,index) in cinemas" :key = item.id @click="cinemasAction(index)">
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
              </div>
              </div>
                <setCom  v-show="navIndex == 0"/>
                <BrandCom v-show="navIndex == 1"/>
                <ServiceCom v-show="navIndex == 2"/>
            <router-view></router-view>
   </div>
</template>

<script>
import "../../utils/filter";
import {mapState} from 'vuex'
import day from './day'
import BrandCom from '../../components/cinemaSetCom/brandCom'
import ServiceCom from '../../components/cinemaSetCom/serviceCom'
import SetCom from '../../components/cinemaSetCom/setCom.vue'

import { getMovieDetails,movieDetailsCinemas } from "../../fuwu/movieDetailsfuwu.js";
export default {
  	components: {	
      day,
    'setCom':SetCom,
    'BrandCom':BrandCom,
    'ServiceCom':ServiceCom
		},
  data() {
    return {
      title: "",
      id: "",
      MovieData: {},
      cinemas:{},
      choose:['全城','品牌','特色'],
      navIndex : null,
      sIndex : ''

      
    }
  },
   methods:{
        CityA(){
            console.log('点了')
        // console.log(index);
        // if (this.navIndex != index ){
        //   this.navIndex = index
        //   this.sIndex = index
        // }else{
        //   this.navIndex = null
        //   this.sIndex = ''   
        // }
      }
  },
   computed:{
        ...mapState(['cityID'])        
    },
  methods: {
    comback() {
      this.$router.back();
    },
    cinemasAction(index){
      console.log('点击了影院',this.cinemas)
      let movieId = this.$route.params.id
      let day = new Date();
			let dat = day.toLocaleDateString().replace(/\//g, '-');
//				console.log(dat)
			this.$router.push({name: 'cinameMovie',query: {movieId: movieId,data: dat,cinameId: this.cinemas[index].id,pri: this.cinemas[index].sellPrice}})
    }
  },
  created() {
    this.title = this.$route.params.name;
    this.id = this.$route.params.id;
    getMovieDetails(this.id).then(result => {
      this.MovieData = result;
      console.log(this.MovieData)
    });
    movieDetailsCinemas(this.cityID,this.id).then(result=>{
        this.cinemas = result.cinemas
        console.log(this.cinemas)
    })
  }
};
</script>

<style lang="scss" scoped>
.MovieDetails {
  width: 100%;
  height: 100%;
  z-index: 11;
	position: absolute;
  background-color: #fff;
  .details-box {
    display:flex;
    box-sizing: border-box;
    width: 100%;
    padding: 19px 30px 19px 15px;
    margin-top: 44px;
    background-color: #333;
    position: relative;
    
    img{
      width: 110px;
      height: 150px;
      display:inline-block;
    }
    .details-conter {
      overflow-x: hidden;
      flex: 1;
      margin-left: 12.5px;
      line-height: 1;
      color: #fff;
        font-size: 20px;
        font-weight: 700;
            p{
            margin-top: 2px;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
            }
            .xiaoP{
                    margin-top: 10px;
                font-size: 12px;
                font-weight: normal;
            }
         }
    .details-right{
        width: 5%;
        height: 5%;
        color: #fff;
        position: absolute;
        top: 50%;
        right:0;
        transform:translateY(-50%) 
    }
  }
  .details-cinemas{


  .choose {
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  position: absolute;
  top: 278px;
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
.cinemas{
  position: absolute;
  top:322px;
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
}
}
</style>

