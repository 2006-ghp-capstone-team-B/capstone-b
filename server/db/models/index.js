const User = require("./user");
const Item = require("./item");
const List = require("./list");
const ListAccess = require("./listAccess");
const ItemUserList = require("./itemUserList");
const Store = require("./store");
const StorePreference = require("./storePreference");
const Notification = require("./notification");

//Associations
User.belongsToMany(List, { through: ListAccess, foreignKey: "userId" });
List.belongsToMany(User, { through: ListAccess, foreignKey: "listId" });

User.belongsToMany(Store, { through: StorePreference, foreignKey: "userId" });
Store.belongsToMany(User, { through: StorePreference, foreignKey: "storeId" });

StorePreference.belongsTo(Store);
ListAccess.belongsTo(List)

User.hasMany(Notification);
Notification.belongsTo(User);

ItemUserList.belongsTo(User, { targetKey: "id", foreignKey: "userId" });
ItemUserList.belongsTo(List, { targetKey: "id", foreignKey: "listId" });
ItemUserList.belongsTo(Item, { targetKey: "id", foreignKey: "itemId" });


module.exports = {
  User,
  Item,
  List,
  ListAccess,
  ItemUserList,
  Store,
  StorePreference,
  Notification,
};
