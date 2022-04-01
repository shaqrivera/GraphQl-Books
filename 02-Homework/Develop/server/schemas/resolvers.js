const { Book, User } = require('../models');

const resolvers = {
  Query: {
    getSingleUser: async (parent, args) => {
      return User.findById(args._id)
    }
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
    login: async (parent, { username, password, email }) => {
      const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
      if (!user) {
      return { message: "Can't find this user" };
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      return { message: 'Wrong password!' };
    }
    const token = signToken(user);
    return{ token, user };
    },
    saveBook: async (parent, {_id, bookId, authors, description, image, link, title}) => {
    const book = {bookId, authors, description, image, link, title}
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: _id },
        { $addToSet: { savedBooks: book} },
        { new: true, runValidators: true }
      );
      return updatedUser;
    } catch (err) {
      console.log(err);
      return err;
    }
    },
    deleteBook: async (parent, {_id, bookId}) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: _id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        return { message: "Couldn't find user with this id!" };
      }
      return updatedUser;
    },
  },
};

module.exports = resolvers;
