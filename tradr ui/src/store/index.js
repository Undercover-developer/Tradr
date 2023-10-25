import { createStore } from 'vuex'
import { alert } from './alert.module'
import { account } from './account.module'
import { user } from './user.module'
import { trade } from './trade.module'

export const store = createStore({
    modules: {
        alert,
        account,
        user,
        trade
    }
})