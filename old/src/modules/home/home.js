export function home(){
  "use strict";
  import $ from "jquery";

  var self = this;
  self.$$ = $("<div module='home'></div>");
  $("body .content")
    .unbind().off()
    .html(self.$$);

  self.$$.html('<img class="fadein" src="../../src/img/Arsenal.png"/>');
}