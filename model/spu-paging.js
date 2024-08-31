import {Http} from "../utils/http";
import {Paging} from "../utils/paging";

export class SpuPaging {
    // 封装
    // 1. 一条数据都没有
    // 2. 最后一页，还没有更多的数据
    // 3. 累加
    // 4. 分页数据的加载情况 loading、loaded、没有更多数据
    // 5. 上划页面触底，避免用户重复发送请求
    // 6. 按钮提交数据，防抖 截流

    static async getLatestPaging() {
        return new Paging({
            url: `v1/spu/latest`
        }, 3)
    }
}
