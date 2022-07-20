const { AuthenticationError } = require('apollo-server-express');
const { User, Provider, Category, Order, PetProfile, Reservation } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('favorites')
          .populate('pets')
          .populate('orders');
        
        return userData;
      }

      throw new AuthenticationError('Not logged in.');
    },

    categories: async () => {
      return await Category.find();
    },
    // providers: async (parent, { category, name }) => {
    //   const params = {};

    //   if (category) {
    //     params.category = category;
    //   }

    //   if (name) {
    //     params.name = {
    //       $regex: name
    //     };
    //   }

    //   return await Provider.find(params).populate('category');
    // },
    // provider: async (parent, { _id }) => {
    //   return await Provider.findById(_id).populate('category');
    // },
    // user: async (parent, args, context) => {
    //   if (context.user) {
    //     const user = await User.findById(context.user._id).populate(
    //       {
    //         path: 'orders.providers',
    //         populate: 'category'
    //       }
    //     );

    //     user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

    //     return user;
    //   }

    //   // throw new AuthenticationError('Not logged in');
    // },
    provider: async (parent, { _id }) => {
      return Provider.findById(_id)
        .populate('category');
    },
    providers: async () => {
      return Provider.find()
        .populate('category');
    },
    user: async (parent, { _id }) => {
      return User.findById(_id)
        .select('-__v -password')
        .populate('favorites')
        .populate('pets')
        .populate('orders');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('favorites')
        .populate('pets')
        .populate('orders');
    },
    reservation: async () => {
      return await Reservation.find().populate(
        'service').populate('provider');
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
    //Add User to database
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    //Add Pet Profile to User account    
    addPet: async (parent, args) => {
      const pet = await PetProfile.create(args);
      //let context= {user:{_id: "62cf6cbc7a77be4550429bce"}};
     
      await User.findByIdAndUpdate(context.user._id, { $push: { pets: pet } },  { new: true } );
      return pet;
    },
    //Add Provider to User Favorites list   
    addFavorite: async (parent, { id }, context) => {
      console.log({id});
      console.log({context})
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { favorites: id } },
          { new: true, runValidators: true }
        );
        
        return updatedUser;
      }
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
    
    addReservation: async (parent, args) => {
      console.log('addReservation args', args);
      //Add Try Catch
      try{        
        const provider = await Provider.findById(args.provider);        
        console.log(provider)
        if(provider.availability.includes(args.timeSlot)){
          await Provider.findByIdAndUpdate(provider._id, {
            $pull: { availability: args.timeSlot } 
            });
          const reservation = await Reservation.create(args);
          console.log(reservation)
          return await reservation.populate('provider').populate('category').execPopulate();
        } else {
          console.log("Time slot not available");
        }
      }
      catch(err){
        console.log(err.message);
      }
    },
    removeReservation: async (parent, args) => {
      console.log('removeReservation args', args);
      //Add Try Catch
      try{     
        const reservation = await Reservation.findById(args);
        console.log(reservation)    
        const provider = await Provider.findById(reservation.provider);        
        console.log(provider)
        
        await Provider.findByIdAndUpdate(provider._id, {
          $push: { availability: reservation.timeSlot } 
          });
       
        return await Reservation.findByIdAndDelete(args);        
      }
      catch(err){
        console.log(err.message);
      }
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
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
  },
  /*User: {
    favorites: async user => {
      console.log('user.favorites', user.favorites)
      return User.populate(user, {path: 'favorites'})
        .then(user => user.favorites)
    }
  }*/
};

module.exports = resolvers;
