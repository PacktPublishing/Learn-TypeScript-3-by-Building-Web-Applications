import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Lyrics from '@/views/Lyrics.vue';

export const ROUTES = {
  HOME: 'home',
  LYRICS: 'lyrics',
};

export const router = new VueRouter({
  mode: 'history',
  base: '', // useful for sub-domains
  routes: [
    { path: '/', component: Home },
    { path: `/${ROUTES.HOME}`, component: Home, name: ROUTES.HOME },
    { path: `/${ROUTES.LYRICS}`, component: Lyrics, name: ROUTES.LYRICS, props: true },
    { path: '*', redirect: '/' },
  ],
});
