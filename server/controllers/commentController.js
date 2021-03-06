var User = require('../db/models/user');
var Photo = require('../db/models/photo');
var Comment = require('../db/models/comment');
var Comments = require('../db/collections/comments');
var io = require('../server.js');

var inspect = require('util').inspect;

module.exports = {

  addComment: function (req, res, next) {

    var data = req.body;

    new User({
        username: data.username
      })
      .fetch()
      .then(function (found) {
        if (!found) {
          res.send('User not found');
        } else {
          new Comment({
              text : data.text,
              username: data.username,
              user_id: found.id,
              photo_id: data.photo_id,
              request_id: data.request_id
            })
            .save()
            .then(function (createdComment) {
              console.log('BAANANANANANA', createdComment);
              io.emit('updateComment', createdComment);
            });
          res.send('comment added');
        }
      });

  }

  // getCommentsForPhoto : function (req, res, next) {

  // }

};