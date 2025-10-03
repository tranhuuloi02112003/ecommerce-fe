const routes = {
  home: "/",
  login: "/login",
  signUp: "/sign-up",
  cart: "/cart",
  wishlist: "/wishlist",
  notFound: "*",
  productDetail: "/product/:id",
  search: "/search",
  category: "/category/:categoryId",
  accountProfile: "/account/profile",
  ADMIN_HOME: "/admin",
  ADMIN_ORDERS: "/admin/orders",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_ADD_PRODUCT: "/admin/products/add",
  ADMIN_EDIT_PRODUCT: "/admin/products/edit/:id",
};

export default routes;
