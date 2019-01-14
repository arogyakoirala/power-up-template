TrelloPowerUp.initialize({
  'card-detail-badges': function(t, opts) {
    return t.set('card', 'shared', {currentSelection: 'none', pastSelection: 'none','nice_to_have':0, 'important':0, 'critical':0})
    .then(function(){
      return t.get('card', 'shared', 'currentSelection')
    }).then(function(res){
      return [{
        title: 'Set Priority',
        text:'tests',
        color:null
      }]
    })
  }

})
