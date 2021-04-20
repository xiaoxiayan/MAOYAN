<template>
	<div class="cinamedetail">
		<app-header></app-header>
		<div class="add">
		     <div class="add_top">
		         <div class="p">
		             <p class="pone">{{listData.cinemaData.nm}}</p>
		             <p class="ptwo">{{listData.cinemaData.addr}}</p>
		         </div>
		         <div class="add_top_right">
		         	  <img src="" alt="" />
		         </div>
		     </div>
		     <div class="pic" ref="pic">
		     	<div class="pic_in swiper-wrapper" :style="{width: wid}">
		     		<div class="swp swiper-slide" v-for="(item, index) in listData.showData.movies">
		     			<img :src="item.img.replace(/w.h/, '148.208')" alt="" />
		     		</div>
		     	</div>
		     </div>
		     <div class="p_b">
		     	<p class="on">
		     		<span>{{dat[0].nm}}</span>
		     		<span class="col">{{dat[0].sc!="0.0"?dat[0].sc+'分':"暂无评分"}}</span>
		     	</p>
		     	<p class="line">
		     		 {{dat[0].desc}}
		     	</p>
		     </div>
		</div>
		<!--////-->
		<div class="day">
			<p>今天11月22日</p>
			<p>今天11月23日</p>
		</div>
		<!--////-->
		<div class="gp">
			<div class="vip">
				<div class="vip_in">
						<span class="vone">{{listData.showData.vipInfo[0].tag}}</span>
						<span class="vtwo">{{listData.showData.vipInfo[0].title}}</span>
						<span class="vthree">{{listData.showData.vipInfo[0].process}}</span>
				</div>
			</div>
			<cin :detail="item" :pri="$route.query.pri" :timed="constime" v-for="(item, index) in detail[0].plist"></cin>
		</div>
		<div class="combo">
			<div class="out">
				 <div class="title">
				 	影院超值套餐
				 </div>
				 <bmh :deal="item" v-for="(item, index) in listData.dealList.dealList"></bmh>
			</div>
		</div>
	</div>
</template>

<script>
import { cinameDet } from '../../fuwu/movieDetailsfuwu.js'
import cin from '../../common/cin'
import bmh from '../../common/bmh'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
export default {
//	porps: {
//		movieId: Number,
//		data: String
//	},  
      data(){
      	return {
      		listData: [],
      		movieId: this.$route.query.movieId,
      		detail: [],
      		constime: 0,
      		dat: []
      	}
      },
		components: {
			cin,
			bmh
		},
		computed: {
			wid(){
				return 0.9*this.listData.showData.movies.length+'px'
			}
		},
		watch: {
			listData(){
				this.$nextTick(()=>{
					this.useSwiper()
				})
			}
		},
	created(){
//		console.log(swiper)
		console.log(this.$route.query)
	
		cinameDet(this.$route.query.movieId, this.$route.query.cinameId).then(val=>{
			
			this.listData = val
			let cinlist = this.listData.showData.movies.filter(item=>{
					return item.id == this.movieId? item : null
			})
			this.dat = cinlist
			this.detail = cinlist[0].shows
			this.constime = cinlist[0].dur 
			console.log(cinlist)
		})
	},
	methods: {
		useSwiper(){
			let mySwiper = new Swiper(".pic",{
				slidesPerView: 5,
                centeredSlides: true,
                slideToClickedSlide: true,
			})
		}
	}
}
</script>

<style lang="scss" scoped>
// @import "../../../node_modules/swiper/dist/css/swiper.css";
.cinamedetail {
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 8;
	/*background: #fff;*/
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	.gp {
		width: 100%;
	    background: #fff;
	    .vip {
	    	width: 100%;
	    	height: 42px;
	    	background-color: #fff5ea;
	    	display: flex;
	    	justify-content: center;
	    	.vip_in {
	    		width: 345px;
	    		height: 42px;
	    		display: flex;
	    		justify-content: flex-start;
	    		.vone {
	    			border-radius: 2px;
					font-size: 10px;
					line-height: 15px;
					height: 15px;
					width: 34px;
					text-align: center;
					color: #fff;
					margin-top: 13px;
					margin-right: 10px;
					background-color: #ff941a;
	    		}
	    		.vtwo {
	    			width: 240px;
	    			height: 42px;
	    			line-height: 42px;
	    			text-align: left;
	    			text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					font-size: 12px;
					color: #fa9600;
	    		}
	    		.vthree {
	    			flex: 1;
	    			line-height: 42px;
					color: #999;
					font-size: 12px;
	    		}
	    	}
	    }
	}
	.combo {
		width: 100%;
		background: #fff;
		border-top: 0.1px solid #eee;
		.out {
			margin: 0 0 0 15px;
			.title {
				width: 36px;
				height: 45px;
				line-height: 45px;
				height: 45px;
				font-size: 15px;
				color: #666;
			}
		}
	}
	.add {
		width: 100%;
		height: 276px;
		margin-top: 44px;
		background: #fff;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		.p_b {
			flex: 1;
			padding: 11px 15px;
			text-align: center;
			border-bottom: 1px solid #eee;
			.on {
				    height: 24px;
				    line-height: 24px;
				    font-size: 17px;
				    color: #333;
				    font-weight: 700;
				    text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					display: flex;
					justify-content: center;
					.col {
						color: #ffb400;
						font-size: 16px;
						margin-left: 8px;
						padding-top: 2px;
					}
				
			}
			.line {
				margin-top: 2px;
				height: 19px;
				line-height: 16px;
				font-size: 13px;
				color: #999;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				margin-top: 8px;
			}
		}
		.pic {
			width: 100%;
			height: 135px;
			background: #222222;
			overflow: auto;
			.pic_in {
				height: 127px;
				/*padding: 0.2px 0.15px 0.2px 0.05px;*/
			    display: flex;
			    align-items: center;
				.swp {
					width: 75px;
					height: 95px;
					float: left;
					padding-left: 10px;
					img {
						width: 100%;
						height: 100%;
						float: left;
					}
				}
			}
		    
		}
		.add_top {
			position: relative;
            padding: 15px 10px 15px 15px;
            .p{
            	.pone {
            		font-size: 17px;
					line-height: 24px;
					font-weight: 700;
					color: #333;
            	}
            	.ptwo {
            		    margin-top: 2px;
					    font-size: 13px;
					    line-height: 19px;
					    color: #999;
					    text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;

            	}
            }
            .add_top_right {
            	position: absolute;
				right: 0;
				top: 50%;
				width: 70px;
				height: 31px;
				transform: translateY(-50%);
				border-left: 1px solid #d8d8d8;
				text-align: center;
				display: flex;
				justify-content: center;
				img {
				    /*float: left;*/
					width: 19px;
					height: 22px;
					margin-top: 5px;
					
				}
            }
		}
	}
	.day {
		width: 100%;
		height: 45px;
		display: flex;
		background: #fff;
        justify-content: flex-start;
        border-bottom: 1px solid #eee;
        p {
        	margin: 0 15px;
			height: 45px;
			text-align: center;
			line-height: 45px;
			font-size: 14px;
			
        }
	}
}
	
</style>