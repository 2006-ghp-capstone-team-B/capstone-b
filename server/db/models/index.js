const User = require('./user')
const Item = require('./item')
const List = require('./list')
const ListAccess = require('./listAccess')
const ItemUserList = require('./itemUserList')
const Store = require('./store')
const StorePreference = require('./storePreference')
const Notification = require('./notification')

//Associations
User.belongsToMany(Item, { through: ItemUserList, foreignKey: "userId" })
Item.belongsToMany(User, { through: ItemUserList, foreignKey: "itemId" })

User.belongsToMany(List, { through: ListAccess, foreignKey: "userId" })
List.belongsToMany(User, { through: ListAccess, foreignKey: "listId" })

List.belongsToMany(Item, { through: ItemUserList, foreignKey: "listId" })
Item.belongsToMany(List, { through: ItemUserList, foreignKey: "itemId" })

User.belongsToMany(Store, { through: StorePreference, foreignKey: "userId" })
Store.belongsToMany(User, { through: StorePreference, foreignKey: "storeId" })

User.hasMany(Notification)
Notification.belongsTo(User)


// User.belongsToMany(Item, { through: "ItemUserList" })
// Item.belongsToMany(User, { through: "ItemUserList" })

// User.belongsToMany(List, { through: "ListAccess" })
// List.belongsToMany(User, { through: "ListAccess" })

// List.belongsToMany(Item, { through: "ItemUserList"})
// Item.belongsToMany(List, { through: "ItemUserList" })

// User.belongsToMany(Store, { through: "StorePreference"})
// Store.belongsToMany(User, { through: "StorePreference"})

// User.hasMany(Notification)
// Notification.belongsTo(User)


module.exports = {
    User,
    Item,
    List,
    ListAccess,
    ItemUserList,
    Store,
    StorePreference,
    Notification,
}