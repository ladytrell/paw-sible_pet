const db = require('./connection');
const { User, Provider, Category, Order } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Walking' },
    { name: 'Sitting' },
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
    'Sat 5-7PM',
    'Friday - Sunday'
  ];

  await Provider.deleteMany();

  const providers = await Provider.insertMany([
    {
      name: 'Mary',
      description:
        'Ever since I can remember, I have always been around and loved animals. My Grandma was very influential in teaching me to love and care for them and how to read their body language. I started pet sitting when I was in elementary school, when our neighbors would go on vacation I would care for their cat and fish. I have had many beloved pets growing up, including; cats, dogs, guinea pigs, rabbits, fish, parakeets, lizards, hamsters, and a mouse. Currently, I have a previously feral, calico cat named Baby who is in the above picture with me, a beta fish, african dwarf frog, nerite snail, and a goldfish.

        I have taken a veterinary science course, where I studied animal anatomy and worked with and cared for the class pets as well. I also worked as a volunteer with Cats In Need, a non-profit no kill organization that works with Petsmart, to get cats into forever homes. I have an Associates Degree, and I am currently in school to get a Bachelors Degree in Biology, with a focus on Zoology. My goal is to study and work directly with wild animals in order to preserve them.',
      image: '/client/src/assets/images/profile/Mary.jpg',
      category: categories[0]._id,
      price: 20.00,
      availability: [availability[1], availability[2], availability[5], availability[6], availability[8]]
    },
    {
      name: 'Jessie',
      description:
        'I have grown up with animals my entire life. Starting out with cats, dogs, turtles and fish, I also took interest in exotic animals such as snakes, birds and frogs. Caring for animals has been my life-long ambition.   In addition to caring for my personal pets, I volunteer at the Wildlife Waystation, located in Sylmar. At the Wildlife Waystation, I help care for animals such as big cats, bears, wolves, coyotes, birds of prey, primates and several other animals. I also plan to pursue my interest in animal behavior and get my dog training certification. I also hope to study Zoology. Currently, my animal family includes one kitty, two dogs, one hypo Brooke's king snake, one normal red tail boa, one albino red tail boa, one albino motley red tail boa, one hypo jungle red tail boa, two green tree pythons (aru and merauke locality) and a Brazilian rainbow boa.',
      image: '/client/src/assets/images/profile/Jessie.jpg',
      category: categories[0]._id,
      price: 15.00,
      availability: [availability[1], availability[2], availability[5], availability[6], availability[8]]
    },
    {
      name: 'Anna',
      description:
        'Hello! My name is Anna.

        Animals are my life! I have always had pets growing up as a child and my love for them has grown into my adulthood even more. I have a passion for learning and understanding all different types of animals. My experience in Pet Care is from having my own pets and caring for family, friends and volunteering over the years. 
        
        
        
        My fiancé Kevin and I have 3 dogs of our own; Dusty-Spaniel mix, Ayla-Border collie/German Shepherd, and Nova-German Shepherd who we adore! I love training/exercising with them every day and they push me to be the best I can be.
        
        I am aspiring to get certified as a dog trainer and learn as much as I can :) 
        
        
        
        Some hobbies that I have are; photography, hiking, hairstyling, and cooking )',
      image: '/client/src/assets/images/profile/Anna.jpg',
      category: categories[0]._id,
      price: 21.00,
      availability: [availability[1], availability[2], availability[5], availability[6], availability[8]]
    },
    {
      name: 'Katie',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: '/client/src/assets/images/profile/',
      category: categories[0]._id,
      price: 19.00,
      availability: [availability[1], availability[2], availability[5], availability[6], availability[8]]
    },
    {
      name: 'Amanda',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: '/client/src/assets/images/profile/',
      category: categories[0]._id,
      price: 22.50,
      availability: [availability[1], availability[2]]
    },
    {
      name: 'Jamie',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: '/client/src/assets/images/profile/',
      category: categories[1]._id,
      price: 80.00,
      availability: [availability[12]]
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
    favorites: [
      {
        providers: [providers[0]._id, providers[3]._id, providers[4]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Antrell',
    lastName: 'Eady',
    email: 'antrell@mail.com',
    password: 'password'
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
