// The web app used to live at the site root and moved to /app/. Sign-up and
// password-reset emails sent before the move, and old bookmarks, still point
// here: forward them, keeping the auth code or token in the URL.
(function () {
  var hash = location.hash;
  var search = location.search;
  var legacy =
    hash.indexOf('#/') === 0 ||
    hash.indexOf('access_token=') !== -1 ||
    hash.indexOf('error_description=') !== -1 ||
    /[?&]code=/.test(search);
  if (legacy) location.replace('/app/' + search + hash);
})();
