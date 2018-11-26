<template>
	<div class="day swiper-container">
		<ul class="day_ul swiper-wrapper" :style="{width: wid}">
			<li class="swiper-slide" v-for="(item,index) in 7" :key=index>{{item<=3?date[item-1]:day[num+item-1>6?num:num+item-1]}}{{getdata[1]}}月{{Number(getdata[2])+item-1}}日</li>
		</ul>
	</div>
</template>

<script>
export default {
	data(){
		return {
			len: 7,
			date: ["今天","明天","后天"],
			day: ["周日","周一","周二","周三","周四","周五","周六"],
			num: 0
		}
	},
	computed: {
		wid(){
			return 7*115 + "px"
		},
		getdata(){
   	     	var day = new Date();
   	     	var mytime=day.toLocaleDateString().split('/');
   	     	return mytime
   	    }
	},
	created(){
		let gday = new Date()
		gday = gday.getDay()
		this.num = gday
		console.log(gday)	
	},
	moutend(){
		var mySwiper = new Swiper('.swiper-container', {
			virtual: true,
        })
	}
}
</script>

<style lang="scss" scoped>
.day {
	width:100%;
	height: 45px;
	position: absolute;
	top: 232px;
	left: 0;
	background: #fff;
	overflow-x: auto;
	overflow-y: hidden;
	border-bottom: 1px solid #eee;
	.day_ul {
		
		
		li {
			display: inline-block;
			float: left;
			width: 115px;
			line-height: 43px;
			margin-left: 4.5px;
			font-size: 14px;
			text-align: center;
			list-style: none;
			color: #666;
		}
	}
	
}
</style>