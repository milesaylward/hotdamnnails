<template>
  <div class="page page--policy">
    <div class="container">
      <img :src="header" alt="header image" class="header">
      <div class="body">
        <h2>Info/Policies</h2>
        <ul>
          <li>
            I am a home-based nail tech in Historic Norfolk.
            The only form of parking available is street parking.
            You may have to parallel park and are responsible for your parking.
          </li>
          <li>
            In case of severe allergies, I do have cats,
            but they are not in the nail room.
            The nail room is enclosed, private,
            and kept clean at all times.
          </li>
          <li>
            To have an idea of where I am located,
            check out
            <a href="https://goo.gl/maps/un2chf8jUa7eMDQ89" target="_blank">Cure Coffeehouse</a> on Google Maps.
          </li>
          <li>
            You will need to pay a <b>$10 NON-REFUNDABLE DEPOSIT</b> to secure a time-slot.
            I collect deposits through
            CashApp: <a href="https://cash.app/$hotdamnnails">$hotdamnnails</a> or
            Venmo: <a href="https://venmo.com/hotdamnnails">@hotdamnnails</a>
          </li>
          <li>
            The non-refundable deposit will go towards your set.
            Please try and book an appointment you are sure you can attend.
          </li>
          <li>
            Due to Covid-19 currently guests are not allowed to
            accompany you to your appointment &amp; a mask must
            be worn throughout the appointment.
          </li>
          <li>
            If you have previous nails, not done by me,
            please have them soaked off and come in with bare nails.
          </li>
          <li>
             Time slots are in 3hr intervals. When you book with me, you are booking a 3 hr session
             with me. 1-color fresh sets and fills are already 1.5hrs. A soak off is 30-45mins.
             The more design add ons, the more time is needed. So please book accordingly.
          </li>
          <li>
            Rushed appointments or repeatedly arriving late
            will result in no future bookings with me.
            (On average hand designed sets take about 2 hours)
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
              If you want a different shape or extreme length change.
            </span>
            <span class="indent">
              The bond between the nail and acrylic will
              loosen when nail is filed down and reshaped multiple times.
              You can save money on nail repairs by getting a
              fresh set if the nails seem to be getting weak.
            </span>
            <span class="indent">
              If you want a different base color acrylic (powder) such as <b>CLEAR</b>.
              You can also pay for a repair to make specific nails clear.
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
      top: 0;
      left: -10px;
      transform: translate(-100%, 50%);
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
  }
}
</style>
