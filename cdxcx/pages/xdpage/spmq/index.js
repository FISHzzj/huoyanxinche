const app = getApp()
const Utils = require('../../../utils/util.js')
var socketOpened
// pages/index/index.js.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // used to store user info like portrait & nickname
    userInfo: {},
    hasUserInfo: false,
    // whether to disable join btn or not
    disableJoin: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.channel = "";
    this.uid = Utils.getUid();
    this.lock = false;
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo){
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  tapsoc:function(){

    let userinfo = wx.getStorageSync('userInfo')
    console.log(userinfo)
    var wsuri = "ws://47.92.215.45:19030";
    
    wx.connectSocket({
      url: 'ws://47.92.215.45:19030',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success:function(res){
        console.log(res)
      }
    })

    wx.onSocketOpen(function (res) {
      console.log('websocket opened.链接成功');
      let data = {
        "type": "upUser",
        'uid': userinfo.userid
      }
      wx.sendSocketMessage({
        data:JSON.stringify(data)
      },)
        socketOpened=true
    });
    
    wx.onSocketMessage(function (data) {
      var objData = JSON.parse(data.data);
      console.log(data);
    })

    wx.onSocketError(function () {
      console.log('websocket连接失败！');
    })
  },
  //this.chat.send({
  
sendtype:function(){
  console.log('sendusertype')
  let msg ='getAdminInfo'
  let userinfo = wx.getStorageSync('userInfo')
  let data = {
    "type": "upUser",
    'uid': userinfo.userid
  }
    wx.sendSocketMessage({
      data: JSON.stringify(data)
    });
  wx.onSocketMessage(function (data) {
    var objData = JSON.parse(data.data);
    console.log(data);
  })
  
},
  /**
   * 只有提供了该回调才会出现转发选项
   */
  onShareAppMessage() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function(){

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function(){

  },

  /**
   * callback to get user info
   * using wechat open-type
   */
  onGotUserInfo:function(e){
    let userInfo = e.detail.userInfo||{};
    // store data for next launch use
    wx.setStorage({
      key: 'userInfo',
      data: userInfo,
    })
    this.onJoin(userInfo);
  },
  /**
   * check if join is locked now, this is mainly to prevent from clicking join btn to start multiple new pages
   */
  checkJoinLock: function() {
    return !(this.lock||false);
  },
  
  lockJoin: function() {
    this.lock = true;
  },

  unlockJoin: function() {
    this.lock = false;
  },
  onJoin: function (userInfo){
    userInfo = userInfo || {};
    let value = this.channel || "";

    let uid = this.uid;
    if (!value) {
      wx.showToast({
        title: '请提供一个有效的房间名',
        icon: 'none',
        duration: 2000
      })
    } else {
      if(this.checkJoinLock()) {
        this.lockJoin();
        if (value === "agora") {
          // go to test page if channel name is agora
          wx.navigateTo({
            url: `../test/test`
          });
        } else if (value === "agora2") {
          // go to test page if channel name is agora
          wx.navigateTo({
            url: `../test2/test2`
          });
        } else {
          wx.showModal({
            title: '是否推流',
            content: '选择取消则作为观众加入，观众模式不推流',
            showCancel: true,
            success: function (res){
              let role = "audience";
              if (res.confirm){
                role = "broadcaster";
              }
              wx.navigateTo({
                url: `../meeting/meeting?channel=${value}&uid=${uid}&role=${role}`
              });
            }
          })
        }
      }
    }
  },
  onInputChannel: function (e) {
    let value = e.detail.value;
    this.channel = value;
  }
})