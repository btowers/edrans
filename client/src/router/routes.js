const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("pages/Home.vue"),
        meta: {
          requiresAuth: false,
        },
        children: [
          {
            path: "",
            name: "ProductList",
            component: () => import("components/products/ProductList.vue"),
            meta: {
              requiresAuth: false,
            },
          },

          {
            path: "cart",
            name: "CartPage",
            component: () => import("components/Cart.vue"),
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "profile",
            name: "ProfilePage",
            component: () => import("components/Profile.vue"),
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "product/:id",
            name: "ProductDetail",
            component: () => import("components/products/ProductDetail.vue"),
            meta: {
              requiresAuth: false,
            },
          },
          {
            path: "product/new",
            name: "ProductNew",
            component: () => import("components/products/ProductNew.vue"),
            meta: {
              requiresAuth: true,
              requiresAdmin: true,
            },
          },
          {
            path: "product/edit/:id",
            name: "ProductEdit",
            component: () => import("components/products/ProductEdit.vue"),
            meta: {
              requiresAuth: true,
              requiresAdmin: true,
            },
          },
        ],
      },
    ],
  },

  {
    path: "/login",
    component: () => import("layouts/CleanLayout.vue"),
    children: [
      {
        path: "",
        name: "LoginPage",
        component: () => import("pages/Login.vue"),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "/register",
    component: () => import("layouts/CleanLayout.vue"),
    children: [
      {
        path: "",
        name: "RegisterPage",
        component: () => import("pages/Register.vue"),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
