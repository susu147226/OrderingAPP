import axiosInstance from "../axiosInstance";
const area = {
    /**
     * 根据parentId获取下级城市
     * @param {number} parentId 
     * @returns {Promise<Object>}
     */
    getListByParentId(parentId) {
        return axiosInstance.get(`/area/getListByParentId`, {
            params: {
                parentId
            }
        });
    },
    /**
     * 获取省市区的所有数据
     * @returns {Promise<Object>}
     */
    getAllList() {
        return axiosInstance.get(`http://www.softeem.xin:9544/area/getAllList`);
    }
}

export default area;