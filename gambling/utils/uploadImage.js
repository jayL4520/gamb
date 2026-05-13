import store from '../store';
let HTTP_REQUEST_URL = "http://macao.epkuchi.com",
	TOKENNAME = 'authorization'
/*
 * 单图上传
 * @param object opt
 * @param callable successCallback 成功执行方法 data
 * @param callable errorCallback 失败执行方法
 */
export default {
	uploadImageOne: function(opt, successCallback, errorCallback) {
			let that = this;
			if (typeof opt === 'string') {
				let url = opt;
				opt = {};
				opt.url = url;
			}
			let count = opt.count || 1,
				sizeType = opt.sizeType || ['compressed'],
				sourceType = opt.sourceType || ['album', 'camera'],
				is_load = opt.is_load || true,
				uploadUrl = opt.url || ''
	
				uni.chooseImage({
					count: count, //最多可以选择的图片总数
					sizeType: sizeType, // 可以指定是原图还是压缩图，默认二者都有
					sourceType: sourceType, // 可以指定来源是相册还是相机，默认二者都有
					mediaType: ['image'],
					success: async (res) => {
						let image = [];
						let filesLen = res.tempFiles.length;
						let exceeded_list = [];
						let uploadMaxSize = 3;
						let imageList = [];
						let urlPath = HTTP_REQUEST_URL + '/macaoapi/common/upload'
						if (count === 1) {
							successCallback && successCallback(await that.uploadFile(urlPath, res.tempFilePaths[
								0], opt, '图片上传中'))
						} else {
							for (let i = 0; i < res.tempFiles.length; i++) {
								if (Math.ceil(res.tempFiles[i].size / 1024) < uploadMaxSize * 1024) {
									image.push(res.tempFiles[i].path);
								} else {
									exceeded_list.push(i + 1);
									filesLen = filesLen - 1;
									// #ifdef APP-PLUS
									plus.nativeUI.alert(
										`第${[...new Set(exceeded_list)].join(',')}张图片超出限制${uploadMaxSize}MB,已过滤`
									);
									// #endif
									// #ifndef APP-PLUS
									uni.showModal({
										content: `第${[...new Set(exceeded_list)].join(',')}张图片超出限制${uploadMaxSize}MB,已过滤`
									});
									// #endif
									continue;
								}
							}
							for (const key in image) {
								imageList.push(await that.uploadFile(urlPath, image[key], opt, '图片上传中'))
							}
							successCallback && successCallback(imageList)
						}
					}
				})
		},
		uploadFile(urlPath, localPath, opt, message) {
			let that = this;
			return new Promise(async (resolve) => {
				//启动上传等待中...
				if (message) uni.showLoading({
					title: message,
				});
				uni.uploadFile({
					url: urlPath,
					filePath: localPath,
					name: 'file',
					header: {
						// #ifdef MP
						"Content-Type": "multipart/form-data",
						// #endif
						[TOKENNAME]: store.state.app.token
					},
					success: function(res) {
						uni.hideLoading();
						if (res.statusCode == 403) {
							uni.showToast({
								title:res.data,
								icon:"none"
							})
						} else {
							let data = res.data ? JSON.parse(res.data) : {};
							if (data.code == 200) {
								resolve(data.data);
							} else {
								uni.showToast({
									title:data.message,
									icon:"none"
								})
							}
						}
					},
					fail: function(res) {
						uni.hideLoading();
						uni.showToast({
							title:res,
							icon:"none"
						})
					}
				})
			})
		},
}