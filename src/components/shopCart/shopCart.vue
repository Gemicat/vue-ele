<template>
  <div>
    <div class="shopCart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <!-- 购物车图标 -->
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount > 0}">
              <i class="iconfont icon-gouwuche" :class="{'highlight': totalCount > 0}"></i>
            </div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <!-- 价格信息 -->
          <div class="price" v-show="totalPrice > 0">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}</div>
        </div>
        <!-- 去结算 -->
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <!-- 添加购物车动画 -->
      <div class="ball-container">
        <div v-for="(ball, index) in balls" :key="index">
          <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <!-- 购物车列表 -->
      <transition name="fade">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="shopcart-food" v-for="(food, index) in selectFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price * food.count}}</span></div>
                <div class="cartControl-wrapper">
                  <cartControl :food="food"></cartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <!-- 遮罩 -->
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import cartControl from '../cartControl/cartControl';

export default {
  components: {
    cartControl,
  },
  props: {
    selectFoods: {
      type: Array,
      default: [],
    },
    deliveryPrice: {
      type: Number,
      default: 0,
    },
    minPrice: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      balls: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }],
      dropBalls: [],
      fold: true,
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((item) => {
        total += item.price * item.count;
      });
      return total;
    },
    totalCount() {
      let total = 0;
      this.selectFoods.forEach((item) => {
        total += item.count;
      });
      return total;
    },
    payDesc() {
      let text = '';
      if (this.totalPrice === 0) {
        text = `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        text = `还差${this.minPrice - this.totalPrice}元起送`;
      } else {
        text = '去结算';
      }
      return text;
    },
    payClass() {
      let payClass = '';
      if (this.totalPrice < this.minPrice) {
        payClass = 'not-enough';
      } else {
        payClass = 'enough';
      }
      return payClass;
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      const show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true,
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    },
  },
  methods: {
    // 去支付
    pay() {
      if (this.totalPrice < this.minPrice) {
        return false;
      }
      alert(`支付${this.totalPrice}元`);
      return true;
    },
    drop(el) {
      for (let i = 0; i < this.balls.length; i += 1) {
        const ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeEnter(el = {}) {
      let count = this.balls.length - 1;
      while (count) {
        const ball = this.balls[count];
        if (ball.show) {
          const rect = ball.el.getBoundingClientRect();
          const x = rect.left - 32;
          const y = -(window.innerHeight - rect.top - 22);
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          const inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
        count -= 1;
      }
    },
    enter(el = {}) {
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        const inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
      });
    },
    afterEnter(el = {}) {
      const ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    },
    toggleList() {
      if (!this.totalCount) {
        return false;
      }
      this.fold = !this.fold;
      return true;
    },
    empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    },
    hideList() {
      this.fold = true;
      return true;
    },
  },
};
</script>

<style lang="stylus" scoped>
@import 'shopCart.styl';
</style>
