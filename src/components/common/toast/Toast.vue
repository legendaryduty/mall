<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      message: {
        type:String,
        default: ''
      },
      isShow: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
 .toast {
   position: fixed;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);

   background-color: rgba(0, 0, 0, .8);
   color: #ffffff;

   padding: 8px 10px;
 }
</style>
