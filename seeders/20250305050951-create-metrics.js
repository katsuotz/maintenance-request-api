'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('metrics', [
      {
        id: 1,
        openRequests: 0,
        urgentRequests: 0,
        avgDaysToResolve: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('metrics', null, {});
  }
};
