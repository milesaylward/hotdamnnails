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
          Deposits can be paid through either
          <a :href="venmoLink" target="_blank">Venmo</a> or
          <a :href="cashAppLink" target="_blank">Cash App</a>
        </p>
      </div>
      <div class="booking-success__content__booking">
        <h3>Appointment Information</h3>
        <div class="info">
          <p>Name: {{user}}</p>
          <p>Services:
            <span v-for="service in services" :key="service">
              {{service}}&nbsp;
            </span>
          </p>
          <p>Appointment: {{bookingSuccess.date}} at {{bookingSuccess.time}}</p>
          <p>Appointment Length: {{bookingSuccess.duration_parsed}}</p>
          <p>Appointment Cost: ${{bookingSuccess.price}}</p>
          <p>Appointment Deposit: ${{bookingSuccess.deposit}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'BookingSuccess',
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
      if (this.isIOS) return 'cashme://cash.me/$hotdamnnails';
      if (!this.isMobile) return 'https://cash.app/$hotdamnnails';
      return 'intent://cash.me/$hotdamnnails#Intent;package=com.squareup.cash;scheme=https;end';
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
      p {
        a {
          white-space: nowrap;
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
