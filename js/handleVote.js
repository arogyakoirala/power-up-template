var t = TrelloPowerUp.iframe();

window.vote.addEventListener('submit', function(event){

  console.log(t.get('card', 'shared', 'nice_to_have'), 'Hereiswhat')
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  return t.set('member', 'shared', 'vote', window.votePriority.value)
  .then(function(){
  }).then(function(){
    return t.get('card', 'shared', window.votePriority.value)
  }).then(function(res){
    console.log(res, 'Myresponse');
    return t.set('card', 'shared', window.votePriority.value, res+1);
  }).then(function(){
    t.closePopup();
  });
});

t.render(function(){
  t.sizeTo('#vote').done();
});
