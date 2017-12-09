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
    name: 'New Restaurants and Food News this month',
    price: 200,

    content: 'The World Bacon Championship is part of the World Food Championships, an annual event billed as “the largest competition in food sport.” There are 10 categories, each focusing on a different food; Brumley participated last year in the barbeque competition, placing “a blazing 74th” out of 92 competitors. The four-day event takes place in an arena full of cooking stations with competitors from around the world. Brumley recognized several of his adversaries from cooking shows like Chopped and Top Chef. “It definitely is legit,” he says.',
    image: 'https://www.departures.com/sites/default/files/1433262617/article_june_food_news_ep_lp_food_spread_2000x1333.jpg',
  }, {
    id: 2,
    name: 'A Stop at bayward market',
    price: 300,

    content: 'While rare, some people experience recurrent episodes of anaphylaxis -- a life-threatening allergic reaction -- for which the triggers are never identified. Recently, researchers found that some patients seemingly inexplicable anaphylaxis was actually caused by an uncommon allergy to a molecule found naturally in red meat. They note that the allergy, which is linked to a history of a specific type of tick bite, may be difficult for patients and health care teams to identify.',
    image: 'http://1.bp.blogspot.com/-rJZzYUlroRs/UgbPDUvz5vI/AAAAAAAAMyU/pI_rCyrzkjs/s1600/11+Berries+++tf.jpg',
  },
  {
    id: 3,
    name: 'The Top 10 Sandwich Franchises',
    price: 300,

    content: 'Sandwiches are big business. The top 10 sandwich franchises from Entrepreneurs Franchise 500 ranking, all rest comfortably in the top 200. The franchises that made the cut are serving healthier meal options at a prices todays consumer can stomach ($5 Footlong sound familiar?). As the quick-service industry continues to move toward convenience, variety and nutrition, sandwich franchises (both big and small) are stepping up to the plate.',
    image: 'https://i.pinimg.com/originals/4c/51/00/4c51008c37290b26efd2c441319c6ca5.jpg',
  },
  {
    id: 4,
    name: 'These foods will lower your risk of heart disease',
    price: 300,

    content: 'While rare, some people experience recurrent episodes of anaphylaxis -- a life-threatening allergic reaction -- for which the triggers are never identified. Recently, researchers found that some patients seemingly inexplicable anaphylaxis was actually caused by an uncommon allergy to a molecule found naturally in red meat. They note that the allergy, which is linked to a history of a specific type of tick bite, may be difficult for patients and health care teams to identify.',
    image: 'https://www.irishtimes.com/polopoly_fs/1.2183551.1429615244!/image/image.jpg_gen/derivatives/box_620_330/image.jpg',
  },
  {
    id: 5,
    name: 'Health Check: what’s better for you, fresh, dried or frozen fruit?',
    price: 300,

    content: 'While rare, some people experience recurrent episodes of anaphylaxis -- a life-threatening allergic reaction -- for which the triggers are never identified. Recently, researchers found that some patients seemingly inexplicable anaphylaxis was actually caused by an uncommon allergy to a molecule found naturally in red meat. They note that the allergy, which is linked to a history of a specific type of tick bite, may be difficult for patients and health care teams to identify.',
    image: 'https://images1.laweekly.com/imager/u/original/8662891/tsubakilr004.jpg',
  },
  {
    id: 6,
    name: 'US doughnut giants make deforestation-free pledge',
    price: 300,

    content: 'While rare, some people experience recurrent episodes of anaphylaxis -- a life-threatening allergic reaction -- for which the triggers are never identified. Recently, researchers found that some patients seemingly inexplicable anaphylaxis was actually caused by an uncommon allergy to a molecule found naturally in red meat. They note that the allergy, which is linked to a history of a specific type of tick bite, may be difficult for patients and health care teams to identify.',
    image: 'http://www.eco-business.com/media/_versions/ebmedia/fileuploads/shutterstock_193954523_news_featured.jpg',
  },
];

const branches = [{
    id: 1,
    name: 'Diet Club - Wattala',
    member: 'Jullie',
    events: 'Event 1',
    image: 'http://www.food-management.com/sites/food-management.com/files/styles/article_featured_standard/public/turnrowtotailgate.jpg?itok=PyiOBxaP',
  }, {
    id: 2,
    name: 'Diet Club - Union Place',
    member: 'Kate',
    events: 'Event 2',
    image: 'https://i.pinimg.com/564x/60/22/fc/6022fc65e04389ab3355223ee8575f90--fresh-bar-design-juice-bar-design-ideas.jpg',
  },
  {
    id: 3,
    name: 'Diet Club - Malabe',
    member: 'Jackie',
    events: 'Event 3',
    image: 'http://www.ccs-ind.com/content/images/2014/12/nekter-overall-shop.JPG',
  },
  {
    id: 4,
    name: 'Diet Club - Nugegoda',
    member: 'Anne',
    events: 'Event 4',
    image: 'http://retailrestaurantfb.com/media/k2/items/cache/4eddcf52ae3c01c5072841687dd64dbd_XL.jpg',
  },
  {
    id: 5,
    name: 'Diet Club - Paliyagoda',
    member: 'Kia',
    events: 'Event 5',
    image: 'https://www.wellandgood.com/wp-content/uploads/2013/10/Grass-Roots-Juicery.jpg',
  },
  {
    id: 6,
    name: 'Diet Club - Dehiwala',
    member: 'Misha',
    events: 'Event 6',
    image: 'https://static1.squarespace.com/static/544607fee4b0664ae93e92db/t/55431bf2e4b05386c5561710/1430461429529/IMG_0974.JPG?format=1500w',
  },
];

/**
 * Returns all smoothie objects
 * @return {Array} The Smoothie array
 */
const getAllSmoothies = () => smoothies;

const getAllNewsletters= () => newsletters;

const getAllBranches= () => branches;

export {
  getAllSmoothies, getAllNewsletters, getAllBranches
};
