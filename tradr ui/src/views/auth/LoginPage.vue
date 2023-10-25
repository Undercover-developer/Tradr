<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6 col-lg-4">
                <div class="card p-3 py-4 mt-5">
                    <div class="card-header text-center">
                        <h4 class="mb-3">Login</h4>
                        <p>Login to the dashboard</p>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="loginUser">
                            <div class="row">
                                <div class="col-md-12 mb-1">
                                    <label class="input-label mb-2">Email</label>
                                    <div class="input-group mb-3">
                                        <input type="text" v-model="email" placeholder="Enter your email" class="form-control" >
                                    </div>
                                </div>
                                <div class="col-md-12 mb-1">
                                    <label class="input-label mb-2">Password</label>
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
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="">
                                    <label class="form-check-label" >
                                        Keep me logged in
                                    </label>
                                </div>
                                <div class="d-flex align-items-center ps-3 pe-2 pt-3 pb-3">
                                    <div class="d-flex ms-auto">
                                        <span class="util-text" @click="forgotPassword">Forgot password?</span> 
                                    </div>
                                </div>
                               </div>
                                <div class="col-md-12">
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-lg form-btn" type="submit">Login</button>
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
    name: "LoginPage",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        ...mapActions("account", ["login"]),
        async loginUser() {
            this.login({ email: this.email, password: this.password });
        },
        forgotPassword() {
            this.$router.push("/auth/forgot-password");
        },
    },
}
</script>

<style>
.util-text {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;
    color: #A9A9A9;
}
.form-check-label {
    color: #F2994A;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    text-align: center;
    letter-spacing: -0.5px;
}
</style>