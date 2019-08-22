// pages/index/to_news/to_news.js  
var app = getApp();
var socketOpen = false;
var SocketTask = false;
var uid;
var url = 'ws://2.honggps.com:19030';
Page({
  data: {
    inputValue: '',
    returnValue: '',
    icons:['1'],
    getAdminInfo:'',
    able:'',
    able1:'none',
    addQueue:'',
    paidui:'',
    nowitem:''
  },
  onLoad: function (options) {
    this.initEventHandle()
    
  },
  initEventHandle(){ 
    let that = this
    // 监听 WebSocket 接受到服务器的消息事件
    wx.onSocketMessage((res) => {
      console.log('接收到内容',res.data)
      let j2m=JSON.parse(res.data)
      if (j2m.type=='getAdminInfo'){
        console.log(j2m.data[0])
       that.setData({
         getAdminInfo:j2m.data
       })
      }else if (j2m.type =="addQueue"){
        that.setData({
          addQueue: j2m.data,
          able:'none',
          able1:'true'
        })
        wx.showToast({
          title: j2m.data,
        })
      }else  if (j2m.type == "next"){
        wx.showToast({
          title: j2m.data,
        })
        console.log('next'+j2m.data)
        //:{type:'next',data:k}
      }
      if (that.data.getAdminInfo.length>=0) {
        that.setData({
          paidui: that.data.getAdminInfo.length
        })
      }
      

    })
    // 监听 WebSocket 连接打开事件
    wx.onSocketOpen(() => {
      console.log('WebSocket连接打开')
      wx.closeSocket()
    })
    // 监听 WebSocket 错误事件
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败')
    })
    // 监听 WebSocket 连接关闭事件
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
  },
  // gbskt:function(){
  //   wx.closeSocket()
  // },
  // onUnload: function (){
  //   wx.closeSocket()
  // },
  onReady: function(){
    console.log(url);
    // 创建Socket
    wx.connectSocket({
      url: url
    })
    // 监听 WebSocket 连接打开事件
    wx.onSocketOpen(function(res){
      //upuser
      let that = this;
      var userinfo = wx.getStorageSync('userInfo');
      console.log(userinfo);
      let data={
        type: "upUser",
        uid: userinfo.userid
      }
      // if (socketOpen) {
      // 如果打开了socket就发送数据给服务器
      wx.sendSocketMessage({
        data: JSON.stringify(data),
      })
      setTimeout(function(){
        let data = { type: "getAdminInfo", uid: userinfo.userid }
        //获取管理员在线人员:{type:'getAdminInfo',data:"xx"}
        wx.sendSocketMessage({
          data: JSON.stringify(data),
        })
      },1000)
      
    })
    
  },
//加入队列
  joinq:function(e){
    uid = e.currentTarget.dataset.item.uid
    // console.log(e.currentTarget.dataset.item.toten)
    this.setData({
      nowitem: e.currentTarget.dataset.item
   })
    let that =this
    let userinfo = wx.getStorageSync('userInfo')
    let data = { "type": "addQueue", "uid": userinfo.userid, "toid": uid }
    console.log(that.data.getAdminInfo)
    //加入队列成功:{type:'addQueue',data:"xx"}//data为当前排队人数 
    wx.sendSocketMessage({
      data: JSON.stringify(data),
    })
  },
  //管理员在线
  //getadmin 返回事例[{uid:1,list[xx],toten:"xx"}] toten为频道id，list为当前排队人员人数信息
  //管理员结束当前，下一个开始:{type:'next',data:k}//当前队列为0时自动加入到面签中
  // getadmin:function(){
   
  // },
  //面签开始
  mqks:function(){
    let that = this;
    let toid = that.data.getAdminInfo[0];
    let userinfo = wx.getStorageSync('userInfo')
    // if (!toid){
    //   wx.showToast({
    //     title: '无管理员在线',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return;
    // }
    console.log('面签开始')
    let data = { "type": "start", "uid": userinfo.userid, "toid": uid, "name": userinfo.username }
    let chanel=that.data.nowitem.toten
    wx.sendSocketMessage({
      data: JSON.stringify(data),
    })
    wx.navigateTo({
      url: `../../webrtc-room/index/index`
    });
  },
  onJoin: function (userInfo) {
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
      if (this.checkJoinLock()) {
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
            success: function (res) {
              let role = "audience";
              if (res.confirm) {
                role = "broadcaster";
              }
              
            }
          })
        }
      }
    }
  }, 
  bindKeyInput:function(e){
    this.setData({
      inputValue: e.detail.value
    })
  },

  // onHide: function () {
  //   SocketTask.close(function (close) {
  //     console.log('关闭 WebSocket 连接。', close)
  //   })
  // },
})

//通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
function sendSocketMessage(data) {
 
} 