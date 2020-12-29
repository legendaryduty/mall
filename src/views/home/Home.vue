<template>
  <div id="home">
    <div class="home-nav">
      <nav-bar>
        <template v-slot:center>购物街</template>
      </nav-bar>
    </div>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="wrapper" ref="scroll" @scroll="contentScroll" :probe-type="3" :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import HomeFeatureView from './childComps/HomeFeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata} from "network/home";
  import {getHomeGoods} from "network/home";
  import {debounce} from "common/utils";

  export default {
    name: "Home",
    data() {
      return {
        recommends: [],
        banners: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: true,
        tapOffsetTop: 0,
        isTabFixed: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    components: {
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      // 事件总线监听图片加载完成，完成后刷新better-scroll
      const refresh = debounce(this.$refs.scroll.refresh, 50);
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
    },
    deactivated(){
      // console.log('deactived');
    },
    activated(){

    },
    methods: {
      /**
       * 事件监听相关方法
       */
      // tabControl点击跳转
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = "pop";
            break;
          case 1:
            this.currentType = "new";
            break;
          case 2:
            this.currentType = "sell";
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index
      },

      // 点击返回顶部
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },

      // 滚动事件
      contentScroll(position) {
        // 判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000;
        // 决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tapOffsetTop
      },

      // 上拉加载更多
      loadMore() {
        this.getHomeGoods(this.currentType)
      },

      // 轮播图加载完成后获取tabControl位置
      swiperImageLoad(){
        this.tapOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
       * 网络请求相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          this.$refs.scroll.finishPullUp();
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    /*padding-bottom: 49px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .wrapper {
    /*height: 300px;*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /*margin-top: 44px;*/
    overflow: hidden;
    /*overflow-y: scroll;*/
  }

  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>
