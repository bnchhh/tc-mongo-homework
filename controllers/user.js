const { User, Article } = require("../models/index");

async function createUser(req, res, next) {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created!" });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { firstName, lastName } = req.body;
    const user = await User.findById(req.params.userId);

    if (firstName) {
      user.firstName = firstName;
    }

    if (lastName) {
      user.lastName = lastName;
    }

    await user.save();
    res.status(200).json({ message: "User updated!" });
  } catch (error) {
    next(error);
  }
}

async function findUser(req, res, next) {
  try {
    const user = await User.findById(req.params.userId);
    const articles = await Article.find({ owner: req.params.userId });
    res.status(200).json({ user, articles });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      res.status(422);
      throw {message: "User don't exists"};
    }
    
    await Article.deleteMany({ owner: req.params.userId });

    res.status(206).json({ message: "Succesfully deleted!" });
  } catch (error) {
    next(error);
  }
}

async function getUserArticles(req, res, next) {
  try {
    const articles = await Article.find({ owner: req.params.userId });
    res.status(200).json(articles);

  } catch (error) {
    next(error);
  }
}
module.exports = { createUser, updateUser, findUser, deleteUser, getUserArticles};
