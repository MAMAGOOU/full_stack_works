// 业务对象 theme
import {Http} from "../utils/http";

export class Theme {
    static  locationA = 't-1'
    static locationE = 't-2'
    static locationF = 't-3'
    static locationH = 't-4'

    themes = []

    async getThemes() {
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
        const themes = await Http.request({
            url: `v1/theme/by/names`,
            data: {
                names: names
            }
        })
        this.themes = themes
    }

    async getHomeLocationA() {
        return this.themes.find(theme => theme.name === Theme.locationA)
    }

    async getHomeLocationE() {
        return this.themes.find(theme => theme.name === Theme.locationE)
    }

    static async getHomeLocationESpu() {
        return Theme.getThemeSpuByName(Theme.locationE)
    }

    /**
     * 获取商品详情数据
     * @param name
     * @returns {Promise<void>}
     */
    static async getThemeSpuByName(name) {
        return await Http.request({
            url: `v1/theme/name/${name}/with_spu`
        })
    }
}
