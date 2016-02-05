export function walls() {
  "use strict";
import $ from "jquery";
window.jQuery = $; //rivets below can't find jQuery variable from jQuery, so I had to do this.
import _ from "underscore";
import '../../external/html2canvas/build/html2canvas.min';
import rivets from "rivets";
  function appendWallPaperTemplate(index) {
    var wallPaperTemplateString = [
      '<div class="background" id="wallpaper' + index + '">',
      '<div class="quoteBox">',
      '<div class="quoteContainer">',
      '</div></div></div>',
      '<div><a class="download gen-btn" id="download' + index + '">Download</a></div>'
    ].join("");
    $(".walls-generated").append(wallPaperTemplateString);
    return $.when();
  }

  function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
  }

  //make ["  asfd","asdf ","",""] => ["asfd","asdf"]
  function removeEmptyElements(array) {
    for (var i = 0; i < array.length; i++) {
      array[i] = array[i].trim();
      if (array[i] === "") {
        array.splice(i, 1);
      }
    }
    if (array.indexOf("") !== -1) {
      removeEmptyElements(array);
    }
    return array;
  }


  function getOriginalWidth(quote) {
    $("#dummy").find(".quoteContainer").html(quote);
    var width = $(".quoteContainer").innerWidth();
    $("#dummy").find(".quoteContainer").html("");
    return width;
  }

  function generateWallpapers(quotes){

  }


  fetch('src/modules/walls/walls.html')
    .then(template => template.text())
    .then(templateString =>
      $("body .content")
        .unbind().off()
        .html(_.template(templateString)({})))
    .then(function () {
      var quotes;
      var maxWidthBeforeLineBreak = 850;
      var light = true;
      var fontColor;


      var lightImages = [
        "data:image/svg+xml;base64,CiAgPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnPgogIAk8cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPScjMDg0NDZiJy8+CgkJPHJlY3Qgd2lkdGg9JzEwMDAlJyBoZWlnaHQ9JzEwMDAlJyBmaWxsPScjZmVmZWZlJyB0cmFuc2Zvcm09J3JvdGF0ZSgtMTApJy8+CgkJPHJlY3Qgd2lkdGg9JzEwMDAlJyBoZWlnaHQ9JzEwMDAlJyBmaWxsPScjYWZjY2UwJyB0cmFuc2Zvcm09J3JvdGF0ZSgtMjApJy8+CgkJPHJlY3Qgd2lkdGg9JzEwMDAlJyBoZWlnaHQ9JzEwMDAlJyBmaWxsPScjZmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSgtMzApJy8+CgkJPHJlY3Qgd2lkdGg9JzEwMDAlJyBoZWlnaHQ9JzEwMDAlJyBmaWxsPScjZTRlZWY1JyB0cmFuc2Zvcm09J3JvdGF0ZSgtNDApJy8+CgkJPHJlY3Qgd2lkdGg9JzEwMDAlJyBoZWlnaHQ9JzEwMDAlJyBmaWxsPScjZmZmJyB0cmFuc2Zvcm09J3JvdGF0ZSgtNTApJy8+CgkJPHJlY3Qgd2lkdGg9JzEwMDAlJyBoZWlnaHQ9JzEwMDAlJyBmaWxsPScjYWZjY2UwJyB0cmFuc2Zvcm09J3JvdGF0ZSgtNjApJy8+CgkJPHJlY3Qgd2lkdGg9JzEwMDAlJyBoZWlnaHQ9JzEwMDAlJyBmaWxsPScjZmVmZWZlJyB0cmFuc2Zvcm09J3JvdGF0ZSgtNzApJy8+CgkJPHJlY3Qgd2lkdGg9JzEwMDAlJyBoZWlnaHQ9JzEwMDAlJyBmaWxsPScjMDg0NDZiJyB0cmFuc2Zvcm09J3JvdGF0ZSgtODApJy8+CiAgPC9zdmc+",
        "data:image/svg+xml;base64,CiAgPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzgnPgogICAgPGRlZnM+CiAgICAJPHBhdHRlcm4gcGF0dGVyblVuaXRzPSd1c2VyU3BhY2VPblVzZScgaWQ9J2MnIHdpZHRoPSc0JyBoZWlnaHQ9JzgnIHg9JzAnIHk9JzAnIHZpZXdCb3g9JzAgMCA1IDEwJz4KICAgIAkJPHBhdGggZmlsbC1vcGFjaXR5PScwJyBzdHJva2U9JyNhMjc1YmInIHN0cm9rZS13aWR0aD0nLjA3JyBkPSdNLTIsMUw3LDEwTS0yLDZMNywxNU0tMiwtNEw3LDUnLz4KICAgIAk8L3BhdHRlcm4+CiAgICAJPHBhdHRlcm4gcGF0dGVyblVuaXRzPSd1c2VyU3BhY2VPblVzZScgaWQ9J2MyJyB3aWR0aD0nNCcgaGVpZ2h0PSc4JyB4PScxMDAlJyB5PScwJyB2aWV3Qm94PScwIDAgNSAxMCc+CiAgICAJCTxwYXRoIGZpbGwtb3BhY2l0eT0nMCcgc3Ryb2tlPScjYTI3NWJiJyBzdHJva2Utd2lkdGg9Jy4wNycgZD0nTTcsMUwtMiwxME03LDZMLTIsMTVNNywtNEwtMiw1Jy8+CiAgICAJPC9wYXR0ZXJuPgogICAgPC9kZWZzPgogICAgPHJlY3Qgd2lkdGg9JzUwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSd1cmwoI2MpJy8+CiAgICA8cmVjdCB4PSc1MCUnIHdpZHRoPSc1MCUnIGhlaWdodD0nMTAwJScgZmlsbD0ndXJsKCNjMiknLz4KICA8L3N2Zz4KICA="
      ];
      var repeatLight = [
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0JyBoZWlnaHQ9JzgnIHZpZXdCb3g9JzAgMCA1IDEwJz4KCTxwYXRoIGQ9J00wLDBsNSw1bC01LDVtLTEsLTZsMSwxbC0xLDFNNCwtMWw2LDZsLTYsNicgZmlsbC1vcGFjaXR5PScwJyBzdHJva2U9JyNjZWM3YzcnIHN0cm9rZS13aWR0aD0nMicvPgo8L3N2Zz4="
      ];
      var darkImages = [
        "data:image/svg+xml;base64,CiAgPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnPgogIAk8cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPScjZmZmJy8+CiAgICA8cmVjdCB3aWR0aD0nNTAwMCUnIGhlaWdodD0nMjAwMCUnIGZpbGwtb3BhY2l0eT0nMC4xNScgZmlsbD0nIzAwMCcgdHJhbnNmb3JtPSdyb3RhdGUoMCknLz4KICAgIDxyZWN0IHdpZHRoPSc1MDAwJScgaGVpZ2h0PScyMDAwJScgZmlsbC1vcGFjaXR5PScwLjE1JyBmaWxsPScjMDAwJyB0cmFuc2Zvcm09J3JvdGF0ZSg0LjUpJy8+CiAgICA8cmVjdCB3aWR0aD0nNTAwMCUnIGhlaWdodD0nMjAwMCUnIGZpbGwtb3BhY2l0eT0nMC4xNScgZmlsbD0nIzAwMCcgdHJhbnNmb3JtPSdyb3RhdGUoOSknLz4KICAgIDxyZWN0IHdpZHRoPSc1MDAwJScgaGVpZ2h0PScyMDAwJScgZmlsbC1vcGFjaXR5PScwLjE1JyBmaWxsPScjMDAwJyB0cmFuc2Zvcm09J3JvdGF0ZSgxMy41KScvPgogICAgPHJlY3Qgd2lkdGg9JzUwMDAlJyBoZWlnaHQ9JzIwMDAlJyBmaWxsLW9wYWNpdHk9JzAuMTUnIGZpbGw9JyMwMDAnIHRyYW5zZm9ybT0ncm90YXRlKDE4KScvPgogICAgPHJlY3Qgd2lkdGg9JzUwMDAlJyBoZWlnaHQ9JzIwMDAlJyBmaWxsLW9wYWNpdHk9JzAuMTUnIGZpbGw9JyMwMDAnIHRyYW5zZm9ybT0ncm90YXRlKDIyLjUpJy8+CiAgICA8cmVjdCB3aWR0aD0nNTAwMCUnIGhlaWdodD0nMjAwMCUnIGZpbGwtb3BhY2l0eT0nMC4xNScgZmlsbD0nIzAwMCcgdHJhbnNmb3JtPSdyb3RhdGUoMjcpJy8+CiAgICA8cmVjdCB3aWR0aD0nNTAwMCUnIGhlaWdodD0nMjAwMCUnIGZpbGwtb3BhY2l0eT0nMC4xNScgZmlsbD0nIzAwMCcgdHJhbnNmb3JtPSdyb3RhdGUoMzEuNSknLz4KICAgIDxyZWN0IHdpZHRoPSc1MDAwJScgaGVpZ2h0PScyMDAwJScgZmlsbC1vcGFjaXR5PScwLjE1JyBmaWxsPScjMDAwJyB0cmFuc2Zvcm09J3JvdGF0ZSgzNiknLz4KICAgIDxyZWN0IHdpZHRoPSc1MDAwJScgaGVpZ2h0PScyMDAwJScgZmlsbC1vcGFjaXR5PScwLjE1JyBmaWxsPScjMDAwJyB0cmFuc2Zvcm09J3JvdGF0ZSg0MC41KScvPgogICAgPHJlY3Qgd2lkdGg9JzUwMDAlJyBoZWlnaHQ9JzIwMDAlJyBmaWxsLW9wYWNpdHk9JzAuMTUnIGZpbGw9JyMwMDAnIHRyYW5zZm9ybT0ncm90YXRlKDQ1KScvPgogICAgPHJlY3Qgd2lkdGg9JzUwMDAlJyBoZWlnaHQ9JzIwMDAlJyBmaWxsLW9wYWNpdHk9JzAuMTUnIGZpbGw9JyMwMDAnIHRyYW5zZm9ybT0ncm90YXRlKDQ5LjUpJy8+CiAgICA8cmVjdCB3aWR0aD0nNTAwMCUnIGhlaWdodD0nMjAwMCUnIGZpbGwtb3BhY2l0eT0nMC4xNScgZmlsbD0nIzAwMCcgdHJhbnNmb3JtPSdyb3RhdGUoNTQpJy8+CiAgICA8cmVjdCB3aWR0aD0nNTAwMCUnIGhlaWdodD0nMjAwMCUnIGZpbGwtb3BhY2l0eT0nMC4xNScgZmlsbD0nIzAwMCcgdHJhbnNmb3JtPSdyb3RhdGUoNTguNSknLz4KICAgIDxyZWN0IHdpZHRoPSc1MDAwJScgaGVpZ2h0PScyMDAwJScgZmlsbC1vcGFjaXR5PScwLjE1JyBmaWxsPScjMDAwJyB0cmFuc2Zvcm09J3JvdGF0ZSg2MyknLz4KICAgIDxyZWN0IHdpZHRoPSc1MDAwJScgaGVpZ2h0PScyMDAwJScgZmlsbC1vcGFjaXR5PScwLjE1JyBmaWxsPScjMDAwJyB0cmFuc2Zvcm09J3JvdGF0ZSg2Ny41KScvPgogICAgPHJlY3Qgd2lkdGg9JzUwMDAlJyBoZWlnaHQ9JzIwMDAlJyBmaWxsLW9wYWNpdHk9JzAuMTUnIGZpbGw9JyMwMDAnIHRyYW5zZm9ybT0ncm90YXRlKDcyKScvPgogICAgPHJlY3Qgd2lkdGg9JzUwMDAlJyBoZWlnaHQ9JzIwMDAlJyBmaWxsLW9wYWNpdHk9JzAuMTUnIGZpbGw9JyMwMDAnIHRyYW5zZm9ybT0ncm90YXRlKDc2LjUpJy8+CiAgICA8cmVjdCB3aWR0aD0nNTAwMCUnIGhlaWdodD0nMjAwMCUnIGZpbGwtb3BhY2l0eT0nMC4xNScgZmlsbD0nIzAwMCcgdHJhbnNmb3JtPSdyb3RhdGUoODEpJy8+CiAgICA8cmVjdCB3aWR0aD0nNTAwMCUnIGhlaWdodD0nMjAwMCUnIGZpbGwtb3BhY2l0eT0nMC4xNScgZmlsbD0nIzAwMCcgdHJhbnNmb3JtPSdyb3RhdGUoODUuNSknLz4KICA8L3N2Zz4=",
        "data:image/svg+xml;base64,CiAgPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnPgogICAgPHJlY3Qgd2lkdGg9JzEwMDAlJyBoZWlnaHQ9JzEwMDAlJyBmaWxsPScjZmZmJy8+CiAgICA8cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPScjODA0MTA3Jy8+CiAgICA8c3ZnIHg9JzUwJScgeT0nNTAlJyBvdmVyZmxvdz0ndmlzaWJsZSc+CiAgICAgIDxyZWN0IHdpZHRoPScyMDAwJScgaGVpZ2h0PScyMDAwJScgZmlsbC1vcGFjaXR5PScwLjEnIGZpbGw9JyMwMDAnIHRyYW5zZm9ybT0ncm90YXRlKDIwKScvPgogICAgICA8cmVjdCB3aWR0aD0nMjAwMCUnIGhlaWdodD0nMjAwMCUnIGZpbGwtb3BhY2l0eT0nMC4xJyBmaWxsPScjMDAwJyB0cmFuc2Zvcm09J3JvdGF0ZSg0MCknLz4KICAgICAgPHJlY3Qgd2lkdGg9JzIwMDAlJyBoZWlnaHQ9JzIwMDAlJyBmaWxsLW9wYWNpdHk9JzAuMScgZmlsbD0nIzAwMCcgdHJhbnNmb3JtPSdyb3RhdGUoNjApJy8+CiAgICAgIDxyZWN0IHdpZHRoPScyMDAwJScgaGVpZ2h0PScyMDAwJScgZmlsbC1vcGFjaXR5PScwLjEnIGZpbGw9JyMwMDAnIHRyYW5zZm9ybT0ncm90YXRlKDgwKScvPgogICAgICA8cmVjdCB3aWR0aD0nMjAwMCUnIGhlaWdodD0nMjAwMCUnIGZpbGwtb3BhY2l0eT0nMC4xJyBmaWxsPScjMDAwJyB0cmFuc2Zvcm09J3JvdGF0ZSgxMDApJy8+CiAgICAgIDxyZWN0IHdpZHRoPScyMDAwJScgaGVpZ2h0PScyMDAwJScgZmlsbC1vcGFjaXR5PScwLjEnIGZpbGw9JyMwMDAnIHRyYW5zZm9ybT0ncm90YXRlKDEyMCknLz4KICAgICAgPHJlY3Qgd2lkdGg9JzIwMDAlJyBoZWlnaHQ9JzIwMDAlJyBmaWxsLW9wYWNpdHk9JzAuMScgZmlsbD0nIzAwMCcgdHJhbnNmb3JtPSdyb3RhdGUoMTQwKScvPgogICAgICA8cmVjdCB3aWR0aD0nMjAwMCUnIGhlaWdodD0nMjAwMCUnIGZpbGwtb3BhY2l0eT0nMC4xJyBmaWxsPScjMDAwJyB0cmFuc2Zvcm09J3JvdGF0ZSgxNjApJy8+CiAgICAgIDxyZWN0IHdpZHRoPScyMDAwJScgaGVpZ2h0PScyMDAwJScgZmlsbC1vcGFjaXR5PScwLjEnIGZpbGw9JyMwMDAnIHRyYW5zZm9ybT0ncm90YXRlKDE4MCknLz4KICAgICAgPHJlY3Qgd2lkdGg9JzIwMDAlJyBoZWlnaHQ9JzIwMDAlJyBmaWxsLW9wYWNpdHk9JzAuMScgZmlsbD0nIzAwMCcgdHJhbnNmb3JtPSdyb3RhdGUoMjAwKScvPgogICAgICA8cmVjdCB3aWR0aD0nMjAwMCUnIGhlaWdodD0nMjAwMCUnIGZpbGwtb3BhY2l0eT0nMC4xJyBmaWxsPScjMDAwJyB0cmFuc2Zvcm09J3JvdGF0ZSgyMjApJy8+CiAgICAgIDxyZWN0IHdpZHRoPScyMDAwJScgaGVpZ2h0PScyMDAwJScgZmlsbC1vcGFjaXR5PScwLjEnIGZpbGw9JyMwMDAnIHRyYW5zZm9ybT0ncm90YXRlKDI0MCknLz4KICAgICAgPHJlY3Qgd2lkdGg9JzIwMDAlJyBoZWlnaHQ9JzIwMDAlJyBmaWxsLW9wYWNpdHk9JzAuMScgZmlsbD0nIzAwMCcgdHJhbnNmb3JtPSdyb3RhdGUoMjYwKScvPgogICAgICA8cmVjdCB3aWR0aD0nMjAwMCUnIGhlaWdodD0nMjAwMCUnIGZpbGwtb3BhY2l0eT0nMC4xJyBmaWxsPScjMDAwJyB0cmFuc2Zvcm09J3JvdGF0ZSgyODApJy8+CiAgICAgIDxyZWN0IHdpZHRoPScyMDAwJScgaGVpZ2h0PScyMDAwJScgZmlsbC1vcGFjaXR5PScwLjEnIGZpbGw9JyMwMDAnIHRyYW5zZm9ybT0ncm90YXRlKDMwMCknLz4KICAgICAgPHJlY3Qgd2lkdGg9JzIwMDAlJyBoZWlnaHQ9JzIwMDAlJyBmaWxsLW9wYWNpdHk9JzAuMScgZmlsbD0nIzAwMCcgdHJhbnNmb3JtPSdyb3RhdGUoMzIwKScvPgogICAgICA8cmVjdCB3aWR0aD0nMjAwMCUnIGhlaWdodD0nMjAwMCUnIGZpbGwtb3BhY2l0eT0nMC4xJyBmaWxsPScjMDAwJyB0cmFuc2Zvcm09J3JvdGF0ZSgzNDApJy8+CiAgICAgIDxyZWN0IHdpZHRoPScyMDAwJScgaGVpZ2h0PScyMDAwJScgZmlsbC1vcGFjaXR5PScwLjEnIGZpbGw9JyMwMDAnIHRyYW5zZm9ybT0ncm90YXRlKDM2MCknLz4KCiAgICA8L3N2Zz4KICA8L3N2Zz4=",
      ];

      var images;

      quotes = [
        "There are a lot of ways to neutralise your enemy. Forgiving him is the first of all.",
        "If you run away from it, grief will chase you. Stand your ground, it will run away from you.",
        "If you always put limits on everything you do, physical or anything else,. it will spread into your work and into your life. There are no limits. There are only plateaus,. and you must not stay there, you must go beyond them. |Bruce Lee",
        "Unless you try to do something beyond. what you have already mastered you will never grow",
        "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma — which is living with the results of other people's thinking. Don't let the noise of others' opinions drown out your own inner voice. And most important, have the courage to follow your heart and intuition. They somehow already know what you truly want to become. Everything else is secondary.",
        "Roads in the mountains teach you a very important lesson in life. what seems like an END is very often just a BEND.",
        "I hated every minute of training, but I said, Don't Quit. Suffer now and live the rest of your life as champion.",
        "Have you ever seen books or courses titled. “Learn Aeronautical Engineering in 21 Days” or “Bridge Construction for Idiots”?. Of course not, yet good developers will spend just as long learning their craft. The primary difference is that development has a lower barrier to entry, and you’re less likely to hurt anyone with shoddy code. … unless your software is used to design aircraft or bridges!. ------------------ Coding is difficult ------------------. You’ll be able to create a few simple programs within days,. but you’ll need many months’ knowledge to confidently tackle a large application. Most professional jobs require several years of solid experience. Even then, you’re always learning.",
        "We all die, The goal isn't to live forever. the goal is to create something that will.",
        "We are drowning in information while starving for wisdom."
      ];

      var allQuotes = {};

      $("#generate-wallpapers").on("click", function(){

        quotes.map(function (quote, i) {

          var quoteParts = quote.split(".");

          var widthOfContainer = getOriginalWidth(quote);

          //make ["  asfd","asdf ","",""] => ["asfd","asdf"]
          quoteParts = removeEmptyElements(quoteParts);

          allQuotes[quote] = quoteParts;

          appendWallPaperTemplate(i).done(function () {

            images = light ? lightImages : darkImages;
            fontColor = light ? "#000" : "#fff";
            light = !light;

            $("#wallpaper" + i).css('background', 'url(' + images[Math.round(Math.random() * (images.length - 1 ))] + ') no-repeat center center');
            $("#wallpaper" + i).css('background-size', '150%');
            var $quoteContainer = $("#wallpaper" + i).find(".quoteContainer");
            $quoteContainer.css("color", fontColor);

            if (widthOfContainer < maxWidthBeforeLineBreak) {
              $quoteContainer.html(quote);
            } else {
              var quoteTemplate = quoteParts.map(function (part, i) {
                if (part.indexOf("|") !== -1) {
                  part = part.replace("|", "-");
                  return '<div class="quoteBy line line' + i + '">' + part + '</div><br/>';
                } else {
                  return '<div class="line line' + i + '">' + part + '</div><br/>';
                }

              });
              $quoteContainer.html(quoteTemplate);

              $quoteContainer.find(".line").each(function () {
                var width = $(this).innerWidth();
                var reqPercentWidth = (maxWidthBeforeLineBreak / width) * 100;
                $(this).not(".quoteBy").css("font-size", reqPercentWidth + "%");
              });

              html2canvas($("#wallpaper" + i), {
                onrendered: function (canvas) {
                  document.body.appendChild(canvas);
                  $(canvas).attr("id", "canvas" + i);
                  // Convert and download as image
                  $("#wallpaper" + i).replaceWith(canvas);
                  document.getElementById('download' + i).addEventListener('click', function () {
                    downloadCanvas(this, 'canvas' + i, 'test.png');
                  }, false);
                }
              });
            }

          });


        });
      });

    });

}