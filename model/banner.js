import {Http} from "../utils/http";

export class Banner {
    static  locationB = 'b-1'

    static async getHomeLocationB() {
        return await Http.request({
            url: `v1/banner/name/${this.locationB}`
        })
    }
}
