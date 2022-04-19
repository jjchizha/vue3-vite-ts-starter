import request from '../utils/axios'

export default {
  /**
   * 获取测试信息
   */
  getjjchizha() {
    return request({
      url: '/users/jjchizha',
      method: 'get'
    })
  }
}
