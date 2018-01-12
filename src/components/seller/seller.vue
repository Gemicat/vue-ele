<template>
  <div class="seller">
    <div class="seller-content">
      <!-- 信息 -->
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>min
            </div>
          </li>
        </ul>
        <!-- 收藏 -->
        <div class="favorite" @click="toggleFavorite">
          <i class="iconfont icon-aixin" :class="{'active': favorite}"></i>
          <span>{{favoriteText}}</span>
        </div>
      </div>
      <!-- 分割线 -->
      <split></split>
      <!-- 活动公告 -->
      <div class="bulletin">
        <h1 class="title">活动与公告</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import split from '../split/split';
import star from '../star/star';
import { savaToLocal, loadFromlLocal } from '../../common/js/store';

export default {
  components: {
    star,
    split,
  },
  props: {
    seller: {
      type: Object,
    },
  },
  data() {
    return {
      favorite: (() => loadFromlLocal(this.seller.id, 'favorite', false))(),
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
    };
  },
  created() {
    if (!this.scroll) {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$el, { click: true });
      });
    } else {
      this.scroll.refresh();
    }
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏';
    },
  },
  methods: {
    toggleFavorite() {
      this.favorite = !this.favorite;
      savaToLocal(this.seller.id, 'favorite', this.favorite);
    },
  },
};
</script>


<style lang="stylus" scoped>
@import './seller.styl';
</style>

