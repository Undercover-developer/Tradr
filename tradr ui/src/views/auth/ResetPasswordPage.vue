<template>
     <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6 col-lg-4">
                <div class="card p-3 py-4 mt-5">
                    <div class="card-header text-center">
                        <h4 class="mb-3">Reset Password</h4>
                        <p>Create new password</p>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="submitResetPassword">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="input-label mb-2">New Password</label>
                                    <div class="input-group mb-3">
                                        <input type="password" v-model="password" placeholder="Enter your password" class="form-control" >
                                        <span class="input-group-text" id="basic-addon3">
                                            <svg class="icon-eye" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <label class="input-label mb-2">Confirm New Password</label>
                                    <div class="input-group mb-5">
                                        <input type="password" v-model="passwordConfirmation" placeholder="Enter your password" class="form-control" >
                                        <span class="input-group-text" id="basic-addon3">
                                            <svg class="icon-eye" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                               
                                <div class="col-md-12">
                                    <div class="d-grid gap- mt-2">
                                        <button class="btn btn-lg form-btn" type="submit">Reset Password</button>
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
    name: "ResetPasswordPage",
    data() {
        return {
            password: "",
            passwordConfirmation: "",
        };
    },
    computed: {
        ...mapGetters("account",["authUserId"])
    },
    methods: {
        ...mapActions("account",["resetPassword"]),
        submitResetPassword() {
            let data = {
                password: this.password,
                userId: this.authUserId,
            };
            this.resetPassword(data);
        }
    },
}
</script>

<style>

</style>