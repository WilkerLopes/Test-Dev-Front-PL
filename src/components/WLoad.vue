<template>
  <div>
    <div
      class="load-spinner"
      v-if="tipo == 'spinner'"
      :class="[color]"
      :style="{ width: `${size}px`, height: `${size}px`, 'border-width': `${lineWidth}px` }"></div>

    <div class="load-line" v-if="tipo == 'line'" :class="[color]"></div>
  </div>
</template>

<script>
  export default {
    name: "WLoad",
    props: {
      tipo: {
        type: String,
        default: "spinner",
      },
      color: {
        type: String,
        default: "primary",
      },
      size: {
        type: Number,
        default: 20,
      },
      lineWidth: {
        type: Number,
        lineWidth: 3,
      },
    },
  }
</script>

<style>
  /* Spinner Load */
  .load-spinner {
    border-style: solid;
    border-color: transparent;
    border-radius: 50%;
    animation: spin 1.35s linear infinite;
  }
  .load-spinner.white {
    border-top-color: var(--color-primary-contrast);
  }
  .load-spinner.danger {
    border-top-color: var(--color-danger);
  }
  .load-spinner.primary {
    border-top-color: var(--color-primary);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* Line Load */

  .load-line {
    width: 100%;
    height: 5px;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
  }

  .load-line::after {
    content: "";
    position: absolute;
    border-radius: 5px;
    height: 100%;
    left: 0;
    top: 0;
    background: var(--color-tertiary);
    width: 50px;
    animation: borealisBar 2.5s ease-in infinite;
  }

  @keyframes borealisBar {
    0% {
      left: -3%;
      width: 2%;
    }
    90% {
      width: 40%;
    }
    100% {
      left: 100%;
      width: 0%;
    }
  }
</style>
