export function nav() {
  "use strict";
import $ from "jquery";
import _ from "underscore";
  fetch('src/modules/nav/nav.html')
    .then(template => template.text())
    .then(function (templateString) {
      $(".navigation").html(_.template(templateString)({name: "yo"}));
    });
}