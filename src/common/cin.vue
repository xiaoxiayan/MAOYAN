<template>
	<div class="cin">
		<div class="in">
			<div class="one">
				<span class="one_one">{{detail.tm}}</span>
				<span class="two_two"><i>{{tim}}</i>散场</span>
			</div>
			<div class="two">
				<span class="spa_one">{{detail.lang}}&nbsp;{{detail.tp}}</span>
				<span class="spa_two">{{detail.th}}</span>
			</div>
			<div class="three">
				<div class="pri_one">
					<span class="seller">
						<em style="font-size: 0.11px;">￥</em>
						<em>{{pri}}</em>
					</span>
					<span class="rig">
						<div class="m">{{detail.vipPriceName}}</div>
						<div class="g">￥{{detail.vipPrice}}</div>
					</span>
				</div>
				<div class="pri_two">
					{{detail.extraDesc}}
				</div>
			</div>
			<div class="four">
				<div class="btn">
					购票
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["detail","timed","pri"],
	data(){
		return {
			timedd: 0
		}
	},
	computed: {
		tim(){
			this.timedd = this.timed
			let hour = parseInt(this.timedd/60)
			let min = parseInt(this.timedd%60*100)/100
			let tarr = this.detail.tm.split(":")
			hour = hour + Number(tarr[0])
			min = min + Number(tarr[1])
			if(min>=60){
				min = min%60<10?"0"+min%60:min%60
				hour += 1
			}
			if(hour>=24){
				hour = "00"
			}
			return hour + ":" + min
		}
	},
	created(){
//		console.log(this.detail)
		
	},

}	
</script>

<style lang="scss" scoped>
em {
	font-style: normal;
}
.cin {
	padding: 17px 0;
    margin-left: 12.5px;
    border-bottom: 1px solid #eee;
    background: #fff;
    .in {
    	width:100%;
    	height: 42px;
    	display: flex;
    	justify-content: flex-start;
    	.one {
    		width: 55px;
    		height: 100%;
    		display: flex;
    		flex-direction: column;
    		justify-content: flex-start;
    		.one_one {
    			font-size: 20px;
				color: #333;
				line-height: 1;
				white-space: nowrap;
    		}
    		.two_two {
    			margin-top: 10px;
				color: #999;
				font-size: 11px;
				line-height: 1;
				white-space: nowrap;
				i {
					font-style: normal;
				}
    		}
    	}
    	.two {
    		margin-left: 17px;
			width: 96px;
			height: 100%;
			display: flex;
		    flex-direction: column;
		    justify-content: flex-start;
			.spa_one {
				margin-top: 2px;
				line-height: 18px;
				font-size: 13px;
				color: #333;
				white-space: normal;
			}
			.spa_two {
				margin-top: 7px;
				font-size: 11px;
				color: #999;
				white-space: normal;
			}
    	}
    	.three {
    		width: 130px;
    		height: 42px;
    		flex: 0 1 auto;
			width: 130px;
			margin-left: 5px;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			.pri_one {
				width: 100%;
				height: 25px;
				display: flex;
				justify-content: flex-start;
				.seller {
					line-height: 1;
					color: #f03d37;
					margin-top: 1px;
					font-size: 19px;
				}
				.rig {
					height: 14px;
					margin-top: 4px;
					margin-left: 3px;
					border: 1px solid #ff9000;
					border-radius: 2px;
					font-size: 12px;
					display: flex;
					justify-content: flex-start;
					.m {
						display: inline-block;
						color: #fff;
                        background-color: #f90;
                        padding: 0 2px;
                        width: 32px;
                        height: 100%;
                        font-size: 10px;
					}
					.g {
						padding: 0 2px;
						font-size: 10px;
					}
					
				}
			}
			.pri_two {
				flex: 1;
				margin-top: 5px;
				font-size: 11px;
				color: #999;
			}
    	}
    	.four {
    		flex: 1;
    		.btn {
    			width: 45px;
    			height: 27px;
    			line-height: 28px;
				font-size: 12px;
				background-color: #f03d37;
				color: #fff;
				border-radius:4px;
				text-align: center;
    		}
    	}
    }
}	
	
	
</style>