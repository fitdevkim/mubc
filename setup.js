const mongoose = require("mongoose");
const config = require("./config/database");
const data = [
  {
    sectionType: "about-banksia",
    desc: "~ Please enter about banksia description ",
    name: "About Banksia"
  },
  {
    sectionType: "about-mubc",
    desc: "~ Please enter about us description ",
    name: "About Banksia Court"
  },
  {
    sectionType: "cultural",
    desc: "~ Please enter about cultural description ",
    name: "Cultural Importance"
  },
  {
    sectionType: "environment",
    desc: "~ Please enter about environment description ",
    name: "Environment Importance"
  },
  {
    sectionType: "notice",
    name: "Notice",
    desc: "~ Please leave empty if notice is not needed"
  }
];

// Connect to db
mongoose.connect(config.database, { useNewUrlParser: true });
let db = mongoose.connection;

// Open db connection
db.once("open", () => {});

// Check db connection
db.once("open", () => {
  console.log("Checking Database...");
});

// Bring in about model
let About = require("./models/aboutsection");

// Check if about sections has been created
About.find({}, (err, sections) => {
  if (err) {
    console.log(err);
    process.exit();
  } else {
    if (sections.length === 0) {
      let cnt = 0;
      data.forEach(sect => {
        let as = new About();
        as.sectionType = sect.sectionType;
        as.name = sect.name;
        as.desc = sect.desc;
        as.save(err => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Section Type (${as.name}): Successfully saved to database`);
            cnt++;
            if (cnt == 5) {
              console.log("Setup Done");
              process.exit();
            }
          }
        });
      });
    } else {
      console.log("About Sections already exists in the database.");
      process.exit();
    }
  }
});
