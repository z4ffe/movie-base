const express = require('express')
const router = express.Router()
const articlesController = require('../controllers/articles.controller')
const auth = require('../middleware/auth')
const {addArticleValidator} = require("../middleware/validation");

router.post('/', auth('createAny', 'articles'), addArticleValidator, articlesController.createArticle)

router.route('/all')
   .get(articlesController.getAllArticles)
   .post(articlesController.getMoreArticles)

router.route('/article/:id')
   .get(auth('readAny', 'articles'), articlesController.getArticleById)
   .patch(auth('updateAny', 'articles'), articlesController.updateArticleById)
   .delete(auth('deleteAny', 'articles'), articlesController.deleteArticleById)

router.route('/users/article/:id')
   .get(articlesController.getUsersArticleById)

router.post('/admin/paginate', auth('readAny', 'articles'), articlesController.adminPaginate)

module.exports = router
