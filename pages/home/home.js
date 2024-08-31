// pages/home/home.js
import {config} from "../../config/config"
import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";
import {Activity} from "../../model/activity";
import {SpuPaging} from "../../model/spu-paging";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        themeE: null,
        themeH: null,
        bannerB: null,
        bannerG: null,
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

    /**
     * 获取推荐分页列表数据
     * @returns {Promise<void>}
     */
    async initBottomSpuList() {
        const paging = await SpuPaging.getLatestPaging()
        const data = paging.getMoreData()
        if (!data){
            return
        }

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
        const bannerG = await Banner.getHomeLocationG();
        const themeH = await theme.getHomeLocationH()
        console.log('bannerG===>', bannerG)
        this.setData({
            themeA: themeA,
            themeE: themeE,
            themeF: themeF,
            themeH: themeH,
            themeESpu: themeESpu,
            bannerB: bannerB,
            grid: grid,
            activityD: activityD,
            bannerG: bannerG
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
