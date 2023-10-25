<template>
  <header class="p-3 mb-3">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center">
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <!-- <span class="fs-4 header-text">Dashboard</span> -->
        </a>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon3">
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.54">
                  <circle
                    cx="8"
                    cy="8"
                    r="8"
                    stroke="#535875"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.9999 17.9999L13.6499 13.6499"
                    stroke="#535875"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </span>
            <input
              type="search"
              class="form-control header-form"
              placeholder="Search..."
              aria-label="Search"
              id="basic-url"
              aria-describedby="basic-addon3"
            />
          </div>
        </form>

        <div class="dropdown text-end">
          <a
            href="#"
            class="d-block link-dark text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt="mdo"
              width="32"
              height="32"
              class="rounded-circle"
            />
          </a>
          <ul class="dropdown-menu text-small">
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderNav",
};
</script>

<style scoped>
header {
  background: #0a3054;
}
.header-text {
  font-size: 1.5rem;
  font-weight: 600;
}
.header-form {
  box-sizing: border-box;
  background: #0a3054;
  mix-blend-mode: normal;
  opacity: 0.5;
  border: 1px solid #aeb3cd;
  border-left: none;
  border-radius: 24px;
}
.header-form:focus {
  outline: none !important;
}
.header-text {
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 33px;
  color: #f2994a;
}
.input-group-text {
    box-sizing: border-box;
    background: #0a3054;
    mix-blend-mode: normal;
    opacity: 0.5;
    /* border: 1px solid #aeb3cd !important; */
    border-right: none !important;
    border-radius: 24px 0px 0px 24px;
}
.input-group {
    border: 1px solid #aeb3cd !important;
    border-radius: 24px;
}
</style>
