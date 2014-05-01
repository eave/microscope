(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/errors/errors_tests.js                                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Tinytest.add("Errors collection works", function(test) {             // 1
	test.equal(Errors.collection.find({}).count(), 0);                  // 2
                                                                     // 3
	Errors.throw('A new error!');                                       // 4
	test.equal(Errors.collection.find({}).count(), 1);                  // 5
                                                                     // 6
	Errors.collection.remove({});                                       // 7
});                                                                  // 8
                                                                     // 9
Tinytest.addAsync("Errors template works", function(test, done) {    // 10
	Errors.throw('A new error!');                                       // 11
	test.equal(Errors.collection.find({seen: false}).count(), 1);       // 12
                                                                     // 13
	UI.insert(UI.render(Template.meteorErrors), document.body);         // 14
                                                                     // 15
	Meteor.setTimeout(function() {                                      // 16
		test.equal(Errors.collection.find({seen: false}).count(), 0);      // 17
		test.equal(Errors.collection.find({}).count(), 1);                 // 18
		Errors.clearSeen();                                                // 19
                                                                     // 20
		test.equal(Errors.collection.find({seen: true}).count(), 0);       // 21
		done();                                                            // 22
	}, 500);                                                            // 23
});                                                                  // 24
///////////////////////////////////////////////////////////////////////

}).call(this);
