export default function backOrHome() {
  const pages = getCurrentPages();
  pages.length > 1
    ? uni.navigateBack()
    : uni.reLaunch({ url: '/pages/index/index' });
}