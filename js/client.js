var textMapper = {
  nth: 'Nice to have',
  imp: 'Important',
  cri: 'Critical',
  unspecified: 'Unspecified'

}


TrelloPowerUp.initialize({
  'card-detail-badges': function(t, opts) {
    return t.get('card', 'private', 'selected').then(function(selected){
      return [{
        title: 'How important is this feature?',
        text: textMapper[selected] || textMapper.unspecified,
        callback: function(t, opts) {
          return t.popup({
            title: 'Choose an option',
            items:[
              {
                text: textMapper.nth,
                callback: function(t,opts){
                  return t.set('card', 'private', {
                    selected: 'nth',
                  })
                  .then(function(){
                    return t.member('id')
                  })
                  .then(function(res){
                    return t.set('card', 'private', {
                      memberId: res.id
                    })
                  })
                  .then(function(){
                    return t.getAll();
                  })
                  .then(function(data){
                    return t.set('card', 'shared', {})
                  })
                  .then(function(){
                    return t.getAll();
                  })
                  .then(function(data){
                    var myArray = [];

                    var isNew = !data.card.shared.votingMembers || (!data.card.shared.votingMembers.includes(data.card.private.memberId));
                    if(!data.card.shared.votingMembers ) {
                      myArray.push(data.card.private.memberId)
                    } else if (!data.card.shared.votingMembers.includes(data.card.private.memberId)){
                      myArray =  data.card.shared.votingMembers;
                      myArray.push(data.card.private.memberId)
                    } else {
                      myArray = data.card.shared.votingMembers
                    }

                    var hasDeductCRI = data.card.shared.hasDeductCRI ? true: false
                    var hasDeductIMP = data.card.shared.hasDeductIMP ? true: false


                    console.log(isNew, data.card.private.selected);
                    return t.set('card', 'shared', {
                      votingMembers: myArray,
                      nth: !isNew && data.card.private.selected === 'nth' ? (data.card.shared && data.card.shared.nth || 1) : data.card.shared && data.card.shared.nth + 1 || 1,
                      imp: !isNew ? ((data.card.shared.imp - 1) > 0) && data.card.shared.imp - 1 || 0 : (data.card.shared.imp),
                      cri: !isNew ? ((data.card.shared.cri - 1) > 0) && data.card.shared.cri - 1 || 0 : (data.card.shared.cri),
                      hasDeductCRI: !isNew ? true : false,
                      hasDeductIMP: !isNew ? true: false

                    })
                  })
                  .then(function(){
                    t.closePopup();
                  });
                }
            },

            {
              text: textMapper.imp,
              callback: function(t,opts){
                return t.set('card', 'private', {
                  selected: 'imp',
                })
                .then(function(){
                  return t.member('id')
                })
                .then(function(res){
                  return t.set('card', 'private', {
                    memberId: res.id
                  })
                })
                .then(function(){
                  return t.getAll();
                })
                .then(function(data){
                  return t.set('card', 'shared', {})
                })
                .then(function(){
                  return t.getAll();
                })
                .then(function(data){
                  var myArray = [];

                  var isNew = !data.card.shared.votingMembers || (!data.card.shared.votingMembers.includes(data.card.private.memberId));
                  if(!data.card.shared.votingMembers ) {
                    myArray.push(data.card.private.memberId)
                  } else if (!data.card.shared.votingMembers.includes(data.card.private.memberId)){
                    myArray =  data.card.shared.votingMembers;
                    myArray.push(data.card.private.memberId)
                  } else {
                    myArray = data.card.shared.votingMembers
                  }

                  var hasDeductNTH = data.card.shared.hasDeductNTH ? true: false
                  var hasDeductCRI = data.card.shared.hasDeductCRI ? true: false

                  console.log(isNew, data.card.private.selected, data.card.shared.nth - 1 ,data.card.shared.nth,data.card.shared && data.card.shared.nth && data.card.shared.nth - 1 || data.card.shared.nth);
                  return t.set('card', 'shared', {
                    votingMembers: myArray,
                    nth: !isNew ? ((data.card.shared.nth - 1) > 0) && data.card.shared.nth - 1 || 0 : (data.card.shared.nth),
                    imp: !isNew && data.card.private.selected === 'imp' ? (data.card.shared && data.card.shared.imp || 1) : data.card.shared && data.card.shared.imp + 1 || 1,
                    cri: !isNew ? ((data.card.shared.cri - 1) > 0) && data.card.shared.cri - 1 || 0 : (data.card.shared.cri),
                    hasDeductNTH: !isNew ? true : false,
                    hasDeductCRI: !isNew ? true: false
                    // cri: !isNew ? data.card.shared.cri - 1 : data.card.shared.cri
                  })
                })
                .then(function(){
                  t.closePopup();
                });
              }
            },



            {
              text: textMapper.cri,
              callback: function(t,opts){
                return t.set('card', 'private', {
                  selected: 'cri',
                })
                .then(function(){
                  return t.member('id')
                })
                .then(function(res){
                  return t.set('card', 'private', {
                    memberId: res.id
                  })
                })
                .then(function(){
                  return t.getAll();
                })
                .then(function(data){
                  return t.set('card', 'shared', {})
                })
                .then(function(){
                  return t.getAll();
                })
                .then(function(data){
                  var myArray = [];

                  var isNew = !data.card.shared.votingMembers || (!data.card.shared.votingMembers.includes(data.card.private.memberId));
                  if(!data.card.shared.votingMembers ) {
                    myArray.push(data.card.private.memberId)
                  } else if (!data.card.shared.votingMembers.includes(data.card.private.memberId)){
                    myArray =  data.card.shared.votingMembers;
                    myArray.push(data.card.private.memberId)
                  } else {
                    myArray = data.card.shared.votingMembers
                  }

                  var hasDeductNTH = data.card.shared.hasDeductNTH ? true: false
                  var hasDeductIMP = data.card.shared.hasDeductIMP ? true: false

                  console.log(isNew,  data.card.private.selected);
                  return t.set('card', 'shared', {
                    votingMembers: myArray,
                    nth: !isNew && !hasDeductNTH ? ((data.card.shared.nth - 1) > 0) && data.card.shared.nth - 1 || 0 : (data.card.shared.nth),
                    imp: !isNew && !hasDeductIMP ? ((data.card.shared.imp - 1) > 0) && data.card.shared.imp - 1 || 0 : (data.card.shared.imp),
                    cri: !isNew && data.card.private.selected === 'cri' ? (data.card.shared && data.card.shared.cri || 1) : data.card.shared && data.card.shared.cri + 1 || 1,
                    hasDeductNTH: !isNew ? true : false,
                    hasDeductIMP: !isNew ? true: false
                  })
                })
                .then(function(){
                  t.closePopup();
                });
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





// TrelloPowerUp.initialize({
//   'card-detail-badges': function(t, opts) {
//     return t.get('card', '')
//   }
// })




// TrelloPowerUp.initialize({
//   'card-detail-badges': function(t, opts) {
//     return t.get('member', 'private', 'selection').then(function(selection){
//       return [{
//         title: 'How important is this?',
//         text: textMapper[selection] || 'unspecified',
//         callback: function(t, opts) {
//           return t.popup({
//             title: 'How important is this to you?',
//             items: [
//               {
//                 text: 'Nice to have',
//                 callback: function(t, opts){
//                   return t.set('member', 'private', {'selection': 'nth'})
//                   .then(function(){
//                     return t.getAll()
//                   })
//                   .then(function(allValues){
//                     return t.set('card', 'private', {
//                       nth: 1,
//                       imp: 0,
//                       cri: 0,
//                     })
//                   }).then(function(){
//                     return t.getAll()
//                   }).then(function(allValues){
//                     return t.set('card', 'shared', {
//                       nth: (allValues.card && allValues.card.shared && allValues.card.shared.nth) && (allValues.member.private.selection === "nth") ?  allValues.card.shared.nth: (allValues.card && allValues.card.shared && allValues.card.shared.nth) && (allValues.member.private.selection !== "nth") ? allValues.card.shared.nth + allValues.card.private.nth : 1,
//                       imp: (allValues.card && allValues.card.shared && allValues.card.shared.imp)&& (allValues.member.private.selection === "imp") ? allValues.card.shared.imp-1  : (allValues.card && allValues.card.shared && allValues.card.shared.imp)&& (allValues.member.private.selection !== "imp") ? allValues.card.shared.imp: 0,
//                       cri: (allValues.card && allValues.card.shared && allValues.card.shared.cri)&& (allValues.member.private.selection === "cri") ? allValues.card.shared.cri-1  : (allValues.card && allValues.card.shared && allValues.card.shared.cri)&& (allValues.member.private.selection !== "cri") ? allValues.card.shared.cri: 0,
//
//                     })
//                   }).then(function(){
//                     t.closePopup();
//                   })
//                 }
//               },
//               {
//                 text: 'Important',
//                 callback: function(t, opts){
//                   return t.set('member', 'private', {'selection': 'imp'})
//                   .then(function(){
//                     return t.getAll()
//                   })
//                   .then(function(allValues){
//                     return t.set('card', 'private', {
//                       nth:  0,
//                       imp: 1,
//                       cri: 0,
//                     })
//                   }).then(function(){
//                     return t.getAll()
//                   }).then(function(allValues){
//                     console.log(allValues.card.shared, allValues.card.private);
//                     return t.set('card', 'shared', {
//                       nth: (allValues.card && allValues.card.shared && allValues.card.shared.nth)&& (allValues.member.private.selection === "nth") ? allValues.card.shared.nth-1  : (allValues.card && allValues.card.shared && allValues.card.shared.nth)&& (allValues.member.private.selection !== "nth") ? allValues.card.shared.nth: 0,
//                       imp: ((allValues.card && allValues.card.shared && allValues.card.shared.imp) && (allValues.member.private.selection === "imp")) ?  allValues.card.shared.imp: ((allValues.card && allValues.card.shared && allValues.card.shared.imp) && (allValues.member.private.selection !== "imp")) ? allValues.card.shared.imp + allValues.card.private.imp : 1,
//                       cri: (allValues.card && allValues.card.shared && allValues.card.shared.cri)&& (allValues.member.private.selection === "cri") ? allValues.card.shared.cri-1  : (allValues.card && allValues.card.shared && allValues.card.shared.cri)&& (allValues.member.private.selection !== "cri") ? allValues.card.shared.cri: 0,
//                     })
//                   }).then(function(){
//                     t.closePopup();
//                   })
//                 }
//               },
//               {
//                 text: 'Critical',
//                 callback: function(t, opts){
//                   return t.set('member', 'private', {'selection': 'cri'})
//                   .then(function(){
//                     return t.getAll()
//                   })
//                   .then(function(allValues){
//                     return t.set('card', 'private', {
//                       nth: 0,
//                       imp: 0,
//                       cri: 1,
//                     })
//                   }).then(function(){
//                     return t.getAll()
//                   }).then(function(allValues){
//                     return t.set('card', 'shared', {
//                       nth: (allValues.card && allValues.card.shared && allValues.card.shared.nth)&& (allValues.member.private.selection === "nth") ? allValues.card.shared.nth-1  : (allValues.card && allValues.card.shared && allValues.card.shared.nth)&& (allValues.member.private.selection !== "nth") ? allValues.card.shared.nth: 0,
//                       imp: (allValues.card && allValues.card.shared && allValues.card.shared.imp)&& (allValues.member.private.selection === "imp") ? allValues.card.shared.imp-1  : (allValues.card && allValues.card.shared && allValues.card.shared.imp)&& (allValues.member.private.selection !== "imp") ? allValues.card.shared.imp: 0,
//                       cri: (allValues.card && allValues.card.shared && allValues.card.shared.cri) && (allValues.member.private.selection === "cri") ?  allValues.card.shared.cri: (allValues.card && allValues.card.shared && allValues.card.shared.cri) && (allValues.member.private.selection !== "cri") ? allValues.card.shared.cri + allValues.card.private.cri : 1,
//                     })
//                   }).then(function(){
//                     t.closePopup();
//                   })
//                 }
//               },
//               {
//                 text: 'unspecified',
//                 callback: function(t, opts){
//                   return t.set('member', 'private', {'selection': 'unspecified'})
//                   .then(function(){
//                     return t.getAll()
//                   })
//                   .then(function(allValues){
//                     return t.set('card', 'private', {
//                       nth: 0,
//                       imp: 0,
//                       cri: 0,
//                     })
//                   }).then(function(){
//                     return t.getAll()
//                   }).then(function(allValues){
//                     return t.set('card', 'shared', {
//                       nth: (allValues.card && allValues.card.shared && allValues.card.shared.nth) && (allValues.card.private.selection==='nth') ?  allValues.card.shared.nth-1 : (allValues.card && allValues.card.shared && allValues.card.shared.nth) && !(allValues.card.private.selection==='nth') ? allValues.card.shared.nth : 0,
//                       imp: (allValues.card && allValues.card.shared && allValues.card.shared.imp) && (allValues.card.private.selection==='imp') ?  allValues.card.shared.imp-1 : (allValues.card && allValues.card.shared && allValues.card.shared.imp) && !(allValues.card.private.selection==='imp') ? allValues.card.shared.imp : 0,
//                       cri: (allValues.card && allValues.card.shared && allValues.card.shared.cri) && (allValues.card.private.selection==='cri') ?  allValues.card.shared.cri-1 : (allValues.card && allValues.card.shared && allValues.card.shared.cri) && !(allValues.card.private.selection==='cri') ? allValues.card.shared.cri : 0,
//                     })
//                   }).then(function(){
//                     t.closePopup();
//                   })
//                 }
//               },
//             ]
//           })
//         }
//
//       }]
//     })
//   },
//     "card-badges": function(t, opts){
//       return t.getAll().then(function(allValues){
//         var nthtext= (allValues.card && allValues.card.shared && allValues.card.shared.nth) ? "Nice to have: "+ String(allValues.card.shared.nth): "Nice to have: 0";
//         var imptext= (allValues.card && allValues.card.shared && allValues.card.shared.imp )? "Important: "+ String(allValues.card.shared.imp): "Important: 0";
//         var criticaltext= (allValues.card && allValues.card.shared && allValues.card.shared.cri) ? "Critical: "+ String(allValues.card.shared.cri): "Critical: 0";
//
//         return [
//           {
//             text: nthtext,
//             color:'yellow',
//           },
//           {
//             text: imptext,
//             color:'green',
//           },
//           {
//             text: criticaltext,
//             color:'red',
//           },
//       ]
//       })
//     }
// })
