<template>

  <div>
    Transferred {{item.amount}} {{item.amount > 0 ? 'to' : 'from'}} account {{item.account_id}} the current account balance
    {{ item.amount }}
  </div>

</template>

<script>
export default {
  name: "TransactionsList",
   props:['item'],
  data(){
    return{

    }
  }
}
</script>

<style scoped>

</style>