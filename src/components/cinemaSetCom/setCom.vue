<template>
    <div class="con">
        <div class="cityCon">
            <div class="tabNav">
                <li :class="{active:index == selectIndex}" v-for="(item, index) in tabList" :key="index" @click="tabSelect(index)">{{item}}</li>
            </div>
            <div class="cityContent">
                <div class="left">
                    <li v-if="selectIndex == 0" class="leftItem" :class="{selectedLeft:index == leftIndex}" v-for="(item, index) in districtList" :key="index" @click="selectLeftActive(index)">
                        <span class="name">{{item.name}}</span><span>({{item.count}})</span>
                    </li>

                    <li  v-if="selectIndex == 1" v-for="(item, index) in subwayList" :key="index" class="leftItem" :class="{selectedLeft:index == leftIndex}"  @click="selectLeftActive(index)">
                        <span class="name">{{item.name}}</span><span>({{item.count}})</span>
                    </li>


                </div>
                <div class="right">
                    <li v-if="selectIndex == 0" class="rightItem" :class="{selectedRight:index == rightIndex}" v-for="(item, index) in rightDistrictList.subItems" :key="index" @click="selectRightActive(index)">
                        <span class="name">{{item.name}}</span><span :style="{float:'right'}">{{item.count}}</span>
                    </li>

                    <li v-if="selectIndex == 1" class="rightItem" :class="{selectedRight:index == rightIndex}" v-for="(item, index) in rightSubwayList.subItems" :key="index" @click="selectRightActive(index)">
                        <span class="name">{{item.name}}</span><span :style="{float:'right'}">{{item.count}}</span>
                    </li>                  

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {setCityAndBrandAndService} from '../../fuwu/cinemasfuwu'
import {mapState} from 'vuex'
export default {
    name: 'set-con',
    data(){
        return {
            tabList: ['商区', '地铁站'],
            selectIndex: 0,
            // 获取的数据
            districtList: [],
            subwayList: [],
            leftIndex:0,

            rightDistrictList:[],
            rightSubwayList:[],
            rightIndex:0,

            // isShow: true

            
        }
    },
     computed:{
        ...mapState(['city']),
        ...mapState(['cityID'])        
    },
    methods:{
        tabSelect(index) {
            // console.log(index);
            this.selectIndex = index;
            this.rightIndex = 0;
            this.leftIndex = 0;
            this.rightDistrictList = [];
            this.rightSubwayList = [];
        },

        selectLeftActive(index){
            // console.log(index);
            this.leftIndex = index;
            // console.log(this.districtList[index].name);
            this.rightDistrictList = this.districtList[index];
            this.rightSubwayList = this.subwayList[index];
            // console.log(this.rightSubwayList.subItems);
            this.rightIndex = 0;
        },

        selectRightActive(index){
            this.rightIndex = index;
            // console.log(this.rightDistrictList.subItems[index].name);
            setTimeout(()=>{
                this.$center.$emit('close','null');
                this.$center.$emit('setCity',this.rightDistrictList.subItems[index].name);
            },200)
            // this.isShow = false;
        }
    },
    watch:{
        cityID(){
            this.rightDistrictList = [];
            this.rightSubwayList = [];
            setCityAndBrandAndService(this.cityID).then(({brand,district,service,subway,timeRanges})=>{
                // this.brandList = brand.subItems;
                this.districtList = district.subItems;
                // this.serviceList = service.subItems;
                this.subwayList = subway.subItems;
                // this.timeRangesList = timeRanges.subItems;
                this.rightIndex = 0;
                this.leftIndex = 0;

                // console.log(this.brandList, this.districtList, this.serviceList, this.subwayList, this.timeRangesList);
                // console.log(this.districtList);
                // console.log(typeof this.districtList);
            })
        }
    },
    created(){
        setCityAndBrandAndService(this.cityID).then(({brand,district,service,subway,timeRanges})=>{
            this.brandList = brand.subItems;
            this.districtList = district.subItems;
            this.serviceList = service.subItems;
            this.subwayList = subway.subItems;
            this.timeRangesList = timeRanges.subItems;
            // console.log(this.brandList, this.districtList, this.serviceList, this.subwayList, this.timeRangesList);
            // console.log(this.districtList);
            // console.log(typeof this.districtList);
            // console.log(district.subItems[1].subItems);
        })
    }
}
</script>

<style lang="scss">
.con{
    width: 100%;
    height: 76.7%;
    position: absolute;
    z-index: 3;
    background: rgba(134, 129, 129, 0.5);
    .cityCon{
        width: 100%;
        height: 88%;
        position: absolute;
        top: 0;
        left: 0;
        background: #ffffff;
        .tabNav{
            width: 100%;
            height: 44px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-bottom: 1px solid #cccccc;
            li{
                flex: 1;
                text-align: center;
                box-sizing: border-box;
                height: 40px;
                line-height: 40px;
                color: #222;
                &.active{
                    border-bottom: 3px solid #f03d37;
                }
            }
        }
        .cityContent{
            width: 100%;
            height: 90%;
            display: flex;
            overflow: hidden;
            .left{
                flex: 1;
                overflow: auto;
                .leftItem{
                    width: 100%;
                    height:40px;
                    line-height:40px;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    &.selectedLeft{
                        background: #f5f5f5;
                        color: #f03d37;
                    }
                    .name{
                        display: inline-block;
                        max-width:70%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
            .right{
                flex: 2;
                overflow: auto;
                background: #f5f5f5;
                padding:0 10px;
                .rightItem{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    padding-left: 20px;
                    &.selectedRight{
                        color: #f03d37;
                        padding-left: 0;
                        &::before{
                            content: '√';
                            padding-right: 10px;
                        }                       
                    }
                }
            }
        }
    }
}
</style>
