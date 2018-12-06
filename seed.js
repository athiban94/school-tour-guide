const dbConnection = require("./config/mongoConnection");
const schools = require("./data/schools");
const restraunts = require("./data/restaurants")


const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();
  
  const firstSchool = await schools.addSchool({
    name: "Stevens Institute of Technology",
    img:  "/images/stevens.png"
  })
  

  const restraunt1 = await restraunts.addRestaurant({
    name: "Pierce Cafe" ,
    schoolid: firstSchool._id,
    score: 0,
    logoimg: "/images/restaurants/stevens/pierce_cafe.jpg",
    description: "Pierce Cafe features Peet’s Coffee & Mighty Leaf Tea, Grab & Go salads, sandwiches, snacks, smoothies, desserts & more.  Don’t forget to try our new daily drink specials!",
    address: "Wesley J. Howe Center, 2nd Floor",
    comments:[]

  })

  const restraunt2 = await restraunts.addRestaurant({
    name: "Pierce Dining Hall",
    schoolid: firstSchool._id,
    score: 0,
    logoimg: "/images/restaurants/stevens/pierce_dining_hall.jpg",
    description: "Pierce DIning hall description test! Some test! Still testing",
    address: "Example location is posted here",
    comments: []

  })

  const restraunt3 = await restraunts.addRestaurant({
    name: "Red Grey Dining",
    schoolid: firstSchool._id,
    score: 0,
    logoimg: "/images/restaurants/stevens/red_grey.jpg",
    description: "Red Grey Dining description test! Some test! Still testing",
    address: "Example location is posted here",
    comments: []

  });

  const restraunt4 = await restraunts.addRestaurant({
    name: "Americas Cup",
    schoolid: firstSchool._id,
    score: 0,
    logoimg: "/images/restaurants/stevens/americas_cup.jpg",
    description: "Americas Cup description test! Some test! Still testing",
    address: "Example location is posted here",
    comments: []

  });

  
  

  

  console.log("Done seeding database");
  await db.serverConfig.close();
};

main().catch(console.log);
