import 'babelify/polyfill';
import $ from 'jquery';
import {Router} from './router';

// configuration
Router.config({ mode: 'history'});

// saving the requested Url by user;
var reqPath = window.location.pathname;

// returning the user to the initial state
Router.navigate();

// adding routes
Router
  .add(/about/, function() {
    console.log('about');
  })
  .add(/products\/(.*)\/edit\/(.*)/, function() {
    console.log('products', arguments);
  })
  .add(function() {
    console.log('default');
  })
  .listen();

console.log("*****", Router.routes);
// forwarding
Router.navigate(reqPath);

$(
  function(){
    $('#url').on("keyup", function(e,target,value){
      if(e.which === 13){
        Router.navigate($("#url").val());
      }
    });
  }
);