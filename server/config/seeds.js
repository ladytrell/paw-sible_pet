const db = require('./connection');
const { User, Provider, Category, Availability, Order } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Walking' },
    { name: 'Sitting' },
  ]);

  console.log('categories seeded');

  Availability.deleteMany();

  const availability = [
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

  const prepareAvailability = [];
  availability.forEach(day => {
    prepareAvailability.push({ name: day });
  });

  const allAvailabilities = await Availability.insertMany(prepareAvailability);


  console.log('availability seeded');

  await Provider.deleteMany();

  const providers = await Provider.insertMany([
    {
      name: 'Mary',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 20.00,
      availability: [allAvailabilities[1]._id, allAvailabilities[2]._id, allAvailabilities[5]._id, allAvailabilities[6]._id, allAvailabilities[8]._id]
    },
    {
      name: 'Jessie',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 15.00,
      availability: [allAvailabilities[1]._id, allAvailabilities[2]._id, allAvailabilities[5]._id, allAvailabilities[6]._id, allAvailabilities[8]._id]
    },
    {
      name: 'Anna',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 21.00,
      availability: [allAvailabilities[1]._id, allAvailabilities[2]._id, allAvailabilities[5]._id, allAvailabilities[6]._id, allAvailabilities[8]._id]
    },
    {
      name: 'Katie',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 19.00,
      availability: [allAvailabilities[1]._id, allAvailabilities[2]._id, allAvailabilities[5]._id, allAvailabilities[6]._id, allAvailabilities[8]._id]
    },
    {
      name: 'Amanda',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookie-tin.jpg',
      category: categories[0]._id,
      price: 22.50,
      availability: [allAvailabilities[1]._id, allAvailabilities[2]._id]
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
