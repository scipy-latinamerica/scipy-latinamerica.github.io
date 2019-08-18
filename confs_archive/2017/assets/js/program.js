
; (function() {
  var speakers_index = {}

  for (var i = 0; i < window.speakers.length; ++i) {
    var speaker_info = window.speakers[i]
    speakers_index[speaker_info.id] = speaker_info;
  }

  var app = angular.module('scipyla.program', ['ngSanitize', 'mdMarkdownIt']);

  app.controller('ProgramCtl', ['$scope',
    function($scope) {

      function getlang() {
        // TODO: Current language for translations
        return 'es';
      }

      $scope.speakers = window.speakers;
      $scope.getAuthor = function(id) { return speakers_index[id] }
      $scope.activities = window.activities;
      $scope.stats = (function() {
        var _stats = {}
        for (var i = 0; i < window.activities.length; ++i) {
          var act = activities[i]
          if (act['id']) {
            var idx = act.talk_format.indexOf(' (')
            var label = (idx == -1)? act.talk_format : act.talk_format.slice(0, idx)
            _stats[label] = (_stats[label] || 0) + 1
          }
        }
        var stats = []
        for (label in _stats)
          stats.push([label, _stats[label]])
        return stats
      })()
  }])
})()

