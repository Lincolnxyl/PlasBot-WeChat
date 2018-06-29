//app.js
App({
  onLaunch: function () {
    // Local Storage
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // Login
    wx.login({
      success: res => {
        // send res.code to receive openId, sessionKey, unionId
      }
    })
    //Get User Information
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              wx.setStorageSync('userInfo', res.userInfo);
              //add a callback to prevent userinfo later than Page.onLoad
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    appDomain: "https://apps1.unep.org/",
    stagingDomain: "http://staging1.unep.org/yuliang/"
  }
})