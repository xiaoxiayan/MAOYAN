<template>
   <div class="MovieDetails">
            <app-header :title=title>
                <span slot="left" @click="comback()"> &lt;</span>
            </app-header>
     

   </div>
</template>

<script>
import { getPlayingList,getMorePlayingList } from "../../fuwu/moviefuwu.js";

export default {
    data(){
        return{
            title:'',
            id:''
        }
    },
    methods:{
        comback(){
             this.$router.back();
        }
    },
    created(){
        console.log(this.$route.params)
        this.title = this.$route.params.name
        this.id = this.$route.params.id
    }
   
}
</script>

<style>

</style>
