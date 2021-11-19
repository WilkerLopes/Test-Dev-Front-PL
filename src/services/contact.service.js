import authService from "./auth.service"
import ContactRequest from "./request.service"

class Contact {
  async getAll() {
    var result = null,
      stop = false
    while (!stop) {
      result = await ContactRequest.get("clientes")
        .then((res) => {
          return res.data[0]
        })
        .catch((error) => {
          return error.response.data
        })

      result.message === "Failed to authenticate token." ? await authService.renewToken() : (stop = true)
    }

    return result
  }

  async getById(id_contact) {
    var result = null,
      stop = false
    while (!stop) {
      result = await ContactRequest.get(`clientes/${id_contact}`)
        .then((res) => {
          return res.data
        })
        .catch((error) => {
          return error.response.data
        })

      result.message === "Failed to authenticate token." ? await authService.renewToken() : (stop = true)
    }

    return result
  }

  async create(body) {
    var result = null,
      stop = false
    while (!stop) {
      result = null
      result = await ContactRequest.post("clientes", body)
        .then((res) => {
          return res.data
        })
        .catch((error) => {
          return error.response.data
        })

      result.message === "Failed to authenticate token." ? await authService.renewToken() : (stop = true)
    }

    return result
  }
  async edit(body) {
    var result = null,
      stop = false
    while (!stop) {
      console.log(body)
      result = await ContactRequest.put(`clientes/${body.id}`, body)
        .then((res) => {
          return res.data
        })
        .catch((error) => {
          return error.response.data
        })

      result.message === "Failed to authenticate token." ? await authService.renewToken() : (stop = true)
    }

    return result
  }
  async delete(id_contact) {
    var result = null,
      stop = false
    while (!stop) {
      result = await ContactRequest.delete(`clientes/${id_contact}`)
        .then((res) => {
          return res.data
        })
        .catch((error) => {
          return error.response.data
        })

      console.log(result)

      result.message === "Failed to authenticate token." ? await authService.renewToken() : (stop = true)
    }

    return result
  }
}
export default new Contact()
