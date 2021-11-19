<template>
  <div class="container">
    <w-card>
      <div class="title-line">
        <div class="card-title no-margin">Listagem de contatos</div>
        <w-buttom to="/new" color="tertiary">Adicionar novo contato</w-buttom>
      </div>

      <w-table :headers="headersTable" :items="listContacts" :isLoading="loadingData">
        <template v-slot:default="row">
          <td>{{ row.item.id }}</td>
          <td>{{ row.item.name }}</td>
          <td>{{ row.item.email }}</td>
          <td>{{ row.item.mobile }}</td>
          <td>
            <div class="options-butons">
              <w-buttom @click="editContact(row.item.id)" size="small" fill="clean" color="tertiary" iconStart="create-outline">Editar</w-buttom>
              <w-buttom
                @click="deleteContact(row.item.id)"
                size="small"
                fill="clean"
                color="danger"
                iconStart="trash-outline"
                :loading="loadingDelete"
                :key="row.item.id"
                >Excluir</w-buttom
              >
            </div>
          </td>
        </template>
      </w-table>
    </w-card>
  </div>
</template>

<script>
  import WButtom from "../../components/WButtom.vue"
  import WCard from "../../components/WCard.vue"
  import WTable from "../../components/WTable.vue"
  // @ is an alias to /src

  export default {
    components: { WCard, WButtom, WTable },
    name: "Home",
    data() {
      return {
        headersTable: [
          { title: "#", value: "id", mobileTitle: "#" },
          { title: "Nome", value: "name", mobileTitle: "Nome" },
          { title: "Celular", value: "email", mobileTitle: "Celular" },
          { title: "Email", value: "mobile", mobileTitle: "Email" },
          { title: "Acões" },
        ],
        loadingData: true,
        loadingDelete: false,
      }
    },
    methods: {
      async getall() {
        this.loadingData = true
        await this.$store.dispatch("contacts/getAll").then(() => {
          this.loadingData = false
        })
      },
      editContact(id) {
        this.$router.push("/edit/" + id)
      },
      async deleteContact(id) {
        this.loadingDelete = true
        await this.$store.dispatch("contacts/delete", id).then(() => {
          this.loadingDelete = false
          this.$toast.success({
            icon: "trash-outline",
            title: "Contato excluido",
          })
        })
      },
    },
    mounted() {
      this.getall()
    },
    computed: {
      listContacts() {
        return this.$store.state.contacts.values
      },
    },
  }
</script>

<style>
  .title-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    margin-bottom: 40px;
  }

  /* Screans */
  @media only screen and (max-width: 768px) {
    .title-line {
      align-items: flex-end;
      justify-content: flex-start;
      flex-direction: column-reverse;
      margin-top: -24px;
      gap: 24px;
    }
    .title-line .card-title {
      width: 100%;
      text-align: center;
    }
  }
  @media only screen and (max-width: 1024px) {
    .title-line {
      padding: 0;
      margin-bottom: 32px;
    }
  }
</style>
