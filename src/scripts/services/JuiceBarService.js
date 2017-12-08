/**
 * Sample data array untill the databse wired up ;)
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


const newsletters = [{
    id: 1,
    name: 'Berry Green Smoothie',
    price: 200,

    content: 'While rare, some people experience recurrent episodes of anaphylaxis -- a life-threatening allergic reaction -- for which the triggers are never identified. Recently, researchers found that some patients seemingly inexplicable anaphylaxis was actually caused by an uncommon allergy to a molecule found naturally in red meat. They note that the allergy, which is linked to a history of a specific type of tick bite, may be difficult for patients and health care teams to identify.',
    image: 'https://draxe.com/wp-content/uploads/2014/11/Berry-Green-Smoothie-e1416511703339.jpg',
  }, {
    id: 2,
    name: 'Blueberry Yogurt Smoothie',
    price: 300,

    content: 'While rare, some people experience recurrent episodes of anaphylaxis -- a life-threatening allergic reaction -- for which the triggers are never identified. Recently, researchers found that some patients seemingly inexplicable anaphylaxis was actually caused by an uncommon allergy to a molecule found naturally in red meat. They note that the allergy, which is linked to a history of a specific type of tick bite, may be difficult for patients and health care teams to identify.',
    image: 'https://draxe.com/wp-content/uploads/2014/11/Green-Pumpkin-Pie-Smoothie-e1416375132388.jpg',
  },
  {
    id: 3,
    name: 'Strawberry Papaya Smoothie',
    price: 300,

    content: 'While rare, some people experience recurrent episodes of anaphylaxis -- a life-threatening allergic reaction -- for which the triggers are never identified. Recently, researchers found that some patients seemingly inexplicable anaphylaxis was actually caused by an uncommon allergy to a molecule found naturally in red meat. They note that the allergy, which is linked to a history of a specific type of tick bite, may be difficult for patients and health care teams to identify.',
    image: 'https://draxe.com/wp-content/uploads/2014/11/Green-Pumpkin-Pie-Smoothie-e1416375132388.jpg',
  },
  {
    id: 4,
    name: 'Cherry Almond Smoothie',
    price: 300,

    content: 'While rare, some people experience recurrent episodes of anaphylaxis -- a life-threatening allergic reaction -- for which the triggers are never identified. Recently, researchers found that some patients seemingly inexplicable anaphylaxis was actually caused by an uncommon allergy to a molecule found naturally in red meat. They note that the allergy, which is linked to a history of a specific type of tick bite, may be difficult for patients and health care teams to identify.',
    image: 'https://draxe.com/wp-content/uploads/2014/11/Green-Pumpkin-Pie-Smoothie-e1416375132388.jpg',
  },
  {
    id: 5,
    name: 'Healthy Red Velvet Smoothie',
    price: 300,

    content: 'While rare, some people experience recurrent episodes of anaphylaxis -- a life-threatening allergic reaction -- for which the triggers are never identified. Recently, researchers found that some patients seemingly inexplicable anaphylaxis was actually caused by an uncommon allergy to a molecule found naturally in red meat. They note that the allergy, which is linked to a history of a specific type of tick bite, may be difficult for patients and health care teams to identify.',
    image: 'https://draxe.com/wp-content/uploads/2014/11/Green-Pumpkin-Pie-Smoothie-e1416375132388.jpg',
  },
  {
    id: 6,
    name: 'Healthy Berry Smoothie',
    price: 300,

    content: 'While rare, some people experience recurrent episodes of anaphylaxis -- a life-threatening allergic reaction -- for which the triggers are never identified. Recently, researchers found that some patients seemingly inexplicable anaphylaxis was actually caused by an uncommon allergy to a molecule found naturally in red meat. They note that the allergy, which is linked to a history of a specific type of tick bite, may be difficult for patients and health care teams to identify.',
    image: 'https://draxe.com/wp-content/uploads/2014/11/Green-Pumpkin-Pie-Smoothie-e1416375132388.jpg',
  },
];

/**
 * Returns all smoothie objects
 * @return {Array} The Smoothie array
 */
const getAllSmoothies = () => smoothies;

const getAllNewsletters= () => newsletters;


export {
  getAllSmoothies, getAllNewsletters
};
