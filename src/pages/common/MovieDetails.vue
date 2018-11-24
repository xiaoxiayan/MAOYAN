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


   </div>
</template>

<script>
import "../../utils/filter";
import { getMovieDetails } from "../../fuwu/movieDetailsfuwu.js";
export default {
  data() {
    return {
      title: "",
      id: "",
      MovieData: {}
    };
  },
  methods: {
    comback() {
      this.$router.back();
    }
  },
  created() {
    console.log(this.$route.params);
    this.title = this.$route.params.name;
    this.id = this.$route.params.id;
    getMovieDetails(this.id).then(result => {
      this.MovieData = result;
      console.log(this.MovieData)
    });
  }
};
</script>

<style lang="scss" scoped>
.MovieDetails {
  width: 100%;
  height: 100%;
  z-index: 11;

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
}
</style>

