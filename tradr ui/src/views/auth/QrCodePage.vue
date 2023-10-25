<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6 col-lg-6">
                <div class="card p-3 py-4 mt-5">
                    <div class="card-header text-center">
                        <h4 class="mb-3">Scan QR Code</h4>
                        <p>Scan QR code then proceed to receive OTP</p>
                    </div>
                    <div class="card-body">
                        <div>
                            <div class="row">
                                <div class="col-md-12 mb-5 text-center">
                                   <img :src="authQrCode" v-if="authQrCode" alt="otp">
                                </div>
                                
                                <div class="col-md-12">
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-lg form-btn" type="button" @click="goToOtpPage">Proceed</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "QRPage",
    data() {
        return {
            qrCode: "",
        };
    },
    computed: {
        ...mapGetters("account",["authQrCode"]),
    },
    mounted() {
        this.getAuthQrCode();
    },
    methods: {
        ...mapActions("account", ["getAuthQrCode"]),
        goToOtpPage() {
            this.$router.push("/auth/otp?authType=registration");
        },
    },
}
</script>

<style>

</style>