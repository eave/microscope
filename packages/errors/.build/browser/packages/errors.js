(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/errors/errors.js                                                                                     //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
Errors = {                                                                                                       // 1
	collection: new Meteor.Collection(null),                                                                        // 2
	throw: function(message) {                                                                                      // 3
		Errors.collection.insert({message: message, seen: false})                                                      // 4
	},                                                                                                              // 5
	clearSeen: function() {                                                                                         // 6
		Errors.collection.remove({seen: true});                                                                        // 7
	}                                                                                                               // 8
};                                                                                                               // 9
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/errors/template.errors_list.js                                                                       //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
                                                                                                                 // 1
Template.__define__("meteorErrors", (function() {                                                                // 2
  var self = this;                                                                                               // 3
  var template = this;                                                                                           // 4
  return UI.Each(function() {                                                                                    // 5
    return Spacebars.call(self.lookup("errors"));                                                                // 6
  }, UI.block(function() {                                                                                       // 7
    var self = this;                                                                                             // 8
    return [ "\n		", Spacebars.include(self.lookupTemplate("meteorError")), "\n	" ];                             // 9
  }));                                                                                                           // 10
}));                                                                                                             // 11
                                                                                                                 // 12
Template.__define__("meteorError", (function() {                                                                 // 13
  var self = this;                                                                                               // 14
  var template = this;                                                                                           // 15
  return HTML.DIV({                                                                                              // 16
    "class": "alert alert-error"                                                                                 // 17
  }, HTML.Raw('\n		<button type="button" class="close" data-dismiss="alert">&times;</button>\n		'), function() { // 18
    return Spacebars.mustache(self.lookup("message"));                                                           // 19
  }, "\n	");                                                                                                     // 20
}));                                                                                                             // 21
                                                                                                                 // 22
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/errors/errors_list.js                                                                                //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
Template.meteorErrors.helpers({                                                                                  // 1
	errors: function() {                                                                                            // 2
		return Errors.collection.find();                                                                               // 3
	}                                                                                                               // 4
});                                                                                                              // 5
                                                                                                                 // 6
Template.meteorError.rendered = function() {                                                                     // 7
	var error = this.data;                                                                                          // 8
	Meteor.defer(function() {                                                                                       // 9
		Errors.collection.update(error._id, {$set: {seen: true}});                                                     // 10
	});                                                                                                             // 11
};                                                                                                               // 12
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
