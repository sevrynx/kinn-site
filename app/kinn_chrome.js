// Called by the app (lib/app/web_chrome) whenever its theme changes: paints
// the strips around the app and the browser's theme color, so the status bar
// of an installed web app matches the screen below it.
window.kinnSetChrome = function (top, bottom) {
  var root = document.documentElement.style;
  root.setProperty('--kinn-top', top);
  root.setProperty('--kinn-bottom', bottom);
  var metas = document.querySelectorAll('meta[name="theme-color"]');
  for (var i = 0; i < metas.length; i++) metas[i].setAttribute('content', top);
};
