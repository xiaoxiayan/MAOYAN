<template>
<div id="city-list" class="page subpage" :style="{ background: '#e6e6e6'}">
    <app-content :style="{top: 0, bottom: 0}" ref="content">
        <div>
             <h6>最近访问城市</h6>
             <p class="local" :key="local.id"  >{{local.city}}</p>
        </div>
        <div v-for="cityMap in data" :key="cityMap.key" ref="list">
            <h6>{{cityMap.key}}</h6>
            <ul>
                <li v-for="item in cityMap.value" :key="item.id"
                    @click="selectCityAction(item)"  class="city">
                    {{item.nm}}
                </li>
            </ul>
        </div>
    </app-content>
    <nav class="nav-bar">
        <li class="nav-item" v-for="(item, index) in keys" :key="item" @click="btnAction(index)">
            {{item}}
        </li>
    </nav>
</div>
</template>

<script>
import {getCityListData} from '../../fuwu/appService'
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            data: [],
            keys: [],
            local:localStorage
          
        }
    },
    methods: {
        ...mapActions(['selectCity']),
        btnAction(index){
            //跳转到指定的字母的城市列表中
            //计算需要滚动的高度
            let height = 0;
            for(let i = 0; i < index; i++){
                height += this.$refs.list[i].offsetHeight;
            }     
            //让滚动视图滚动
            this.$refs.content.scrollTo(height);
        },
        selectCityAction(item){
            //将选中的城市保存，保存到全局数据中
            this.selectCity({
                city: item.nm,
                id: item.id
            })

            // 返回上一页
            this.$router.back();
        }
    },
    created(){
        // 去本地存储数据，如果没有就请求，如果有就直接使用
        getCityListData().then(({data, keys})=>{
            // 本地存储数据，以便下次使用
            this.data = data;
            this.keys = keys;
        })
    }
}
</script>

<style lang="scss" scoped>
#city-list{
    background: #ebebeb;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 49px;
    overflow: hidden;

    .local{
    background: #fff;
    width: 29%;
    height: 33px;
    padding: 0 4px;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    line-height: 33px;
    text-align: center;
    box-sizing: border-box;

    }
    h6{
        height: 30px;
        margin-left: 15px;
    }
    .city{
    background-color: #f5f5f5;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #c8c7cc;
    }
     
}
.nav-bar{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    .nav-item{
        font-size: 14px;
        padding: 0 6px;
    }
}
</style>

