<template>
  <button
    class="hd-spinner-button"
    @click="$emit('click')"
    :class="{
      loading: loading,
      disabled: disabled,
    }"
  >
    <span :class="{ hidden: loading }">
      {{copy}}
    </span>
    <Spinner v-show="loading" />
  </button>
</template>

<script>
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'HDSpinnerButton',
  components: {
    Spinner,
  },
  props: {
    loading: {
      required: true,
    },
    disabled: {
      required: true,
    },
    copy: {
      default: 'Check Availability',
    },
  },
};
</script>

<style lang="scss">
button.hd-spinner-button {
  cursor: pointer;
  position: relative;
  width: 100%;
  padding: 10px;
  border: 1px solid $hdLightGrey;
  background: white;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 300ms $easeOutMaterial,
              color 300ms $easeOutMaterial;
  @include on-hover {
    background: $hdRed;
    color: white;
  }
  &.disabled {
    opacity: 0.3;
    pointer-events: none;
  }
  &.loading {
    background: white;
    @include on-hover {
      background: white;
    }
  }
  .hidden {
    opacity: 0;
  }
}
</style>
