TrelloPowerUp.initialize({
  "card-detail-badges": function(t, opts) {
    return t.get("member", "private", "currentSelection").then(function(res){
      return [{
        title: "Set Priority",
        text:res || 'No priority set',
        color:res ? null: 'red',
        callback: function(t, opts) {
          return t.popup({
            title: 'Set Priority',
            items: [
              {
                text: "Nice to have",
                callback: function(t, opts) {
                  return t.getAll().then(function(res){
                    var a = {
                      currentSelection: "nice_to_have",
                      pastSelection: res.member.private.currentSelection ? res.member.private.currentSelection : 'No priority set',
                    }

                    console.log('here is a', a);

                    return t.set("member", "private", {
                      currentSelection: "nice_to_have",
                      pastSelection: res.member.private.currentSelection ? res.member.private.currentSelection : 'No priority set',
                    }).then(function(){
                      return t.getAll();
                    }).then(function(res){
                      t.set("card", "shared", {
                          nice_to_have: res.card.shared.nice_to_have ? Number(res.card.shared.nice_to_have)+1: 1,
                          [res.member.private.currentSelection]: Number(res.card.shared[res.member.private.currentSelection])-1
                      })
                    }).then(function(){
                      return t.closePopup();
                    })
                  })
                }
              },
              {
                text: "Important",
                callback: function(t, opts) {
                  return t.getAll().then(function(res){
                    return t.set("member", "private", {
                      currentSelection: "important",
                      pastSelection: res.member.private.currentSelection ? res.member.private.currentSelection : 'No priority set',
                    }).then(function(){
                      return t.getAll();
                    }).then(function(res){
                      t.set("card", "shared", {
                          nice_to_have: res.card.shared.important ? Number(res.card.shared.important)+1: 1,
                          [res.member.private.currentSelection]: Number(res.card.shared[res.member.private.currentSelection])-1
                      })
                    }).then(function(){
                      return t.closePopup();
                    })
                  })
                }
              },
              {
                text:"Critical",
                callback: function(t, opts) {
                  return t.getAll().then(function(res){
                    return t.set("member", "private", {
                      currentSelection: "critical",
                      pastSelection: res.member.private.currentSelection ? res.member.private.currentSelection : 'No priority set',
                    }).then(function(){
                      return t.getAll();
                    }).then(function(res){
                      t.set("card", "shared", {
                          nice_to_have: res.card.shared.critical ? Number(res.card.shared.critical)+1: 1,
                          [res.member.private.currentSelection]: Number(res.card.shared[res.member.private.currentSelection])-1
                      })
                    }).then(function(){
                      return t.closePopup();
                    })
                  })
                }
              }
            ]
          })
        }
      }]
    })
  },
  "card-badges": function(t, opts){
    return t.getAll().then(function(res){
      console.log('here is res',res);
      var criticaltext= res.card.shared.critical ? "Critical: "+ String(res.card.shared.critical): "0";

      console.log(criticaltext);
      return [{
        text: 'Critical:',
        color:'red',
      }]
    })
  }
});


// callback: function(t, opts) {
//   return t.getAll().then(function(res){
//     return t.set("card", "shared", {
//       nice_to_have: Number(res)+1,
//       [res.member.private.currentSelection]: Number(res.card.shared[res.member.private.currentSelection])-1
//     }).then(function(){
//       return t.getAll();
//     }).then(function(res){
//       t.set("member", "private", {
//           currentSelection: "nice_to_have",
//           pastSelection: res.member.private.currentSelection,
//       })
//     }).then(function(){
//       return t.closePopup();
//     })
//   })
// }





// TrelloPowerUp.initialize({
//   "card-detail-badges": function(t, opts) {
//     return t.set("card", "shared", {"nice_to_have":0, "important":0, "critical":0})
//     .then(function(){
//       return t.set("member", "private", { "currentSelection": "Nothing selected", "pastSelection": "Nothing Selected"})
//     })
//     .then(function(){
//       return t.get("member", "private", "currentSelection");
//     }).then(function(res){
//       return [{
//         title: "Set Priority",
//         text:res,
//         color:null,
//         callback: function(t, opts) {
//           return t.popup({
//             title: 'Set Priority',
//             items: [
//               {
//                 text: "Nice to have",
//                 callback: function(t, opts) {
//                   return t.getAll().then(function(res){
//                     return t.set("card", "shared", {
//                       nice_to_have: Number(res)+1,
//                       [res.member.private.currentSelection]: Number(res.card.shared[res.member.private.currentSelection])-1
//                     }).then(function(){
//                       return t.getAll();
//                     }).then(function(res){
//                       t.set("member", "private", {
//                           currentSelection: "nice_to_have",
//                           pastSelection: res.member.private.currentSelection,
//                       })
//                     }).then(function(){
//                       return t.closePopup();
//                     })
//                   })
//                 }
//               },
//               {
//                 text: "Important",
//                 callback: function(t, opts) {
//                   return t.getAll().then(function(res){
//                     return t.set("card", "shared", {
//                       important: Number(res)+1,
//                       [res.member.private.currentSelection]: Number(res.card.shared[res.member.private.currentSelection])-1
//                     }).then(function(){
//                       return t.getAll();
//                     }).then(function(res){
//                       t.set("member", "private", {
//                           currentSelection: "important",
//                           pastSelection: res.member.private.currentSelection,
//                       })
//                     }).then(function(){
//                       return t.closePopup();
//                     })
//                   })
//                 }
//               },
//               {
//                 text:"Critical",
//                 callback: function(t, opts) {
//                   return t.getAll().then(function(res){
//                     return t.set("card", "shared", {
//                       critical: Number(res)+1,
//                       [res.member.private.currentSelection]: Number(res.card.shared[res.member.private.currentSelection])-1
//                     }).then(function(){
//                       return t.getAll();
//                     }).then(function(res){
//                       t.set("member", "private", {
//                           currentSelection: "critical",
//                           pastSelection: res.member.private.currentSelection,
//                       })
//                     }).then(function(){
//                       return t.closePopup();
//                     })
//                   })
//                 }
//               }
//             ]
//           })
//         }
//       }]
//     })
//   }
// });
//
//
// // callback: function(t, opts) {
// //   return t.getAll().then(function(res){
// //     return t.set("card", "shared", {
// //       nice_to_have: Number(res)+1,
// //       [res.member.private.currentSelection]: Number(res.card.shared[res.member.private.currentSelection])-1
// //     }).then(function(){
// //       return t.getAll();
// //     }).then(function(res){
// //       t.set("member", "private", {
// //           currentSelection: "nice_to_have",
// //           pastSelection: res.member.private.currentSelection,
// //       })
// //     }).then(function(){
// //       return t.closePopup();
// //     })
// //   })
// // }
