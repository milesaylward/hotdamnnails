<template>
  <div class="radio-option" :class="{small}">
    <h1 v-if="!small">{{copy}}</h1>
    <h4 v-else>{{copy}}</h4>
    <div class="radio-option__content">
      <div v-for="opt in options" :key="opt.id" class="radio"
        :class="{
          active: choice && choice.id === opt.id
            || multi && addons.indexOf(opt) > -1
        }"
      >
        <input
          type="checkbox"
          :id="opt.id"
          :value="opt"
          @change="handleChange(opt)"
        >
        <span class="radio__control"></span>
        <span class="radio__label">{{opt.parsed_name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioOption',
  props: {
    options: {
      required: true,
    },
    small: {
      default: false,
    },
    choice: {
      required: true,
    },
    copy: {
      default: '',
    },
    addons: {
      default: [],
    },
    multi: {
      default: false,
    },
  },
  watch: {
    choice() {
      console.log(this.multi, this.addons);
    },
  },
  methods: {
    handleChange(opt) {
      this.$emit('changeOpt', opt);
    },
  },
};
</script>

<style lang="scss">
.radio-option {
  h4 {
    margin-bottom: 10px;
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
    margin: {
      left: -15px;
      top: -10px;
    }
    .radio {
      margin: {
        left: 15px;
        top: 10px;
      };
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;
      @include bpMedium {
        width: auto;
      }
      &__control {
        width: 20px;
        height: 20px;
        border: 1px solid black;
        margin-right: 10px;
        transition: background 300ms $easeOutMaterial;
      }
      &.active {
        .radio__control {
          background: $hdRed;
        }
      }
      input {
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
}
</style>
