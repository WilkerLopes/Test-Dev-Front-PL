<template>
  <div class="container-input" :class="{ 'container-input-invalid': error }">
    <label :for="name">{{ label }}</label>
    <input :id="name" :type="type" :placeholder="placeholder" :value="value" @input="updateValue($event.target.value)" :maxlength="max" />
    <div class="container-input-mensage">{{ error }}</div>
  </div>
</template>

<script>
  export default {
    name: "WInput",
    props: {
      name: {
        type: String,
        default: null,
      },
      value: {
        type: String,
        default: null,
      },
      max: {
        type: Number,
        default: null,
      },
      label: {
        type: String,
        default: null,
      },
      placeholder: {
        type: String,
        default: null,
      },
      type: {
        type: String,
        default: "text",
      },
      error: {
        type: String,
        default: null,
      },
    },
    methods: {
      updateValue(value) {
        this.$emit("input", value)
      },
    },
  }
</script>

<style>
  .container-input {
    width: 100%;
    position: relative;
  }
  .container-input-invalid input {
    border: 1px solid var(--color-danger) !important;
  }
  .container-input label {
    font-size: 1em;
    line-height: 1.5em;
    color: var(--color-secondary);
    margin-bottom: 4px;
    font-weight: 700;
  }
  .container-input input {
    box-sizing: border-box !important;
    width: 100%;
    background-color: var(--background-input-color);
    border: none;
    outline: none;
    font-size: 1em;
    padding: 16px;
    line-height: 24px;
    border-radius: var(--border-radius);
    margin-bottom: 24px;
    color: var(--color-dark);
  }
  .container-input-mensage {
    font-size: 0.9em;
    line-height: 20px;
    color: var(--color-danger);
    position: absolute;
    bottom: 4px;
    right: 0;
    text-align: right;
  }
</style>
