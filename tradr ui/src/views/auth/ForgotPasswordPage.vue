<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6 col-lg-4">
                <div class="card p-3 py-4 mt-5">
                    <div class="card-header text-center">
                        <h4 class="mb-3">Forgot Password</h4>
                        <p>Recover your password</p>
                    </div>
                    <div class="card-body">
                        <p class="info-text pt-3 pb-4">
                            Enter your email for the verification process 
                            and we will send a 6 digit code to your for verification.
                        </p>
                        <form @submit.prevent="forgotPassword">
                            <div class="row">
                                <div class="col-md-12 mb-1">
                                    <label class="input-label mb-2">Email</label>
                                    <div class="input-group mb-5">
                                        <input type="text" v-model="email" placeholder="Enter your email here" class="form-control">
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
import { mapActions } from "vuex"
export default {
    name: "ForgotPasswordPage",
    data() {
        return {
            email: "",
        };
    },
    methods: {
        ...mapActions("account", ["getResetUserId"]),
        async forgotPassword() {
            try {
                let data = {
                    email: this.email,
                };
                this.getResetUserId(data);
            } catch (error) {
                console.log(error);
            }
        },
    },
}
</script>

<style scoped>
.info-text {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #616161;
}
.card-header p {
    font-size: 14px !important;
}
</style>