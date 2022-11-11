import axiosInstance from "../axiosInstance";
const orderInfo = {
    submitOrder(orderData) {
        return axiosInstance.post(`/orderInfo/submitOrder`, orderData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

export default orderInfo;