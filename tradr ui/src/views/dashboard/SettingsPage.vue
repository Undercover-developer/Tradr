<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-md-8 col-lg-5">
                <div class="card p-3 py-4 mt-5">
                    <div class="card-header text-center">
                        <h4>Password Change</h4>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="savePassword">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="input-label mb-2">Old Password</label>
                                    <div class="input-group mb-3">
                                        <input type="password" v-model="password" placeholder="Enter your old password" class="form-control">
                                        <span class="input-group-text" id="basic-addon3">
                                            <svg class="icon-eye" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <label class="input-label mb-2">New Password</label>
                                    <div class="input-group mb-3">
                                        <input type="password" v-model="newPassword" placeholder="Enter your new password" class="form-control">
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
                                        <input type="password" v-model="confirmPassword" placeholder="Confirm your new password" class="form-control">
                                        <span class="input-group-text" id="basic-addon3">
                                            <svg class="icon-eye" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#A9A9A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-lg form-btn" type="submit">Save</button>
                                    </div>
                                </div>
                                <toast-message></toast-message>
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
import ToastMessage from '../../components/ToastMessage.vue';
export default {
    name: "SettingsPage",
    components: {ToastMessage},
    data() {
        return {
            password: "",
            newPassword: "",
            confirmPassword: "",
        };
    },
    methods: {
        ...mapActions("user",["updateUserPassword"]),
        ...mapActions("alert",["errorAlert"]),
        validatePassword() {
            if (this.password === "") {
                this.errorAlert("Please enter your old password");
                return false;
            }
            if (this.newPassword === "") {
                this.errorAlert("Please enter your new password");
                return false;
            }
            if (this.confirmPassword === "") {
                this.errorAlert("Please confirm your new password");
                return false;
            }
            if (this.newPassword !== this.confirmPassword) {
                this.errorAlert("New password and confirm password do not match");
                return false;
            }
            return true;
        },
        async savePassword() {
            if (this.validatePassword()) {
                const data = {
                    oldPassword: this.password,
                    newPassword: this.newPassword,
                };
                this.updateUserPassword(data);
                this.resetInput();
            }
        },
        resetInput() {
            this.password = "";
            this.newPassword = "";
            this.confirmPassword = "";
        },
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