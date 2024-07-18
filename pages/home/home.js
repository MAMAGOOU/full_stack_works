// pages/home/home.js
import {config} from "../../config/config"
import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";
import {Activity} from "../../model/activity";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        themeE: null,
        bannerB: null,
        grid: [],
        activityD: null,
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
        const theme = new Theme()
        await theme.getThemes()
        // const themeA = await Theme.getHomeLocationA()
        const bannerB = await Banner.getHomeLocationB()

        // 通过name匹配
        const themeA = await theme.getHomeLocationA()
        const themeE = await theme.getHomeLocationE()
        const themeF = await theme.getHomeLocationF()
        let themeESpu = []
        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu()
            if (data) {
                themeESpu = data.spu_list.slice(0, 8)
                console.log('themeESpu===>', themeESpu)
            }
        }
        const grid = await Category.getHomeLocationC()
        const activityD = await Activity.getHomeLocationD()

        console.log('--------------')
        console.log(grid)
        this.setData({
            themeA: themeA,
            themeE: themeE,
            themeF: themeF,
            themeESpu: themeESpu,
            bannerB: bannerB,
            grid: grid,
            activityD: activityD
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
