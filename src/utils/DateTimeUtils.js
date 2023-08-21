/**
 * 专门用于处理日期或时间的一个工具类
 */

import dayjs from "dayjs";

/**
 * 格式化日期
 * @param {string|Date|Number} _d 
 * @param {string} 格式化的参数
 */
export const formatDateTime = (_d, split = "YYYY-MM-DD HH:mm:ss") => {
    //2021-11-17T19:33:45.000Z
    //1667956731356
    let d = dayjs(_d);
    // 判断一下，是否是一个合法的日期
    if (d.isValid()) {
        return d.format(split);
    }
    else {
        return "";
    }

}