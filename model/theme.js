// 业务对象 theme
import {Http} from "../utils/http";

export class Theme {
    static async getHomeLocationA() {

        return await Http.request({
            url: `v1/theme/by/names`,
            data: {
                names: "t-1"
            }
        })
    }
}
