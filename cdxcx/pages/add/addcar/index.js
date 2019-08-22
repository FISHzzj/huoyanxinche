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
    carVideo:'',
    //list
    carid: '',
    certification: "https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png",
    clientName: "",
    createtime: "",
    createuser: "",
    driving: "https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png",
    drivingLicence: "https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png",
    insurance: "https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png",
    invoice: "https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png",
    isPledge: '',
    mortgageLarge: "https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png",
    plateNumbers: "",
    sali: "https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png",
    vin: "",
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
            if (v == 'insurance') {
              that.setData({
                insurance: host + m.retobj
              })
            } else if (v == 'drivingLicence') {
              that.setData({
                drivingLicence: host + m.retobj
              })
            } else if (v == 'driving') {
              that.setData({
                driving: host + m.retobj
              })
            } else if (v == 'mortgageLarge') {
              that.setData({
                mortgageLarge: host + m.retobj
              })
            } else if (v == 'invoice') {
              that.setData({
                invoice: host + m.retobj
              })
            } else if (v == 'sali') {
              that.setData({
                sali: host + m.retobj
              })
            } else if (v == 'certification') {
              that.setData({
                certification: host + m.retobj
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
    this.upimage('insurance')
  },
  selectImg2: function () {
    this.upimage('drivingLicence')
  },
   selectImg3: function () {
     this.upimage('driving')
  },
  selectImg4: function () {
    this.upimage('mortgageLarge')
  },
  selectImg5: function () {
    this.upimage('invoice')
  },
  selectImg6: function () {
    this.upimage('sali')
  },
  selectImg7: function () {
    this.upimage('certification')
  },
  bindPickerChange: function (e) {
    console.log(e);
    this.setData({ genderIndex: e.detail.value });
  },
 
  bindDateChange:function(e){
    this.setData({ dateValue: e.detail.value });
  },
  cityChange: function(e){
    this.setData({ city: e.detail.value });
  },
  onLoad: function () {
    let userinfo =wx.getStorageSync('userInfo')
    _self = this
  },
  formSubmit:function(e){
    let carurl = _self.data.consturl +'/saveCar'
    console.log(e.detail.value);
    let hev=e.detail.value
    let userinfo = wx.getStorageSync('userInfo')
    let token =userinfo.token
    
    let data={
      clientName: hev.clientName,
      createtime: formatTime(new Date()),
      createuser: userinfo.username,
      driving: _self.data.driving,
      drivingLicence: _self.data.drivingLicence,
      insurance: _self.data.insurance,
      invoice: _self.data.invoice,
      isNewRecord: true,
      isPledge: hev.isPledge,
      mortgageLarge: _self.data.mortgageLarge,
      plateNumbers: hev.plateNumbers,
      sali: _self.data.sali,
      vin: hev.vin
    }
    console.log(data)
    wx.request({
      url: carurl,
      data: {
        data: data,token
      },
      header: {},
      method:"POST",
      success:function(res){
        console.log(res)
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
  }
})