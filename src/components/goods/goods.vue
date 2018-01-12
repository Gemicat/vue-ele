<template>
  <div class="good">
    <!-- 侧边栏列表 -->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item border-1px" v-for="(item, index) in goods" :key="index" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)">
          <span class="text">
            <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li class="food-list food-list-hook" v-for="(item, index) in goods" :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item" v-for="(food, index) in item.foods" :key="index" @click="selectFood(food)">
              <!-- 商品图片 -->
              <div class="icon">
                <img :src="food.icon" alt="" width="57">
              </div>
              <!-- 商品内容 -->
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span class="count">好评{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <!-- 添加购物车 -->
                <div class="cartControl-wrapper">
                  <cartControl :food="food" @increment="incrementTotal" ></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div>
      <!-- 购物车 -->
      <shopCart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopCart"></shopCart>
      <!-- 商品详情 -->
      <food :food="selectedFood" ref="food"></food>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import cartControl from '../cartControl/cartControl';
import shopCart from '../shopCart/shopCart';
import food from '../food/food';
import data from '../../common/json/data.json';

export default {
  components: {
    cartControl,
    shopCart,
    food,
  },
  props: {
    seller: {
      type: Object,
    },
  },
  data() {
    return {
      goods: [],
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      listHeight: [],
      scrolly: 0,
      selectedFood: {},
    };
  },
  created() {
    this.goods = data.goods;
    this.$nextTick(() => {
      this.initScroll();
      this.calHeight();
    });
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i += 1) {
        const height1 = this.listHeight[i];
        const height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrolly >= height1 && this.scrolly < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      const foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    },
  },
  methods: {
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true,
      });
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        click: true,
        probeType: 3,
      });
      this.foodScroll.on('scroll', (pos) => {
        this.scrolly = Math.abs(Math.round(pos.y));
      });
    },
    calHeight() {
      const foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i += 1) {
        const item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        // 去掉自带click事件的点击
        return false;
      }
      const foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      const el = foodList[index];
      this.foodScroll.scrollToElement(el, 300);
      return true;
    },
    incrementTotal(target) {
      this.$refs.shopCart.drop(target);
    },
    selectFood(food) {
      this.selectedFood = food;
      this.$refs.food.show();
    },
  },
};
</script>

<style lang="stylus" scoped>
@import 'goods.styl';
</style>

