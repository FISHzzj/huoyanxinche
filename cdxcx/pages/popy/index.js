const app = getApp();
var _self;
Page({
  data: {
    staticUrl: app.staticUrl,
    show: false
  },

  onLoad: function (options) {
    //默认打开弹出层
    this.setData({ show: true });
  },

  showBanner: function () {
    this.setData({ show: true });
  },
  closeBanner: function () {
    this.setData({ show: false });
  }
})