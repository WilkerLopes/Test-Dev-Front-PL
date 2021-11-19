<template>
  <div class="login-page">
    <div class="container">
      <div class="side left-side">
        <img src="../assets/bannerLogin.svg" alt="" />
      </div>

      <div class="side rigth-side">
        <h1>Bem-vindo</h1>
        <p>Faça login para acessar nossa plataforma</p>
        <form action="">
          <w-input name="email" type="email" v-model="user.email" label="Email" :error="errors.email" placeholder="Digite seu email" />
          <w-input name="password" type="password" v-model="user.password" label="Senha" :error="errors.password" placeholder="Digite sua senha" />

          <w-buttom @click="login()" :block="true" :loading="loading"> Fazer login </w-buttom>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import WButtom from "../components/WButtom.vue"
  import WInput from "../components/WInput.vue"

  export default {
    name: "Login",
    components: { WInput, WButtom },
    data() {
      return {
        loading: false,
        user: {
          email: null,
          password: null,
        },
        errors: { email: "", password: "" },
      }
    },
    methods: {
      validForm() {
        var isValid = true

        if (!this.user.email) {
          this.errors.email = "O email é obrigatório."
          isValid = false
        } else if (!this.validEmail(this.user.email)) {
          this.errors.email = "O email informado está invalido."
          isValid = false
        } else {
          this.errors.email = null
        }

        if (!this.user.password) {
          this.errors.password = "A senha é obrigatória."
          isValid = false
        } else {
          this.errors.password = null
        }

        return isValid
      },
      validEmail: function (email) {
        var re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
      },
      login() {
        if (this.validForm()) {
          this.loading = true
          this.$store
            .dispatch("auth/login", this.user)
            .then(
              () => {
                this.$router.push("/")
              },
              (error) => {
                this.loading = false
                this.$toast.error({
                  title: "Erro ao fazer login",
                  description: (error.response && error.response.data) || error.message || error.toString(),
                })
              }
            )
            .catch((error) => {
              console.error(error)
            })
        }
      },
    },
  }
</script>

<style scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 100vh;
    flex-flow: row nowrap;
    gap: 64px;
  }

  .login-page {
    width: 100%;
    height: 100%;
    background-color: var(--background-card-color);
  }

  .side {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .left-side img {
    width: 100%;
    height: 546px;
    max-width: 546px;
  }

  .rigth-side {
    flex-flow: column nowrap;
    width: 100%;
    max-width: 504px;
  }

  .rigth-side h1 {
    font-size: 2.25em;
    font-weight: 700;
    color: var(--color-primary);
    margin: 0 0 24px;
  }
  .rigth-side p {
    font-size: 1.125em;
    margin: 0 0 50px;
  }
  .rigth-side form {
    width: 100%;
    max-width: 504px;
  }
  .rigth-side form .container-w-buttom {
    margin-top: 80px;
  }

  /* Screans */
  @media only screen and (max-width: 1024px) {
    .container {
      width: 90%;
    }
    .left-side img {
      width: 100%;
      height: auto;
    }
  }
  @media only screen and (max-width: 768px) {
    .container {
      width: calc(100% - 32px);
      flex-direction: column-reverse;
      gap: 0;
    }
    .side {
      width: 100%;
    }
    .rigth-side {
      padding-top: 32px;
    }
  }
</style>
