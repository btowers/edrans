const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("src/pages/products/ProductList.vue"),
        meta: {
          requiresAuth: false,
        },
      },

      {
        path: "cart",
        name: "CartPage",
        component: () => import("src/pages/Cart.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "profile",
        name: "ProfilePage",
        component: () => import("src/pages/UserProfile.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/product",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: ":id",
        name: "ProductDetailPage",
        component: () => import("src/pages/products/ProductDetail.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "new",
        name: "ProductNewPage",
        component: () => import("src/pages/products/ProductNew.vue"),
        meta: {
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      {
        path: "edit/:id",
        name: "ProductEditPage",
        component: () => import("src/pages/products/ProductEdit.vue"),
        meta: {
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("src/layouts/CleanLayout.vue"),
    children: [
      {
        path: "",
        name: "LoginPage",
        component: () => import("src/pages/Login.vue"),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "/register",
    component: () => import("src/layouts/CleanLayout.vue"),
    children: [
      {
        path: "",
        name: "RegisterPage",
        component: () => import("src/pages/Register.vue"),
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
