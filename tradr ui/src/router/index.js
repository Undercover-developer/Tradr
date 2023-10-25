import {createRouter, createWebHistory} from 'vue-router'
import httpAuthClient from '@/api/main/httpClient'
import DashboardView from '../views/dashboard/DashboardView.vue'
import HomePage from '../views/dashboard/HomePage.vue'
import TransactionsPage from "../views/dashboard/TransactionsPage.vue"
import TradeConfigurationPage from "../views/dashboard/TradeConfigurationPage.vue"
import APIIntegrationsPage from "../views/dashboard/APIIntegrationsPage.vue"
import SettingsPage from "../views/dashboard/SettingsPage.vue"
//
import AuthView from '../views/auth/AuthView.vue'
import LoginPage from '../views/auth/LoginPage.vue'
import SignUpPage from '../views/auth/SignUpPage.vue'
import OtpPage from '../views/auth/OtpPage.vue'
import ForgotPasswordPage from '../views/auth/ForgotPasswordPage.vue'
import ResetPasswordPage from '../views/auth/ResetPasswordPage.vue'
import QrCodePage from '../views/auth/QrCodePage.vue'
const routes = [
    {
        path:"/",
        component: DashboardView,
        meta: { requiresAuth: true },
        children: [
            {
                path: "/",
                redirect: "/dashboard"
            },
            {
                path: "/dashboard",
                component: HomePage
            },
            {
                path: "/transactions",
                component: TransactionsPage
            },
            {
                path: "/configuration",
                component: TradeConfigurationPage
            },
            {
                path: "/api-integrations",
                component: APIIntegrationsPage
            },
            {
                path: "/settings",
                component: SettingsPage
            }
        ]
    },
    {
        path: "/auth",
        component: AuthView,
        children: [
            {
                path: "/auth/login",
                component: LoginPage
            },
            {
                path: "/auth/signup",
                component: SignUpPage
            },
            {
                path: "/auth/otp",
                component: OtpPage
            },
            {
                path: "/auth/forgot-password",
                component: ForgotPasswordPage
            },
            {
                path: "/auth/reset-password",
                component: ResetPasswordPage
            },
            {
                path: "/auth/qr",
                component: QrCodePage
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        httpAuthClient.get('/auth/token_status').then((response) => {
            if (response.status === 200 && response.data.tokenStatus === 'valid') {
                next()
            } else {
                next({
                    path: '/auth/login',
                })
            }
        }).catch((error) => {
            console.log(error, 'error')
            next({
                path: '/auth/login',
            })
        })    
    } else {
        next()
    }   
})

export default router