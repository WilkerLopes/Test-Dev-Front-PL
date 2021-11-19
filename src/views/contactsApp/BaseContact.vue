<template>
  <div class="content-page">
    <nav>
      <w-buttom @click="backRouter()" iconStart="arrow-back-outline" fill="clean" color="black"> Voltar</w-buttom>
    </nav>
    <router-view />
  </div>
</template>

<script>
  import WButtom from "../../components/WButtom.vue"

  export default {
    name: "BaseContact",
    components: { WButtom },
    methods: {
      backRouter() {
        var routerName = this.$route.name
        if (routerName == "ContactsView") {
          this.$store.dispatch("auth/logout").then(() => {
            this.$router.push("/login")
          })
        } else {
          this.$router.push("/")
        }
      },
    },
  }
</script>

<style>
  nav {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--background-card-color);
    height: 88px;
    padding: 16px 64px;
    box-shadow: 0px 4px 4px 0px #00000008;
  }
  .content-page {
    padding: 117px 0 32px;
  }

  /* Screans */
  @media only screen and (max-width: 768px) {
    nav {
      padding: 16px 32px;
    }
  }
  @media only screen and (max-width: 1024px) {
    nav {
      padding: 16px;
    }
  }
</style>
