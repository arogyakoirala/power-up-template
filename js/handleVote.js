var t = TrelloPowerUp.iframe();

window.vote.addEventListener('submit', function(event){

  event.preventDefault;

  return t.set('card', 'shared',{nice_to_have:0, important:0, critical:0})
  .then(function(){
    console.log('promise1')
    t.getAll()
  }).then(function(res){})
  .then(function(){
    return t.set('member', 'shared', 'vote', window.votePriority.value)
  }).then(function(){
    return t.getAll()
  })
  .then(function(res){
    return t.set('card', 'shared', window.votePriority.value, Number(res.card.shared[window.votePriority.value])+1);
  })
  .then(function(){
    t.closePopup();
  })

  // Stop the browser trying to submit the form itself.
//   event.preventDefault();
//   return t.set('member', 'shared', 'vote', window.votePriority.value)
//   .then(function(){
//     t.set('card', 'shared', {nice_to_have:0, important:0, critical:0})
//   }).then(function(){
//     return t.getAll()
//   }).then(function(res){
//     console.log('Myserponse, ', res.card.shared[window.votePriority.value],Number(res.card.shared[window.votePriority.value]) );
//     return t.set('card', 'shared', window.votePriority.value, Number(res.card.shared[window.votePriority.value])+1);
//   }).then(function(){
//     return t.getAll();
//   }).then(function(res){
// //example
//   }).then(function(){
//     t.closePopup();
//
//   });
});

t.render(function(){
  t.sizeTo('#vote').done();
});
