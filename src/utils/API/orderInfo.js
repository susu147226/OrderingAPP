import axiosInstance from "../axiosInstance";
const orderInfo = {
    /**
     * 提交订单
     * @param {Object} orderData 
     * @returns {Promise<Object>} 
     */
    submitOrder(orderData) {
        return axiosInstance.post(`/orderInfo/submitOrder`, orderData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
    /**
     * 获取我的订单列表
     * @param {{pageIndex}} param0 
     * @returns {Promise<Object>}
     */
    getMyOrderListByPage({ pageIndex }) {
        return axiosInstance.get(`/orderInfo/getMyOrderListByPage`, {
            params: {
                pageIndex
            }
        })
    },
    
}

export default orderInfo;