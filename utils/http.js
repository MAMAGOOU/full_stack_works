import {config} from "../config/config";
import {promisic} from "./utils";

export class Http {
    // 封装wx request
    static async request({url, data, method = 'GET', callback}) {
        const res = await promisic(wx.request)({
            url: `${config.apiBaseUrl}${url}`,
            data: data,
            method: method,
            header: {
                appkey: config.appkey,
            },
            success(res) {
                callback(res.data)
            }
        })
        return res.data
    }
}

