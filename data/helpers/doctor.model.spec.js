// our connection to the database
const db = require('../dbConfig.js');

// the data access file we are testing
const doctors = require('./doctorModel.js');

describe('doctors model', () => {
  describe('insert()', () => {
    // this example uses async/await to make it easier to read and understand
    it('should insert the provided doctors into the db', async () => {
      // this code expects that the table is empty, we'll handle that below
      // add data to the test database using the data access file
      await doctors.insert({ name: 'doo little' });
      await doctors.insert({ name: 'doo little 2' });
      
      // read data from the table
      const doctors = await db('doctors');

      // verify that there are now two records inserted
      expect(doctors).toHaveLength(2);
    });
  });

  beforeEach(async () => {
    // this function executes and clears out the table before each test
    await db('doctors').truncate();
  });
});