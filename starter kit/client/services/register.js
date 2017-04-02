import request from '../helpers/request';

export const register = ({username, password}) => {
  return request({
    method: 'post',
    url: '/auth/register',
    data: {
      username,
      password
    }
  });
}
