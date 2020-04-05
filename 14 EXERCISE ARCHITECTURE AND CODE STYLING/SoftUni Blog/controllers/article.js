const Article = require('../models/Article');

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },
    createPost: (req, res) => {
        const {title, content} = req.body;
        const author = req.user.id;
        const user = req.user;
        const article = new Article({title, content, author});

        article.save()
            .then((result) => {
                user.articles.push(result.id);
                return user.save();
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(console.error);
    },
    details: (req, res) => {

    },
    editGet: (req, res) => {

    },
    editPost: (req, res) => {

    },
    deleteGet: (req, res) => {

    },
    deletePost: (req, res) => {

    },
};