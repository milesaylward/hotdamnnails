<template>
  <div class="total" :class="{ expanded: mobileExpanded }">
    <div class="total__mobile-button" @click="mobileExpanded = !mobileExpanded">
      <h4 class="title">Appointment Info</h4>
      <span class="material-icons">
        {{mobileIcon}}
      </span>
    </div>
    <div class="total__content">
      <h4 class="title">Appointment Info</h4>
      <p v-if="type">
        <span>{{type.name}}</span>
        <span class="red red--fade">${{type.price}}</span>
      </p>
      <p v-for="opt in options" :key="opt.id">
        <span>{{opt.parsed_name}}</span>
        <span class="red red--fade">${{opt.price}}</span>
      </p>
      <hr v-if="canShowTotal">
      <p class="red" v-if="canShowTotal">
        <span>Total</span>
        <span>${{totalPrice}}</span>
      </p>
      <p class="red" v-if="canShowTotal">
        <span>Deposit</span>
        <span>${{parsedDuration.deposit}}</span>
      </p>
      <p class="red" v-if="canShowTotal">
        <span>Appt. Length</span>
        <span>{{parsedDuration.duration}}</span>
      </p>
    </div>
    <HDSpinnerButton
      v-if="canShowTotal"
      :loading="loading"
      :disabled="disabled"
      @click="$emit('checkAvailability')"
    />
  </div>
</template>

<script>
import { Duration } from 'luxon';
import { mapGetters } from 'vuex';
import HDSpinnerButton from './HDSpinnerButton.vue';

export default {
  components: { HDSpinnerButton },
  name: 'Total',
  data: () => ({
    mobileExpanded: false,
  }),
  props: {
    options: {
      required: true,
    },
    canShowTotal: {
      required: true,
    },
    type: {
      required: true,
    },
    disabled: {
      required: true,
    },
    loading: {
      required: true,
    },
  },
  watch: {
    canShowTotal(val) {
      if (val && !this.isLarge) {
        this.mobileExpanded = true;
      } else {
        this.mobileExpanded = false;
      }
    },
    disabled(val) {
      if (val && !this.isLarge) this.mobileExpanded = false;
    },
  },
  computed: {
    ...mapGetters(['isLarge']),
    parsedDuration() {
      let durationParsed = '';
      let hoursDeposit = 0;
      let hoursCopy = 'hr';
      const duration = Duration.fromObject({ minutes: this.totalDuration });
      const hours = parseFloat(duration.toFormat('h'));
      const minutes = parseFloat(duration.toFormat('mm')) - (hours * 60);
      if (hours > 0) {
        if (hours > 1) {
          hoursDeposit = ((hours - 1) * 5);
          hoursCopy = 'hrs';
        }
        durationParsed += `${hours} ${hoursCopy}`;
      }
      if (minutes > 0) durationParsed += `${hours > 0 ? ' & ' : ''}${minutes} mins`;
      return {
        duration: durationParsed,
        deposit: 10 + hoursDeposit,
      };
    },
    totalPrice() {
      let price = 0;
      this.options.forEach((opt) => { price += opt.price; });
      return price + this.type.price;
    },
    totalDuration() {
      let duration = 0;
      this.options.forEach((opt) => { duration += opt.duration; });
      return duration + this.type.duration;
    },
    mobileIcon() {
      return this.mobileExpanded ? 'expand_less' : 'expand_more';
    },
  },
};
</script>

<style lang="scss">
.total {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  z-index: 1000;
  transform: translateY(calc(100% - 50px));
  transition: transform 400ms $easeOutMaterial;
  display: flex;
  flex-direction: column;
  &.expanded {
    transform: translateY(0);
  }
  @include bpLarge {
    z-index: 10;
    position: static;
    margin: 67px 0 0 20px;
    transform: none;
  }
  &__mobile-button {
    border-top: 1px solid $hdLightGrey;
    border-bottom: 1px solid $hdLightGrey;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 50px;
    .title {
      margin: 0;
      text-transform: uppercase;
    }
    @include bpLarge {
      display: none;
    }
  }
  .hd-spinner-button {
    width: calc(100% - 20px);
    margin: 20px auto;
    padding: 20px 0;
  }
  &__content {
    width: 100%;
    padding: 10px;
    @include bpLarge {
      border: 1px solid $hdLightGrey;
    }
    .title {
      margin: 0 0 10px;
      left: 0;
      text-align: center;
      display: none;
      @include bpLarge {
        display: block;
      }
    }
    p {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
      margin: 5px 0;
      span {
        margin-right: 10px;
      }
    }
    .red {
      color: $hdRed;
      span {
        &:last-of-type {
          margin-right: 0;
        }
      }
      flex-direction: row;
      &--fade {
        color: rgba($hdRed, 0.7);
      }
    }
  }
  hr {
    margin: 15px 0;
  }
}
</style>
