var textMapper = {
  nth: 'Nice to have',
  imp: 'Important',
  cri: 'Critical',
  unspecified: 'Unspecified'

}

TrelloPowerUp.initialize({
  'card-detail-badges': function(t, opts) {
    return t.get('member', 'private', 'selection').then(function(selection){
      return [{
        title: 'How important is this?',
        text: textMapper[selection] || 'unspecified',
        callback: function(t, opts) {
          return t.popup({
            title: 'How important is this to you?',
            items: [
              {
                text: 'Nice to have',
                callback: function(t, opts){
                  return t.set('member', 'private', {'selection': 'nth'})
                  .then(function(){
                    return t.getAll()
                  })
                  .then(function(allValues){
                    return t.set('card', 'private', {
                      nth: 1,
                      imp: 0,
                      cri: 0,
                    })
                  }).then(function(){
                    return t.getAll()
                  }).then(function(allValues){
                    return t.set('card', 'shared', {
                      nth: (allValues.card && allValues.card.shared && allValues.card.shared.nth) ? allValues.member.private.selection === "nth" ? allValues.card.shared.nth: allValues.card.shared.nth + allValues.card.private.nth : 1,
                      imp: (allValues.card && allValues.card.shared && allValues.card.shared.imp) ? allValues.card.shared.imp  : 0,
                      cri: (allValues.card && allValues.card.shared && allValues.card.shared.cri) ? allValues.card.shared.cri : 0,

                    })
                  }).then(function(){
                    t.closePopup();
                  })
                }
              },
              {
                text: 'Important',
                callback: function(t, opts){
                  return t.set('member', 'private', {'selection': 'imp'})
                  .then(function(){
                    return t.getAll()
                  })
                  .then(function(allValues){
                    return t.set('card', 'private', {
                      nth:  0,
                      imp: 1,
                      cri: 0,
                    })
                  }).then(function(){
                    return t.getAll()
                  }).then(function(allValues){
                    return t.set('card', 'shared', {
                      imp: (allValues.card && allValues.card.shared && allValues.card.shared.nth) ? allValues.card.shared.nth : 0,
                      nth: (allValues.card && allValues.card.shared && allValues.card.shared.imp) ? allValues.member.private.selection === "imp" ? allValues.card.shared.imp: allValues.card.shared.imp + allValues.card.private.imp : 1,
                      cri: (allValues.card && allValues.card.shared && allValues.card.shared.cri) ? allValues.card.shared.cri : 0,

                    })
                  }).then(function(){
                    t.closePopup();
                  })
                }
              },
              {
                text: 'Critical',
                callback: function(t, opts){
                  return t.set('member', 'private', {'selection': 'cri'})
                  .then(function(){
                    return t.getAll()
                  })
                  .then(function(allValues){
                    return t.set('card', 'private', {
                      nth: 0,
                      imp: 0,
                      cri: 1,
                    })
                  }).then(function(){
                    return t.getAll()
                  }).then(function(allValues){
                    return t.set('card', 'shared', {
                      cri: (allValues.card && allValues.card.shared && allValues.card.shared.nth) ? allValues.card.shared.nth: 0,
                      imp: (allValues.card && allValues.card.shared && allValues.card.shared.imp) ? allValues.card.shared.imp: 0,
                      nth: (allValues.card && allValues.card.shared && allValues.card.shared.cri) ? allValues.member.private.selection === "cri" ? allValues.card.shared.cri: allValues.card.shared.cri + allValues.card.private.cri : 1,

                    })
                  }).then(function(){
                    t.closePopup();
                  })
                }
              },
              {
                text: 'unspecified',
                callback: function(t, opts){
                  return t.set('member', 'private', {'selection': 'unspecified'})
                  .then(function(){
                    return t.getAll()
                  })
                  .then(function(allValues){
                    return t.set('card', 'private', {
                      nth: 0,
                      imp: 0,
                      cri: 0,
                    })
                  }).then(function(){
                    return t.getAll()
                  }).then(function(allValues){
                    return t.set('card', 'shared', {
                      cri: (allValues.card && allValues.card.shared && allValues.card.shared.nth) ? allValues.card.shared.nth : 0,
                      imp: (allValues.card && allValues.card.shared && allValues.card.shared.imp) ? allValues.card.shared.imp : 0,
                      nth: (allValues.card && allValues.card.shared && allValues.card.shared.cri) ? allValues.card.shared.cri : 0,

                    })
                  }).then(function(){
                    t.closePopup();
                  })
                }
              },
            ]
          })
        }

      }]
    })
  },
    "card-badges": function(t, opts){
      return t.getAll().then(function(allValues){
        console.log(allValues);
        var nthtext= (allValues.card && allValues.card.shared && allValues.card.shared.nth) ? "Nice to have: "+ String(allValues.card.shared.nth): "Nice to have: 0";
        var imptext= (allValues.card && allValues.card.shared && allValues.card.shared.imp )? "Important: "+ String(allValues.card.shared.imp): "Important: 0";
        var criticaltext= (allValues.card && allValues.card.shared && allValues.card.shared.cri) ? "Critical: "+ String(allValues.card.shared.cri): "Critical: 0";

        return [
          {
            text: nthtext,
            color:'yellow',
          },
          {
            text: imptext,
            color:'green',
          },
          {
            text: criticaltext,
            color:'red',
          },
      ]
      })
    }
})
