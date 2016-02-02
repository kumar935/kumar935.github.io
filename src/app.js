import 'babelify/polyfill';
import $ from 'jquery';
import {Router} from './router';

// configuration
Router.config({ mode: 'history'});

// saving the requested Url by user;
var reqPath = window.location.pathname;

// returning the user to the initial state
// So
Router.navigate("0");

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

// So when user hits a url directly from the url Box, this line will navigate the page to there.
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