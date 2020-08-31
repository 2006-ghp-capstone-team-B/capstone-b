const router = require('express').Router()
const { List, ListAccess, ItemUserList, Item } = require('../db/models')


//all the lists
// router.get('/', async (req, res, next) => {
//     try {
//         const lists = await List.findAll()
//         res.json(lists)
//     } catch (error) {
//         next(error)
//     }
// })


// route for api/lists/:listId
router.get('/private/:userId', async (req, res, next) => {
    try {
        const listPrivate = await ListAccess.findOne({
            where: {
                userId: req.params.userId,
                category: 'private'
            },
        })
        const listItems = await ItemUserList.findAll({
            where: { listId: listPrivate.listId },
            include: { model: Item }
        })
        res.json(listItems)
    } catch (error) {
        next(error)
    }
})

router.get('/household/:listId', async (req, res, next) => {
    try {
        const listItems = await ItemUserList.findAll({
            where: { listId: req.params.listId },
            include: { model: Item }
        })
        res.json(listItems)
    } catch (error) {
        next(error)
    }
})

//create new household list
router.post("/", async (req, res, next) => {
    try {
        console.log("~~~~~~~~~this is req/body", req.body)
        const newList = await List.create({
            listName: req.body,
        })
        res.json(newList)
    } catch (error) {
        next(error)
    }
})

//update item quantity
router.put("/:listId/:itemId", async (req, res, next) => {
    try {
        console.log("in put request")
        console.log("this is req.body", req.body)
        const item = await ItemUserList.findOne({
            where: {
                listId: req.params.listId,
                itemId: req.params.itemId
            }
        })
        console.log("this is the item we found to update", item)
        const updatedItem = await item.update({ quantity: req.body.quantity })
        console.log("this is updateditem", updatedItem)
        res.json(updatedItem)
    } catch (error) {
        console.log(error)
    }
})

//DELETE sinle item
router.delete("/:listId/:itemId", async (req, res, next) => {
    try{
        const deletedItem = await ItemUserList.destroy({where: {
            listId: req.params.listId,
            itemId: req.params.itemId
        }})
        res.json(deletedItem)
    }catch(error){
        console.log(error)
    }
})


module.exports = router
