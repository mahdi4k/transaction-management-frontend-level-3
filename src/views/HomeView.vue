<script setup>
import TransactionsList from "@/components/TransactionsList.vue";
</script>

<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-4">
          <h4>Submit new Transaction</h4>
          <form>
            <div class="mb-3">
              <label for="AccountID" class="form-label">Account ID:</label>
              <input @input="validUUID($event.target.value)" v-model="formData.account_id" type="text" class="form-control" id="AccountID">
              <span class="text-danger">{{validAccountId}}</span>
            </div>
            <div class="mb-3">
              <label for="Amount" class="form-label">Amount</label>
              <input v-model.number="formData.amount" type="number" class="form-control" id="Amount">
            </div>
            <button :disabled="!validForm" class="btn btn-success" @click="sendData" type="button">Submit</button>
          </form>
        </div>
        <div class="col-8">
          <h4>Transaction history</h4>
          <pulse-loader :loading="loading" />
          <TransactionsList v-for="(item,index) in transactionData" :item="item" :key="index" />

        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from '@/axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  components: {
    PulseLoader
  },
  data(){
    return{
      formData :{
        account_id :null,
        amount:null,
      },
      loading:true,
      validForm : false,
      validAccountId :'',
      transactionData : []
    }
  },
  methods:{
    async getData(){
      this.loading = true
      try {
        let response = await axios.get()
        this.transactionData = response.data
        this.loading = false
      }catch (e){
        this.loading = false
        console.error(e.response.data.errors)

      }

    },
    async sendData(){
      this.loading = true
      try {
        let response = await axios.post('',this.formData)
        await this.getData()
      }catch (e){
        this.loading = false
        console.error(e.response.data.errors)
      }

    },
    validUUID(val){
      const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
      regexExp.test(val) ? this.validAccountId = null  : this.validAccountId = 'account ID must be a valid UUID v4'
      }
  },
  watch: {
    formData: {
      handler(newValue) {
          this.validForm = !!(this.validAccountId === null && newValue.amount);
      },
      deep: true
    }
  },
  mounted() {
    this.getData()
  },

}
</script>
