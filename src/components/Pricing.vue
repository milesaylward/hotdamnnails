<template>
  <div class="pricing" id="pricing">
    <div class="container">
      <Appearable>
        <h3 class="title ap-child">{{content.title}}</h3>
      </Appearable>
      <div
        class="pricing__block"
        v-for="block in content.blocks"
        :key="block.title"
      >
        <Appearable>
          <div class="block ap-child">
            <span class="block__title" v-if="block.title.smallCopy">
              <h4 v-html="block.title.value" />
              <span class="small">{{block.title.smallCopy}}</span>
            </span>
            <h4 class="block__title" v-else v-html="block.title" />
            <p
              class="block__subhead"
              v-if="block.subhead || block.time" v-html="block.subhead || block.time"
            />
            <ul class="block__items">
              <li
                class="block__items__item"
                v-for="price in block.item"
                :key="price.price"
              >
                <p class="block__items__item__copy red" v-html="price.price" />
                <p
                  class="block__items__item__copy"
                  v-html="price.copy"
                  v-if="!price.copy.value"
                />
                <p class="block__items__item__copy block__items__item__copy--small" v-else>
                  <span v-html="price.copy.value" />
                  <span class="small" v-html="price.copy.smallCopy" />
                </p>
              </li>
            </ul>
          </div>
        </Appearable>
      </div>
      <Appearable>
        <p class="pricing__notice ap-child" v-html="content.notice" />
      </Appearable>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Pricing',
  computed: {
    ...mapGetters(['getContentByPath']),
    content() {
      return this.getContentByPath('pricing');
    },
  },
};
</script>

<style lang="scss">
.pricing {
  padding: 80px 0 0;
  .title {
    color: $hdRed;
  }
  &__notice {
    color: $lightGrey;
    margin-top: 30px;
    font-size: 18px;
    @include bpMedium {
      font-size: 22px;
    }
    b {
      color: $darkGrey;
      font-weight: normal;
    }
  }
  &__block {
    .block {
      margin: 25px 0;
      &:last-child {
        margin-bottom: 0;
      }
      &__title {
        display: flex;
        align-items: flex-end;
        margin-bottom: 10px;
        .small {
          margin: 0 0 1px 5px;
          font-size: 14px;
          font-weight: normal;
          color: $lightGrey;
          white-space: nowrap;
          @include bpMedium {
            font-size: 16px;
          }
        }
      }
      &__subhead {
        color: $lightGrey;
        margin-top: -10px;
        margin-bottom: 5px;
        font-size: 14px;
        @include bpMedium {
          font-size: 16px;
        }
      }
      &__items {
        list-style: none;
        padding: 0;
        margin: 0;
        &__item {
          margin: 5px 0;
          display: flex;
          &__copy {
            margin-left: 5px;
            &--small {
              display: flex;
              flex-wrap: wrap;
              align-items: flex-end;
            }
            &:first-child {
              margin-left: 0;
            }
            &.red {
              color: $hdRed;
            }
            .small {
              margin-bottom: 1px;
              white-space: nowrap;
              margin-left: 5px;
              font-size: 12px;
              @include bpMedium {
                font-size: 14px;
              }
            }

          }
        }
      }
    }
  }
}
</style>
