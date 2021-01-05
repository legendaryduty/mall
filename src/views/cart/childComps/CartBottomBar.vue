<template>
  <div class="bottom-bar">
    <check-button class="check-button" :isChecked="isSelectAll" @click.native="checkClick"></check-button>
    <span>全选</span>
    <span class="total-price">合计:￥{{totalPrice}}</span>
    <span class="buy">去计算({{checkLength}})</span>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      totalPrice() {
        const cartList = this.$store.state.cartList;
        return cartList.filter(item => {
          return item.check
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.check).length
      },
      isSelectAll() {
        return !this.$store.state.cartList.find(item => !item.check)
      }
    },
    methods:{
      checkClick() {
        if (this.isSelectAll) {
          this.$store.state.cartList.forEach(item => item.check = false)
        } else {
          this.$store.state.cartList.forEach(item => item.check = true)
        }
      }
    }
  }
</script>

<style scoped>
 .bottom-bar {
   width: 100%;
   height: 44px;
   background-color: #eee;
   box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
   position: fixed;
   line-height: 45px;
   padding-left: 35px;
   box-sizing: border-box;
 }
 .check-button {
   position: absolute;
   line-height: 0;
   left: 12px;
   top: 13px;
 }

 .total-price {
   margin-left: 15px;
   font-size: 16px;
   color: #666;
 }

 .buy {
   background-color: orangered;
   color: #fff;
   width: 100px;
   height: 44px;
   text-align: center;
   line-height: 44px;
   float: right;
 }
</style>
