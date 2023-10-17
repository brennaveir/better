const { AuthenticationError } = require('apollo-server-express');
const { User, Bit } = require('../models');
const { signToken } = require('../utils/auth');
const { UserInputError, ApolloError } = require('apollo-server-express'); // Import Apollo Server error types
const mongoose = require('mongoose'); // Import Mongoose

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('bits');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('bits');
    },
    bits: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Bit.find(params).sort({ createdAt: -1 });
    },
    bit: async (parent, { bitId }) => {
      return Bit.findOne({ _id: bitId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('bits');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    buddies: async (parent, args, context) => {
      if (context.user) {
        return User.find({ _id: context.user._id }).populate({
          path: 'buddies',
          populate: {path: 'bits'}
        });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addBit: async (parent, { bitText }, context) => {
      if (context.user) {
        const bit = await Bit.create({
          bitText,
          bitAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { bits: bit._id } }
        );

        return bit;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { bitId, commentText }, context) => {
      if (context.user) {
        return Bit.findOneAndUpdate(
          { _id: bitId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addBuddy: async (parent, { userId }, context) => {
      if (context.user) {
        try {
          // Ensure userId is a valid ObjectId
          const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);
          if (!isValidObjectId) {
            throw new UserInputError('Invalid user ID');
          }
    
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $addToSet: {
                buddies: userId
              },
            },
            {
              new: true,
            }
          ).populate('buddies')
    
          return updatedUser;
        } catch (error) {
          // Handle any errors that occurred during the update
          // You can log the error or return an appropriate response
          throw new ApolloError('An error occurred while adding a buddy');
        }
      } else {
        throw new AuthenticationError('You need to be logged in!');
      }
    },
    
    removeBit: async (parent, { bitId }, context) => {
      if (context.user) {
        const bit = await Bit.findOneAndDelete({
          _id: bitId,
          bitAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { bits: bit._id } }
        );

        return bit;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { bitId, commentId }, context) => {
      if (context.user) {
        return Bit.findOneAndUpdate(
          { _id: bitId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
