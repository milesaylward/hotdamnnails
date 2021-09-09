<template>
  <div class="radio-option" :class="{small}">
    <h1 class="title" v-if="!small && copy">{{copy}}</h1>
    <h4 v-else-if="copy">{{copy}}</h4>
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
        <span class="radio__label" v-html="opt.parsed_name" />
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
  methods: {
    handleChange(opt) {
      this.$emit('changeOpt', opt);
    },
  },
};
</script>

<style lang="scss">
.radio-option {
  padding: 0 14px;
  margin-top: 15px;;
  h4 {
    margin-bottom: 10px;
  }
  h1.title {
    padding-left: 0;
    padding-right: 0;
    padding-top: 80px;
    margin-top: -30px;
    pointer-events: none;
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
        top: 12px;
      };
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;
      @include bpMedium {
        width: auto;
      }
      &__label {
        color: #777777;
        .small {
          font-size: 14px;
        }
      }
      &__control {
        width: 20px;
        height: 20px;
        border: 1px solid $hdRed;
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
