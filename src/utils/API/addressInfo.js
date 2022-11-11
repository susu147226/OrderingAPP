import axiosInstance from "../axiosInstance";
const addressInfo = {
    /**
     * 新增收货地址
     * @param {{address,phone,person_name,tag}} param0 
     * @returns {Promise<Object>}
     */
    addAddress({address,phone,person_name,tag}){
        return axiosInstance.post(`/addressInfo/addAddress`,{
            address,phone,person_name,tag
        })
    },
    /**
     * 获取登录者的收货地址
     * @returns {Promise<Object>}
     */
    getMyAddressInfoList(){
        return axiosInstance.get(`/addressInfo/getMyAddressInfoList`);
    }
}

export default addressInfo;