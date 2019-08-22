//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    clientName:'',
    certificateNumber:'',
    vin:'',
    page:'',
    rows:'',
    show:true,
    url: 'https://2.honggps.com'
  },
  showBanner: function () {
    this.setData({ show: true });
    this.onLoad();
  },
  closeBanner: function () {
    this.setData({ show: false });
  },
  logout:function(){
    wx.clearStorage()
    this.onShow()
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  loging:function(){
    console.log('ok')
    wx.navigateTo({
      url: '../login/index',
    })
  },
  getlogin:function(){
    wx.navigateTo({
      url: '../login/index',
    })
  },
  // 
  onLoad: function () {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // this.reqLogin()
  },
  reqLogin:function(){
    let url = 'https://2.honggps.com/signIn'
    let loginParams = { userName: 'admin', password: '123456' };
    console.log(loginParams)
    wx.request({
      url: url,
      method:"POST",
      data: {loginParams},
      success:function(e){
        console.log(e)
      }
    })
  },
  getUserInfo: function(e){
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
onShow:function(){
  let userinfo = wx.getStorageSync('userInfo')
  this.setData({
    userInfo:userinfo
  })

  if (null == userinfo || '' == userinfo) {
    console.log('未登录')
    this.setData({
      isShow: true
    })
    wx.showToast({
      title: '请登录',
      icon: 'none'
    })
  } else {
    this.setData({
      isShow: false
    })
  }
  this.onLoad()
  }
})
