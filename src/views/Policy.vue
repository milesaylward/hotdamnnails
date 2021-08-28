<template>
  <div class="page page--policy policy">
    <Hero
      :video="content.video"
      :fallback="content.fallback"
      :title="content.title"
      @load="handleVideoLoaded"
    />
    <div class="policy__content container">
      <div class="policy__content__blocks">
        <Appearable v-for="block in content.blocks" :key="block.title">
          <div class="block ap-child">
            <h4 class="block__title">{{block.title}}</h4>
            <ul class="block__items">
              <li
                class="block__items__item"
                v-for="item in block.item"
                :key="item.value || item"
              >
                <p v-if="item.links" v-html="getItemHtml(item)" />
                <p v-else v-html="item" />
              </li>
            </ul>
          </div>
        </Appearable>
      </div>
    </div>
    <Appearable>
      <hr />
    </Appearable>
    <div class="policy__recommended container">
      <Appearable>
        <div class="policy__recommended__title ap-child">
          <h2 v-html="content.recommended.title.value" />
          <h3>{{content.recommended.title.smallCopy}}</h3>
        </div>
      </Appearable>
      <div class="policy__recommended__blocks">
        <Appearable
          v-for="block in content.recommended.blocks"
          :key="block.title"
        >
          <div class="block ap-child">
            <p class="block__title" v-html="block.title" />
            <ul class="block__items">
              <li
                class="block__items__item"
                v-for="item in block.item"
                :key="item.value || item"
              >
                <p v-if="item.links" v-html="getItemHtml(item)" />
                <p v-else-if="item.smallCopy" class="flex">
                  <span v-html="item.value"></span>
                  <span class="small">{{item.smallCopy}}</span>
                </p>
                <p v-else v-html="item" />
              </li>
            </ul>
          </div>
        </Appearable>
        <Appearable>
          <p class="policy__recommended__notice ap-child">
            {{content.recommended.notice}} 😁
          </p>
        </Appearable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Hero from '@/components/Hero.vue';

export default {
  name: 'Policy',
  components: {
    Hero,
  },
  data: () => ({
    fallback: true,
  }),
  computed: {
    ...mapGetters(['getContentByPath']),
    content() {
      return this.getContentByPath('policies');
    },
  },
  methods: {
    ...mapActions(['setPageLoaded']),
    handleVideoLoaded() {
      this.setPageLoaded(true);
    },
    getItemHtml(item) {
      let html = item.value;
      item.links.forEach((link) => {
        html = this.replaceString(html, link);
      });
      return html;
    },
    replaceString(string, link) {
      return string.replace(
        /{{(.+?)}}/,
        (match, inner) => `<a href="${link}" target="_blank">${inner}</a>`,
      );
    },
  },
};
</script>

<style lang="scss">
.policy {
  .appearable {
    &.appearable {
      &--can-appear {
        hr {
          transform: scaleX(1);
        }
      }
    }
  }
  &__content {
    &__blocks {
      @include bpMedium {
        margin: 50px 0 0;
      }
      .block {
        margin: 35px 0;
        &__title {
          color: $hdRed;
        }
        &__items {
          list-style: none;
          padding: 0;
          &__item {
            margin: 10px 0;
            padding: 0 0 0 25px;
            position: relative;
            &:before {
              display: flex;
              content: '\2014';
              position: absolute;
              height: 100%;
              top: 2px;
              left: 0;
              color: $hdRed;
            }
          }
        }
      }
    }
  }
  hr {
    margin: 50px 0;
    transition: transform $appearDuration $appearEase;
    transform: scaleX(0);
  }
  &__recommended {
    display: block;
    &__title {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      h2 {
        font-size: 30px;
        text-align: center;
      }
    }
    &__notice {
      margin-top: 35px;
    }
    &__blocks {
      margin-top: 50px;
      .block {
        margin: 15px 0;
        &:last-child {
          margin-bottom: 0;
        }
        b { color: $hdRed; }
        .flex {
          display: flex;
          flex-wrap: wrap;
          .small {
            font-size: 16px;
          }
        }
        &__items {
          list-style: none;
          padding: 0;
          &__item {
            margin: 12px 0;
            position: relative;
            padding: 0 0 0 25px;
            &:before {
              display: flex;
              content: '\2014';
              position: absolute;
              height: 100%;
              top: 2px;
              left: 0;
              color: $hdRed;
            }
          }
        }
        &__title {
          position: relative;
          font-size: 16px;
          @include bpMedium {
            font-size: 20px;
          }
          b { color: $hdRed; }
        }
      }
    }
  }
}
</style>
