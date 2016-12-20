const ListModel = require('../models/ListModel');

module.exports = {
    list(req, res, next) {
        ListModel.find({
                user: req.user._id
            })
            .exec()
            .then(lists => res.json(lists))
            .catch(next);
    },

    create(req, res, next) {
        new ListModel({
                listName: req.body.listName,
                user: req.user._id
            })
            .save()
            .then(list => res.json(list))
            .catch(next);
    },

    show(req, res, next) {
        ListModel.findOne({
                user: req.user._id,
                _id: req.params.id
            })
            .populate('items')
            .exec()
            .then(list => res.json(list))
            .catch(next);
    },

    remove(req, res, next) {
        ListModel.findOneAndRemove({
                user: req.user._id,
                _id: req.params.id
            })
            .exec()
            .then(list => res.json(list))
            .catch(next);
    },

    update: function(req, res) {
        var listId = req.params.id;
        var listName = req.body.listName;
        ListModel.findOne({
                _id: listId
            },
            function(err, list) {
                list.listName = listName;
                list.save(function(err, list) {
                  return res.json(list);
                });
            });

    }

}
