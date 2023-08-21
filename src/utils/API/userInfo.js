import axiosInstance from "../axiosInstance";
const userInfo = {
    uploadUserPhoto(file) {
        //文件上传第一步：要借用于FormData的对象
        let formData = new FormData();
        formData.append("user_photo", file);
        //文件上传第二步：一定是POST请示
        //文件上传第三步：一定要指定请求头
        return axiosInstance.post(`/userInfo/uploadUserPhoto`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    add({ nickName, user_sex, user_phone, user_email, user_photo, password }) {
        return axiosInstance.post(`/userInfo/add`, {
            nickName, user_sex, user_phone, user_email, user_photo, password
        });
    },
    /**
     * 登录
     * @param {{zh,password}} param0 
     * @returns {Promise<Object>} 
     */
    checkLogin({ zh, password }) {
        return axiosInstance.post(`/userInfo/checkLogin`, {
            zh, password
        });
    }

}

export default userInfo;


/**
 * GET请求
 * axios.get(url,config);
 * 
 * 如果get主求要传递参数
 * axios.get(url,{
 *    params:{
 *       //这里放的是请求参数
 *       userName:"张三"
 *    }
 * })
 * 
 * POST请求
 * axios.post(url,data,config);
 * 
 * axios.post(url,{
 *      userName:"张三"
 * })
 * 
 * 
 * POST文件上传
 * 如果使用axios进行文件上传，需要借用于FormData的对象
 * 一定要是POST请求，GET不可以
 * 一定要设置请求头为Content-Type:multipart/form-data
 * 
 */