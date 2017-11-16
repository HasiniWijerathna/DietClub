/**
 * Sample data array
 * @type {Array}
 */
const smoothies = [{
    id: 1,
    name: 'Berry Green Smoothie',
    price: 200,
    image: 'https://draxe.com/wp-content/uploads/2014/11/Berry-Green-Smoothie-e1416511703339.jpg',
  }, {
    id: 2,
    name: 'Blueberry Yogurt Smoothie',
    price: 300,
    image: 'https://draxe.com/wp-content/uploads/2014/11/Cherry-Almond-Smoothies-e1416182218569.jpg',
  },
  {
    id: 3,
    name: 'Strawberry Papaya Smoothie',
    price: 300,
    image: 'https://draxe.com/wp-content/uploads/2014/11/Healthy-Red-Velvet-Smoothies-e1416375313689.jpg',
  },
  {
    id: 4,
    name: 'Cherry Almond Smoothie',
    price: 300,
    image: 'https://draxe.com/wp-content/uploads/2014/11/Green-Pumpkin-Pie-Smoothie-e1416375132388.jpg',
  },
  {
    id: 5,
    name: 'Healthy Red Velvet Smoothie',
    price: 300,
    image: 'https://draxe.com/wp-content/uploads/2014/11/Stomach-Cleanser-Smoothie-e1416375258738.jpg',
  },
  {
    id: 6,
    name: 'Healthy Berry Smoothie',
    price: 300,
    image: 'https://draxe.com/wp-content/uploads/2014/11/pb-j-smoothie-716x371.png',
  },
];

/**
 * Returns all smoothie objects
 * @return {Array} The Smoothie array
 */
const getAllSmoothies = () => smoothies;


export {
  getAllSmoothies
};
