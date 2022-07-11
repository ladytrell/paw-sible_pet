const db = require('./connection');
const { User, Provider, Category, Availability } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Walking' }
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
