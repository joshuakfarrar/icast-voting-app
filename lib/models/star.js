'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Star Schema
 */
var StarSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'UserSchema'
  },
  product: {type: String, uppercase: true},
  description: String
});

// Validate empty product
StarSchema
  .path('product')
  .validate(function(product) {
    return product.length;
  }, 'Product number cannot be blank');

// Validate product not already starred
StarSchema
  .path('product')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({user: self.user, product: value}, function(err, star) {
      if(err) throw err;
      if(star) {
        if(self.id === star.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'You have already starred that product');

mongoose.model('Star', StarSchema);
