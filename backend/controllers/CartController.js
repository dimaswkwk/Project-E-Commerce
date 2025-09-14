const client = require('../config/database')

const GetCart = async (req, res) => {
    try {
        const userId = req.data.id
        const result = await client.query(`
       SELECT cart_items.id, cart_items.product_id, cart_items.quantity, product.image, product.name, product.price 
       FROM cart_items JOIN product ON cart_items.product_id = product.id where cart_items.user_id = $1`,[userId]);
        res.json(result.rows)
    } catch (err) {
        res.status(500).send({error: err})
    }
}

const PostCart = async (req,res) => {
    try {
        const userId = req.data.id
        // id itu punya product
        const {id : productId, quantity, stock } = req.body

        // cek apakah product sudah ada di cart_items
        let itemResult = await client.query(`SELECT id FROM cart_items WHERE user_id = $1 AND product_id = $2`, [userId, productId]);
        // jika sudah ada update quantitynya
        if (itemResult.rows.length > 0) {
        await client.query(`UPDATE cart_items SET quantity = quantity + $1 WHERE id = $2`, [quantity, itemResult.rows[0].id]);
        await client.query(`UPDATE product SET stock = stock - $1 where id = $2`, [productId, stock])
        } else {
        // jika belum ada nanti insert / tambahkan item baru
        await client.query(`INSERT INTO cart_items(user_id, product_id, quantity) VALUES ($1,$2,$3)`,[userId, productId, quantity]);
        await client.query(`UPDATE product SET stock = stock - $1 where id = $2`, [productId, stock])
        }
        const productData = await client.query(`SELECT name, price from product where id = $1`,[productId])
        const cartItemResult = await client.query(`
            SELECT cart_items.id, cart_items.product_id, cart_items.quantity, product.image, product.name, product.price
            FROM cart_items JOIN product ON cart_items.product_id = product.id where cart_items.user_id = $1`,[userId]);

        res.status(200).json({
            message: "successfully added to cart",
            item: {
               cart: cartItemResult.rows[0],
               product: productData.rows[0]
            }
        })
    } catch (err) {
        res.status(500).json({error: err.message})
        console.error(err)
    }
}
const increaseQuantity = async (req,res) => {
    try {
         const {product_id} = req.body
         const userId = req.data.id
         await client.query(`UPDATE cart_items SET quantity = quantity + 1 where product_id = $1 AND user_id = $2`, [product_id, userId])
        res.json({success: true})
    } catch (err) {
        res.status(500).send({error: err})
    }
}
const decreaseQuantity = async (req,res) => {
    try {
        const {product_id} = req.body
        const userId = req.data.id
        await client.query(`UPDATE cart_items SET quantity = quantity - 1 where product_id = $1 AND user_id = $2 AND quantity > 1`, [product_id, userId])

        await client.query(`DELETE FROM cart_items WHERE product_id = $1 AND user_id = $2 AND quantity <= 0`, [product_id,userId])

        res.json({success: true})
    } catch (err) {
        res.status(500).send({error: err.message})
    }
}
const DeleteCart = async (req,res) => {
    try {
        const {product_id} = req.body
        const userId = req.data.id
        await client.query(`DELETE FROM cart_items WHERE product_id = $1 AND user_id = $2`, [product_id, userId])
        res.json({success: true})
    } catch (err) {
        res.status(500).send({error: err.message})
    }
}
module.exports = { GetCart,PostCart, increaseQuantity, decreaseQuantity, DeleteCart }