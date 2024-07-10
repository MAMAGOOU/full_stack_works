import {Http} from "../utils/http";

export class Activity {
    static  locationD = 'a-2'
    static  async getHomeLocationD(){
        return Http.request({
            url: `v1/activity/name/${Activity.locationD}`
        })
    }
}
