<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <template v-slot:center>购物车({{cartLength}})</template>
    </nav-bar>
    <scroll class="wrapper" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'


  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  export default {
    name: "Cart",
    components:{
      NavBar,
      Scroll,
      CartList,
      CartBottomBar
    },
    computed:{
      cartLength() {
        return this.$store.state.cartList.length
      }
    },
    data() {
      return {

      }
    },
    activated(){
      this.$refs.scroll.refresh()
    },
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .wrapper {
    height: calc(100% - 49px - 44px - 44px);
    overflow: hidden;
  }

 .nav-bar {
   background-color: var(--color-tint);
   color: #fff;
 }
</style>
