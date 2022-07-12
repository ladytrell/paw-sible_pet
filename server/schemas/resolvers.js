const { AuthenticationError } = require('apollo-server-express');
const { User, Provider, Category, Order, Availability, PetProfile } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    availability: async () => {
      return await Availability.find();
    },
    providers: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Provider.find(params).populate('category');
    },
    provider: async (parent, { _id }) => {
      return await Provider.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.providers',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.providers',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      console.log(args.providers);
      const order = new Order({ providers: args.providers });
      const line_items = [];
      
      const { providers } = await order.populate('providers');

      // console.log(providers);

      for (let i = 0; i < providers.length; i++) {
        console.log('1')
        // generate provider id

        const provider = await stripe.providers.create({
          name: providers[i].name,
          description: providers[i].description,
          images: [`${url}/images/${providers[i].image}`]        
        });
        console.log('2')
        // generate price id using the provider id
        const price = await stripe.prices.create({
          provider: provider.id,
          unit_amount: providers[i].price * 100,
          currency: 'usd',
        });
        console.log('3')
        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });  
      
      return { session: session.id };      
    }    
  },
  Mutation: {    
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
     
    addPet: async (parent, args) => {
      const pet = await PetProfile.create(args);

      await User.findByIdAndUpdate(context.user._id, { $push: { pets: pet } });

      return pet;
    },
    addOrder: async (parent, { providers }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ providers });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateProvider: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Provider.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
