import "babelify/polyfill";
import $ from 'jquery';

console.log("hello world");

$(
  function(){
    $("body").append("<h5>Helloo world.</h5>");
  }
);
