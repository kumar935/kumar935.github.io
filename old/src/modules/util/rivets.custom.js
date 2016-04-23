export function rivetsCustom() {
  "use strict";
import $ from "jquery";
import _ from "underscore";
import rivets from "rivets";


  rivets.binders.tshow = function(el, value) {
    el.style.display = value === true ? "" : "none";
    el.style.opacity = value === true ? 1 : 0;
  };
  rivets.binders.thide = function(el, value) {
    el.style.display = value === true ? "none" : "";
    el.style.opacity = value === true ? 0 : 1;
  };

}