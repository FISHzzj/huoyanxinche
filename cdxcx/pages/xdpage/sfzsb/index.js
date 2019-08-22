// pages/demo/IDcard.js
var _self;
var app =getApp()
Page({
  data: {
    idCard1: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/idcard1.png',
    idCard2: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/idcard2.png',
    tokenAc:''
  },
  onLoad: function () {
    _self = this;
    //getBaiDuaccessToken,获取token
    this.getbaidutoken()
  },
  getbaidutoken:function(){
    console.log('获取token')
    let that =this
    let url ='/getBaiDuaccessToken'
    let uesrinfo = wx.getStorageSync('userInfo')
    let token = uesrinfo.token
    let data={
      getToken:1
    }
    wx.request({
      url: app.globalData.host+url,
      data: {data:data,token},
      method:'post',
      success:function(res){
        console.log(res)
        that.setData({
          tokenAc:res.data.retobj
        })
      },fail:function(res){
        console.log(res)
      }
    })
  },
  uploadCards: function () {
    let data = {
      image: 'base64',
      id_card_side: 'front',
      //方向矫正，非必选
      detect_direction: 'true',
      //检测身份证风险值，非必选
      detect_risk: 'false'
    }
    var uploadTask2 = wx.uploadFile({
      url: url,
      filePath: _self.data.idCard2,
      fileType: 'image',
      name: 'data',
      success: function (uploadFileRes) {
        // 上传成功后返回服务器端保存的路径
        console.log(uploadFileRes.data);
        // 至此2张照片上传完毕
        wx.hideLoading();
      }
    });
  },
  //shefenzheng
  uploadcard:function(base){
    let that =this
    let url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard'
    let taken = that.data.tokenAc.access_token
    let data={
      image:base,
      id_card_side:'front',
      //方向矫正，非必选
      detect_direction:'true',
      //检测身份证风险值，非必选
      detect_risk:'false'
    }
    wx.request({
      url: url,
      method:'post',
      data: { data, access_token: taken},
      header:{
        'Content-Type':'application/x-www-form-urlencoded'
      },
      success:function(res){
        wx.showToast({
          title: res.data.error_msg + '错误代码:' + res.data.error_code,
        })
        console.log(res.data.error_code)
        console.log(res.data.error_msg)
      }
    })
  },
  selectImg1: function () {
    let that =this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            // console.log('data:image/png;base64,' + res.data)
            that.uploadcard('data:image/png;base64,' + res.data)
          }
        })
        _self.setData({ idCard1: res.tempFilePaths[0] });
      }
    })
  },
  //base64
  selectImg2: function () {
    wx.chooseImage({
      count: 1,
      success: function (res) {
        _self.setData({ idCard2: res.tempFilePaths[0] });
      }
    })
  },
  previewImg1: function () {
    wx.previewImage({
      urls: [_self.data.idCard1]
    });
  },
  previewImg2: function () {
    wx.previewImage({
      urls: [_self.data.idCard2]
    });
  },
  
  agora: function () {
    var client = AgoraRTC.createClient({ mode: 'live', codec: "h264" });
    let keys = null;
    var channel = 'MQ' + this.chat.channel;
    var userid = this.user.userid;
    console.log('==>' + channel)
    client.init(this.appid, function () {
      //第一次连接获取频道加入频道
      client.join(keys, channel, null, function (uid) {
        // console.log("User " + this.user.userid + " join channel successfully");
        //创建音视频流对象
        var localStream = AgoraRTC.createStream({
          streamID: uid,
          audio: true,
          video: true,
          screen: false
        }
        );
        console.log(`==>${localStream}`)
        //初始化音视频流
        localStream.init(function () {
          console.log("getUserMedia successfully");
          // localStream.play('agoraMe',{fit:'contain'});
          //发布本地音视频流
          client.publish(localStream, function (err) {
            console.log("Publish local stream error: " + err);
          });
          client.on('stream-published', function (evt) {
            console.log("Publish local stream successfully");
          })
        }, function (err) {
          console.log("getUserMedia failed", err);
        })
        //订阅远端音视频流
        client.on('stream-added', function (evt) {
          var stream = evt.stream;
          console.log("New stream added: " + stream.getId());
          console.log("Subscribe ", stream);
          client.subscribe(stream, function (err) {
            console.log("Subscribe stream failed", err);
          });
        });
        client.on('stream-subscribed', function (evt) {
          var stream = evt.stream;
          // console.log("Subscribe remote stream successfully: " + stream.getId());
          stream.play('agoraMe', { fit: 'contain' });
        })
      }, function (err) {
        console.log("Join channel failed", err);
      })
    }, function (err) {
      console.log("AgoraRTC client init failed", err);
    });

  }
})