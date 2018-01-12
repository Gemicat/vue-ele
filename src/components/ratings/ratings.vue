<template>
  <div class="ratings">
    <div>
      <div class="ratings-content">
        <!-- 评分 -->
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.foodScore"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{seller.deliveryTime}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 分割线 -->
      <split></split>
      <!-- 筛选 -->
      <ratingSelect :ratings="ratings" :selectType="selectType" :only-content="onlyContent" @increment="incrementTotal"></ratingSelect>
      <!-- 评论区 -->
      <div class="rating-wrapper border-1px">
        <ul>
          <li class="rating-item" v-for="(rating, index) in ratings" :key="index" v-show="needShow(rating.rateType, rating.text)">
            <!-- 头像 -->
            <div class="avatar">
              <img :src="rating.avatar" alt="" width="28" height="28">
            </div>
            <!-- 内容 -->
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">
                  {{rating.deliveryTime}}
                </span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <i class="iconfont icon-damuzhi"></i>
                <span class="item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import star from '../star/star';
import split from '../split/split';
import ratingSelect from '../ratingSelect/ratingSelect';
import formatDate from '../../common/js/date';
import data from '../../common/json/data.json';

const ALL = 2;

export default {
  components: {
    star,
    split,
    ratingSelect,
  },
  props: {
    seller: {
      type: Object,
    },
  },
  data() {
    return {
      ratings: [],
      onlyContent: true,
      selectType: ALL,
    };
  },
  created() {
    this.ratings = data.ratings;
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$el, { click: true });
    });
  },
  filters: {
    formatDate(time) {
      const date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    },
  },
  methods: {
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
    incrementTotal(param, type) {
      this[param] = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
  },
};
</script>


<style lang="stylus" scoped>
@import './ratings.styl';
</style>

