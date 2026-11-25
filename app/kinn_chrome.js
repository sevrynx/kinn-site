// Called by the app (lib/app/web_chrome) whenever its theme changes: paints
// the strips around the app and the browser's theme color, so the status bar
// of an installed web app matches the screen below it.
//
// iOS picks the status bar color when the web app launches, before Flutter
// has started, so the last colors are saved and applied straight away on
// the next launch (the app's own theme setting, not only the phone's).
(function () {
  var KEY = 'kinn.chrome';

  function apply(top, bottom) {
    var root = document.documentElement.style;
    root.setProperty('--kinn-top', top);
    root.setProperty('--kinn-bottom', bottom);
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) metas[i].setAttribute('content', top);
  }

  function isColor(v) {
    return typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v);
  }

  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved && isColor(saved.top) && isColor(saved.bottom)) {
      apply(saved.top, saved.bottom);
    }
  } catch (e) {
    // No storage (private mode) or bad data: keep the CSS defaults.
  }

  window.kinnSetChrome = function (top, bottom) {
    apply(top, bottom);
    try {
      localStorage.setItem(KEY, JSON.stringify({ top: top, bottom: bottom }));
    } catch (e) {
      // Storage unavailable: colors still apply for this session.
    }
  };
})();
