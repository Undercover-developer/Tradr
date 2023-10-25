<template>
    <div class="container">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-md-8 col-lg-6 col-xl-5">
                <div class="card p-2 pt-3 mt-5">
                    <div class="card-header text-center">
                        <h4>Trade Configuration</h4>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="saveConfig">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" v-model="tradeBy" value="volume" type="radio" id="volume">
                                        <label class="form-check-label" for="volume">
                                            Trade by volume
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" v-model="tradeBy" value="amount" type="radio" id="amount">
                                        <label class="form-check-label" for="amount">
                                            Trade by amount
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon3">%</span>
                                        <input type="number" v-model="size" class="form-control" >
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon3">USDT</span>
                                        <input type="number" v-model="amount" class="form-control" >
                                        <div class="form-text">You can only set of % or USDT amount</div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="input-label mb-2">Take Profit</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon3">%</span>
                                        <input type="number" v-model="takeProfit" class="form-control" min="20" max="100">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="input-label mb-2">Trailing Stop Loss</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon3">%</span>
                                        <input type="number" v-model="trailingStopLoss" class="form-control" min="10" max="100">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="input-label mb-2">Stop Loss</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon3">%</span>
                                        <input type="number" v-model="stopLoss" class="form-control" min="20" max="100">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="input-label mb-2">Set Trailing Stop</label>
                                    <div class="mb-3">
                                        <input type="text" class="form-control" >
                                        <div class="form-text">Set trailing stop loss if the take profit is above 20%</div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-lg form-btn" type="submit">Save</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: "TradeConfigurationPage",
    data() {
        return {
            size: 0,
            takeProfit: 0,
            trailingStopLoss: 0,
            stopLoss: 0,
            amount: 0,
            tradeBy: "amount"
        };
    },
    mounted() {
        this.initTradeConfig();
    },
    computed: {
        ...mapGetters('user',['tradeConfig'])
    },
    methods: {
        ...mapActions('user',['updateUserTradeConfig']),
        saveConfig() {
            let data = {
                size: this.size,
                takeProfit: this.takeProfit,
                trailingStopLoss: this.trailingStopLoss,
                stopLoss: this.stopLoss,
                amount: this.amount,
                tradeBy: this.tradeBy
            };
            this.updateUserTradeConfig(data);
        },
        initTradeConfig() {
            if(this.tradeConfig) {
                this.size = this.tradeConfig.size;
                this.takeProfit = this.tradeConfig.takeProfit;
                this.trailingStopLoss = this.tradeConfig.trailingStopLoss;
                this.stopLoss = this.tradeConfig.stopLoss;
                this.tradeBy = this.tradeConfig.tradeBy;
                this.amount = this.tradeConfig.amount
            }  
        }
    },
    watch: {
        tradeConfig() {
            console.log('tradeconfig changed')
            this.initTradeConfig()
        }
    }
}
</script>

<style scoped>
.card{
    background: #0A3054;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.0357507);
    border-radius: 6px;
    border: none;
}
.card-header{
    border: none;
    background: #0A3054;
    font-style: normal;
}
.card-header h4 {
    font-weight: 500;
    font-size: 24px;
    line-height: 120%;
    text-align: center;
    letter-spacing: -0.5px;
    color: #FFFFFF;
}
.input-group-text, .form-control {
    background: #092C4C;
    border: 1px solid #092C4C;
    color: rgba(169, 169, 169, 0.8);
}
.input-label {
    font-style: normal;
    font-size: 16px;
    line-height: 140%;
    letter-spacing: -0.5px;
    color: #FFFFFF;
}
.form-text {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    text-align: right;
    color: #979797;
}
.form-btn, .form-btn:hover, .form-btn:active, .form-btn:focus {
    background: #F2994A;
    border-radius: 4px;
    text-align: center;
    color: #FFFFFF;
}
</style>