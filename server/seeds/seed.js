const db = require('../config/connection');
const { User, Bit } = require('../models');
const userSeeds = require('./userSeeds.json');
const bitSeeds = require('./bitSeeds.json');

db.once('open', async () => {
  try {
    await Bit.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < bitSeeds.length; i++) {
      const { _id, bitAuthor } = await Bit.create(bitSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: bitAuthor },
        {
          $addToSet: {
            bits: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});