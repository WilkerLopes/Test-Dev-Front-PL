<template>
  <div class="table-container">
    <table>
      <tr>
        <th v-for="(header, index) in headers" :key="index">{{ header.title }}</th>
      </tr>

      <tr v-for="(item, index) in items" :key="index" v-show="!isLoading">
        <slot v-bind:item="item"></slot>
      </tr>
    </table>

    <w-load tipo="line" v-if="isLoading"></w-load>
  </div>
</template>

<script>
  import WLoad from "./WLoad.vue"
  export default {
    components: { WLoad },
    name: "WTable",
    props: {
      headers: [],
      items: [],
      total: {
        type: Number,
        default: 0,
      },
      isLoading: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>

<style>
  .table-container table {
    width: 100%;
    border-collapse: collapse;
  }

  .table-container table tr:nth-child(1) {
    border-bottom: 2px solid var(--color-step-450);
  }

  .table-container table tr th {
    font-size: 1.25em;
    line-height: 1.5em;
    color: var(--color-primary);
    font-weight: 700;
    text-align: left;
    padding: 20px;
  }

  .table-container table tr td {
    padding: 12px 20px;
    font-weight: 500;
  }
  .table-container table tr td:first-child {
    color: var(--color-primary);
    font-weight: 700;
  }

  .table-container table tr td .options-butons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
  }

  .table-container table tr:nth-child(even) {
    background: var(--color-step-0);
  }

  /* Screans */
  @media only screen and (max-width: 1024px) {
    .table-container table {
      margin: 0 -32px -40px;
      width: calc(100% + 64px);
    }
    .table-container table tr:nth-child(1) {
      display: none;
    }
    .table-container table tr:last-child {
      border-bottom: none;
    }
    .table-container table tr {
      border-bottom: 1px solid var(--color-step-450);
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-template-rows: repeat(3 auto);
      gap: 0px 0px;
      grid-template-areas:
        "id name actions"
        "email email actions"
        "telefone telefone actions";
      padding: 12px;
    }

    .table-container table tr td {
      padding: 6px;
    }

    .table-container table tr td:nth-child(1) {
      grid-area: id;
      font-size: 1.125em;
    }
    .table-container table tr td:nth-child(1)::before {
      content: "#";
    }
    .table-container table tr td:nth-child(2) {
      grid-area: name;
      text-align: left;
      color: var(--color-primary);
      font-weight: 700;
      font-size: 1.125em;
    }
    .table-container table tr td:nth-child(3) {
      grid-area: email;
    }
    .table-container table tr td:nth-child(3)::before {
      content: "Email";
    }
    .table-container table tr td:nth-child(4) {
      grid-area: telefone;
    }
    .table-container table tr td:nth-child(4)::before {
      content: "Celular";
    }
    .table-container table tr td:nth-child(5) {
      grid-area: actions;
    }
    .table-container table tr td .options-butons {
      flex-direction: column;
      justify-content: center;
      height: 100%;
    }

    .table-container table tr td:nth-child(3),
    .table-container table tr td:nth-child(4) {
      display: flex;
      flex-direction: column;
    }

    .table-container table tr td:nth-child(3)::before,
    .table-container table tr td:nth-child(4)::before {
      color: var(--color-primary);
      font-weight: 700;
      font-size: 0.9em;
    }
  }

  @media only screen and (max-width: 768px) {
    .table-container table {
      margin: 0 -16px -16px;
      width: calc(100% + 32px);
    }
  }
</style>
