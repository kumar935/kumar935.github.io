export function nav() {
  "use strict";
import $ from "jquery";
import _ from "underscore";
import {Router} from '../router/router';

  function softRedirect(e,target,data){
    var $navitem = $(this);
    $navitem
      .addClass("active")
      .siblings().removeClass("active");
    var url = $navitem.attr("route");
    Router.navigate(url);
  }

  function navItemSetActive(){
    var url = "/" + window.location.pathname.split("/")[1];
    $("[route='"+ url +"']").addClass("active");
  }

  fetch('src/modules/nav/nav.html')
    .then(template => template.text())
    .then(templateString => $(".nav").html(_.template(templateString)({})))
    .then(function(){
      navItemSetActive();
      $("navitem").on("click", softRedirect);
    });

}