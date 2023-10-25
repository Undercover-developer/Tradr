<template>
  <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
        <div class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">{{ alert.type === 'success' ? 'Success' : 'Error' }}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{alert.message}}
            </div>
        </div>
</div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    name: "ToastMessage",
    computed: {
        ...mapGetters("alert", ["alert"]),
    },
}
</script>

<style>

</style>