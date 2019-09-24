import Vue from 'vue'
import Router from 'vue-router'
import Category from '../components/Category'
import Comment from '../components/Comment'
import Address from '../components/Address'
import Customer from '../components/Customer'
import Order from '../components/Order'
import Product from '../components/Product'
import Waiter from '../components/Waiter'


Vue.use(Router)
const routes = [
  { path: '/', component: Category },
  { path: '/category', component: Category },
  { path: '/address', component: Address },
  { path: '/comment', component: Comment },
  { path: '/customer', component: Customer },
  { path: '/order', component: Order },
  { path: '/product', component: Product },
  { path: '/waiter', component: Waiter }
]

export default new Router({
  routes
})
