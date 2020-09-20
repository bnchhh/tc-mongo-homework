const { User, Article } = require("../models/index");
const { findByIdAndDelete } = require("../models/user");

async function createArticle(req, res, next) {
  try {
    const user = await User.findById(req.body.owner);
    if (!user) {
      res.status(422);
      throw { message: `User don't exists` };
    }
    const article = new Article(req.body);
    await article.save();

    user.numberOfArticles++;
    await user.save();

    res.status(201).json({ article });
  } catch (error) {
    next(error);
  }
}

async function updateArticle(req, res, next) {
  try {
    const article = await Article.findById(req.params.articleId);

    if (!article) {
      res.status(422);
      throw { message: "Article don't exists" };
    }

    if (req.body.owner) {
      const user = await User.findById(req.body.owner);

      if (!user) {
        res.status(422);
        throw { message: "User don`t exists" };
      }
      article.owner = req.body.owner;
    }

    await Article.updateOne(article, { $set: req.body });
    res.status(200).json({ message: "Updated!" });
  } catch (error) {
    next(error);
  }
}

async function getArticle(req, res, next) {
  try {
    const articles = await Article.find(req.body).populate("owner");

    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
}

async function deleteArticle(req, res, next) {
  try {
    const article = await Article.findByIdAndDelete(req.params.articleId);
    if (!article) {
      res.status(422);
      throw { message: "Article don't exists" };
    }

    const user = await User.findById(article.owner);
    user.numberOfArticles--;
    await user.save();

    res.status(206).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { createArticle, updateArticle, getArticle, deleteArticle };
