
const request = require('utils/request');

App({
  onLaunch: function (res) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    console.log(res)
    if (res.scene == 1044) {
      this.globalData.shareTicket = res.shareTicket
      // let that = this
      // wx.getShareInfo({
      //     shareTicket: res.shareTicket,
      //     success: function(res){
      //         console.log(res)
      //         let data = {
      //           "token": wx.getStorageSync("sessionId"),
      //           "iv": res.iv,
      //           "encryptedData": res.encryptedData
      //         }
      //         request.HttpRequst(true, 'program/decryptMsg', false, '', data, "post", false, res => {
      //           console.log(res)
      //           that.globalData.openGId = res.data.openGId
      //           console.log(that.globalData.openGId)
      //         })
      //     }
      // })
    }

  },

  // getGroupId() {
  //   console.log(121)
  //     let that = that.globalData.shareTicket
  //     wx.getShareInfo({
  //         shareTicket: that.globalData.shareTicket,
  //         success: function(res){
  //             console.log(res)
  //             let data = {
  //               "token": wx.getStorageSync("sessionId"),
  //               "iv": res.iv,
  //               "encryptedData": res.encryptedData
  //             }
  //             request.HttpRequst(true, 'program/decryptMsg', false, '', data, "post", false, res => {
  //               console.log(res)
  //               that.globalData.openGId = res.data.openGId
  //               console.log(that.globalData.openGId)
  //             })
  //         }
  //     })
  // },
  globalData: {
    userInfo: null,
    testList: [0,1,2,3,4],
    shareTicket: 0,
    openGId:'0',
    isCallWaiter: false   //是否呼叫服务员
  }
})