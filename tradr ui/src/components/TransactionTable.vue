<template>
  <div class="card mt-5 mb-3">
    <div
      class="card-header d-flex align-items-center ps-3 pe-2 pt-3"
      style="background-color: transparent"
    >
      <small class="t-card-header">Current Trade</small>
      <div class="d-flex ms-auto">
        <div class="input-group mb-3 dropdown">
          <input type="text" class="form-control" v-model="activePlatform" data-bs-toggle="dropdown" aria-expanded="false"
            id="basic-url" aria-describedby="basic-addon3" readonly>
          <ul class="dropdown-menu text-small">
            <li @click="changePlatform('Binance')"><span class="dropdown-item" href="#">Binance</span></li>
            <li @click="changePlatform('Kucoin')"><span class="dropdown-item" href="#">Kucoin</span></li>
            <li @click="changePlatform('MetaApi')"><span class="dropdown-item" href="#">MetaApi</span></li>
          </ul>
          <span class="input-group-text">
            <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.3333 1L7.66667 7.66667L1 1" stroke="white" stroke-width="1.3" stroke-miterlimit="10"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
        <!-- <small class="icon-text">Export</small>
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_127_147)">
            <path
              d="M13.3008 5.86536H10.7605V7.37265H13.3008C14.0562 7.37265 14.6423 7.75852 14.6423 8.09062V14.7745C14.6423 15.1066 14.0562 15.4924 13.3008 15.4924H3.69888C2.94348 15.4924 2.35739 15.1066 2.35739 14.7745V8.09087C2.35739 7.75877 2.94348 7.3729 3.69888 7.3729H6.23867V5.86561H3.69888C2.1014 5.86561 0.850098 6.84309 0.850098 8.09087V14.7747C0.850098 16.0227 2.1014 17 3.69888 17H13.3011C14.8983 17 16.1499 16.0225 16.1499 14.7747V8.09087C16.1496 6.84284 14.8983 5.86536 13.3008 5.86536Z"
              fill="white"
            />
            <path
              d="M6.26952 3.75693C6.46246 3.75693 6.65514 3.68332 6.80235 3.53611L7.74592 2.59254V5.86538V7.37267V10.2601C7.74592 10.6764 8.0833 11.0138 8.49956 11.0138C8.91583 11.0138 9.25321 10.6764 9.25321 10.2601V7.37267V5.86538V2.54155L10.2478 3.53611C10.395 3.68332 10.5879 3.75693 10.7806 3.75693C10.9733 3.75693 11.1662 3.68332 11.3134 3.53611C11.6079 3.24194 11.6079 2.76463 11.3134 2.47045L9.06329 0.220316C8.91608 0.0731037 8.7234 0 8.53071 0C8.5287 0 8.52694 0 8.52494 0C8.52293 0 8.52117 0 8.51916 0C8.32647 0 8.13379 0.0731037 7.98658 0.220316L5.73644 2.47045C5.44202 2.76463 5.44202 3.24194 5.73644 3.53611C5.88391 3.68332 6.07659 3.75693 6.26952 3.75693Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_127_147">
              <rect width="17" height="17" fill="white" />
            </clipPath>
          </defs>
        </svg> -->
      </div>
    </div>
    <div class="card-body">
      <!-- <table class="table table-striped trade-table">
        <thead>
          <tr>
            <th scope="col">Currency Pair</th>
            <th scope="col">Exchange</th>
            <th scope="col">Amount</th>
            <th scope="col">Entry Price</th>
            <th scope="col">Current Price</th>
            <th scope="col">Type</th>
            <th scope="col">+/-(amount)</th>
            <th scope="col">+/-(%)</th>
            <th scope="col">End Trade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>UST/DOT</td>
            <td>Binance</td>
            <td>$7,553</td>
            <td>$7,553</td>
            <td>$7,553</td>
            <td><a href="#" class="btn btn-success">Long</a></td>
            <td>300</td>
            <td>0.6</td>
            <td><a href="" class="btn btn-outline-warning">End Trade</a></td>
          </tr>
          <tr>
            <td>UST/DOT</td>
            <td>Binance</td>
            <td>$7,553</td>
            <td>$7,553</td>
            <td>$7,553</td>
            <td><a href="#" class="btn btn-danger">Short</a></td>
            <td>300</td>
            <td>0.6</td>
            <td><a href="" class="btn btn-outline-warning">End Trade</a></td>
          </tr>
        </tbody>
      </table> -->
      <!-- <div class="pseudo-table">
        <div class="table-header">
          <span>Currency Pair</span><span>Exchange</span><span>Amount</span><span>Entry Price</span><span>Current Price</span><span>Type</span><span>+/- Amount</span><span>+/-(%)</span><span>End Trade</span>
        </div>
      </div> -->
      <div class="pseudo-table" v-if="!isFetchingTrades">
        <div class="table-header">
          <h6>Currency Pair</h6>
          <h6>Exchange</h6>
          <h6>Amount</h6>
          <h6>Entry Price</h6>
          <h6>Current Price</h6>
          <h6>Type</h6>
          <h6>+/- Amount</h6>
          <h6>+/-(%)</h6>
          <h6>End Trade</h6>
        </div>
        <div class="table-row py-3" v-for="(trade, index) in paginated" :key="index">
          <div>
            <h6 class="table-col-header">Currency Pair</h6>
            {{trade.symbol}}
          </div>
          <div>
            <h6 class="table-col-header">Exchange</h6>
            {{activePlatform}}
          </div>
          <div>
            <h6 class="table-col-header">Amount</h6>
            {{trade.type}}
          </div>
          <div>
            <h6 class="table-col-header">Entry Price</h6>
            {{trade.price}}
          </div>
          <div>
            <h6 class="table-col-header">Current Price</h6>
            {{trade.stopPrice}}
          </div>
          <div>
            <h6 class="table-col-header">Type</h6>
            <a href="#" class="btn btn-success" v-if="trade.side === 'BUY'">Long</a>
            <a href="#" class="btn btn-danger" v-else>Short</a>
          </div>
          <div>
            <h6 class="table-col-header">+/- Amount</h6>
            {{trade.status}}
          </div>
          <div>
            <h6 class="table-col-header">+/-(%)</h6>
            {{trade.executedQty}}
          </div>
          <div>
            <h6 class="table-col-header">End Trade</h6>
            <a href="" class="btn btn-outline-warning">End Trade</a>
          </div>
        </div>
        <!-- <div class="table-row py-3">
          <div>
            <h6 class="table-col-header">Currency Pair</h6>
            UST/DOT
          </div>
          <div>
            <h6 class="table-col-header">Exchange</h6>
            Binance
          </div>
          <div>
            <h6 class="table-col-header">Amount</h6>
            $7,553
          </div>
          <div>
            <h6 class="table-col-header">Entry Price</h6>
            $7,553
          </div>
          <div>
            <h6 class="table-col-header">Current Price</h6>
            $7,553
          </div>
          <div>
            <h6 class="table-col-header">Type</h6>
            <a href="#" class="btn btn-danger">Short</a>
          </div>
          <div>
            <h6 class="table-col-header">+/- Amount</h6>
            300
          </div>
          <div>
            <h6 class="table-col-header">+/-(%)</h6>
            0.6
          </div>
          <div>
            <h6 class="table-col-header">End Trade</h6>
            <a href="" class="btn btn-outline-warning">End Trade</a>
          </div>
        </div> -->
      </div>
      
      <div class="loading-spinner text-center py-3" v-if="isFetchingTrades">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading trades...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "TransactionTable",
  data() {
    return {
      activePlatform: "Binance",
      trades: [],
      currentPage: 1,
      pageSize: 5,
    }
  },
  mounted() {
    if(this.activePlatform === "Binance") {
      this.trades = this.binanceTrades
    }
  },
  computed: {
    ...mapGetters("trade", ["binanceTrades", "isFetchingTrades"]),
    indexStart() {
      return (this.currentPage - 1) * this.pageSize;
    },
    indexEnd() {
      return this.indexStart + this.pageSize;
    },
    paginated() {
      return this.trades.slice(this.indexStart, this.indexEnd);
    }
  },
  watch: {
    binanceTrades: function (newVal) {
      if(this.activePlatform === "Binance") {
        this.trades = newVal
      }
    }
  },
  methods: {
    ...mapActions("trade",["getBinanceTradeHistory"]),
    changePlatform(platform) {
      this.activePlatform = platform;
      if(platform === 'Binance') {
        if(this.binanceTrades.length === 0) {
          this.getBinanceTradeHistory();
        }
      }
    },
    prev() {
      this.currentPage--;
    },
    next() {
      this.currentPage++;
    }
  }
};
</script>

<style scoped>
.pseudo-table .table-header {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
}
.pseudo-table .table-header h6 {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #ffffff;
  mix-blend-mode: normal;
  opacity: 0.5;
  text-align: center;
}
.pseudo-table .table-row {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  background: #092c4c;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.02);
  border-radius: 3px;
}
/* margin-top to all .pseudo-table .table-row except the first .table-row  */
.pseudo-table .table-row + .table-row {
  margin-top: 10px;
}
.pseudo-table .table-row div {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #FFFFFF;
  text-align: center;
}
.pseudo-table .table-row div .table-col-header {
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 17px;
  color: #FFFFFF;
  mix-blend-mode: normal;
  opacity: 0.5;
}
.dropdown-menu {
  background: #092C4C;
  box-shadow: 0px 4px 80px rgba(201, 55, 255, 0.07), 0px 1.46007px 29.2013px rgba(201, 55, 255, 0.0162351), 0px 0.708835px 14.1767px rgba(201, 55, 255, 0.00751502), 0px 0.347484px 6.94968px rgba(201, 55, 255, 0.0077989), 0px 0.137396px 2.74791px rgba(201, 55, 255, 0.0102156);
  border-radius: 8px;
  border: none;
}

.dropdown-item {
  color: #FFFFFF !important;
  background: transparent !important;
}

.dropdown-item:hover {
  color: #F2994A !important;
  background: transparent !important;
}
/* media query for laptop and desktop */
@media (min-width: 769px) {
  .pseudo-table .table-row div .table-col-header {
    display: none;
  }
  .btn{
    font-size: 11.5px !important;
  }
}
/* media query for mobile  */
@media (max-width: 768px) {
  .pseudo-table .table-header {
    display: none;
  }
  .pseudo-table .table-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 0.65rem;
  }
  .pseudo-table .table-row div {
    margin-bottom: 10px;
    padding-left: 1rem;
    text-align: left;
  }
  .btn{
    font-size: 11px !important;
  }
}
/* media query for small mobile  */
@media (max-width: 360px) {
  .pseudo-table .table-header h6 {
    font-size: 12px;
  }
  .pseudo-table .table-row div {
    font-size: 12px;
  }
  .pseudo-table .table-row div .table-col-header {
    font-size: 10px;
  }
  .btn{
    font-size: 7.5px !important;
  }
}
.card {
  background: #0a3054;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.0357507);
  border-radius: 6px;
  border: none;
}
.card-header {
  background: #07335a;
  border-radius: 4px;
  border: none;
  padding: 1rem;
  padding-left: 0;
}
.card-header span {
  margin: 0;
  background: #27d988;
  border-radius: 6px 0px 0px 0px;
  padding: 1rem;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #000000;
}

tbody,
td,
tfoot,
th,
thead,
tr {
  border: none;
  
}
.table tbody tr{
  background: #092C4C !important;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.02) !important;
  border-radius: 3px !important;
}
.trade-table thead th {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #ffffff;
  mix-blend-mode: normal;
  opacity: 0.5;
}
.trade-table tbody td {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #ffffff;
}
.trade-table tbody tr {
  background: #092c4c;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.02);
  border-radius: 3px;
}
.btn {
  /* border: 1px solid #F2994A; */
  border-radius: 3px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
}
.btn-success,
.btn-success:hover {
  background: #27d988;
  color: #181c22;
}
.btn-outline-warning {
  border: 2px solid #f2994a !important;
  color: #f2994a;
  border-radius: 3px;
}
.btn-outline-warning:hover {
  background: none;
  color: #f2994a;
}
.btn-danger,
.btn-danger:hover {
  background: #f31629;
  color: #181c22;
}
.t-card-header {
  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: #ffffff;
}
.icon-text {
  color: #27d988;
  margin-right: 0.5rem;
}
</style>
