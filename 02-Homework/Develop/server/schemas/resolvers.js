const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getSingleUser: async (parent, args) => {
      return User.findById(args._id)
    }
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create({...args});
      const token = signToken(user);
      return token;
    },
    login: async (parent, { password, email }) => {
      const user = await User.findOne({ email: email} );
      if (!user) {
      return console.log("Can't find this user" );
    }
    
    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      return console.log('Wrong password!');
    }
    const token = signToken(user);
    
    
    return token;

    },
    saveBook: async (parent, {_id, book}) => {
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
