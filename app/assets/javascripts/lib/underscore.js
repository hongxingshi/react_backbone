define('lib/underscore', function (require) {
  var _ = window._;
  _.templateSettings = {
    evaluate: /\{\{(.+?)\}\}/g,
    interpolate: /\{\{=(.+?)\}\}/g,
    escape: /\{\{-(.+?)\}\}/g
  };

  return _.noConflict();
});
