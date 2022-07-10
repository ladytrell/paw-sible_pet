const db = require('./connection');
const { User, Provider, Category, Availability } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Walking' }
  ]);

  console.log('categories seeded');

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
      quantity: [availability[1], availability[2], availability[5], availability[6], availability[8]]
    }
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

  process.exit();
});
