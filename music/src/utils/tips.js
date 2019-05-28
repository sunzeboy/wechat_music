/**
 * 提示与加载工具类
 */
export default class Tips {
  constructor() {
    this.isLoading = false
  }

  /**
   * 弹出成功提示框
   * @param title
   * @param duration
   * @returns {Promise<any>}
   */
  static success(title, duration = 500) {
    setTimeout(() => {
      wx.showToast({
        title: title || 'success',
        icon: 'success',
        mask: true,
        duration: duration
      })
    }, 300)

    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, duration)
      })
    }
  }

  /**
   * 弹出模态确认窗口
   * @param text
   * @param payload
   * @param title
   * @returns {Promise<any>}
   */
  static confirm(text, payload = {}, title = '提示') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: true,
        success: res => {
          if (res.confirm) {
            resolve(payload)
          } else if (res.cancel) {
            reject(payload)
          }
        },
        fail: res => {
          reject(payload)
        }
      })
    })
  }

  /**
   * 弹出成功提示框
   * @param title
   * @param onHide
   * @param icon
   */
  static toast(title, onHide, icon = 'success') {
    setTimeout(() => {
      wx.showToast({
        title: title || 'success',
        icon: icon,
        mask: true,
        duration: 500
      })
    }, 300)

   //  隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide()
      }, 500)
    }
  }

  /**
   * 警告框
   * @param title
   */
  static alert(title) {
    wx.showToast({
      title: title || 'alert',
      image: '../images/alert.png',
      mask: true,
      duration: 1500
    })
  }

  // /**
  //  * 错误框
  //  * @param title
  //  * @param onHide
  //  */
  // static error(title, onHide) {
  //   wx.showToast({
  //     title: title || 'error',
  //     image: '../images/error.png',
  //     mask: true,
  //     duration: 500
  //   })

  //  //  隐藏结束回调
  //   if (onHide) {
  //     setTimeout(() => {
  //       onHide()
  //     }, 500)
  //   }
  // }

  /**
   * 弹出加载提示
   * @param title
   */
  static loading(title = '加载中') {
    if (Tips.isLoading) {
      return
    }
    Tips.isLoading = true
    wx.showLoading({
      title: title,
      mask: true
    })
  }

  /**
   * 加载完毕
   */
  static loaded() {
    if (Tips.isLoading) {
      Tips.isLoading = false
      wx.hideLoading()
    }
  }

  /**
   * 分享成功
   * @param title
   * @param url
   * @param desc
   * @returns {{title: *, path: *, desc: *, success: success}}
   */
  static share(title, url, desc) {
    return {
      title: title,
      path: url,
      desc: desc,
      success: function(res) {
        Tips.toast('分享成功')
      }
    }
  }
}

/**
 * 静态变量，是否加载中
 * @type {boolean}
 */
Tips.isLoading = false
