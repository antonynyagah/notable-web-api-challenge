const db = require('../dbConfig.js');

// the data access file we are testing
const Appointments = require('./actionsModel.js.js');

describe('projects model', () => {
  describe('insert()', () => {
    // this example uses async/await to make it easier to read and understand
    it('should insert the provided projects into the db', async () => {
      // this code expects that the table is empty, we'll handle that below
      // add data to the test database using the data access file
      await Appointments.insert({ name: 'doctor' });
      await Appointments.insert({ name: 'date' });
      
      // read data from the table
      const appointments = await db('appointments');

      // verify that there are now two records inserted
      expect(appointments).toHaveLength(2);
    });
  });

  beforeEach(async () => {
    // this function executes and clears out the table before each test
    await db('appointments').truncate();
  });
});