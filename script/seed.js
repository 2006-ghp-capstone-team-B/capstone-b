'use strict'

const db = require('../db')
const {User, Item, List, Store, StorePreference, Notification, ItemUserList, ListAccess} = require('../db/models')
const {user, item, list, store, storePreference, notification, itemUserList, listAccess} = require('./seed/index')


async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const dummyUser = await User.bulkCreate(user, {
    returning: true
  })

  const dummyItem = await Item.bulkCreate(item, {
    returning: true
  })

  const dummyList = await List.bulkCreate(list, {
    returning: true
  })

  const dummyStore = await Store.bulkCreate(store, {
    returning: true
  })

  const dummyStorePreference = await StorePreference.bulkCreate(storePreference, {
    returning: true
  })


  const dummyNotification = await Notification.bulkCreate(notification, {
    returning: true
  })



  const dummyItemUserList = await ItemUserList.bulkCreate(itemUserList, {
    returning: true
  })


  const dummyListAccess = await ListAccess.bulkCreate(listAccess, {
    returning: true
  })

  console.log(`seeded ${dummyUser.length} users`)
  console.log(`seeded ${dummyItem.length} items`)
  console.log(`seeded ${dummyList.length} lists`)
  console.log(`seeded ${dummyStore.length} stores`)
  console.log(`seeded ${dummyStorePreference.length} store preferences`)
  console.log(`seeded ${dummyNotification.length} notifications`)
  console.log(`seeded ${dummyItemUserList.length} itemUserLists`)
  console.log(`seeded ${dummyListAccess.length} listAccesses`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
