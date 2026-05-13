 

// 请求接口地址 如果没有配置自动获取当前网址路径
const VUE_APP_API_URL = "http://ok2345.net";
const menuList = [
  {
    name: "首页",
    code: "index",
    url: "/home",
  },
  {
    name: "澳门六合彩",
    code: "MO",
    liveUrl: "https://play8398.lianwin88.com/live/mosixmark.flv",
    url: "/mark/MO",
  },
  {
    name: "新澳门六合彩",
    code: "XMO",
     liveUrl: "https://play3833366.is-spec.com/live/mosixmark.flv",
    url: "/mark/XMO",
  },
  {
    name: "香港六合彩",
    code: "HK",
    liveUrl: "https://vdm6-hw.nbgdsygs.com/live/h6-2.flv",
    url: "/mark/HK",
  },
   {
    name: "快乐8",
    code: "kl8",
    url: "/markKa/kl8",
  },
  {
    name: "三星彩",
    code: "2108",
    url: "/markKa/2108",
  },
  {
    name: "49乐合彩",
    code: "2108",
    url: "/markKa/1121",
  },
  {
    name: "四星彩",
    code: "2109",
    url: "/markKa/2109",
  },
  {
    name: "大乐透",
    code: "5118",
    url: "/markKa/5118",
  },

  {
    name: "今彩539",
    code: "5120",
    url: "/markKa/5120",
  },

  {
    name: "威力彩",
    code: "5134",
    url: "/markKa/5134",
  },
 
  {
    name: "39乐合彩",
    code: "2108",
    url: "/markKa/1197",
  },

  //  {
  //   name: "福彩快8六合",
  //   code: "HK",
  //   url: "/mark/HK",
  // }
]
const SettingMer = {
  // 服务器地址
  httpUrl: VUE_APP_API_URL,
  tokenKey:"yn-token",
  menuList,
  // 接口请求地址
  apiBaseURL: VUE_APP_API_URL,
};

export default SettingMer;
