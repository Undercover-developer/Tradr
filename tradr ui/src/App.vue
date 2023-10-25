<template>
  <router-view></router-view>
</template>

<script>
import io from '@/scripts/socket.io.min.js';
import { mapActions } from 'vuex';
export default {
  name: "App",
  components: {},
  mounted() {
    this.getUserProfile();
    const socketClient = io('http://localhost:4000', {
      transports: ['websocket'],
    })
    socketClient.on('message', (data) => {
      console.log(data)
    })
  },
  methods: {
    ...mapActions('user', ['getUserProfile']),
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  background-color: #092c4c;
}
textarea:hover,
input:hover,
textarea:active,
input:active,
textarea:focus,
input:focus,
button:focus,
button:active,
button:hover,
label:focus,
.btn:active,
.btn.active {
  outline: 0px !important;
  /* -webkit-appearance: none; */
  box-shadow: none !important;
}
.router-link-active {
  background: #f2994a !important;
  border-radius: 4px;
  color: #000000 !important;
  mix-blend-mode: normal;
  opacity: 0.8;
  padding-left: 1rem !important;
}

.card {
  background: #0a3054 !important;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.0357507) !important;
  border-radius: 6px !important;
  border: none !important;
}
.card-header {
  border: none !important;
  background: #0a3054 !important;
  font-style: normal !important;
}
.card-header h4 {
  font-weight: 500;
  font-size: 20px;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.5px;
  color: #ffffff;
}
.card-header p{
  text-align: center;
  letter-spacing: -0.5px;
  color: #F2994A;
}
.input-group-text,
.form-control {
  background: #092c4c  !important;
  border: 1px solid #092c4c  !important;
  color: rgba(169, 169, 169, 0.8)  !important;
  font-size: 0.9rem !important;
}

.form-check-input {
  border: 1px solid #919294  !important;
  background-color: #092c4c  !important;
}
.form-control {
  padding: 0.5rem !important;
  padding-left: 1rem !important;
}
.input-label {
  font-style: normal  !important;
  /* font-weight: 400; */
  font-size: 16px  !important;
  line-height: 140%  !important;
  letter-spacing: -0.5px  !important;
  color: #ffffff  !important;
}
.form-btn,
.form-btn:hover,
.form-btn:active,
.form-btn:focus {
  background: #f2994a !important;
  border-radius: 4px !important;
  text-align: center  !important;
  color: #ffffff  !important;
}
.form-btn {
  font-style: normal;
  font-weight: 700 !important;
  font-size: 18px !important;
}
.icon-eye {
  height: 1.1rem;
}
</style>
