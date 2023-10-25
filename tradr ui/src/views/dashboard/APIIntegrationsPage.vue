<template>
    <div class="container">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-md-8 col-lg-6 col-xl-5">
                <div class="card p-4 py-5 mt-3">
                    <div class="card-header text-center">
                        <h4>Authorization/API configuration</h4>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="saveConfig">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="input-label mb-2">Trade Platform</label>
                                    <div class="input-group mb-3 dropdown">
                                        <input type="text" class="form-control" v-model="activePlatform" data-bs-toggle="dropdown" aria-expanded="false"  id="basic-url" aria-describedby="basic-addon3" readonly>
                                        <ul class="dropdown-menu text-small">
                                            <li @click="changePlatform('Binance')"><span class="dropdown-item" href="#">Binance</span></li>
                                            <li @click="changePlatform('Kucoin')"><span class="dropdown-item" href="#">Kucoin</span></li>
                                            <li @click="changePlatform('MetaApi')"><span class="dropdown-item" href="#">MetaApi</span></li>
                                        </ul>
                                        <span class="input-group-text">
                                            <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.3333 1L7.66667 7.66667L1 1" stroke="white" stroke-width="1.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <!-- Binance -->
                                <div class="col-md-12" v-if="activePlatform === 'Binance'">
                                    <label class="input-label mb-2">API Key</label>
                                    <div class="mb-3">
                                        <input type="text" v-model="binanceConfig.apiKey" placeholder="Enter your Binance secret key" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-12" v-if="activePlatform === 'Binance'">
                                    <label class="input-label mb-2">Secret Keys</label>
                                    <div class="mb-5">
                                        <input type="text" v-model="binanceConfig.apiSecret" placeholder="Enter your Binance secret key" class="form-control">
                                    </div>
                                </div>
                                <!-- Kucoin -->
                                <div class="col-md-12" v-if="activePlatform === 'Kucoin'">
                                    <label class="input-label mb-2">API Key</label>
                                    <div class="mb-3">
                                        <input type="text" v-model="kucoinConfig.apiKey" placeholder="Enter your Kucoin API key" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-12" v-if="activePlatform === 'Kucoin'">
                                    <label class="input-label mb-2">Secret Key</label>
                                    <div class="mb-5">
                                        <input type="text" v-model="kucoinConfig.secretKey" placeholder="Enter your Kucoin secret key" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-12" v-if="activePlatform === 'Kucoin'">
                                    <label class="input-label mb-2">Passphrase</label>
                                    <div class="mb-5">
                                        <input type="text" v-model="kucoinConfig.passphrase" placeholder="Enter your Kucoin passphrase" class="form-control">
                                    </div>
                                </div>
                                <!-- Meta Trader -->
                                <div class="col-md-12" v-if="activePlatform === 'MetaApi'">
                                    <label class="input-label mb-2">UserID</label>
                                    <div class="mb-3">
                                        <input type="text" placeholder="Enter your meta-trader userID" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-12" v-if="activePlatform === 'MetaApi'">
                                    <label class="input-label mb-2">Password</label>
                                    <div class="mb-5">
                                        <input type="text" placeholder="Enter your meta-trader password" class="form-control">
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

import { mapActions, mapGetters } from "vuex"
export default {
    name: "APIIntegrationsPage",
    data() {
        return {
            activePlatform: "Binance",
            binanceConfig: {
                apiKey: "",
                apiSecret: ""
            },
            kucoinConfig: {
                apiKey: "",
                secretKey: "",
                passphrase: ""
            },
        };
    },
    mounted() {
        console.log(this.platformConfig)
        this.initConfig();
    },
    computed: {
        ...mapGetters("user",["platformConfig"]),
    },
    methods: {
        ...mapActions("user",["updateUserPlatformConfig"]),
        changePlatform(platform) {
            this.activePlatform = platform;
        },
        initConfig() {
            if (this.platformConfig && this.platformConfig.binanceConfig) {
                this.binanceConfig.apiKey = this.platformConfig.binanceConfig.apiKey;
                this.binanceConfig.apiSecret = this.platformConfig.binanceConfig.apiSecret;
            }
            if (this.platformConfig && this.platformConfig.kucoinConfig) {
                this.kucoinConfig.apiKey = this.platformConfig.kucoinConfig.apiKey;
                this.kucoinConfig.secretKey = this.platformConfig.kucoinConfig.secretKey;
                this.kucoinConfig.passphrase = this.platformConfig.kucoinConfig.passphrase;
            }
        },
        saveConfig() {
            let config = {}
            if (this.activePlatform === "Binance") {
                config.platform = this.activePlatform;
                config.platformConfig = {
                    apiKey: this.binanceConfig.apiKey,
                    apiSecret: this.binanceConfig.apiSecret
                }
                this.updateUserPlatformConfig(config)
            } else if(this.activePlatform === "Kucoin") {
                config.platform = this.activePlatform;
                config.platformConfig = {
                    apiKey: this.kucoinConfig.apiKey,
                    secretKey: this.kucoinConfig.secretKey,
                    passphrase: this.kucoinConfig.passphrase
                }
                this.updateUserPlatformConfig(config)
            }
        }
    },
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
    /* font-weight: 400; */
    font-size: 16px;
    line-height: 140%;
    letter-spacing: -0.5px;
    color: #FFFFFF;
}
.form-btn, .form-btn:hover, .form-btn:active, .form-btn:focus {
    background: #F2994A;
    border-radius: 4px;
    text-align: center;
    color: #FFFFFF;
}
.dropdown-menu {
    background: #092C4C;
    box-shadow: 0px 4px 80px rgba(201, 55, 255, 0.07), 0px 1.46007px 29.2013px rgba(201, 55, 255, 0.0162351), 0px 0.708835px 14.1767px rgba(201, 55, 255, 0.00751502), 0px 0.347484px 6.94968px rgba(201, 55, 255, 0.0077989), 0px 0.137396px 2.74791px rgba(201, 55, 255, 0.0102156);
    border-radius: 8px;
    border: none;
}
.dropdown-item {
    color: #FFFFFF;
}
.dropdown-item:hover {
    color: #F2994A;
    background: transparent;
}

</style>