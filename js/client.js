var textMapper = {
  nth: 'Nice to have',
  imp: 'Important',
  cri: 'Critical',

}

TrelloPowerUp.initialize({
  'card-detail-badges': function(t, opts) {
    return t.get('member', 'private', 'selection').then(function(selection){
      return [{
        title: 'How important is this?',
        text: selection || 'unspecified',
        callback: function(t, opts) {
          return t.popup({
            title: 'How important is this to you?',
            items: [
              {
                text: textMapper['nth'],
                callback: function(t, opts){
                  return t.set('member', 'private', {'selection': 'nth'})
                  .then(function(){
                    return t.getAll()
                  })
                  .then(function(allValues){
                    return t.set('card', 'private', {
                      nth: (allValues.card && allValues.card.private && allValues.card.private.nth) ? allValues.member.private.selection === "nth" ? allValues.card.private.nth: allValues.card.private.nth+1: 1,
                      imp: (allValues.card && allValues.card.private && allValues.card.private.imp) ? allValues.card.private.imp-1: 0,
                      cri: (allValues.card && allValues.card.private && allValues.card.private.cri) ? allValues.card.private.cri-1: 0,
                    })
                  }).then(function(){
                    return t.getAll()
                  }).then(function(allValues){
                    return t.set('card', 'shared', {
                      nth: (allValues.card && allValues.card.shared.nth) ? allValues.member.private.selection === "nth" ? allValues.card.shared.nth: allValues.card.shared.nth + allValues.card.private.nth : 1,
                      imp: (allValues.card && allValues.card.shared.imp) ? allValues.card.shared.imp + allValues.card.private.imp : 0,
                      cri: (allValues.card && allValues.card.shared.cri) ? allValues.card.shared.cri + allValues.card.private.cri : 0,

                    })
                  }).then(function(){
                    t.closePopup();
                  })
                }
              },
              {
                text: textMapper['imp'],
                callback: function(t, opts){
                  return t.set('member', 'private', {'selection': 'imp'})
                  .then(function(){
                    return t.getAll()
                  })
                  .then(function(allValues){
                    return t.set('card', 'private', {
                      nth: (allValues.card && allValues.card.private && allValues.card.private.nth) ? allValues.card.private.nth-1: 0,
                      imp: (allValues.card && allValues.card.private && allValues.card.private.imp) ? allValues.member.private.selection === "imp" ? allValues.card.private.imp: allValues.card.private.imp+1: 1,
                      cri: (allValues.card && allValues.card.private && allValues.card.private.cri) ? allValues.card.private.cri-1: 0,
                    })
                  }).then(function(){
                    return t.getAll()
                  }).then(function(allValues){
                    return t.set('card', 'shared', {
                      imp: (allValues.card && allValues.card.shared.nth) ? allValues.card.shared.nth + allValues.card.private.nth : 0,
                      nth: (allValues.card && allValues.card.shared.imp) ? allValues.member.private.selection === "imp" ? allValues.card.shared.imp: allValues.card.shared.imp + allValues.card.private.imp : 1,
                      cri: (allValues.card && allValues.card.shared.cri) ? allValues.card.shared.cri + allValues.card.private.cri : 0,

                    })
                  }).then(function(){
                    t.closePopup();
                  })
                }
              },
              {
                text: textMapper['cri'],
                callback: function(t, opts){
                  return t.set('member', 'private', {'selection': 'cri'})
                  .then(function(){
                    return t.getAll()
                  })
                  .then(function(allValues){
                    return t.set('card', 'private', {
                      nth: (allValues.card && allValues.card.private && allValues.card.private.nth) ? allValues.card.private.nth-1: 0,
                      imp: (allValues.card && allValues.card.private && allValues.card.private.imp) ? allValues.card.private.imp-1: 0,
                      cri: (allValues.card && allValues.card.private && allValues.card.private.cri) ? allValues.member.private.selection === "cri" ? allValues.card.private.cri: allValues.card.private.cri+1: 1,
                    })
                  }).then(function(){
                    return t.getAll()
                  }).then(function(allValues){
                    return t.set('card', 'shared', {
                      cri: (allValues.card && allValues.card.shared.nth) ? allValues.card.shared.nth + allValues.card.private.nth : 0,
                      imp: (allValues.card && allValues.card.shared.imp) ? allValues.card.shared.imp + allValues.card.private.imp : 0,
                      nth: (allValues.card && allValues.card.shared.cri) ? allValues.member.private.selection === "cri" ? allValues.card.shared.cri: allValues.card.shared.cri + allValues.card.private.cri : 1,

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
                      nth: (allValues.card && allValues.card.private && allValues.card.private.nth) ? allValues.card.private.nth-1: 0,
                      imp: (allValues.card && allValues.card.private && allValues.card.private.imp) ? allValues.card.private.imp-1: 0,
                      cri: (allValues.card && allValues.card.private && allValues.card.private.cri) ? allValues.card.private.cri-1: 0,
                    })
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
        var nthtext= (allValues.card && allValues.card.private && allValues.card.private.nth) ? "Nice to have: "+ String(allValues.card.private.nth): "Nice to have: 0";
        var imptext= (allValues.card && allValues.card.private && allValues.card.private.imp )? "Important: "+ String(allValues.card.private.imp): "Important: 0";
        var criticaltext= (allValues.card && allValues.card.private && allValues.card.private.cri) ? "Critical: "+ String(allValues.card.private.cri): "Critical: 0";

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
