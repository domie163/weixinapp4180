<template>
<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback"
			  :bottom="100">
		<view class="container">
			<view>
				<swiper class="swiper" :indicator-dots='".swiper-pagination"==null?false:true'
					:autoplay='autoplaySwiper' :circular='true' indicator-active-color='#000000'
					indicator-color='rgba(0, 0, 0, .3)' :duration='1000' :interval='intervalSwiper'
					:vertical='"horizontal"=="horizontal"?false:true'>
					<swiper-item v-for="(swiper,index) in swiperList" :key="index">
						<image mode="aspectFill" :src="swiper"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="detail-content">
				<view class="price detail-list-item priceFavor"
					:style='{"boxShadow":"0 0 2rpx rgba(0,0,0,.8)","margin":"0 ","borderColor":"#fff","backgroundColor":"#fff","borderRadius":"0","borderWidth":"0","borderStyle":"solid","height":"68rpx"}'>
			<!-- 名字-->
						<view :style='{"textAlign":"left","fontSize":"45upx","color":"black"}'>{{detail.shipinName}}
						</view>
					<view class="text icon" :style='{"color":"#333","textAlign":"left","fontSize":"28rpx"}'>
						<view v-if="collectionFlag==1" class="cuIcon-favorfill" @click="shoucang"></view>
						<view v-if="collectionFlag==0" class="cuIcon-favor" @click="shoucang"></view>
					</view>
				</view>
   	 <view style="margin-top: 10rpx;"></view>

					<view class="detail-list-item"
						  :style='{"boxShadow":"0 0 4rpx 0 #006633 insta","margin":"0 60rpx 0 60rpx","borderColor":"rgba(218, 218, 218, 1)","backgroundColor":"#fff","borderRadius":"0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"68rpx"}'>
						<view class="lable"
							  :style='{"width":"auto","fontSize":"28rpx","color":"#47EDB5","textAlign":"left"}'>
							视频类型：</view>
						<view class="text" :style='{"color":"#47EDB5","textAlign":"center","fontSize":"24rpx"}'>
                            {{detail.shipinValue}}</view>
					</view>



				<view v-if="!thumbsupFlag&&!crazilyFlag"
					style="padding: 0 24upx;display: flex;align-items: center;justify-content: space-between;"
					:style='{"boxShadow":"0 0 4rpx 0 #006633 insta","margin":"0 60rpx 0 60rpx","borderColor":"rgba(218, 218, 218, 1)","backgroundColor":"#fff","borderRadius":"0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"68rpx"}'>
					赞：{{detail.zanNumber}}
					<image @click="zan" class="icon" src="../../static/gen/zan.png" mode=""></image>
				</view>
				<view v-if="thumbsupFlag"
					style="padding: 0 24upx;display: flex;align-items: center;justify-content: space-between;"
					:style='{"boxShadow":"0 0 4rpx 0 #006633 insta","margin":"0 60rpx 0 60rpx","borderColor":"rgba(218, 218, 218, 1)","backgroundColor":"#fff","borderRadius":"0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"68rpx"}'>
					已赞：{{detail.zanNumber}}
					<image @click="zan" class="icon" src="../../static/gen/zan.png" mode=""></image>
				</view>
				<view v-if="!thumbsupFlag&&!crazilyFlag"
					style="padding: 0 24upx;display: flex;align-items: center;justify-content: space-between;"
					:style='{"boxShadow":"0 0 4rpx 0 #006633 insta","margin":"0 60rpx 0 60rpx","borderColor":"rgba(218, 218, 218, 1)","backgroundColor":"#fff","borderRadius":"0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"68rpx"}'>
					踩：{{detail.caiNumber}}
					<image @click="cai" class="icon" src="../../static/gen/cai.png" mode=""></image>
				</view>
				<view v-if="crazilyFlag"
					style="padding: 0 24upx;display: flex;align-items: center;justify-content: space-between;"
					:style='{"boxShadow":"0 0 4rpx 0 #006633 insta","margin":"0 60rpx 0 60rpx","borderColor":"rgba(218, 218, 218, 1)","backgroundColor":"#fff","borderRadius":"0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"68rpx"}'>
					已踩：{{detail.caiNumber}}
					<image @click="cai" class="icon" src="../../static/gen/cai.png" mode=""></image>
				</view>
			</view>
<!-- 视频 -->
			<view style="text-align: center;padding: 20upx;box-sizing: border-box;background: #FFFFFF;"
				  :style="{margin:'0 60rpx 0 60rpx',boxShadow:'0 0 4rpx 0 #006633 insta'}">
				<view class="uni-padding-wrap uni-common-mt">
					<view>
						<video id="myVideo" style="preload:auto" muted :src="detail.shipinVideo" controls></video>
					</view>
				</view>
			</view>
			<view class="time-content"
				:style='{"boxShadow":"0 0 2rpx rgba(0,0,0,.8)","margin":"0","borderColor":"#fff","backgroundColor":"#fff","borderRadius":"0","borderWidth":"0","borderStyle":"solid","height":"auto"}'>
				<view class="header" :style='{"color":"#333","fontSize":"28rpx"}'>
					简介/详情
				</view>
				<view class="content" style="line-height: 50upx;letter-spacing: 5upx;"
					:style='{"color":"#333","fontSize":"28rpx"}'>
					<rich-text :nodes="detail.shipinContent"></rich-text>
				</view>
			</view>


			<view class="time-content"
				:style='{"boxShadow":"0 0 6rpx rgba(0,0,0,.3)","margin":"0 0 0px 0","borderColor":"red","backgroundColor":"#fff","borderRadius":"0","borderWidth":"0","borderStyle":"solid"}'>
				<view class="comoment-header"
					:style='{"borderColor":"rgba(0,0,0,.2)","backgroundColor":"#fff","borderRadius":"0","borderStyle":"solid","borderWidth":"0 0 2rpx 0"}'>
					<view :style='{"fontSize":"32rpx"}'>
						评论
					</view>
					<view
                            :style='{"borderColor":"red","backgroundColor":"#fff","borderRadius":"0","borderWidth":"0","width":"auto","fontSize":"24rpx","borderStyle":"solid","isBtn":true,"height":"60rpx"}'
                            @click="onCommentTap" class="btn-comment-content" style="display: flex;align-items: center;">
                        <view class="cuIcon-add">添加评论</view>
                    </view>
				</view>

				<view class="cu-list comment" style="margin-top: 20upx;">
					<view
						:style='{"borderColor":"rgba(0,0,0,.2)","backgroundColor":"#fff","borderRadius":"0","borderStyle":"dashed","borderWidth":"0 0 2rpx 0"}'
						v-for="(item,index) in commentList" v-bind:key="index" class="cu-item comment-item">
						<view class="content">
							<view :style='{"textAlign":"left","fontSize":"28rpx"}'
								class="text-grey" v-if="item.yonghuName != null && item.yonghuName != ''">{{item.yonghuName}}</view>
                            <view :style='{"textAlign":"left","fontSize":"28rpx"}'
                                  class="text-grey" v-if="item.Name != null && item.Name != ''">{{item.Name}}</view>
                            <view style="float: right"
									class="text-gray text-df">{{item.insertTime}}</view>
							</view>
							<view :style='{"color":"#666","textAlign":"left","fontSize":"24rpx"}'
								class="text-gray text-content text-df content">
								{{item.shipinLiuyanText}}
							</view>
							<view v-if="item.replyText" :style='{"color":"#666","textAlign":"left","fontSize":"24rpx"}'
								class="text-gray text-content text-df content">
								回复:{{item.replyText}}
							</view>
						</view>
					</view>

				</view>
			</view>

            <view class="bottom-content cu-bar bg-white tabbar border shop">
                <view style="text-align: left;display: flex;">
                </view>
                <view style="text-align: right;">

					<!-- <button @tap="onSubmit" style="margin-right: 10upx;" class="cu-btn bg-red round shadow-blur"
                            :style="{width:'auto',borderRadius:'8rpx',height:'80rpx',fontSize:'28rpx',color:'#fff',backgroundColor:btnColor[3],borderColor:btnColor[3]}">立即购买</button>-->
                </view>
            </view>
		</view>

</mescroll-uni>


</template>

<script>
	export default {
		data() {
			return {
				autoplaySwiper: false ? true : false,
				intervalSwiper: false ? $template2.front.base.swiper.autoplay.delay : 5000,
				btnColor: ['#409eff', '#67c23a', '#909399', '#e6a23c', '#f56c6c', '#356c6c', '#351c6c', '#f093a9',
					'#a7c23a', '#104eff', '#10441f', '#a21233', '#503319'
				],
				id: '',
				detail: {},//本页面数据对象
				swiperList: [],//主图
				commentList: [],//评论评论数据集合
				mescroll: null, //mescroll实例对象
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				upOption: {
					noMoreSize: 3, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					textNoMore: '~ 没有更多了 ~',
				},
				hasNext: true,
				user: {},//登录用户信息
				collectionFlag: 0,//收藏
				thumbsupFlag: 0,
				crazilyFlag: 0,
			}
		},
		computed: {
			baseUrl() {
				return this.$base.url;
			},
		},
		async onLoad(options) {
			this.id = options.id;
		},
		async onShow(options) {
			// 渲染数据
			this.init();
			//获取收藏信息
			this.getshipinCollection()
			let table = uni.getStorageSync("nowTable");
			// 获取用户信息
			let res = await this.$api.session(table);
			this.user = res.data;
			this.btnColor = this.btnColor.sort(() => {
				return (0.5 - Math.random());
			});
			this.getThumbsup();
			let cleanType = uni.getStorageSync('pingluenStateState')
			if (cleanType) {
				uni.removeStorageSync('pingluenStateState')
				this.mescroll.num = 1
				this.upCallback(this.mescroll)
			}
		},
		destroyed: function() {
			//window.clearInterval(this.inter);
		},
		methods: {
		    //下载
            download(url) {
                let _this = this;
                uni.downloadFile({
                    url: url,
                    success: (res) => {
                        if (res.statusCode === 200) {
                            _this.$utils.msg('下载成功');
                            window.open(url);
                        }
                    }
                });
            },
			// 获取详情
			async init() {
				let res = await this.$api.info('shipin', this.id);
				this.detail = res.data;
				// 主图
				this.swiperList = this.detail.shipinPhoto ? this.detail.shipinPhoto.split(",") : [];
			},
			// 收藏
			async getshipinCollection() {
                let params = {
                    page: 1,
                    limit: 1,
                    shipinId: this.id,
                    yonghuId: this.user.id,
                    shipinCollectionTypes:'1'
                }
                let res = await this.$api.list(`shipinCollection`, params);
                this.collectionFlag = res.data.list.length;
            },
			async shoucang() {
                let _this = this;
                let params = {
                    page: 1,
                    limit: 1,
                    shipinId: _this.detail.id,
                    yonghuId: _this.user.id,
                    shipinCollectionTypes:'1'
                }
                let res = await _this.$api.list(`shipinCollection`, params);
                if (res.data.list.length == 1) {
                    let shipinCollectionId = res.data.list[0].id;
                    uni.showModal({
                        title: '提示',
                        content: '是否取消',
                        success: async function(res) {
                            if (res.confirm) {
                                await _this.$api.del('shipinCollection', JSON.stringify([shipinCollectionId]));
                                _this.$utils.msg('取消成功');
                                _this.getshipinCollection();
                            }
                        }
                    });
                    return;
                }
                uni.showModal({
                    title: '提示',
                    content: '是否收藏',
                    success: async function(res) {
                        if (res.confirm) {
                            await _this.$api.add('shipinCollection', {
                                yonghuId: _this.user.id,
                                shipinId: _this.detail.id,
                                shipinCollectionTypes:1
                            });
                            _this.$utils.msg('收藏成功');
                            _this.getshipinCollection();
                        }
                    }
                });
            },
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},

			/*下拉刷新的回调 */
			downCallback(mescroll) {
				this.hasNext = true
				mescroll.resetUpScroll()
			},

			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			async upCallback(mescroll) {
				let res = await this.$api.list('shipinLiuyan', {
					page: mescroll.num,
					limit: mescroll.size,
					shipinId: this.id
				});
				// 如果是第一页数据置空
				if (mescroll.num == 1) this.commentList = [];
				this.commentList = this.commentList.concat(res.data.list);
				if (res.data.list.length == 0) this.hasNext = false;
				mescroll.endSuccess(mescroll.size, this.hasNext);
			},
			// 添加评论
			async onCommentTap() {
                this.$utils.jump(`../shipinLiuyan/add-or-update?shipinId=${this.id}`)
            },
			// 获取赞踩
			async getThumbsup() {
				let _this = this;
				let params = {
					page: 1,
					limit: 1,
					shipinId: _this.detail.id,
					yonghuId: _this.user.id,
				}
				let res = await _this.$api.list(`shipinCollection`, params);
				if (res.data.list.length > 0) {
					if (res.data.list[0].shipinCollectionTypes == '2') {
						_this.thumbsupFlag = true;
					}
					if (res.data.list[0].shipinCollectionTypes == '3') {
						_this.crazilyFlag = true;
					}
				}

			},
			// 点赞
			async zan() {
				let _this = this;
				let params = {
					page: 1,
					limit: 1,
					shipinId: _this.detail.id,
					yonghuId: _this.user.id,
					type: '2',
				}
				let res = await _this.$api.list(`shipinCollection`, params);
				if (res.data.list.length > 0) {
					let shipinCollectionId = res.data.list[0].id;
					uni.showModal({
						title: '提示',
						content: '是否取消点赞',
						success: async function(res) {
							if (res.confirm) {
								await _this.$api.del('shipinCollection', JSON.stringify([shipinCollectionId]));
								_this.detail.zanNumber = parseInt(_this.detail.zanNumber) - 1;
								await _this.$api.update('shipin', _this.detail);
								_this.$utils.msg('取消成功');
								_this.thumbsupFlag = false;
							}
						}
					});
					return;
				}
				uni.showModal({
					title: '提示',
					content: '是否点赞',
					success: async function(res) {
						if (res.confirm) {
							await _this.$api.add('shipinCollection', {
								yonghuId: _this.user.id,
								shipinId: _this.detail.id,
								type: '2'
							});
							_this.detail.zanNumber = parseInt(_this.detail.zanNumber) + 1;
							await _this.$api.update('shipin', _this.detail);
							_this.$utils.msg('点赞成功');
							_this.thumbsupFlag = true;
						}
					}
				});
			},
			// 踩
			async cai() {
				let _this = this;
				let params = {
					page: 1,
					limit: 1,
					shipinId: _this.detail.id,
					yonghuId: _this.user.id,
					type: '3',
				}
				let res = await _this.$api.list(`shipinCollection`, params);
				if (res.data.list.length > 0) {
					let shipinCollectionId = res.data.list[0].id;
					uni.showModal({
						title: '提示',
						content: '是否取消点踩',
						success: async function(res) {
							if (res.confirm) {
								await _this.$api.del('shipinCollection', JSON.stringify([shipinCollectionId]));
								_this.detail.caiNumber = parseInt(_this.detail.caiNumber) - 1;
								await _this.$api.update('shipin', _this.detail);
								_this.$utils.msg('取消成功');
								_this.crazilyFlag = false;
							}
						}
					});
					return;
				}
				uni.showModal({
					title: '提示',
					content: '是否点踩',
					success: async function(res) {
						if (res.confirm) {
							await _this.$api.add('shipinCollection', {
								yonghuId: _this.user.id,
								shipinId: _this.detail.id,
								type: '3'
							});
							_this.detail.caiNumber = parseInt(_this.detail.caiNumber) + 1;
							await _this.$api.update('shipin', _this.detail);
							_this.$utils.msg('点踩成功');
							_this.crazilyFlag = true;
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.container {
		// padding-bottom: 80upx;
	}

	.container:after {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		content: '';
		background-attachment: fixed;
		background-size: cover;
		background-position: center;
	}

	.swiper {
		width: 100%;
		height: 450upx;

		image {
			width: 100%;
		}
	}

	.detail-content {
		font-size: 28upx;
		color: #888888;
		// padding: 10upx 20upx;
		background: #FFFFFF;
		line-height: 45upx;

		.name {
			font-size: 38rpx;
			font-weight: blod;
			// margin-bottom: 20upx;
			padding-top: 20upx;
		}

		.price {
			font-size: 33rpx;
		}
	}

	.time-content {
		background: #FFFFFF;
		padding: 30upx;
		font-size: 30upx;
		border-radius: 20upx;
		margin-top: 20upx;

		.header {
			font-size: 33upx;
			margin-bottom: 20upx;
		}
	}

	.bottom-content {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.comoment-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 12upx;

		.btn-comment-content {
			color: #DD514C;
			font-weight: bold;
			padding: 0 12upx;
		}
	}

	.comment-item {
		margin-bottom: 10upx;
		border-bottom: 1px solid #EEEEEE;
		padding-bottom: 20upx;

		.content {
			margin-left: 20upx;
			margin-top: 20upx;
		}
	}

	.icon {
		width: 50upx;
		height: 50upx;
	}

	.popup-content {
		.popup-form {
			background: #FFFFFF;
			margin-top: 20upx;
		}

		.btn-content {
			text-align: right;
			background: #FFFFFF;

			button {
				margin-left: 20upx;
				margin-right: 20upx;
				margin-bottom: 20upx;
			}
		}
	}

	.detail-list-item {
		padding: 0 24upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		height: 68upx;
		border-bottom: 2upx solid #efefef;
		background-color: #fff;

		.lable {
			font-size: 28upx;
			color: #000;
		}

		.text {
			flex: 1;
			font-size: 24upx;
			color: #FF00FF;
			text-align: left;
		}

		&.favor {
			.el-icon-star-on {
				color: inherit;
				font-size: inherit;
			}
		}
	}

	.detail-content .shop-title {
		padding: 20upx 24upx;
		box-sizing: border-box;
		line-height: 1.4;
	}

	.priceFavor {
		height: 96upx !important;
	}

	.priceFavor .text {
		font-size: 64upx !important;
		color: red !important;
	}

	.priceFavor .icon {
		font-size: 56upx !important;
		text-align: right !important;
		color: red !important;
	}

	//订座样式
	.seat-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		background: #FFFFFF;
		margin: 20upx;
		border-radius: 20upx;
		padding: 20upx;
		font-size: 30upx;

		.seat-item {
			width: 33.33%;
			display: flex;
			align-items: center;
			flex-direction: column;
			margin-bottom: 20upx;

			.seat-icon {
				width: 50upx;
				height: 50upx;
				margin-bottom: 10upx;
			}
		}
	}
</style>
