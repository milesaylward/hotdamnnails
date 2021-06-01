<template>
  <div class="page page--policy">
    <div class="container">
      <img :src="header" alt="header image" class="header">
      <div class="body">
        <h2>Info/Policies</h2>
        <ul>
          <li class="title">LOCATION INFO:</li>
          <li>
            Home based nail tech located in Downtown Norfolk.
            Parking is 100% your responsibility.
          </li>
          <li>
            In case of severe allergies, I do have cats, but they are not in the nail room.
            The nail room is enclosed, private, and kept clean at all times.
          </li>
          <li>
            To have an idea of where I am located, check out
            <a href="https://goo.gl/maps/tAw1oYxifFYf3iRq9" target="_blank">Cure Coffeehouse
            on Google Maps</a>.
          </li>
          <li>
            The actual address will be embedded in the appointment
            confirmation email once you have completed the booking.
          </li>
        </ul>
        <ul>
          <li class="title">DEPOSIT/PAYMENT INFO:</li>
          <li>
            You will need to pay a $10 NON-REFUNDABLE DEPOSIT to secure a time-slot.
            I collect deposits through
            CashApp: <a href="https://cash.app/$hotdamnnails">$hotdamnnails</a> or
            Venmo: <a href="https://venmo.com/hotdamnnails">@hotdamnnails</a>
          </li>
          <li>
            The non-refundable deposit will go towards your set.
            You are allowed to reschedule up until 48 hours
            before your appointment. All reschedules and
            cancelations are done through Direct Message on
            Instagram <a href="https://www.instagram.com/hotdamnnails/" target="_blank">@hotdamnnails</a>
            or Text <a href="tel:757-231-7978">757-231-7978</a>
          </li>
          <li>
            One (1) reschedule is allowed per appointment
            made and must be rebooked within the same month.
            Any further need to reschedule will result in the forfeit of your deposit.
            Please try and book an appointment you are sure you can attend.
          </li>
        </ul>
        <ul>
          <li class="title">UPON ARRIVAL:</li>
          <li>
            If you have previous nails, not done by me,
            I suggest please have them soaked off and come in with bare nails.
            If you come in with nails (not my work) I will soak it off
            for you for an add on 20$ & if there is enough time for it.
          </li>
          <li>
            Due to Covid-19 currently guests are not allowed to accompany you
            to your appointment & a MASK must be worn throughout the appointment.
          </li>
        </ul>
        <ul>
          <li class="title">TIME INFO/LATE ARRIVAL:</li>
          <li>
            15 minutes late without notice, your appointment will automatically be canceled.
            Deposits are not refundable and cannot be used to reschedule in this situation.
          </li>
          <li>Repetitively arriving late (15mins or later) will result in no future booking.</li>
          <li>No call no show will result in no future booking.</li>
          <li>
            Time slots are in 3hr intervals. Your set and add-on services may
            take 1.5hrs to 3hrs depending on the design.
            Please make sure to have your time planned out.
          </li>
          <li>
            Rushed appointments or repeatedly arriving late (15 mins or later)
            will result in no future bookings with me.
            (On average, hand-designed sets take about 2 hours)
          </li>
        </ul>
        <ul>
          <li class="title">MY RIGHT TO CANCEL</li>
          <li>
            Due to unexpected emergencies such as illness and family matters and etc.,
            cancelation of appointments may happen. If this does happen,
            you will be given an option to refund the deposit or reschedule with a discount.
          </li>
          <li>Rudeness / Aggressive behavior will NOT be tolerated.</li>
          <li>
            Please let me know your expectations during your design consultation
            or at the time of your appointment so that your needs can be met.
            These changes will only be upheld during the appointment,
            not after you leave your appointment.
          </li>
        </ul>
        <hr />
        <h2>
          Recommended Nail Services
          <span class="small">(after your first set with me)</span>
        </h2>
        <ul>
          <li>
            Any <b>FRESH SET</b> nails that <b>POP OFF</b>
            within 3 days of your appointment can be repaired for free.
            <span class="indent">
              After 3 days it will be $3/nail for repairs. For all repairs DM me on <a href="https://instagram.com/hotdamnnails">Instagram</a>.
            </span>
          </li>
          <li>
            <b>BOOK A FRESH SET<sup>*</sup> (recommendations)</b>:
            <span class="indent">
              If you have had 3 consecutive fill ins.
            </span>
            <span class="indent">
              If you want a different <b>SHAPE</b> or <b>EXTREME LENGTH CHANGE</b>.
            </span>
            <span class="offset">
              (The bond between the nail and acrylic will
              loosen when nail is filed down and reshaped multiple times.
              You can save money on nail repairs by getting a
              fresh set if the nails seem to be getting weak.)
            </span>
            <span class="indent">
              If you want a different base color acrylic (powder) such as <b>CLEAR</b>.
              You can also pay for a <b>SHAVE DOWN</b> to change the acrylic base color.
            </span>
            <span class="indent">
              If you have 3 or more broken nails after a couple weeks
            </span>
            <span class="indent">
              If your real nail underneath is long and separating from the acrylic.
              (I do not file off grown out nails under acrylic
              as this can cause over filing and breakage.)
            </span>
          </li>
        </ul>
        <h3 class="disclaim">
          These are just what I recommend, it’s still up to you which you
          would like to book&nbsp;<span class="emoji">&#128513;</span>
        </h3>
        <a href="https://app.acuityscheduling.com/schedule.php?owner=21110176" target="_blank" class="link policy-link">Book</a>
      </div>
    </div>
  </div>
</template>

<script>
import header from '@/assets/images/header.png';

export default {
  name: 'Policy',
  data: () => ({
    header,
  }),
};
</script>

<style lang="scss">
.page {
  &--policy {
    align-items: flex-start;
    .link.policy-link {
      max-width: 100%;
      width: 100%;
      margin: 30px auto 0;
      @include bpMedium {
        margin: 30px 0;
        max-width: 300px;
      }
    }
  }

  .header {
    display: block;
    width: 100%;
    margin-bottom: 20px;
  }
  a {
    font-weight: bold;
  }
  ul {
    margin: 30px 0;
    padding-left: 25px;
    list-style: none;
    @include bpMedium {
      margin: 50px 0;
    }
  }

  hr {
    margin-bottom: 25px;
  }
  .small {
    display: block;
    font-size: 24px;
  }
  h3 {
    font-size: 20px;
    margin-top: 20px;
  }
  .emoji {
    font-size: 30px;
  }

  .disclaim {
    padding-left: 10px;
    margin-top: -10px;
    position: relative;
    &:before {
      position: absolute;
      content: '*';
      top: 0;
      left: 0;
    }
  }

  li {
    margin: 10px 0;
    position: relative;
    &:before {
      content: '';
      background-image: url('../assets/images/star.png');
      background-size: 100% 100%;
      width: 17px;
      height: 17px;
      position: absolute;
      top: 5px;
      left: -10px;
      transform: translate(-100%, 0);
    }

    &.title {
      font-weight: bold;
      font-size: 22px;
      margin: 0;
      &:before {
        content: '\2014';
        background: none;
        top: -2px;
        transform: translate(-100%, 0);
      }
    }
    .indent {
      display: block;
      margin: 5px 0 0 35px;
      position: relative;
      &:before {
        line-height: 27px;
        content: '\2014';
        position: absolute;
        top: 0;
        left: -30px;
      }
    }
    .offset {
      font-size: 18px;
      margin-left: 35px;
    }
  }
}
</style>
