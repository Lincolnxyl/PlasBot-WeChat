//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    remind: "Loading",
    backgroundImg: null,
    UploadGuide: "Upload My Image",
    Domain: app.globalData.stagingDomain,
    logoImg: "Img/WED2018_Logos/CN/WED2018 CN_FC.png",
    WelcomeWords:"Welcome to PlasBot. I am a robot who can help you to distinguish different types of plastic products, and give you suggestions on how to recycle them. Try it now! Let's #BeatPlasticPollution"
  },
  onLoad: function () {
    this.setData({
      backgroundImg: app.globalData.stagingDomain + "Img/backgroud/NatGeo01.jpg"
    })
    if (!app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  }, 
  onShow: function() {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.navigateTo({
        url: "/pages/auth/auth"
      })
    } else {
      that.setData({
        userInfo: userInfo
      })
    }
    switch (userInfo.language){
      case "zh_CN":
        this.setData({
          UploadGuide: "上传我的图片",
          logoImg: "Img/WED2018_Logos/CN/WED2018 CN_FC.png"
        });
        break;
      case "zh_TW":
        this.setData({
          UploadGuide: "上传我的图片",
          logoImg: "Img/WED2018_Logos/CN/WED2018 CN_FC.png"
        });
      case "fr":
        this.setData({
          UploadGuide: "Télécharger Mon Image",
          logoImg: "Img/WED2018_Logos/FR/WED2018 FR_FC.png"
        });
      default:
        this.setData({
          UploadGuide: "Upload My Image",
          logoImg: "Img/WED2018_Logos/EN/WED2018 EN_FC.png"
        });
    }
  },
  onReady: function() {
    var that=this;
    setTimeout(function(){
      that.setData({
        remind: ""
      });
    },1000)
  },
  getPlasticImage: function(e){
    wx.chooseImage({
      count:1,
      success: function(res){
        console.log(res);
        console.log(app.globalData.appDomain + "hello.php");
        wx.uploadFile({
          url: app.globalData.appDomain+"hello.php",
          filePath: res.tempFilePaths[0],
          name: 'img',
          success: function(res){
          }
        })
        
        wx.showToast({
          title: 'Here',
          icon: "success",
          mask: true
        })

        
        wx.navigateTo({
          url: '/pages/backImg/backImg',
        })
        
      },
    })
  }
})