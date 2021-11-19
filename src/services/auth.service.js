import axios from "axios"

const AuthRequest = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
})

class Auth {
  async login(user) {
    return await AuthRequest.post("login", { user: user.email, pwd: user.password })
      .then((res) => {
        if (res) {
          res.data.user = user
          localStorage.setItem("user", JSON.stringify(res.data))
          return res.data
        }
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  }
  async renewToken() {
    var user = JSON.parse(localStorage.getItem("user")).user
    return await AuthRequest.post("login", { user: user.email, pwd: user.password })
      .then((res) => {
        if (res) {
          res.data.user = user
          localStorage.setItem("user", JSON.stringify(res.data))
        }
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  }
  logout() {
    localStorage.removeItem("user")
  }
}
export default new Auth()
