import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "auth" */ "../views/Login.vue"),
  },
  {
    path: "/",
    component: () => import(/* webpackChunkName: "contacts" */ "../views/contactsApp/BaseContact.vue"),
    children: [
      {
        path: "",
        name: "ContactsView",
        component: () => import(/* webpackChunkName: "contacts" */ "../views/contactsApp/ViewContacts.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/new",
        name: "ContactsCreate",
        component: () => import(/* webpackChunkName: "contacts" */ "../views/contactsApp/CreateEditContact.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/edit/:id_contact",
        name: "ContactsEdit",
        component: () => import(/* webpackChunkName: "contacts" */ "../views/contactsApp/CreateEditContact.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const currentUser = localStorage.getItem("user")
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) router.replace({ path: "/login" })
  else if (!requiresAuth && currentUser) router.replace({ path: "/" })
  else next()
})

export default router
