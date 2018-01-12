<template>
  <transition name="fade">
    <div class="food" v-show="showFlag">
      <div class="fond-content">
        <!-- 封面图 -->
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="iconfont icon-weibiaoti6-copy"></i>
          </div>
        </div>
        <!-- 内容 -->
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating"> 好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartControl-wrapper">
            <cartControl :food="food"></cartControl>
          </div>
          <transition name="buy">
            <div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count === 0">
              加入购物车
            </div>
          </transition>
        </div>
        <!-- 分割线 -->
        <split></split>
        <!-- 评价 -->
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingSelect @increment="incrementTotal" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingSelect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li class="rating-item border-1px" v-show="needShow(rating.rateType, rating.text)" v-for="(rating, index) in food.ratings" :key="index">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img width="12" height="12" :src=rating.avatar alt="" class="avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <i class="iconfont" :class="{'icon-damuzhi':rating.rateType === 0,'icon-down':rating.rateType === 1,}"></i>
                  {{rating.text}}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import cartControl from '../cartControl/cartControl';
import split from '../split/split';
import ratingSelect from '../ratingSelect/ratingSelect';
import formatDate from '../../common/js/date';

const ALL = 2;

export default {
  components: {
    cartControl,
    split,
    ratingSelect,
  },
  props: {
    food: {
      type: Object,
    },
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽',
      },
    };
  },
  filters: {
    formatDate(time) {
      const date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    },
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$el, {
            click: true,
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    addFirst() {
      Vue.set(this.food, 'count', 1);
    },
    incrementTotal(type, data) {
      this[type] = data;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },
  },
};
</script>


<style lang="stylus" scoped>
@import './food.styl';
</style>

