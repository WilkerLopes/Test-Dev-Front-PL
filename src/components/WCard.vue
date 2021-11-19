<template>
  <div class="card" :class="[size]">
    <slot></slot>
    <div class="loading-card" v-if="loading">
      <w-load :size="100" :lineWidth="10" color="primary" />
    </div>
  </div>
</template>

<script>
  import WLoad from "./WLoad.vue"
  export default {
    components: { WLoad },
    name: "WCard",
    props: {
      size: {
        type: String,
        default: "full",
        validator: function (value) {
          return ["full", "medium"].indexOf(value) !== -1
        },
      },
      loading: {
        default: false,
        type: Boolean,
      },
    },
  }
</script>

<style>
  .card {
    padding: 40px 32px;
    background-color: var(--background-card-color);
    box-shadow: 0px 10px 16px 0px #0000000a;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }
  .card.full {
    width: 100%;
  }
  .card.medium {
    width: 808px;
    max-width: 100%;
    margin: 0 auto;
  }

  .card-title {
    font-size: 1.5em;
    font-weight: 700;
    color: var(--color-primary);
    margin: 0 0 16px;
  }

  .card-description {
    font-size: 1em;
    margin: 0 0 56px;
  }

  .loading-card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(var(--color-dark-rgb), 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media only screen and (max-width: 768px) {
    .card {
      padding: 40px 16px 16px;
    }
  }
</style>
