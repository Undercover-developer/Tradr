<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-md-7 col-lg-5 col-xl-4">
                <div class="card p-3 py-4 mt-5">
                    <div class="card-header text-center">
                        <h4 class="mb-3">OTP</h4>
                        <p>Google authenticator otp</p>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="submitOtp">
                            <div class="row gx-1">
                                <div class="col-2">
                                    <div class="input-group mb-3">
                                        <input type="text" v-model="digit1" ref="digit1" @keyup="goToNextField('digit2')" placeholder="0" class="form-control" maxlength="1">
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="input-group mb-3">
                                        <input type="text" v-model="digit2" ref="digit2" @keyup="goToNextField('digit3')" @keyup.delete="goToPrevField('digit1')" placeholder="0" class="form-control" maxlength="1">
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="input-group mb-3">
                                        <input type="text" v-model="digit3" ref="digit3" @keyup="goToNextField('digit4')" @keyup.delete="goToPrevField('digit2')" placeholder="0" class="form-control" maxlength="1">
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="input-group mb-3">
                                        <input type="text" v-model="digit4" ref="digit4" @keyup="goToNextField('digit5')" @keyup.delete="goToPrevField('digit3')"  placeholder="0" class="form-control" maxlength="1">
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="input-group mb-3">
                                        <input type="text" v-model="digit5" ref="digit5" @keyup="goToNextField('digit6')" @keyup.delete="goToPrevField('digit4')" placeholder="0" class="form-control" maxlength="1">
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="input-group mb-3">
                                        <input type="text" v-model="digit6" ref="digit6" @keyup.delete="goToPrevField('digit5')" placeholder="0" class="form-control" maxlength="1">
                                    </div>
                                </div>
                                
                                <div class="col-md-12">
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-lg form-btn" type="submit">Continue</button>
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
import { mapActions, mapGetters } from "vuex";
export default {
    name: "OtpPage",
    data() {
        return {
            digit1: "",
            digit2: "",
            digit3: "",
            digit4: "",
            digit5: "",
            digit6: "",
        };
    },
    computed: {
        ...mapGetters("account",["authUserId"]),
    },
    mounted() {
        if(!this.authUserId){
            this.$router.push("/auth/login");
        }
        this.$refs.digit1.focus();
    },
    methods: {
        ...mapActions("account", ["handleLoginOtp", "handleSignUpOtp", "handleResetOtp"]),
        async submitOtp() {
            const userId = this.authUserId;
            const otp = this.digit1 + this.digit2 + this.digit3 + this.digit4 + this.digit5 + this.digit6;
            if(this.$route.query.authType === "login") {
                this.handleLoginOtp({ userId, otp });
            } else if(this.$route.query.authType === "registration") {
                this.handleSignUpOtp({ userId, otp });
            } else if(this.$route.query.authType === "reset") {
                this.handleResetOtp({ userId, otp });
            }
        },
        goToNextField(nextFeild) {
            this.$refs[nextFeild].focus();
        },
        goToPrevField(prevFeild) {
            this.$refs[prevFeild].focus();
        },
    },
}
</script>

<style scoped>
.resend-text {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;
    color: #F2994A;
    text-align: right;
}
.input-group-text,
.form-control {
    background: #0A3054;
    border: 1px solid rgba(215, 187, 187, 0.6) !important;
    box-shadow: 0px 10px 75px rgba(147, 147, 147, 0.1) !important;
    border-radius: 10px !important;
    font-style: normal;
    font-weight: 700;
    font-size: 24px !important;
    line-height: 33px !important;
    color: #FAFAFA !important;
    padding-left: 1rem !important;
}
</style>