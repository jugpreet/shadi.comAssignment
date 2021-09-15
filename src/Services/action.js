import { login, Logout, Error } from './types'

export const loginData = (data) => dispatch => {
  dispatch({
    type: login,
    payload: {
      status: 'loading',
      payload: data
    }
  })
}



const logout = () => ({
  type: Logout
})

export const setError = (data) => ({
  type: Error,
  payload: data,
});

export const onLogout = () => (dispatch) => {
  localStorage.clear();
  dispatch(logout())
}