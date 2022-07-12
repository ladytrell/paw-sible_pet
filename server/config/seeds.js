const db = require('./connection');
const { User, Provider, Category, Availability, Order } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Walking' },
    { name: 'Sitting' },
  ]);

  console.log('categories seeded');

  await Availability.deleteMany();
  const availability =  await Availability.insertMany([
    { time: 'Mon 8-10AM' },
    { time: 'Mon 5-7PM' },
    { time: 'Tue 8-10AM' },
    { time: 'Tue 5-7PM' },
    { time: 'Wed 8-10AM' },
    { time: 'Wed 5-7PM' },
    { time: 'Thu 8-10AM' },
    { time: 'Thu 5-7PM' },
    { time: 'Fri 8-10AM' },
    { time: 'Fri 5-7PM' },
    { time: 'Sat 8-10AM' },
    { time: 'Sat 5-7PM' }
  ]);

  console.log('availability seeded');
  console.log('availability', availability[1]);
  console.log('availability', availability[1].time);

  await Provider.deleteMany();
  const providers = await Provider.insertMany([
    {
      name: 'Mary',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 20.00,
      availability: [availability[1]._id, availability[2]._id, availability[5]._id, availability[6]._id, availability[8]._id]
    },
    {
      name: 'Jessie',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 15.00,
      availability: [availability[1]._id, availability[2]._id, availability[5]._id, availability[6]._id, availability[8]._id]
    },
    {
      name: 'Anna',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 21.00,
      availability: [availability[1]._id, availability[2]._id, availability[5]._id, availability[6]._id, availability[8]._id]
    },
    {
      name: 'Katie',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 19.00,
      availability: [availability[1]._id, availability[2]._id, availability[5]._id, availability[6]._id, availability[8]._id]
    },
    {
      name: 'Amanda',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 22.50,
      availability: [availability[1]._id, availability[2]._id]
    },
  ]);

  console.log('providers seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        providers: [providers[0]._id, providers[0]._id, providers[0]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  await Order.deleteMany();

  await Order.create({
    purchaseDate: new Date(),
    products: [
      providers[0]._id, providers[0]._id
    ]
  });

  await Order.create({
    purchaseDate: new Date(),
    products: [
      providers[0]._id, providers[1]._id, providers[2]._id
    ]
  });

  await Order.create({
    purchaseDate: new Date(),
    products: [
      providers[0]._id
    ]
  });

  console.log('order seeded');

  process.exit();
});
