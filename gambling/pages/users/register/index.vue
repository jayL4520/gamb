<template>
	<view class="container">
		<navbar title="注册" class="navbar">
			<template v-slot:navleft>
				<view class="navbutton">
					<view class="backbutton" @click="$backOrHome">
						<uni-icons class="back" color="#fff" type="left" size="20" />
						<text class="">返回</text>
					</view>
				</view>
			</template>
			<template v-slot:navright>
				<view class="navrightbutton">
					<view class="button">
						<i class="iconfont icon-kefu_o"></i>
						<text>客服</text>
					</view>

				</view>
			</template>
		</navbar>
		<view class="">
			<view class="soundbox">
				<uni-icons type="sound-filled" :size="windowWidth>600?'18':'25rpx'" color="#C5322B"></uni-icons>
				尊敬的用户:免费注册成为会员可拥有与解图小组、版主、彩友即时交流。成为专家、买料卖料、发帖评论、收藏图纸、参与活动等功能
			</view>
			<view class="form">
				<view class="inputitem">
					<uni-easyinput class="input" prefixIcon="person" v-model="username" :inputBorder="false"
						:clearable="false" placeholder="请输入用户名" :placeholderStyle="`fontSize:${windowWidth>600?'28px':'40rpx'}`"></uni-easyinput>
				</view>
				<view class="inputitem">
					<uni-easyinput class="input" type="number" prefixIcon="phone" v-model="phonenumber"
						:inputBorder="false" :clearable="false" placeholder="请输入11位手机号码" maxlength="11"
						:placeholderStyle="`fontSize:${windowWidth>600?'28px':'40rpx'}`"></uni-easyinput>
				</view>
				<view class="inputitem">
					<uni-easyinput class="input" type="password" prefixIcon="locked" v-model="password"
						:inputBorder="false" :clearable="false" placeholder="请输入密码"
						:placeholderStyle="`fontSize:${windowWidth>600?'28px':'40rpx'}`"></uni-easyinput>
				</view>
				<view class="inputitem">
					<uni-easyinput class="input" prefixIcon="staff" v-model="parentId" :inputBorder="false"
						:clearable="false" placeholder="请输入邀请码" :placeholderStyle="`fontSize:${windowWidth>600?'28px':'40rpx'}`"></uni-easyinput>
				</view>
				<view class="agreebox">
					<checkbox :checked="isagree" /><text class="agree">我已阅读并同意金沙开奖网</text><text>《使用协议》</text>
				</view>
			</view>
			<view class="btn box-center register" @click="register">
				注册
			</view>
			<view class="btn box-center" @click="$backOrHome">
				若是注册，按此登录
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import {
		registerApi
	} from "@/api/user.js"
	import {
		Debounce
	} from "@/utils/utils.js"
	import {
		aesEncrypt
	} from "@/utils/ase.js"
	export default {
		components: {
			navbar,
		},
		data() {
			return {
				username: "",
				phonenumber: "",
				password: "",
				isagree: true,
				parentId: "",
				windowWidth: 0,
			}
		},
		onLoad(options) {
			let app = getApp();
			this.windowWidth = app.globalData.windowWidth
		},

		methods: {
			register: Debounce(function() {
				let {
					username,
					phonenumber,
					password,
					isagree
				} = this, that = this
				if (!username)
					return uni.showToast({
						title: "请输入用户名",
						icon: 'none',
					})
				if (!phonenumber)
					return uni.showToast({
						title: "请输入电话号码",
						icon: 'none',
					})

				if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(phonenumber))
					return uni.showToast({
						title: "请输入正确的电话号码",
						icon: 'none',
					})
				if (!password)
					return uni.showToast({
						title: "请输入密码",
						icon: 'none',
					})
				if (password.length < 6)
					return uni.showToast({
						title: "密码最少输入6位",
						icon: 'none',
					})
				if (!isagree)
					return uni.showToast({
						title: "请阅读并同意协议",
						icon: 'none',
					})
				let pwd = aesEncrypt(password)
				uni.showLoading()
				registerApi({
					userName: username,
					phonenumber,
					password: pwd
				}).then(res => {
					uni.hideLoading()
					setTimeout(() => {
						uni.showToast({
							title: "注册成功，请去登录",
							icon: 'none',
							duration: 2000,
							success() {
								setTimeout(function() {
									uni.navigateBack()
								}, 2000);
							}
						})
					}, 300);
				}).catch(err => {
					uni.hideLoading()
					setTimeout(() => {
						uni.showToast({
							title: err,
							icon: 'none',
							duration: 2000,
						})
					}, 300);
				})
			}),
		},

	}
</script>

<style lang="scss" scoped>
	.navbar {
		.navbutton {
			color: #fff;
		}

		.backbutton {
			display: flex;
			align-items: center;
			font-size: 16px;
			cursor: pointer;

			.back {
				/* #ifdef H5 */
				margin-top: 3px;
				/* #endif */
			}
		}

		.navrightbutton {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			color: #fff;
			font-size: 12px;

			.button {
				cursor: pointer;
				width: 25px;
				margin: 0 3px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}

	}

	.soundbox {
		width: 100%;
		font-size: 25rpx;
		padding: 20rpx 30rpx;
		color: rgb(102, 102, 102);
		background-color: rgb(255, 250, 229);
	}

	.form {
		padding: 30rpx;
		margin-bottom: 60rpx;

		.inputitem {
			padding: 25rpx 0;
			border-bottom: 2rpx solid rgb(230, 230, 230);

			.input {
				width: 100%;
				height: 60rpx;
				font-size: 40rpx;
			}

		}

		.agreebox {
			font-size: 30rpx;
			margin-top: 30rpx;

			.agree {
				color: rgb(102, 102, 102);
			}
		}
	}

	.btn {
		width: calc(100% - 60rpx);
		margin: 40rpx auto;
		font-size: 40rpx;
		border: 2rpx solid rgb(197, 197, 197);
		border-radius: 8rpx;
	}

	.register {
		background: rgb(197, 50, 43);
		color: #fff;
		border: 2rpx solid rgb(197, 50, 43);
	}

	@media (min-width: 600px) {
		.soundbox {
			font-size: 18px;
			padding: 10px 15px;
		}

		.form {
			padding: 15px;
			margin-bottom: 30px;

			.inputitem {
				padding: 12px 0;
				border-bottom: 1px solid rgb(230, 230, 230);

				.input {
					width: 100%;
					height: 40px;
					font-size: 28px;
				}

			}

			.agreebox {
				font-size: 28px;
				margin-top: 15px;
				
			}
		}

		.btn {
			width: calc(100% - 30px);
			margin: 20px auto;
			font-size: 28px;
			border: 1px solid rgb(197, 197, 197);
			border-radius: 4px;
		}
		.register {
			border: 1px solid rgb(197, 50, 43);
		}
	}
</style>