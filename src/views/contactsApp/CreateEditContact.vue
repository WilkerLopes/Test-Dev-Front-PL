<template>
  <div class="container">
    <w-card size="medium" class="card-container" :loading="loading">
      <div class="card-title center">{{ pageTexts[pageName].title }}</div>
      <div class="card-description center">{{ pageTexts[pageName].description }}</div>

      <form>
        <div class="inputs-aling">
          <w-input
            name="name"
            :max="200"
            type="text"
            v-model="contact.name"
            label="Nome Completo"
            :error="errors.name"
            placeholder="Digite o nome do contato" />
          <w-input name="email" :max="200" type="email" v-model="contact.email" label="Email" :error="errors.email" placeholder="Digite o email" />
          <w-input
            name="mobile"
            :max="11"
            type="text"
            v-model="contact.mobile"
            label="Celular"
            :error="errors.mobile"
            placeholder="Digite o celular" />
        </div>

        <w-buttom color="primary" :block="true" @click="saveContact()"> {{ pageTexts[pageName].buttom }}</w-buttom>
      </form>
    </w-card>
  </div>
</template>

<script>
  import WButtom from "../../components/WButtom.vue"
  import WCard from "../../components/WCard.vue"
  import WInput from "../../components/WInput.vue"
  export default {
    components: { WCard, WInput, WButtom },
    name: "Home",
    data() {
      return {
        contact: {
          name: null,
          email: null,
          mobile: null,
        },
        errors: {
          name: null,
          email: null,
          mobile: null,
        },
        pageTexts: {
          ContactsCreate: {
            title: "Cadastre um novo contato",
            description: "Preencha as informações para cadastrar um novo contato",
            buttom: "Adicionar novo contato",
          },
          ContactsEdit: {
            title: "Edite um contato",
            description: "Altere as informações para editar um contato",
            buttom: "Editar contato",
          },
        },
        pageName: "",
        params: "",
        loading: false,
      }
    },
    beforeMount() {
      this.pageName = this.$route.name

      if (this.pageName == "ContactsEdit") {
        this.loading = true
        this.params = this.$route.params

        this.$store.dispatch("contacts/getById", this.params.id_contact).then((res) => {
          this.contact = res
          this.loading = false
        })
      }
    },
    methods: {
      validForm() {
        var isValid = true

        if (!this.contact.name) {
          this.errors.name = "O nome é obrigatório."
          isValid = false
        } else {
          this.errors.name = null
        }

        if (!this.contact.email) {
          this.errors.email = "O email é obrigatório."
          isValid = false
        } else if (!this.validEmail(this.contact.email)) {
          this.errors.email = "O email informado está invalido."
          isValid = false
        } else {
          this.errors.email = null
        }

        if (!this.contact.mobile) {
          this.errors.mobile = "O número de teleforne é obrigatório."
          isValid = false
        } else if (this.contact.mobile.length != 11) {
          this.errors.mobile = "O número informado é inválido."
          isValid = false
        } else if (isNaN(this.contact.mobile)) {
          this.errors.mobile = "Informe apenas números."
          isValid = false
        } else {
          this.errors.mobile = null
        }

        return isValid
      },
      validEmail: function (email) {
        var re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
      },
      saveContact() {
        if (this.validForm()) {
          this.loading = true
          if (this.pageName == "ContactsEdit") {
            this.$store.dispatch("contacts/edit", this.contact).then(() => {
              this.$router.push("/")
              this.loading = false
              this.$toast.success({
                icon: "create-outline",
                title: "Contato editado com sucesso",
              })
            })
          } else {
            this.$store.dispatch("contacts/create", this.contact).then(() => {
              this.$router.push("/")
              this.loading = false
              this.$toast.success({
                title: "Novo contato criado",
              })
            })
          }
        }
      },
    },
  }
</script>

<style>
  .card-container form button {
    margin-top: 80px;
  }
  .card-container form .inputs-aling {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0px 22px;
    grid-template-areas:
      "full-line full-line"
      "left-line right-line";
  }

  .card-container form .inputs-aling .container-input:nth-child(1) {
    grid-area: full-line;
  }
  .card-container form .inputs-aling .container-input:nth-child(2) {
    grid-area: left-line;
  }
  .card-container form .inputs-aling .container-input:nth-child(3) {
    grid-area: right-line;
  }

  @media only screen and (max-width: 768px) {
    .card-container form .inputs-aling {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3, 1fr);
      grid-template-areas:
        "full-line"
        "left-line"
        "right-line";
    }
  }
</style>
<style scoped>
  .container {
    min-height: calc(100vh - 149px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
