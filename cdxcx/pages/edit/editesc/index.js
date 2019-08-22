var _self=''
const { formatTime} =require('../../../utils/util.js')
//上传图片
const picUp = `https://2.honggps.com/picUp`;
//上传视频
const videoUp = `https://2.honggps.com/videoUp`;
//host
const host = 'https://2.honggps.com';
Page({
  data: {
    genderIndex: 0,
    gender: ['男', '女'],
    dateValue: "请选择",
    city: '请选择',
    idCard1: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    idCard2: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    videosrc:'',
    consturl:'https://2.honggps.com',
    //填写内容
    isNewRecord: true,
    clientName: '',
    certificateNumber: '',
    vin: '',
    auditStatus: '',
    carOnePic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carTwoPic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carThreePic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carFourPic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carFivePic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carSixPic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carSevenPic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carEightPic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carNinePic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carTenPic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carElevenPic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carTwelvePic: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    carVideo: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
    auditor: 'admin',
    usedcarid: '',
    audittime: '',
    createtime: '',
    createuser: ''

  },
  upvideo: function () {
    var that = this
    wx.chooseVideo({
      success: function (res) {
        wx.uploadFile({
          url: videoUp,
          filePath: res.tempFilePath,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = m.retobj
            console.log(retj)
            that.setData({
              carVideo: host + retj,
            })
          }
        })

      }
    })
  },
  upimage: function (v) {
    let that = this
    wx.chooseImage({
      count: 12,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],

      success: function (res) {
        //将图片路径循环赋值给filePath参数
        var imgUrl = res.tempFilePaths[0];

        wx.uploadFile({
          //上传图片的网路请求地址
          url: picUp,
          //选择
          filePath: imgUrl,
          name: 'file',

          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            if (v == 'carOnePic') {
              that.setData({
                carOnePic: host + m.retobj
              })
            } else if (v == 'carTwoPic') {
              that.setData({
                carTwoPic: host + m.retobj
              })
            } else if (v == 'carThreePic') {
              that.setData({
                carThreePic: host + m.retobj
              })
            } else if (v == 'carFourPic') {
              that.setData({
                carFourPic: host + m.retobj
              })
            } else if (v == 'carFivePic') {
              that.setData({
                carFivePic: host + m.retobj
              })
            } else if (v == 'carSixPic') {
              that.setData({
                carSixPic: host + m.retobj
              })
            } else if (v == 'carSevenPic') {
              that.setData({
                carSevenPic: host + m.retobj
              })
            } else if (v == 'carEightPic') {
              that.setData({
                carEightPic: host + m.retobj
              })
            } else if (v == 'carNinePic') {
              that.setData({
                carNinePic: host + m.retobj
              })
            } else if (v == 'carTenPic') {
              that.setData({
                carTenPic: host + m.retobj
              })
            } else if (v == 'carElevenPic') {
              that.setData({
                carElevenPic: host + m.retobj
              })
            } else if (v == 'carTwelvePic') {
              that.setData({
                carTwelvePic: host + m.retobj
              })
            }

          },

          fail: function (res) {
            console.log("error");
          }
        });


      }
    })
  },
  chooseVideo: function () {
    this.upvideo()
  },
  selectImg1: function () {
    this.upimage('carOnePic')
  },
  selectImg2: function () {
    this.upimage('carTwoPic')
    
  },
  selectImg3: function () {
    this.upimage('carThreePic')

  },
  selectImg4: function () {
    this.upimage('carFourPic')

  }, selectImg5: function () {
    this.upimage('carFivePic')

  },
  selectImg6: function () {
    this.upimage('carSixPic')

  }, selectImg7: function () {
    this.upimage('carSevenPic')

  },
  selectImg8: function () {
    this.upimage('carEightPic')

  }, selectImg9: function () {
    this.upimage('carNinePic')
  },
  selectImg10: function () {
    this.upimage('carTenPic')
    
  }, selectImg11: function () {
    this.upimage('carElevenPic')

  },
  selectImg12: function () {
    this.upimage('carTwelvePic')
  },
  
  bindPickerChange: function (e) {
    console.log(e);
    this.setData({ genderIndex: e.detail.value });
  },
  bindDateChange: function (e) {
    this.setData({ dateValue: e.detail.value });
  },
  cityChange: function (e) {
    this.setData({ city: e.detail.value });
  },
  onLoad: function (e) {
    let tt ='eyJkYXRhIjp7Imdyb3VwaWQiOjEsInJvbGVpZCI6MSwidXNlcmlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIn0sImNyZWF0ZWQiOjE1NTU5MzgzNzgsImV4cCI6NjA0ODAwfQ==.u3AkvLTlDu55itqG0BodKhMv1mCOLLaknNARkOrr2Bc='
    console.log(tt==wx.getStorageSync('token'))
    _self = this
    var json2map = JSON.parse(e.rowData);
    console.log('json2map')
    console.log(json2map)
    _self.setData({
      auditStatus: json2map.auditStatus,
      audittime: json2map.audittime,
      createtime: json2map.createtime,
      createuser: json2map.createuser,
      clientName: json2map.clientName,
      certificateNumber: json2map.certificateNumber,
      vin: json2map.vin,
      auditStatus: json2map.auditStatus,
      carOnePic: json2map.carOnePic,
      carTwoPic: json2map.carTwoPic,
      carThreePic: json2map.carThreePic,
      carFourPic: json2map.carFourPic,
      carFivePic: json2map.carFivePic,
      carSixPic: json2map.carSixPic,
      carSevenPic: json2map.carSevenPic,
      carEightPic: json2map.carEightPic,
      carNinePic: json2map.carNinePic,
      carTenPic: json2map.carTenPic,
      carElevenPic: json2map.carElevenPic,
      carTwelvePic: json2map.carTwelvePic,
      carVideo: json2map.carVideo,
      usedcarid: json2map.id,
    })
  },
  formSubmit: function (e) {
    let carurl = _self.data.consturl+'/saveUsedCar'
    console.log(e.detail.value);
    let token = wx.getStorageSync('token')
    let list={
      auditStatus: _self.data.auditStatus,
      audittime: _self.data.audittime,
      createtime: _self.data.createtime,
      createuser: _self.data.createuser,
      clientName: _self.data.clientName,
      certificateNumber: e.detail.value.certificateNumber,
      vin: e.detail.value.vin,
      carOnePic: _self.data.carOnePic,
      carTwoPic: _self.data.carTwoPic,
      carThreePic: _self.data.carThreePic,
      carFourPic: _self.data.carFourPic,
      carFivePic: _self.data.carFivePic,
      carSixPic: _self.data.carSixPic,
      carSevenPic: _self.data.carSevenPic,
      carEightPic: _self.data.carEightPic,
      carNinePic: _self.data.carNinePic,
      carTenPic: _self.data.carTenPic,
      carElevenPic: _self.data.carElevenPic,
      carTwelvePic: _self.data.carTwelvePic,
      carVideo: _self.data.carVideo,
      isNewRecord:0,
      usedcarid: _self.data.usedcarid,
      auditor: wx.getStorageSync('userinfo').username
   }
    console.log(list)
    wx.request({
      url: carurl,
      data: {
        data: list, token
},
      header: {},
      method:"POST",
      success:function(res){
        wx.showToast({
          title: res.data.errmsg,
          icon: "none"
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })
      },1500)
      }
    })
    console.log(list)
  }
})