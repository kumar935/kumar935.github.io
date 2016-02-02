import 'babelify/polyfill';
import $ from "jquery";
import {Router} from './router';
import {home} from './modules/home/home';
import {walls} from './modules/walls/walls';

// configuration
Router.config({ mode: 'history'});

// saving the requested Url by user;
var reqPath = window.location.pathname;

/*
 * The function call corresponding to a route gets triggered when the url CHANGES.
 * So for the first time the Router.navigate() to work, I randomly assigned Router.navigate("0");
 */
Router.navigate("0");

// adding routes
Router
  .add(/walls/, walls)
  .add(home)
  .listen();

// So when user hits a url directly from the url Box, this line will navigate the page to there.
Router.navigate(reqPath);