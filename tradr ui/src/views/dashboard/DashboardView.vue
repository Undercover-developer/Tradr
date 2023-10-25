<template>
  <div class="row gx-0">
    <div class="col-xl-2 hidden-medium side-bar">
      <side-bar></side-bar>
    </div>
    <div class="col-xl-10 col-lg-12 col-md-12">
      <div class="dashboard" style="min-height: 100vh">
        <div class="row gx-0">
          <div class="col-xl-12">
            <header-nav class="hidden-medium"></header-nav>
            <off-canvas-nav class="hidden-large"></off-canvas-nav>
          </div>
          <div class="col-xl-12">
            <div class="container p-lg-5">
                <router-view></router-view>
            </div> 
          </div>
        </div>
      </div>
      <toast-message></toast-message>
    </div>
    <logout-modal></logout-modal>
  </div>
</template>

<script>
import HeaderNav from "../../components/Header.vue";
import LogoutModal from '../../components/LogoutModal.vue';
import OffCanvasNav from '../../components/OffCanvasNav.vue';
import SideBar from "../../components/SideBar.vue";
import ToastMessage from "@/components/ToastMessage.vue";

export default {
  components: { SideBar, HeaderNav, LogoutModal, OffCanvasNav, ToastMessage },
  name: "DashboardView",
};
</script>

<style>
    @media (max-width: 1200px) {
        .hidden-medium {
            display: none;
        }
        .hidden-large {
            display: block;
        }
    }
    @media (min-width: 1200px) {
        .hidden-large {
            display: none !important;
        }
    }

</style>

