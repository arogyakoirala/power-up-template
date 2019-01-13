var t = TrelloPowerUp.iframe();

window.vote.addEventListener('submit', function(event){

  console.log(t.get(('card', 'shared', 'nice_to_have'))
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  return t.set('member', 'shared', 'vote', window.votePriority.value)
  .then(function(){
    console.log('value set to ', window.votePriority.value);
    return t.set('card', 'shared', window.votePriority.value, t.get('card', 'shared', window.votePriority.value)+1);
  }).then(function(){
    t.closePopup();
  });
});

t.render(function(){
  t.sizeTo('#vote').done();
});
