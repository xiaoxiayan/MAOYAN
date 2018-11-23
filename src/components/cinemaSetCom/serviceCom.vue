<template>
    <div class="Service">
        <div class="content">
            <div class="top">
                <h2>特色功能</h2>
                <div>
                    <span :class="{active: index == topIndex}" class="item" v-for="(item, index) in serviceList" :key="index" @click="topSelected(index)">{{item.name}}</span>
                </div>
                <h2>{{tstName}}</h2>
                <div>
                    <span :class="{active: index == bottomIndex}" class="item" v-for="(item, index) in tstList" :key="index" @click="bottomSelected(index)">{{item.name}}</span>
                </div>
            </div>
            <div class="bottom">
                <span class="reset" @click="reset()">重置</span>
                <span class="yes" @click="yes()">确认</span>
            </div>
        </div>
    </div>
</template>

<script>
import {setCityAndBrandAndService, getServiceData} from '../../fuwu/cinemasfuwu'
import {mapState} from 'vuex'
export default {
    name:'service-com',
    data(){
        return {
            tabList: ['商区', '地铁站'],
            selectIndex: 0,
            // 获取的数据
            serviceList: [],
            timeRangesList: [],
            topIndex:0,
            bottomIndex:0,
            tstName:'',
            tstList:[],
            isShow:true
        }
    },
    computed:{
        ...mapState(['city']),
        ...mapState(['cityID'])        
    },
    methods:{
        // 特色功能选择
        topSelected(index){
            this.topIndex = index;
        },
        // 特殊厅选择
        bottomSelected(index){
            this.bottomIndex = index;
        },
        // 重置
        reset(){
            this.topIndex = 0;
            this.bottomIndex = 0;
        },
        // 确认
        yes(){
            this.$center.$emit('close','null');
        }
    },
    created(){
        setCityAndBrandAndService(this.cityID).then(({brand,district,service,subway,timeRanges})=>{
            // this.brandList = brand.subItems;
            // this.districtList = district.subItems;
            this.serviceList = service.subItems;
            // console.log(this.serviceList);
            // this.subwayList = subway.subItems;
            // this.timeRangesList = timeRanges.subItems;
            // console.log(this.brandList, this.districtList, this.serviceList, this.subwayList, this.timeRangesList);
            // console.log(this.districtList);
            // console.log(typeof this.districtList);
            // console.log(district.subItems[1].subItems);
            // console.log(1111);
            // console.log(brand,district,service,subway,timeRanges);
        }),
        getServiceData(this.cityID).then((data)=>{
            this.tstName = data.name;
            this.tstList = data.subItems;
        })
        
    }
}
</script>

<style lang="scss" scoped>
.Service{
    top:23.3%;
    
    width: 100%;
    height: 76.7%;
    position: absolute;
    z-index: 3;
    background: rgba(134, 129, 129, 0.5);
    .content{
        width: 100%;
        height: 80%;
        background: #fff;
        .top{
            width: 100%;
            height: 80%;
            padding: 0 10px;
            overflow: auto;
            h2{
                line-height: 40px;
            }
            .item{
                display: inline-block;
                min-width: 30px;
                height: 35px;
                padding: 0 10px;
                text-align: center;
                line-height: 35px;
                font-size: 13px;
                border: 1px solid #ccc;
                border-radius: 5px;
                margin-right:10px;
                margin-bottom: 10px;
                &.active{
                    color: #f03d37;
                    border-color: #f03d37;
                    background: #fcf0f0;
                }
            }
        }
        .bottom{
            width: 100%;
            height: 20%;
            padding: 0 20px;
            background: #fafafa;
            padding: 6% 10px;
            .reset{
                display: inline-block;
                width: 60px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                background: #fafafa;
                border: 1px solid #999;
                border-radius: 5px;
            }
            .yes{
                display: inline-block;
                float: right;
                width: 60px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                color: #fff;
                background: #f03d37;
                border-radius: 5px;
            }
        }
    }
}
</style>
