const db = require('../db');
const User = require('./user')
const Item = require('./item')
const List = require('./list')
const ListAccess = require('./listAccess')
const ItemUserList = requrie('./itemUserList')
const Store = require('./store')
const StorePreference = require('./storePreference')
const Notification = require('./notification')

//Associations
User.hasMany(Item, { through: ItemUserList, foreignKey: userId })
Item.hasMany(User, { through: ItemUserList, foreignKey: itemId })

User.belongsToMany(List, { through: ListAccess, foreignKey: userId })
List.belongsToMany(User, { through: ListAccess, foreignKey: listId })

List.hasMany(Item, { through: ItemUserList, foreignKey: listId })
ItemUserList.belongsTo(List)

User.belongsToMany(Store, { through: StorePreference, foreignKey: userId })
Store.belongsToMany(User, { through: StorePreference, foreignKey: storeId })

User.hasMany(Notification)
Notification.hasOne(User)


module.exports = {
    db,
    User,
    Item,
    List,
    ListAccess,
    ItemUserList,
    Store,
    StorePreference,
    Notification,
}