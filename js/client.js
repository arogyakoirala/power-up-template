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
                text: 'nth',
                callback: function(t, opts){
                  return t.set('member', 'private', {'selection': 'nth'})
                  .then(function(){
                    return t.getAll()
                  })
                  .then(function(allValues){
                    t.set('card', 'shared', {
                      nth: (allValues.card && allValues.card.shared.nth) ? allValues.member.private.selection === "nth" ? allValues.card.shared.nth: allValues.card.shared.nth+1: 1,
                      imp: (allValues.card && allValues.card.shared.imp) ? allValues.card.shared.imp-1: 0,
                      cri: (allValues.card && allValues.card.shared.cri) ? allValues.card.shared.cri-1: 0,
                    })
                  }).then(function(){
                    t.closePopup();
                  })
                }
              },
              {
                text: 'imp',
                callback: function(t, opts){
                  return t.set('member', 'private', {'selection': 'imp'})
                  .then(function(){
                    return t.getAll()
                  })
                  .then(function(allValues){
                    t.set('card', 'shared', {
                      nth: (allValues.card && allValues.card.shared.nth) ? allValues.card.shared.nth-1: 0,
                      imp: (allValues.card && allValues.card.shared.imp) ? allValues.card.shared.imp+1: 1,
                      cri: (allValues.card && allValues.card.shared.cri) ? allValues.card.shared.cri-1: 0,
                    })
                  }).then(function(){
                    t.closePopup();
                  })
                }
              },
              {
                text: 'cri',
                callback: function(t, opts){
                  return t.set('member', 'private', {'selection': 'cri'})
                  .then(function(){
                    return t.getAll()
                  })
                  .then(function(allValues){
                    t.set('card', 'shared', {
                      nth: (allValues.card && allValues.card.shared.nth) ? allValues.card.shared.nth-1: 0,
                      imp: (allValues.card && allValues.card.shared.imp) ? allValues.card.shared.imp-1: 0,
                      cri: (allValues.card && allValues.card.shared.cri) ? allValues.card.shared.cri+1: 1,
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
                    t.set('card', 'shared', {
                      nth: (allValues.card && allValues.card.shared.nth) ? allValues.card.shared.nth-1: 0,
                      imp: (allValues.card && allValues.card.shared.imp) ? allValues.card.shared.imp-1: 0,
                      cri: (allValues.card && allValues.card.shared.cri) ? allValues.card.shared.cri-1: 0,
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
        var nthtext= (allValues.card && allValues.card.shared.nth) ? "L: "+ String(allValues.card.shared.nth): "L: 0";
        var imptext= (allValues.card && allValues.card.shared.imp )? "M: "+ String(allValues.card.shared.imp): "M: 0";
        var criticaltext= (allValues.card && allValues.card.shared.cri) ? "H: "+ String(allValues.card.shared.cri): "H: 0";

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






//
//
// TrelloPowerUp.initialize({
//   'card-detail-badges': function(t, opts) {
//     return t.get('member', 'private', 'selection').then(function(selection){
//       return [{
//         title: 'How important is this?',
//         text: selection || 'unspecified',
//         callback: function(t, opts) {
//           return t.popup({
//             title: 'How important is this to you?',
//             items: [
//               {
//                 text: 'High',
//                 callback: function(t, opts){}
//               },
//               {
//                 text: 'Medium',
//                 callback: function(t, opts){}
//               },
//               {
//                 text: 'Low',
//                 callback: function(t, opts){}
//               },
//             ]
//           })
//         }
//
//       }]
//     })
//   }
// })



//
// TrelloPowerUp.initialize({
//   "card-detail-badges": function(t, opts) {
//     return t.get("member", "private", "currentSelection").then(function(res){
//       return [{
//         title: "Set Priority",
//         text:res || 'No priority set',
//         color:res ? null: 'red',
//         callback: function(t, opts) {
//           return t.popup({
//             title: 'Set Priority',
//             items: [
//               {
//                 text: "Nice to have",
//                 callback: function(t, opts) {
//                   return t.getAll().then(function(res){
//                     return t.set("card", "shared", {
//                       [res.member.private.currentSelection]: Number(res.card.shared[res.member.private.currentSelection])-1,
//                       nice_to_have: (res.card && res.card.shared.nice_to_have && res.card.shared.nice_to_have > 0) ? Number(res.card.shared.nice_to_have)+1: 1,
//                     }).then(function(){
//                       return t.getAll();
//                     }).then(function(res){
//                       t.set("member", "private", {
//                         currentSelection: "nice_to_have",
//                         pastSelection: res.member.private.currentSelection ? res.member.private.currentSelection : 'No priority set',
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
//                       [res.member.private.currentSelection]: Number(res.card.shared[res.member.private.currentSelection])-1,
//                       important: (res.card && res.card.shared.important&&res.card.shared.important>0) ? Number(res.card.shared.important)+1: 1,
//                     }).then(function(){
//                       return t.getAll();
//                     }).then(function(res){
//                       t.set("member", "private", {
//                         currentSelection: "important",
//                         pastSelection: res.member.private.currentSelection ? res.member.private.currentSelection : 'No priority set',
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
//                       [res.member.private.currentSelection]: Number(res.card.shared[res.member.private.currentSelection])-1,
//                       critical: (res.card && res.card.shared.critical&& res.card.shared.critical>0) ? Number(res.card.shared.critical)+1: 1,
//                     }).then(function(){
//                       return t.getAll();
//                     }).then(function(res){
//                       t.set("member", "private", {
//                         currentSelection: "critical",
//                         pastSelection: res.member.private.currentSelection ? res.member.private.currentSelection : 'No priority set',
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
//   },
//   "card-badges": function(t, opts){
//     return t.getAll().then(function(res){
//       var nthtext= (res.card && res.card.shared.nice_to_have) ? "L: "+ String(res.card.shared.nice_to_have): "L: 0";
//       var imptext= (res.card && res.card.shared.important )? "M: "+ String(res.card.shared.important): "M: 0";
//       var criticaltext= (res.card && res.card.shared.critical) ? "H: "+ String(res.card.shared.critical): "H: 0";
//
//       return [
//         {
//           text: nthtext,
//           color:'yellow',
//         },
//         {
//           text: imptext,
//           color:'green',
//         },
//         {
//           text: criticaltext,
//           color:'red',
//         },
//     ]
//     })
//   }
// });


// callback: function(t, opts) {
//   return t.getAll().then(function(res){
//     return t.set("card", "shared", {
//       nice_to_have: Number(res)+1,
//       [res.member.private.currentSelection]: Number(res.card.shared[res.member.private.currentSelection])-1,
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
//                       [res.member.private.currentSelection]: Number(res.card.shared[res.member.private.currentSelection])-1,
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
//                       [res.member.private.currentSelection]: Number(res.card.shared[res.member.private.currentSelection])-1,
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
//                       [res.member.private.currentSelection]: Number(res.card.shared[res.member.private.currentSelection])-1,
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
// //       [res.member.private.currentSelection]: Number(res.card.shared[res.member.private.currentSelection])-1,
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
