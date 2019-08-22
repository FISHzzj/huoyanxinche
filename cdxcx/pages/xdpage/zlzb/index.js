var _self = this, maxNum = 9;
var app = getApp()
//上传图片
const picUp = `https://2.honggps.com/picUp`;
//上传视频
const videoUp = `https://2.honggps.com/videoUp`;
//host
const host = 'https://2.honggps.com';
Page({
  data: {
    // start
    proofIncome: [],
    accountStatement:[],
    customerCard:[],
    spouseCard:[],
    censusRegister: [],
    proofResidency: [],
    proofMarriage: [],
    purchaseContract: [],
    receiptPayment: [],
    letterUndertaking: [],
    putDown: [],
    purposeStatement: [],
    repaymentUndertaking: [],
    familyVisitPhotos: [],
    customerSignaturePhoto: [],
    businessLicense: [],
    articlesAssociation: [],
    creditInvestigation: [],
    repayment: [],
    creditReport: [],
    vehicleMortgage: [],
    informationCollectionForm: [],
    familyVisitInfo:'',
    familyVisitAddress:'',
    familyVisitUser:'',
    receiptPaymentId:'',
    purchaseContract:'',
    purchaseContractId:'',
    faceToFaceVideo: '',
    familyVisitVideo: '',
    pledgeVideo: '',
    restsVideo:'',

    // ok?
    btnImg: true
  },
  onLoad:function(data){
    _self = this;
    _self.getImageinformationDetails()
  },
  //把获取到的用页面链接展示出来
  poline: function (arr) {
    // console.log(arr)
    let ar2 = []
    let narr=','+arr
    if(narr==','){
      return []
    }
    let ar = narr.split(',')
    for (let i = 1; i < ar.length; i++) {
      let turl = host + ar[i]
      ar2.push(turl)
    }
    console.log(ar2)
    return ar2
  },
  //array转换成字符串
  ltstr: function (obj) {
    let str = ''
    if (null != obj && '' != obj) {
      for (let i = 0; i < obj.length; i++) {
        let url = "'" + obj[i] + "'"
        url = url.split('https://2.honggps.com')
        let objitem = "'" + url[1]
        str = str + ',' + objitem
      }
      return str.substring(1, str.length)
    }
    return ""
  }, 
  //查询图片资料信息
  getImageinformationDetails:function(dt){
    let userinfo = wx.getStorageSync('userInfo')
    let token = userinfo.token
    // let imageid = dt.imageinformationId
    //imageinformationId: 52
    let data ={
      imageinformationId:47
    }
    wx.request({
      url: host +'/getImageinformationDetails',
      data:{data:data,token},
      method:'post',
      success:function(res){
        console.log(res.data.retobj)
        console.log(_self.poline(res.data.retobj.customerCard))
    
    _self.setData({
      proofIncome: _self.poline(res.data.retobj.proofIncome),
      accountStatement: _self.poline(res.data.retobj.accountStatement),
      customerCard: _self.poline(res.data.retobj.customerCard),
      spouseCard: _self.poline(res.data.retobj.spouseCard),
      censusRegister: _self.poline(res.data.retobj.censusRegister),
      proofResidency: _self.poline(res.data.retobj.proofResidency),
      proofMarriage: _self.poline(res.data.retobj.proofMarriage),
      purchaseContract: _self.poline(res.data.retobj.purchaseContract),
      receiptPayment: _self.poline(res.data.retobj.receiptPayment),
      letterUndertaking: _self.poline(res.data.retobj.letterUndertaking),
      putDown: _self.poline(res.data.retobj.putDown),
      purposeStatement: _self.poline(res.data.retobj.purposeStatement),
      repaymentUndertaking: _self.poline(res.data.retobj.repaymentUndertaking),
      familyVisitPhotos: _self.poline(res.data.retobj.familyVisitPhotos),
      customerSignaturePhoto: _self.poline(res.data.retobj.customerSignaturePhoto),
      businessLicense: _self.poline(res.data.retobj.businessLicense),
      articlesAssociation: _self.poline(res.data.retobj.articlesAssociation),
      creditInvestigation: _self.poline(res.data.retobj.creditInvestigation),
      repayment: _self.poline(res.data.retobj.repayment),
      creditReport: _self.poline(res.data.retobj.creditReport),
      vehicleMortgage: _self.poline(res.data.retobj.vehicleMortgage),
      informationCollectionForm: _self.poline(res.data.retobj.informationCollectionForm),

      familyVisitInfo: res.data.retobj.familyVisitInfo,
      familyVisitAddress: res.data.retobj.familyVisitAddress,
      familyVisitUser: res.data.retobj.familyVisitUser,
      purchaseContractId: res.data.retobj.purchaseContractId,
      receiptPaymentId: res.data.retobj.receiptPaymentId,

      familyVisitVideo: _self.poline(res.data.retobj.familyVisitVideo),
      purchaseContract: _self.poline(res.data.retobj.purchaseContract),
      faceToFaceVideo: _self.poline(res.data.retobj.faceToFaceVideo),
      pledgeVideo: _self.poline(res.data.retobj.pledgeVideo),
      restsVideo: _self.poline(res.data.retobj.restsVideo),
    })
       
      }
    })
  },
  //购车合同
  getcontract:function(e){
    //purchaseContract
    this.setData({
      purchaseContractId: e.detail.value
    })
  },
  // 首付收据
  rpd:function(e){
    //receiptPaymentId
    this.setData({
      receiptPaymentId: e.detail.value
    })
    
  },
  // 家访人
  fvu:function(e){
    //familyVisitUser
    this.setData({
      familyVisitUser: e.detail.value
    })
  },
  // 家访地点
  fva:function(e){
    this.setData({
      familyVisitAddress: e.detail.value
    })
    
  },
  // 家访描述
  fvi:function(e){
    //familyVisitInfo
    this.setData({
      familyVisitInfo:e.detail.value
    })
  },
  //faceToFaceVideo
  //familyVisitVideo
  familyVisitVideo: function () {
    
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
              familyVisitVideo: retj,
              familyVisitVideo1:host+retj
            })
          }
        })

      }
    })
  },
  // pledgeVideo
  pledgeVideo: function () {
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
              pledgeVideo: retj,
              pledgeVideo1:host+retj
            })
          }
        })

      }
    })
  },
  // restsVideo
  restsVideo: function () {
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
              restsVideo: retj,
              restsVideo1:host+retj
            })
          }
        })

      }
    })
  },
  faceToFaceVideo:function(){
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
              faceToFaceVideo:retj,
              faceToFaceVideo1: host+retj,
            })
          }
        })

      }
    })
  },
  addImg: function (e) {
    let objname = e.currentTarget.dataset.name
    console.log(objname)
    if (objname == 'proofIncome') {
      this.proofIncome()
    }  if (objname == 'accountStatement') {
      console.log(objname)
      this.accountStatement()
    }  if (objname == 'articlesAssociation') {
      this.articlesAssociation()
    }  if (objname == 'customerCard') {
      this.customerCard()
    }  if (objname == 'spouseCard') {
      this.spouseCard()
    }  if (objname == 'censusRegister') {
      this.censusRegister()
    }  if (objname == 'proofResidency') {
      this.proofResidency()
    }  if (objname == 'proofMarriage') {
      this.proofMarriage()
    }  if (objname == 'purchaseContract') {
      this.purchaseContract()
    }  if (objname == 'receiptPayment') {
      this.receiptPayment()
    }  if (objname == 'letterUndertaking') {
      this.letterUndertaking()
    }  if (objname == 'putDown') {
      this.putDown()
    }  if (objname == 'purposeStatement') {
      this.purposeStatement()
    }  if(objname == 'repaymentUndertaking'){
      this.repaymentUndertaking()
    }  if (objname == 'familyVisitPhotos'){
      this.familyVisitPhotos()
    }  if (objname == 'customerSignaturePhoto') {
      this.customerSignaturePhoto()
    }  if (objname == 'businessLicense') {
      this.businessLicense()
    }  if (objname == 'articlesAssociation') {
      this.articlesAssociation()
    }  if (objname == 'creditInvestigation') {
      this.creditInvestigation()
    }  if (objname == 'repayment') {
      this.repayment()
    }  if (objname == 'creditReport') {
      this.creditReport()
    }  if (objname == 'vehicleMortgage') {
      this.vehicleMortgage()
    }  if (objname == 'informationCollectionForm') {
      this.informationCollectionForm()
    }
  },
// fengexian
  updateimageinformationinfo:function(e){
    console.log(e.currentTarget)
    let userinfo =wx.getStorageSync('userInfo')
    let token =userinfo.token
    let that =this
    //购车合同，首付收据，家访人，家访地点，家访描述
    let data={
        accountStatement: that.ltstr(that.data.accountStatement),
      articlesAssociation: that.ltstr(that.data.articlesAssociation),
      businessLicense: that.ltstr(that.data.businessLicense),
      censusRegister: that.ltstr(that.data.censusRegister),
      creditInvestigation: that.ltstr(that.data.creditInvestigation),
      creditReport: that.ltstr(that.data.creditReport),
      customerCard: that.ltstr(that.data.customerCard),
      customerSignaturePhoto: that.ltstr(that.data.customerSignaturePhoto),
      faceToFaceVideo: that.ltstr(that.data.faceToFaceVideo),

      purchaseContractId: that.data.purchaseContractId,
      familyVisitAddress: that.data.familyVisitAddress,
      familyVisitInfo: that.data.familyVisitInfo,
      familyVisitUser: that.data.familyVisitUser,
      receiptPaymentId: that.data.receiptPaymentId,

      familyVisitVideo: that.ltstr(that.data.familyVisitVideo),
      familyVisitPhotos: that.ltstr(that.data.familyVisitPhotos),
      imageinformationid: that.ltstr(that.data.imageinformationid),
      informationCollectionForm: that.ltstr(that.data.informationCollectionForm),
      letterUndertaking: that.ltstr(that.data.letterUndertaking),
      pledgeVideo: that.ltstr(that.data.pledgeVideo),
      proofIncome: that.ltstr(that.data.proofIncome),
      proofMarriage: that.ltstr(that.data.proofMarriage),
      proofResidency: that.ltstr(that.data.proofResidency),
      purchaseContract: that.ltstr(that.data.purchaseContract),
      
      purposeStatement: that.ltstr(that.data.purposeStatement),
      putDown: that.ltstr(that.data.putDown),
      receiptPayment: that.ltstr(that.data.receiptPayment),
      receiptPaymentId: that.ltstr(that.data.receiptPaymentId),
      repayment: that.ltstr(that.data.repayment),
      repaymentUndertaking: that.ltstr(that.data.repaymentUndertaking),
      restsVideo: that.ltstr(that.data.restsVideo),
      spouseCard: that.ltstr(that.data.spouseCard),
      uploadtime: that.ltstr(that.data.uploadtime),
      vehicleMortgage: that.ltstr(that.data.vehicleMortgage),
    }
    console.log(data)
    wx.request({
      data:{data:data,token},
      method:'post',
      url: app.globalData.host +'/updateimageinformationinfo',
      success:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  //提交按钮
  uptest:function(){
    console.log('up')
    let that = this
    console.log(that.ltstr(that.data.proofIncome))
  },
  
// fengexian

  proofIncome: function (v) {
    var num = maxNum - _self.data.proofIncome.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res){
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ proofIncome: _self.data.proofIncome.concat(host + m.retobj) });
            console.log(_self.data.proofIncome)
          },
        });
      }
    })
  },
  accountStatement: function () {
    var num = maxNum - _self.data.accountStatement.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ accountStatement: _self.data.accountStatement.concat(host + m.retobj) });
            console.log(_self.data.accountStatement)
          },
        });
      }
    })
  },
  articlesAssociation: function (v) {
    var num = maxNum - _self.data.articlesAssociation.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ articlesAssociation: _self.data.articlesAssociation.concat(host + m.retobj) });
            console.log(_self.data.articlesAssociation)
          },
        });
      }
    })
  },
  customerCard: function (v) {
    var num = maxNum - _self.data.customerCard.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ customerCard: _self.data.customerCard.concat(host + m.retobj) });
            console.log(_self.data.customerCard)
          },
        });
      }
    })
  },
  spouseCard: function (v) {
    var num = maxNum - _self.data.spouseCard.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ spouseCard: _self.data.spouseCard.concat(host + m.retobj) });
            console.log(_self.data.spouseCard)
          },
        });
      }
    })
  },
  censusRegister: function (v) {
    var num = maxNum - _self.data.censusRegister.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ censusRegister: _self.data.censusRegister.concat(host + m.retobj) });
            console.log(_self.data.censusRegister)
          },
        });
      }
    })
  },
  proofResidency: function (v) {
    var num = maxNum - _self.data.proofResidency.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ proofResidency: _self.data.proofResidency.concat(host + m.retobj) });
            console.log(_self.data.proofResidency)
          },
        });
      }
    })
  },
  proofMarriage: function (v) {
    var num = maxNum - _self.data.proofMarriage.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ proofMarriage: _self.data.proofMarriage.concat(host + m.retobj) });
            console.log(_self.data.proofMarriage)
          },
        });
      }
    })
  },
  purchaseContract: function (v) {
    var num = maxNum - _self.data.purchaseContract.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ purchaseContract: _self.data.purchaseContract.concat(host + m.retobj) });
            console.log(_self.data.purchaseContract)
          },
        });
      }
    })
  },
  receiptPayment: function (v) {
    var num = maxNum - _self.data.receiptPayment.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ receiptPayment: _self.data.receiptPayment.concat(host + m.retobj) });
            console.log(_self.data.receiptPayment)
          },
        });
      }
    })
  },
  letterUndertaking: function (v) {
    var num = maxNum - _self.data.letterUndertaking.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ letterUndertaking: _self.data.letterUndertaking.concat(host + m.retobj) });
            console.log(_self.data.letterUndertaking)
          },
        });
      }
    })
  },
  putDown: function (v) {
    var num = maxNum - _self.data.putDown.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ putDown: _self.data.putDown.concat(host + m.retobj) });
            console.log(_self.data.putDown)
          },
        });
      }
    })
  },
  purposeStatement: function (v) {
    var num = maxNum - _self.data.purposeStatement.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ purposeStatement: _self.data.purposeStatement.concat(host + m.retobj) });
            console.log(_self.data.purposeStatement)
          },
        });
      }
    })
  },
  repaymentUndertaking: function (v) {
    var num = maxNum - _self.data.repaymentUndertaking.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ repaymentUndertaking: _self.data.repaymentUndertaking.concat(host + m.retobj) });
            console.log(_self.data.repaymentUndertaking)
          },
        });
      }
    })
  },
  familyVisitPhotos: function (v) {
    var num = maxNum - _self.data.familyVisitPhotos.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ familyVisitPhotos: _self.data.familyVisitPhotos.concat(host + m.retobj) });
            console.log(_self.data.familyVisitPhotos)
          },
        });
      }
    })
  },
  customerSignaturePhoto: function (v) {
     var num = maxNum - _self.data.customerSignaturePhoto.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res){
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ customerSignaturePhoto: _self.data.customerSignaturePhoto.concat(host + m.retobj) });
            console.log(_self.data.customerSignaturePhoto)
          },
        });
      }
    })
  },
  businessLicense: function (v) {
    var num = maxNum - _self.data.businessLicense.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res){
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ businessLicense: _self.data.businessLicense.concat(host + m.retobj) });
            console.log(_self.data.businessLicense)
          },
        });
      }
    })
  },

  articlesAssociation: function (v) {
    var num = maxNum - _self.data.articlesAssociation.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ articlesAssociation: _self.data.articlesAssociation.concat(host + m.retobj) });
            console.log(_self.data.articlesAssociation)
          },
        });
      }
    })
  },
  creditInvestigation: function (v) {
    var num = maxNum - _self.data.creditInvestigation.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ creditInvestigation: _self.data.creditInvestigation.concat(host + m.retobj) });
            console.log(_self.data.creditInvestigation)
          },
        });
      }
    })
  },
  repayment: function (v) {
    var num = maxNum - _self.data.repayment.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ repayment: _self.data.repayment.concat(host + m.retobj) });
            console.log(_self.data.repayment)
          },
        });
      }
    })
  },
  creditReport: function (v) {
    var num = maxNum - _self.data.creditReport.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ creditReport: _self.data.creditReport.concat(host + m.retobj) });
            console.log(_self.data.creditReport)
          },
        });
      }
    })
  },
  vehicleMortgage: function (v) {
    var num = maxNum - _self.data.vehicleMortgage.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ vehicleMortgage: _self.data.vehicleMortgage.concat(host + m.retobj) });
            console.log(_self.data.vehicleMortgage)
          },
        });
      }
    })
  },
  informationCollectionForm: function (v) {
    var num = maxNum - _self.data.informationCollectionForm.length;
    if (num < 1) { return false; }
    wx.chooseImage({
      count: 12,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgUrl = res.tempFilePaths[0];
        wx.uploadFile({
          url: picUp,
          filePath: imgUrl,
          name: 'file',
          success: function (res) {
            let m = JSON.parse(res.data)
            let retj = res.data.retobj
            _self.setData({ informationCollectionForm: _self.data.informationCollectionForm.concat(host + m.retobj) });
            console.log(_self.data.informationCollectionForm)
          },
        });
      }
    })
  },

  //分隔符
  removeImg1: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.proofIncome.splice(index, 1);
    _self.setData({ proofIncome: _self.data.proofIncome });
    
    if (_self.data.proofIncome.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  
  
  removeImg2: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.accountStatement.splice(index, 1);
    _self.setData({ accountStatement: _self.data.accountStatement });

    if (_self.data.accountStatement.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  removeImg3: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.customerCard.splice(index, 1);
    _self.setData({ customerCard: _self.data.customerCard });

    if (_self.data.proofIncome.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  }, 
  
  removeImg4: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.spouseCard.splice(index, 1);
    _self.setData({ spouseCard: _self.data.spouseCard });

    if (_self.data.spouseCard.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  removeImg5: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.censusRegister.splice(index, 1);
    _self.setData({ censusRegister: _self.data.censusRegister });

    if (_self.data.censusRegister.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
 
  removeImg6: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.proofResidency.splice(index, 1);
    _self.setData({ proofResidency: _self.data.proofResidency });

    if (_self.data.proofResidency.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  removeImg7: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.proofMarriage.splice(index, 1);
    _self.setData({ proofMarriage: _self.data.proofMarriage });

    if (_self.data.proofMarriage.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  removeImg8: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.purchaseContract.splice(index, 1);
    _self.setData({ purchaseContract: _self.data.purchaseContract });

    if (_self.data.purchaseContract.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  
  },
  removeImg9: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.receiptPayment.splice(index, 1);
    _self.setData({ receiptPayment: _self.data.receiptPayment });

    if (_self.data.receiptPayment.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
 
  removeImg10: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.letterUndertaking.splice(index, 1);
    _self.setData({ letterUndertaking: _self.data.letterUndertaking });

    if (_self.data.letterUndertaking.length < maxNum) {
      _self.setData({ btnImg: true });
    } 
  
  },
  removeImg11: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.putDown.splice(index, 1);
    _self.setData({ putDown: _self.data.putDown });

    if (_self.data.putDown.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  removeImg12: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.purposeStatement.splice(index, 1);
    _self.setData({ purposeStatement: _self.data.purposeStatement });

    if (_self.data.purposeStatement.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },

  removeImg13: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.repaymentUndertaking.splice(index, 1);
    _self.setData({ repaymentUndertaking: _self.data.repaymentUndertaking });

    if (_self.data.repaymentUndertaking.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  removeImg14: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.familyVisitPhotos.splice(index, 1);
    _self.setData({ familyVisitPhotos: _self.data.familyVisitPhotos });

    if (_self.data.familyVisitPhotos.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  removeImg15: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.customerSignaturePhoto.splice(index, 1);
    _self.setData({ customerSignaturePhoto: _self.data.customerSignaturePhoto });

    if (_self.data.customerSignaturePhoto.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  removeImg16: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.businessLicense.splice(index, 1);
    _self.setData({ businessLicense: _self.data.businessLicense });

    if (_self.data.businessLicense.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
    
  removeImg17: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.articlesAssociation.splice(index, 1);
    _self.setData({ articlesAssociation: _self.data.articlesAssociation });

    if (_self.data.articlesAssociation.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  removeImg20: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.creditInvestigation.splice(index, 1);
    _self.setData({ creditInvestigation: _self.data.creditInvestigation });

    if (_self.data.creditInvestigation.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  removeImg21: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.repayment.splice(index, 1);
    _self.setData({ repayment: _self.data.repayment });

    if (_self.data.repayment.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  removeImg22: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.creditReport.splice(index, 1);
    _self.setData({ creditReport: _self.data.creditReport });

    if (_self.data.creditReport.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  removeImg23: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.vehicleMortgage.splice(index, 1);
    _self.setData({ vehicleMortgage: _self.data.vehicleMortgage });

    if (_self.data.vehicleMortgage.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  removeImg23: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.informationCollectionForm.splice(index, 1);
    _self.setData({ informationCollectionForm: _self.data.informationCollectionForm });

    if (_self.data.informationCollectionForm.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  // informationCollectionForm
  //视频消除
  removeVd1: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.faceToFaceVideo.splice(index, 1);
    _self.setData({ faceToFaceVideo: _self.data.faceToFaceVideo });

    if (_self.data.faceToFaceVideo.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  removeVd2: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.familyVisitVideo.splice(index, 1);
    _self.setData({ familyVisitVideo: _self.data.familyVisitVideo });

    if (_self.data.familyVisitVideo.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  removeVd3: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.pledgeVideo.splice(index, 1);
    _self.setData({ pledgeVideo: _self.data.pledgeVideo });

    if (_self.data.pledgeVideo.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  },
  removeVd4: function (e) {
    let tag = e.currentTarget.dataset.name
    console.log(tag)
    var index = e.currentTarget.id.replace('grace-items-img-', '');
    _self.data.restsVideo.splice(index, 1);
    _self.setData({ restsVideo: _self.data.restsVideo });

    if (_self.data.restsVideo.length < maxNum) {
      _self.setData({ btnImg: true });
    }
  }

})