<template>
  <div class="container-w-buttom">
    <router-link v-if="to" :to="to" class="btn" :class="[size, color, fill, block ? 'block' : '']"> <slot></slot> </router-link>

    <button v-else class="btn" :class="[size, color, fill, block ? 'block' : '']" @click.prevent="$emit('click')">
      <w-load v-if="loading" :color="fill == 'clean' ? color : 'white'"></w-load>
      <ion-icon :name="iconStart" v-if="iconStart && !loading"></ion-icon>
      <slot></slot>
      <ion-icon :name="iconEnd" v-if="iconEnd"></ion-icon>
    </button>
  </div>
</template>

<script>
  import WLoad from "./WLoad.vue"
  export default {
    components: { WLoad },
    name: "WButtom",
    props: {
      onClick: {
        type: Function,
        default: () => {},
      },
      iconStart: {
        default: null,
        type: String,
      },
      loading: {
        default: false,
        type: Boolean,
      },
      iconEnd: {
        default: null,
        type: String,
      },
      block: {
        default: false,
        type: Boolean,
      },
      size: {
        type: String,
        default: "normal",
        validator: function (value) {
          return ["small", "normal", "large"].indexOf(value) !== -1
        },
      },
      color: {
        type: String,
        default: "primary",
        validator: function (value) {
          return ["primary", "tertiary", "danger", "black"].indexOf(value) !== -1
        },
      },
      fill: {
        type: String,
        default: "solid",
        validator: function (value) {
          return ["clean", "solid"].indexOf(value) !== -1
        },
      },
      to: {
        type: String,
        default: null,
      },
    },
  }
</script>

<style>
  ion-icon {
    color: currentColor;
  }

  .btn {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    cursor: pointer;
    transition: all 0.15s;
    background-color: transparent;
  }

  .btn.small {
    font-size: 0.875em;
    padding: 4px 6px;
    border-radius: 6px;
    gap: 6px;
  }
  .btn.small ion-icon {
    font-size: 16px;
  }
  .btn.normal {
    font-size: 1em;
    line-height: 1.5em;
    padding: 16px 24px;
    border-radius: 8px;
    gap: 28px;
  }
  .btn.normal ion-icon {
    font-size: 20px;
  }
  .btn.large {
    font-size: 1.2em;
    padding: 20px 30px;
    border-radius: 10px;
    gap: 28px;
  }
  .btn.large ion-icon {
    font-size: 24px;
  }

  .btn.clean {
    background-color: transparent;
  }

  .btn.block {
    width: 100%;
  }

  .btn.primary.clean ion-icon {
    color: var(--color-primary);
  }
  .btn.tertiary.clean ion-icon {
    color: var(--color-tertiary);
  }
  .btn.danger.clean ion-icon {
    color: var(--color-danger);
  }
  .btn.black.clean ion-icon {
    color: var(--text-color);
  }

  .btn.primary.clean:hover {
    color: var(--color-primary);
  }
  .btn.tertiary.clean:hover {
    color: var(--color-tertiary);
  }
  .btn.danger.clean:hover {
    color: var(--color-danger);
  }
  .btn.black.clean:hover {
    color: var(--text-color);
  }

  .btn.primary.solid {
    background-color: var(--color-primary);
    color: var(--color-primary-contrast);
  }
  .btn.tertiary.solid {
    background-color: var(--color-tertiary);
    color: var(--color-tertiary-contrast);
  }
  .btn.danger.solid {
    background-color: var(--color-danger);
    color: var(--color-danger-contrast);
  }
  .btn.black.solid {
    background-color: var(--text-color);
    color: var(--color-step-50);
  }

  .btn.primary.solid:hover {
    background-color: var(--color-secondary-shade);
  }
  .btn.tertiary.solid:hover {
    background-color: var(--color-tertiary-shade);
  }
  .btn.danger.solid:hover {
    background-color: var(--color-danger-shade);
  }
  .btn.black.solid:hover {
    background-color: var(--text-color);
  }
</style>
