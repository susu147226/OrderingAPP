import axiosInstance from "../axiosInstance";
const addressInfo = {
    /**
     * 新增收货地址
     * @param {{address,phone,person_name,tag}} param0 
     * @returns {Promise<Object>}
     */
    addAddress({ address, phone, person_name, tag }) {
        return axiosInstance.post(`/addressInfo/addAddress`, {
            address, phone, person_name, tag
        })
    },
    /**
     * 获取登录者的收货地址
     * @returns {Promise<Object>}
     */
    getMyAddressInfoList() {
        return axiosInstance.get(`/addressInfo/getMyAddressInfoList`);
    },
    /**
     * 根据一个id删除地址
     * @param {number} id 地址的主键id 
     * @returns {Promise<Object>}
     */
    deleteById(id) {
        return axiosInstance.get(`/addressInfo/deleteById`, {
            params: {
                id
            }
        });
    },
    /**
     * 根据id获取一个地址的信息
     * @param {number} id 地址的主键id
     * @returns {Promise<Object>}
     */
    findById(id) {
        return axiosInstance.get(`/addressInfo/findById`, {
            params: {
                id
            }
        })
    },
    /**
     * 修改收货地址
     * @param {{id,address,phone,person_name,tag}} param0 
     * @returns {Promise<Object>}
     */
    update({ id, address, phone, person_name, tag }) {
        return axiosInstance.post(`/addressInfo/update`, {
            id, address, phone, person_name, tag
        })
    }
}

export default addressInfo;