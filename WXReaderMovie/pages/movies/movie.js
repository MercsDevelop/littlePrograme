var app = getApp();
Page({
  onLoad: function (event) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250";

    this.getMovieListData(inTheatersUrl);
    this.getMovieListData(comingSoonUrl);
    this.getMovieListData(top250Url);
  },

  getMovieListData: function (url) {
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        "content-type": "json"
        // "Content-Type":"application/xml"
      },
      success: function (res) {

      },
      fail: function (error) {

      },
      complete: function () {

      }
    })
  }
})