import 'babelify/polyfill';
import $ from "jquery";
import {Router} from './router';
import {home} from './home/home';
import {walls} from './walls/walls';

// configuration
Router.config({ mode: 'history'});

// saving the requested Url by user;
var reqPath = window.location.pathname;

// returning the user to the initial state
// So
Router.navigate("0");

// adding routes
Router
  .add(/walls/, walls)
  .add(home)
  .listen();

// So when user hits a url directly from the url Box, this line will navigate the page to there.
Router.navigate(reqPath);