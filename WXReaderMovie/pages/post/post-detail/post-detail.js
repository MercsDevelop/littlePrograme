var postsdata = require('../../../data/posts-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postid = options.id;
    this.data.currentPostId = postid;
    var postdata = postsdata.postList[postid];
    //如果在onLoad方法中，不是异步执行一个数据绑定，则不需要使用this.setData方法
    //只需要对this.data赋值即可实现数据绑定
    this.setData({
      post_data: postdata
    });

    var postsCollected = wx.getStorageSync('postsCollected');
    if (postsCollected) {
      var postCollected = postsCollected[postid];
      this.setData({
        collected: postCollected
      });
    }
    else {
      var postsCollected = {};
      postsCollected[postid] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
  },

  ontap: function (event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    //收藏变成未收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    // //更新文章是否的缓存值
    // wx.setStorageSync('posts_collected', postsCollected);
    // //更新数据绑定变量，从而实现切换图片
    // this.setData({
    //   collected: postCollected
    // });

    //  wx.showToast({
    //    title: postCollected?"收藏成功":"取消收藏",
    //    duration:800,
    //    icon:"success"
    //  })
    this.showModelMethod(postsCollected, postCollected);
  },

  showModelMethod: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: 'Cavs',
      content: postCollected ? "收藏该文章？" : "取消收藏该文章？",
      showCancel: true,
      cancelText: "总冠军",
      cancelColor: "#333333",
      confirmText: "詹姆斯",
      confirmColor: "#3e3e3e",
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('posts_collected', postsCollected);
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },

  canceltap: function (event) {
    var shareList = [
      "share Instagam",
      "share Facebook",
      "share Twitter",
      "share WeChat"
    ]
    wx.showActionSheet({
      itemList: shareList,
      itemColor:"#405f80",
      success:function(res){
        // res.cancel用户是不是点击了取消按钮
        // res.tapIndex数组元素得序号，从0开始
        wx.showModal({
          title: '用户' + shareList[res.tapIndex],
          content: '用户是否取消？' + res.cancel + '现在无法分享',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})