 

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
    _code: "lal",
    
    liveUrl: "https://vdm6-hw.qunleniuniu.com/live/2032-2.flv",
    liveUrl2: `https://00853lhc.com/player/index.html?t=${new Date().getTime()}`,
    url: "/mark/MO",
    data:{
      lotCode: "lal",
      ltype: 2
    },
    openTime: "21:32-21:38",
    _openTime: "21:30-21:38",
  },
  {
    name: "新澳门六合彩",
    code: "XMO",
    data:{
      lotCode: "xal",
      ltype: 3
    },
    //g.opt.liveUrls = ["https://vdm6-ali.xjoyomn.com/live/2032-2.flv", "https://vdm6-hw.180ymzl.com/live/2032-2.flv", "https://vdm6-ali.cokim5.com/live/2032-2.flv"]
    // https://play8398.lianwin88.com/live/mosixmark.flv
    liveUrl: "https://play3636.zdwafis.com/live/mosixmark.flv",
    // https://d2.freelegalway.com/FL/CC/VALIDATOR?t=${new Date().getTime()}&key=8816507d2da03972e75a5e57182dffa0.6781852baca925f3563bc24fe0bbf813.1779457508
    liveUrl2: `https://00853lhc.com/player/index.html`,
    url: "/mark/XMO",
    // 21:33-21:38 
    openTime: "21:33-21:38",
    _openTime: "21:30-21:38",
  
    /**{msg: "老澳门六合彩", status: true, start: "2026-05-18 21:32:00", end: "2026-05-18 21:38:00"}
end
: 
"2026-05-18 21:38:00"
msg
: 
"老澳门六合彩"
start
: 
"2026-05-18 21:32:00"
status
: 
true */
  },
  {
    name: "香港六合彩",
    code: "HK",
    _code: "gal",
    data:{
      lotCode: "gal",
      ltype: 2
    },
    liveUrl: "https://vdm6-hw.nbgdsygs.com/live/h6-2.flv",
    openTime: "21:32-21:40",
    _openTime: "21:30-21:40",
    url: "/mark/HK",
  },
   {
    name: "快乐8",
    // data:{
    //   lotCode: "lal",
    //   ltype: 3
    // },
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
