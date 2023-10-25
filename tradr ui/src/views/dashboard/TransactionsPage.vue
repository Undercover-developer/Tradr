<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <transaction-table></transaction-table>
            </div>
        </div>
    </div>
</template>

<script>
import TransactionTable from '../../components/TransactionTable.vue'
export default {
    name: "TransactionsPage",
    components: {TransactionTable},
}
</script>

<style>

</style>