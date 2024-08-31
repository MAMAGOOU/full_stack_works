import {Http} from "./http";
import boolean from "../miniprogram_npm/lin-ui/common/async-validator/validator/boolean";

export class Paging {

    start
    count
    request
    locker = false
    url
    moreData
    accumulator = []


    /**
     * 生成器
     * @param request Http的对象，包括URL、data、method
     * @param start 开始调入数据条数
     * @param count 调入多少条
     */
    constructor(request, count = 10, start = 0) {
        this.start = start
        this.count = count
        this.request = request
        this.url = request.url
    }

    async getMoreData() {
        if (!this.moreData){
            return
        }
        if (!this.getLocker()) {
            return
        }
        const data = await this._actualGetData()
        this.releaseLocker()
        return data
    }

    getCurrentRequest() {
        let url = this.url
        const params = `start=${this.start}&count=${this.count}`
        if (url.indexOf("?") !== -1) {
            url = url + "&" + params
        } else {
            url = url + "?" + params
        }
        this.request.url = url
        return this.request
    }

    /**
     * 获取数据
     */
    async _actualGetData() {
        const req = this.getCurrentRequest()
        let paging = await Http.request(req)
        if (!paging) {
            return null
        }
        if (paging.total === 0) {
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulator: [],
            }
        }
        this.moreData = Paging._moreData(paging.total_page, paging.page)
        if (this.moreData) {
            this.start += this.count
        }
        this._accumulator(paging.items)
        return {
            empty: false,
            items: paging.items,
            moreData: this.moreData,
            accumulator: this.accumulator,
        }
    }

    _accumulator(items) {
        this.accumulator = this.accumulator.concat(items)
    }

    static _moreData(totalPage, pageNum) {
        return pageNum < totalPage - 1
    }

    /**
     * 获取锁
     * @returns {boolean}
     */
    getLocker() {
        if (this.locker) {
            return false
        }
        this.locker = true
        return true
    }

    /**
     * 释放锁
     */
    releaseLocker() {
        this.locker = false
    }
}
