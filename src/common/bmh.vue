<template>
	<div class="bmh">
		<div class="img">
			<img :src="deal.imageUrl.replace(/w.h/,'440.0')" alt="" />
			<span v-if="deal.cardTag">HOT</span>
		</div>
		<div class="rig">
			<div class="title">
				<span>{{deal.recommendPersonNum>=3?"多人":(deal.recommendPersonNum==1?"单人":"双人")}}</span>	
				{{deal.title}}
			</div>
			<span class="pri">
				<span>￥</span>
				<span style="font-size: 0.17px;">{{deal.price}}</span>
			</span>
			<div class="ys">
				{{deal.curNumberDesc}}
			</div>
			<div class="buy">
				去购买
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["deal"]
}
</script>

<style lang="scss" scoped>
.bmh {
	cursor: pointer;
	position: relative;
    width: 100%;
	padding: 13px 0;
	overflow: hidden;
    border-top: 1px solid #eee; 
    .img {
    	display: inline-block;
		width: 92px;
		height: 92px;
		float: left;
		span {
				position: absolute;
				left: 0;
				top: 13px;
				width: 36px;
				height: 18px;
				line-height: 18px;
				background-color: #fa5939;
				font-size: 12px;
				padding: 0 5px;
				color: #fff;
				border-bottom-right-radius: 20px;
			}
		img {
			width: 100%;
			height: 100%;
			float: left;		
		}
    }
	.rig {
		margin: 0 15px 0 102px;
		height: 92px;
		overflow: hidden;
		.ys {
			position: absolute;
			bottom: 50px;
			right: 15px;
			line-height: 16px;
			height: 16px;
			font-size: 12px;
			color: #999;
		}
		.buy {
			position: absolute;
			right: 15px;
			bottom: 16px;
			display: inline-block;
			padding: 0 8px;
			height: 27px;
			line-height: 27px;
			font-size: 12px;
			border-radius: 30px;
			color: #fff;
			background-color: #f03d37;
		}
		.title {
			font-size: 14px;
			line-height: 18px;
			color: #333;
			overflow: hidden;
			text-overflow: ellipsis;
			span {
				vertical-align: top;
				margin-top: 10px;
				margin-right: 7px;
				padding: 0 4px;
				font-size: 10px;
				line-height: 15px;
				height: 15px;
				background: #f90;
				border-radius: 20px;
				color: #fff;
			}
		}
		.pri {
			color: #f03d37;
			font-size: 14px;
			position: absolute;
			bottom: 15px;
		}
	}
}	
</style>