// pages/demo/popupmenu.js
var _self;
Page({
  data: {
    menu1Show: false,
    menu1Top: 30
  },
  onLoad: function (options) {
    _self = this;
  },
  showMenu1: function (e) {
    if (this.data.menu1Show) {
      this.setData({ menu1Show: false });
      return;
    }
    // 动态调整菜单的 top 值
    // 原理 : 获取按钮的高度 = 菜单的 top 值
    let view = wx.createSelectorQuery().select("#demo-btn-1");
    view.fields({ size: true }, data => {
      _self.setData({ menu1Show: true, menu1Top: data.height });
    }).exec();
  },
  // 关闭菜单方法
  hideMenu: function () {
    this.setData({ menu1Show: false });
  },
  // 菜单点击函数
  tap1: function () {
    wx.showToast({
      title: "您点击了第1个菜单",
      icon: "none"
    });
    this.hideMenu();
  },
  tap2: function () {
    wx.showToast({
      title: "您点击了第2个菜单",
      icon: "none"
    });
    this.hideMenu();
  },
  tap3: function () {
    wx.showToast({
      title: "您点击了第3个菜单",
      icon: "none"
    });
    this.hideMenu();
  }
})