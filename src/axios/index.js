import axios from "axios";

export default axios.create({
    baseURL : 'https://infra.devskills.app/api/accounting/transactions'
})