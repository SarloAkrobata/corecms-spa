import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import axios from "axios";

Vue.use(Router);
const router =  new Router({
  base: '/',
  mode: 'hash',
  linkActiveClass: 'active',
  routes: paths
});
// router gards
router.beforeEach((to, from, next) => {
  NProgress.start();
  isValid().then(function (valid) {
    const publicPages = ["/login", "/register"];
    const authRequired = !publicPages.includes(to.path);

    if (authRequired && !valid) {
      return next("/login");
    }
    if (!authRequired && valid) {
      return next("/dashboard");
    }
    return next();
  });
});

router.afterEach((to, from) => {
  NProgress.done();
});

export default router;

function isValid() {
  return axios({
    method: "get",
    url: "http://corecms.test/public/api/services/validate",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    }
  })
    .then(function() {
      return true;
    })
    .catch(function() {
      return false;
    });
}