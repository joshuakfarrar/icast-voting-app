'use strict';

var mongoose = require('mongoose'),
    Star = mongoose.model('Star'),
    passport = require('passport');

/**
 * Create user
 */
exports.star = function (req, res, next) {
  var newStar = new Star(req.body);
  newStar.user = req.user;
  newStar.save(function(err) {
    if (err) return res.json(400, err);

    return res.json(newStar);
  });
};

/**
 *  Get profile of specified user
 */
exports.unstar = function (req, res, next) {
  Star.find({ user: req.user, product: req.query.product }, function(err, stars) {
    if (err) return res.send(404);

    for (var k = 0; k < stars.length; k++) {
      stars[k].remove();
    }

    return res.send(200);
  });
};


/**
 * Get current user
 */
exports.me = function(req, res) {
  Star.find({ user: req.user }, function(err, stars) {
    res.json(stars || null);
  });
};
