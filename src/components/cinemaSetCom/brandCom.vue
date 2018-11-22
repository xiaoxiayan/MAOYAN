<template>
    <div class="Brand">
        <div class="content">
            <li :class="{active:index == selectIndex}" class="BrandItem" v-for="(item, index) in brandList" :key="index" @click="selectActive(index)">
                <span>{{item.name}}</span><span :style="{float:'right'}">{{item.count}}</span>
            </li>
        </div>
    </div>
</template>

<script>
import {setCityAndBrandAndService} from '../../fuwu/cinemasfuwu'
import {mapState} from 'vuex'
export default {
    name:'brand-com',
    data(){
        return {
            brandList: [],
            selectIndex:0
        }
    },
    computed:{
        ...mapState(['city']),
        ...mapState(['cityID'])        
    },
    methods:{
        selectActive(index){
            this.selectIndex = index;
            setTimeout(()=>{
                this.$center.$emit('close','null');
            },200)
        }
    },
    created(){
        setCityAndBrandAndService(this.cityID).then(({brand,district,service,subway,timeRanges})=>{
            this.brandList = brand.subItems;
        })
    }

}
</script>

<style lang="scss" scoped>
.Brand{
    width: 100%;
    height: 76.7%;
    position: absolute;
    z-index: 3;
    background: rgba(134, 129, 129, 0.5);
    .content{
        width: 100%;
        height: 80%;
        background: #fff;
        overflow: auto;
        .BrandItem{
            width: 100%;
            height: 0.4rem;
            line-height: 0.4rem;
            padding: 0 0.2rem;
            border-bottom: 1px solid #ccc;
            &.active{
                color: #f03d37;
                &::before{
                    content: '√';
                    margin-left: -0.1rem;
                    margin-right: 0.05rem;
                    font-size: 0.16rem;
                }
            }
        }
    }
}
</style>
