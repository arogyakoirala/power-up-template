var textMapper = {
  nth: "Nice to have",
  imp: "Important",
  cri: "Critical",
  unspecified: "Unspecified"
};


TrelloPowerUp.initialize({
  "card-detail-badges": function (t, opts) {
    return t.get("card", "private", "selected").then(function (selected) {
      return [{
        title: "How important is this feature?",
        text: textMapper[selected] || textMapper.unspecified,
        callback: function (t, opts) {
          return t.popup({
            title: "Choose an option",
            items: [{
                text: textMapper.nth,
                callback: function (t, opts) {
                  return t.set("card", "private", {
                      selected: "nth",
                    })
                    .then(function () {
                      return t.member("id");
                    })
                    .then(function (res) {
                      return t.set("card", "private", {
                        memberId: res.id,
                        canSubtractNTH: true
                      });
                    })
                    .then(function () {
                      return t.getAll();
                    })
                    .then(function (data) {
                      return t.set("card", "shared", {});
                    })
                    .then(function () {
                      return t.getAll();
                    })
                    .then(function (data) {
                      var myArray = [];

                      var isNew = !data.card.shared.votingMembers || (!data.card.shared.votingMembers.includes(data.card.private.memberId));
                      if (!data.card.shared.votingMembers) {
                        myArray.push(data.card.private.memberId);
                      }
                      else if (!data.card.shared.votingMembers.includes(data.card.private.memberId)) {
                        myArray = data.card.shared.votingMembers;
                        myArray.push(data.card.private.memberId);
                      }
                      else {
                        myArray = data.card.shared.votingMembers;
                      }

                      console.log(isNew, "nth:", data.card.private.canSubtractNTH, "cri:", data.card.private.canSubtractCRI, "imp:", data.card.private.canSubtractIMP);

                      return t.set("card", "shared", {
                        votingMembers: myArray,
                        nth: !isNew && data.card.private.selected === "nth" && !data.card.private.hasSubtractedNTH ? (data.card.shared && data.card.shared.nth || 1) : data.card.shared && data.card.shared.nth + 1 || 1,
                        imp: (!isNew && data.card.private.canSubtractIMP) ? ((data.card.shared.imp - 1) > 0) && data.card.shared.imp - 1 || 0 : (data.card.shared.imp),
                        cri: (!isNew && data.card.private.canSubtractCRI) ? ((data.card.shared.cri - 1) > 0) && data.card.shared.cri - 1 || 0 : (data.card.shared.cri),
                      });
                    })
                    .then(function () {
                      t.set("card", "private", {
                        canSubtractIMP: false,
                        canSubtractCRI: false,
                        hasSubtractedIMP: true,
                        hasSubtractedCRI: true,
                      });
                    })
                    .then(function () {
                      t.closePopup();
                    });
                }
              },

              {
                text: textMapper.imp,
                callback: function (t, opts) {
                  return t.set("card", "private", {
                      selected: "imp",
                    })
                    .then(function () {
                      return t.member("id");
                    })
                    .then(function (res) {
                      return t.set("card", "private", {
                        memberId: res.id,
                        canSubtractIMP: true
                      });
                    })
                    .then(function () {
                      return t.getAll();
                    })
                    .then(function (data) {
                      return t.set("card", "shared", {});
                    })
                    .then(function () {
                      return t.getAll();
                    })
                    .then(function (data) {
                      var myArray = [];

                      var isNew = !data.card.shared.votingMembers || (!data.card.shared.votingMembers.includes(data.card.private.memberId));
                      if (!data.card.shared.votingMembers) {
                        myArray.push(data.card.private.memberId);
                      }
                      else if (!data.card.shared.votingMembers.includes(data.card.private.memberId)) {
                        myArray = data.card.shared.votingMembers;
                        myArray.push(data.card.private.memberId);
                      }
                      else {
                        myArray = data.card.shared.votingMembers;
                      }

                      console.log(isNew, "nth:", data.card.private.canSubtractNTH, "cri:", data.card.private.canSubtractCRI, "imp:", data.card.private.canSubtractIMP);

                      return t.set("card", "shared", {
                        votingMembers: myArray,
                        nth: (!isNew && data.card.private.canSubtractNTH) ? ((data.card.shared.nth - 1) > 0) && data.card.shared.nth - 1 || 0 : (data.card.shared.nth),
                        imp: !isNew && data.card.private.selected === "imp" && !data.card.private.hasSubtractedIMP ? (data.card.shared && data.card.shared.imp || 1) : data.card.shared && data.card.shared.imp + 1 || 1,

                        cri: (!isNew && data.card.private.canSubtractCRI) ? ((data.card.shared.cri - 1) > 0) && data.card.shared.cri - 1 || 0 : (data.card.shared.cri),
                        // cri: !isNew ? data.card.shared.cri - 1 : data.card.shared.cri
                      });
                    })
                    .then(function () {
                      t.set("card", "private", {
                        canSubtractNTH: false,
                        canSubtractCRI: false,
                        hasSubtractedNTH: true,
                        hasSubtractedCRI: true,
                      });
                    })
                    .then(function () {
                      t.closePopup();
                    });
                }
              },


              {
                text: textMapper.cri,
                callback: function (t, opts) {
                  return t.set("card", "private", {
                      selected: "cri",
                    })
                    .then(function () {
                      return t.member("id");
                    })
                    .then(function (res) {
                      return t.set("card", "private", {
                        memberId: res.id,
                        canSubtractCRI: true
                      });
                    })
                    .then(function () {
                      return t.getAll();
                    })
                    .then(function (data) {
                      return t.set("card", "shared", {});
                    })
                    .then(function () {
                      return t.getAll();
                    })
                    .then(function (data) {
                      var myArray = [];
                      var isNew = !data.card.shared.votingMembers || (!data.card.shared.votingMembers.includes(data.card.private.memberId));
                      if (!data.card.shared.votingMembers) {
                        myArray.push(data.card.private.memberId);
                      }
                      else if (!data.card.shared.votingMembers.includes(data.card.private.memberId)) {
                        myArray = data.card.shared.votingMembers;
                        myArray.push(data.card.private.memberId);
                      }
                      else {
                        myArray = data.card.shared.votingMembers;
                      }

                      console.log(isNew, "nth:", data.card.private.canSubtractNTH, "cri:", data.card.private.canSubtractCRI, "imp:", data.card.private.canSubtractIMP);

                      return t.set("card", "shared", {
                        votingMembers: myArray,
                        nth: (!isNew && data.card.private.canSubtractNTH) ? ((data.card.shared.nth - 1) > 0) && data.card.shared.nth - 1 || 0 : (data.card.shared.nth),
                        imp: (!isNew && data.card.private.canSubtractIMP) ? ((data.card.shared.imp - 1) > 0) && data.card.shared.imp - 1 || 0 : (data.card.shared.imp),
                        cri: !isNew && data.card.private.selected === "cri" && !data.card.private.hasSubtractedCRI ? (data.card.shared.cri || 1) : (data.card.shared.cri + 1 || 1),
                      });
                    })
                    .then(function () {
                      t.set("card", "private", {
                        canSubtractNTH: false,
                        canSubtractIMP: false,
                        hasSubtractedIMP: true,
                        hasSubtractedNTH: true,
                      });
                    })
                    .then(function () {
                      t.closePopup();
                    });
                }
              },


            ]
          });
        }
      }];
    });
  },
  "card-badges": function (t, opts) {
    return t.getAll().then(function (allValues) {
      var nthtext = (allValues.card && allValues.card.shared && allValues.card.shared.nth) ? "Nice to have: " + String(allValues.card.shared.nth) : "Nice to have: 0";
      var imptext = (allValues.card && allValues.card.shared && allValues.card.shared.imp) ? "Important: " + String(allValues.card.shared.imp) : "Important: 0";
      var criticaltext = (allValues.card && allValues.card.shared && allValues.card.shared.cri) ? "Critical: " + String(allValues.card.shared.cri) : "Critical: 0";

      return [{
          text: nthtext,
          color: null,
        },
        {
          text: imptext,
          color: null,
        },
        {
          text: criticaltext,
          color: null,
        },
      ];
    });
  }
});
