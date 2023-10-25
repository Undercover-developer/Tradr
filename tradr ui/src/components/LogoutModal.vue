<template>
    <div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center pb-5">
                    <h5 class="modal-title mb-2" id="exampleModalLabel">Logout</h5>
                    <p class="modal-text mb-4">Are you sure you want to logout?</p>
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button class="btn btn-md btn-modal" type="button" data-bs-dismiss="modal" aria-label="Close" @click="logout">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
    name: "LogoutModal",
    methods: {
        ...mapActions("account", ["logout"]),
    },
}
</script>

<style scoped>
.modal-content {
    background: #092C4C;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.0357507);
    border-radius: 7px;
    border: none;
}
.modal-header {
    border: none;
}
h5.modal-title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;

    color: #FFFFFF;
}
.modal-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #8D8D8D;
}
.btn-modal, .btn-modal:hover {
    background: #F2994A;
    border-radius: 3px;
    border: none;
    color: #FFFFFF;
}
</style>