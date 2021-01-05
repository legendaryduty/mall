<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="wrapper" ref="scroll" :probeType="3" @scroll="scroll">
      <detail-swiper :top-images="topImages" @swiperLoad="swiperLoad"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-botton-bar @addToCart="addToCart"></detail-botton-bar>
    <toast :isShow="isShow" :message="message"></toast>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottonBar from './childComps/DetailBottonBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'
  import Toast from 'components/common/toast/Toast'


  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {debounce} from "common/utils";

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottonBar,
      Scroll,
      GoodsList,
      BackTop,
      Toast,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        detailItemListener: null,
        themeTopY: [],
        getThemeTopY: null,
        currentIndex: 0,
        isShowBackTop: false,
        message:'',
        isShow: false
      }
    },
    created() {
      // 获取iid
      this.iid = this.$route.params.iid;
      // 获取详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        // 获取顶部轮播图数据
        this.topImages = data.itemInfo.topImages;
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo);
        // 获取商品图片
        this.detailInfo = data.detailInfo;
        // 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        // 取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      });
      // 获取推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
      // 给themeTopY进行防抖并赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopY = [];
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.param.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopY.push(Number.MAX_VALUE);
        // console.log(this.themeTopY);
      }, 100)
    },
    mounted() {
      const detailRefresh = debounce(this.$refs.scroll.refresh, 50);
      this.detailItemListener = () => {
        detailRefresh();
        // console.log('detailRefresh');
      }
      this.$bus.$on('itemImageLoad', this.detailItemListener)
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.detailItemListener)
    },
    methods:{
      // 商品图片加载完后刷新,并获取每个组件位置
      imgLoad() {
        this.$refs.scroll.refresh();
        this.getThemeTopY()
      },
      // 轮播图加载完后刷新
      swiperLoad() {
        this.$refs.scroll.refresh();
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index] + 44, 500)
      },
      // 滚动监听
      scroll(position) {
        // 改变标题
        const positionY = -position.y + 44;
        for (let i = 0; i < this.themeTopY.length - 1; i ++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i + 1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        };
        // 判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000;
      },
      // 点击返回顶部
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      addToCart() {
        // 获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 将商品添加到购物车
        this.$store.dispatch('addCart', product).then(res => {
          this.isShow = true;
          this.message = res;

          setTimeout(() => {
            this.isShow = false;
            this.message = ''
          }, 1500)
        })
      }
    }
  }
</script>

<style scoped>
 .detail {
   position: relative;
   z-index: 9;
   background-color: #fff;
   height: 100vh;
 }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .wrapper {
    height: calc(100% - 44px - 49px);
  }

</style>
