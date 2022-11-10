import axiosInstance from "../axiosInstance";
const shopCart = {
    /**
     * 获取我的购物车的总计信息
     * @returns {Promise<Object>}
     */
    getMyShopCartTotalInfo() {
        return axiosInstance.get(`/shopCart/getMyShopCartTotalInfo`);
    },
    /**
     * 添加菜品到购物车
     * @param {{fid,count}} param0 
     * @returns 
     */
    addToShopCart({ fid, count }) {
        return axiosInstance.post(`/shopCart/addToShopCart`, {
            fid, count
        })
    },
    /**
     * 获取我的购物车列表
     * @param {{pageIndex}} param0 
     * @returns {Promise<Object>}
     */
    getShopCartListByPage({ pageIndex }) {
        return axiosInstance.get(`/shopCart/getListByPage`, {
            params: {
                pageIndex
            }
        });
    },
    /**
     * 删除购物车里面的某一个项
     * @param {number} id 
     * @returns {Promise<Object>}
     */
    deleteMyShopCartFoodById(id) {
        return axiosInstance.get('/shopCart/deleteMyShopCartFoodById', {
            params: {
                id
            }
        })
    }
}

export default shopCart;