TrelloPowerUp.initialize({
  "card-detail-badges": function(t, opts) {
    return t.set("card", "shared", {currentSelection: "none", pastSelection: "none","nice_to_have":0, "important":0, "critical":0})
    .then(function(){
      return t.get("card", "shared", "currentSelection");
    }).then(function(res){
      return [{
        title: "Set Priority",
        text:res,
        color:null,
        callback: function(t, opts) {
          return t.popup({
              title: "Set priority",
              items: [{
                text: "Nice to have",
                callback: function (t, opts) {
                  return t.getAll().then(function(res){
                    t.set("card", "shared", {
                      currentSelection:"nice_to_have",
                      pastSelection: res.card.shared.currentSelection,
                      nice_to_have: Number(res)+1,
                      [res.card.shared.currentSelection]: Number(res.card.shared.currentSelection)-1
                    }
                  ).then(function(){
                      t.closePopup();
                    })
                  })
                }
              }, {
                text: "Important",
                callback: function (t, opts) {
                  return t.getAll().then(function(res){
                    t.set("card", "shared", {
                      currentSelection:"important",
                      pastSelection: res.card.shared.currentSelection,
                      important: Number(res)+1,
                      [res.card.shared.currentSelection]: Number(res.card.shared.currentSelection)-1
                    }
                  ).then(function(){
                      t.closePopup();
                    })
                  })

                }
              }, {
                text: "Critical",
                callback: function (t, opts) {
                  return t.getAll().then(function(res){
                    t.set("card", "shared", {
                      currentSelection:"critical",
                      pastSelection: res.card.shared.currentSelection,
                      critical: Number(res)+1,
                      [res.card.shared.currentSelection]: Number(res.card.shared.currentSelection)-1
                    }
                  ).then(function(){
                      t.closePopup();
                    })
                  })
                }
              }]
            });
        }
      }]
    })
  }

})
