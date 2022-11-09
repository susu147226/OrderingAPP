import axiosInstance from "../axiosInstance";

const commentInfo = {
    /**
     * 根据菜品id分页获取菜品评论
     * @param {{ fid, pageIndex }} param0 参数
     * @returns {Promise<Object>}
     */
    getCommentInfoListByFid({ fid, pageIndex }) {
        return axiosInstance.get(`/commentInfo/getCommentInfoListByFid`, {
            params: {
                fid,
                pageIndex
            }
        })
    }
}

export default commentInfo;