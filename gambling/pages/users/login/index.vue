<template>
	<view class="container">
		<navbar title="登录" class="navbar">
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
			<view class="form">
				<view class="inputitem">
					<uni-easyinput class="input" prefixIcon="person" v-model="username" :inputBorder="false"
						:clearable="false" placeholder="用户名/手机号"
						:placeholderStyle="`fontSize:${windowWidth>600?'28px':'40rpx'}`"></uni-easyinput>
				</view>
				<view class="inputitem">
					<uni-easyinput class="input" type="password" prefixIcon="locked" v-model="password"
						:inputBorder="false" :clearable="false" placeholder="请输入密码"
						:placeholderStyle="`fontSize:${windowWidth>600?'28px':'40rpx'}`"></uni-easyinput>
				</view>
				<view class="forgot">
					忘记密码？
				</view>
			</view>
			<view class="btn box-center login" @click="login">
				登录
			</view>
			<view class="btn box-center register" @click="navigatorTo('/pages/users/register/index')">
				注册新账号
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar.vue"
	import {
		loginApi,
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
				password: "",
				windowWidth: 0,
			}
		},
		onLoad(options) {
			let app = getApp();
			this.windowWidth = app.globalData.windowWidth
		},

		methods: {
			login: Debounce(function() {
				let {
					username,
					password,
				} = this, that = this
				if (!username)
					return uni.showToast({
						title: "请输入用户名或手机号",
						icon: 'none',
					})
				if (!password)
					return uni.showToast({
						title: "请输入密码",
						icon: 'none',
					})
				let pwd = aesEncrypt(password)
				uni.showLoading()
				loginApi({
					username,
					password: pwd
				}).then(res => {
					uni.hideLoading()
					that.$store.commit('LOGIN', {
						token: res.data.token,
						"isLogin": true
					});
					that.getUserInfo()
					// setTimeout(() => {
					// 	uni.showToast({
					// 		title: "登录成功",
					// 		icon: 'none',
					// 		duration: 2000,
					// 		success() {
					// 			setTimeout(function() {
					// 				that.$backOrHome()
					// 			}, 2000);
					// 		}
					// 	})
					// }, 300);
				}).catch(err => {
					uni.hideLoading()
					setTimeout(() => {
						uni.showToast({
							title: err,
							icon: 'none',
							duration: 1000,
						})
					}, 300);
				})
			}),
			getUserInfo(data) {
				// this.$store.commit('UPDATE_USERINFO', {
			// userid: data.userId,
			// avatar: data.avatar,
			// nickname: data.userName,
			// phone: data.phonenumber,
			// yCode: data.yCode,
			// roleGroup: data.roles[0].roleName,
				// });
				this.$backOrHome()
			},
			navigatorTo(url) {
				if (url == '') return;
				uni.navigateTo({
					url: url
				})
			},
		},

	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 20px;
	}

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

		.forgot {
			font-size: 40rpx;
			margin-top: 30rpx;
		}
	}

	.btn {
		width: calc(100% - 60rpx);
		margin: 40rpx auto;
		font-size: 40rpx;
		border: 2rpx solid rgb(197, 197, 197);
		border-radius: 8rpx;
	}

	.login {
		background: rgb(197, 50, 43);
		color: #fff;
		border: 2rpx solid rgb(197, 50, 43);
	}

	@media (min-width: 600px) {
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

			.forgot {
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

		.login {
			border: 1px solid rgb(197, 50, 43);
		}
	}
</style>