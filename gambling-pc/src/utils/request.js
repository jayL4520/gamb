import axios from "axios"; // 引入axios
import { ElMessage, ElMessageBox, ElLoading } from "element-plus";
import SettingMer from "./settingMer";

// 添加一个状态变量，用于跟踪是否已有错误弹窗显示
let errorBoxVisible = false;

const service = axios.create({
  baseURL: SettingMer.apiBaseURL,
  timeout: 60000, // 过期时间
});
let activeAxios = 0;
let timer;
let loadingInstance;


const closeLoading = () => {
  activeAxios--;
  if (activeAxios <= 0) {
    clearTimeout(timer);
    loadingInstance && loadingInstance.close();
  }
};
// http request 拦截器
service.interceptors.request.use(
  (config) => {
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      ...config.headers,
    };
    return config;
  },
  (error) => {
    ElMessage({
      showClose: true,
      grouping: true,
      message: error,
      type: "error",
    });
    return error;
  }
);

// http response 拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      if (response.headers.msg) {
        response.data.msg = decodeURI(response.headers.msg);
      }
      return response.data;
    } else {
      ElMessage({
        showClose: true,
        grouping: true,
        message: response.data.msg || decodeURI(response.headers.msg),
        type: "error",
      });
      return response.data.msg ? response.data : response;
    }
  },
  (error) => {
    if (!error.config?.donNotShowLoading) {
      closeLoading();
    }

    // 如果已经有错误弹窗显示，则不再显示新的弹窗
    if (errorBoxVisible) {
      return error;
    }

    if (!error.response) {
      errorBoxVisible = true;
      ElMessageBox.confirm(
        `
        <p>检测到请求错误</p>
        <p>${error}</p>
        `,
        "请求报错",
        {
          dangerouslyUseHTMLString: true,
          distinguishCancelAndClose: true,
          confirmButtonText: "稍后重试",
          cancelButtonText: "取消",
        }
      ).finally(() => {
        if (!error.config?.donNotShowLoading) {
          closeLoading();
        }
        // 弹窗关闭后重置状态
        errorBoxVisible = false;
      });
      return;
    }
    return error;
  }
);
export default service;
