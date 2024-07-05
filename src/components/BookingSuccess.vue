<template>
  <div class="booking-success">
    <div class="container booking-success__content">
      <div class="booking-success__content__copy">
        <h2>Thank you for booking!</h2>
        <p class="confirm">You should recieve a confirmation email or text message shortly.</p>
        <p>
          <b>Reminder:</b>
          Your booking is scheduled but before it is secured you must pay the deposit.
        </p>
        <p>Your deposit amount is listed here along with other relevant appointment information.</p>
        <p>
          Deposits can be paid through either:
          <span class="links">
            <a :href="venmoLink" target="_blank">
              <Venmo />
            </a>
            <a :href="cashAppLink" target="_blank">
              <CashApp />
            </a>
          </span>
        </p>
        <HDButton
          copy="Book another Appointment"
          color="red"
          @buttonClick="handleButtonClick"
        />
      </div>
      <div class="booking-success__content__booking">
        <h3>Appointment Information</h3>
        <div class="info">
          <p>Name: {{user}}</p>
          <p>Services:
            <span
              v-for="service in services"
              :key="service"
              v-html="`${service}&nbsp;`"
            />
          </p>
          <p>Appointment: {{bookingSuccess.date}} at {{bookingSuccess.time}}</p>
          <p>Appointment Length: {{bookingSuccess.duration_parsed}}</p>
          <p>Appointment Cost: ${{bookingSuccess.price}}</p>
          <p>Appointment Deposit: ${{bookingSuccess.deposit}}</p>
          <p>Appointment Remainder: ${{bookingSuccess.price - bookingSuccess.deposit}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Venmo from '@/assets/svg/venmo.svg?component';
import CashApp from '@/assets/svg/cashapp.svg?component';
import HDButton from './HDButton.vue';

export default {
  name: 'BookingSuccess',
  components: {
    Venmo,
    CashApp,
    HDButton,
  },
  computed: {
    ...mapState(['bookingSuccess', 'appointmentData']),
    ...mapGetters(['isIOS', 'isMobile']),
    user() {
      return `${this.bookingSuccess.firstName} ${this.bookingSuccess.lastName}`;
    },
    services() {
      const services = [];
      const service = this.appointmentData
        .find((data) => data.id === this.bookingSuccess.appointmentTypeID);
      services.push(service.name);
      this.bookingSuccess.addonIDs.forEach((id) => {
        const addon = service.addons.find((opt) => opt.id === id);
        services.push(addon.parsed_name);
      });
      return services;
    },
    venmoLink() {
      if (this.isIOS) return 'venmo://paycharge?txn=pay&recipients=hotdamnnails';
      if (!this.isMobile) return 'https://venmo.com/hotdamnnails';
      return 'intent://paycharge?txn=pay&recipients=hotdamnnails#Intent;package=com.venmo;scheme=venmo;end';
    },
    cashAppLink() {
      if (this.isIOS) return 'cashme://cash.me/$hotdamnnails2';
      if (!this.isMobile) return 'https://cash.app/$hotdamnnails2';
      return 'intent://cash.me/$hotdamnnails2#Intent;package=com.squareup.cash;scheme=https;end';
    },
  },
  methods: {
    ...mapActions(['resetBooking']),
    handleButtonClick() {
      this.resetBooking();
    },
  },
};
</script>

<style lang="scss">
.booking-success {
  padding: 40px 0;
  &__content {
    justify-content: center;
    flex-wrap: wrap;
    h2 {
      margin-bottom: 10px;
    }
    b {
      color: $hdRed;
      font-weight: bold;
    }
    .confirm {
      margin-bottom: 10px;
    }
    &__copy {
      width: 100%;
      max-width: 600px;
      .hd-button {
        margin-top: 15px;
      }
      p {
        .links {
          display: flex;
          margin-top: 10px;
        }
        a {
          margin-right: 10px;
          display: flex;
          width: 100px;
          height: 30px;
          border: none;
          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
      @include bpLarge {
        width: 48%;
      }
    }
    &__booking {
      width: 100%;
      max-width: 600px;
      border: 1px solid $hdRed;
      text-align: left;
      border-radius: 4px;
      margin-top: 30px;
      @include bpLarge {
        width: 48%;
        margin-top: 0px;
      }
      h3 {
        padding: 10px 0;
        line-height: 1;
        text-align: center;
        border-bottom: 1px solid $hdRed;
      }
      .info {
        padding: 10px;
      }
      p {
        margin: 5px 0;
      }
    }
  }
}
</style>
