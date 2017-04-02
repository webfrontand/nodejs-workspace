import request from '../helpers/request';

export const checking = () => {
  return request({
    url: '/checking'
  });
}
