// pages/home/home.js
import {config} from "../../config/config"
import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        bannerB: null,
        grid: [],
    },

    /**
     * 生命周期函数--监听页面加载
     * 页面的js不应该做逻辑，只做数据绑定
     * MVC model，view，controller，业务在model里写
     */
    onLoad: async function (options) {
        await this.initAllData()
    },

    async initAllData() {
        const themeA = await Theme.getHomeLocationA()
        const bannerB = await Banner.getHomeLocationB()
        const grid = await Category.getGridCategory()
        console.log(themeA)
        console.log(bannerB)
        console.log('--------------')
        console.log(grid)
        this.setData({
            themeA: themeA[0],
            bannerB: bannerB,
            grid: grid,
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    }
    ,

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
    ,

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
