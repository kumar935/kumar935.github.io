import 'babelify/polyfill';
import $ from "jquery";
import _ from "underscore";
import {Router} from './modules/router/router';
import {nav} from './modules/nav/nav';
import {home} from './modules/home/home';
import {walls} from './modules/walls/walls';

//override underscore template settings
_.templateSettings.interpolate = /\{\{(.+?)\}\}/g;
_.templateSettings.evaluate = /<!--([\s\S]+?)-->/g;
_.templateSettings.escape = /\{\{-(.+?)\}\}/g;

//load Nav Bar
nav();

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
  .add(walls)
  .listen();

// So when user hits a url directly from the url Box, this line will navigate the page to there.
Router.navigate(reqPath);

window.$ = $;