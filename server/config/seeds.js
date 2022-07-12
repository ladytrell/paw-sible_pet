const db = require('./connection');
const { User, Provider, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Walking' },
    { name: 'Sitting' },
  ]);

  console.log('categories seeded');

  
  const availability =  [
    'Mon 8-10AM',
    'Mon 5-7PM',
    'Tue 8-10AM',
    'Tue 5-7PM',
    'Wed 8-10AM',
    'Wed 5-7PM',
    'Thu 8-10AM',
    'Thu 5-7PM',
    'Fri 8-10AM',
    'Fri 5-7PM',
    'Sat 8-10AM',
    'Sat 5-7PM'
  ];

  //console.log('availability seeded');
  await Provider.deleteMany();

  await Provider.deleteMany();
  const providers = await Provider.insertMany([
    {
      name: 'Mary',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 20.00,
      availability: [availability[1], availability[2], availability[5], availability[6], availability[8]]
    },
    
    {
      name: 'Jessie',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 15.00,
      availability: [availability[1], availability[2], availability[5], availability[6], availability[8]]
    },
    {
      name: 'Anna',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 21.00,
      availability: [availability[1], availability[2], availability[5], availability[6], availability[8]]
    },
    {
      name: 'Katie',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 19.00,
      availability: [availability[1], availability[2], availability[5], availability[6], availability[8]]
    },
    {
      name: 'Amanda',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 22.50,
      availability: [availability[1], availability[2]]
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
        providers: [providers[0]._id, providers[3]._id, providers[4]._id]
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
