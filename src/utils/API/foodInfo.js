import axiosInstance from "../axiosInstance";


const foodInfo = {
    getListByPage({ pageIndex, food_name, category_name }) {
        return axiosInstance.get(`/foodInfo/getListByPage`, {
            params: {
                pageIndex, food_name, category_name
            }
        })
    },
    getListByCid(cid) {
        return axiosInstance.get(`/foodInfo/getListByCid`, {
            params: {
                cid
            }
        })
    }
}


export default foodInfo;