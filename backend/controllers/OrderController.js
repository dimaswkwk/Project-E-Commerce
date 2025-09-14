const client = require('../config/database')

const GetOrder = async (req,res) => {
    try {
        await client.query(`BEGIN`)
        const userId = req.data.id
        const itemCartResult = await client.query

        (
        `SELECT cart_items.product_id, cart_items.quantity, product.price from cart_items 
         JOIN product ON product.id = cart_items.product_id WHERE cart_items.user_id = $1`, [userId]
        )

        const cartItems = itemCartResult.rows
        if (cartItems.length === 0) {
            await client.query(`ROLLBACK`)
            res.status(404).json({error: 'keranjang kosong'})
        }
        // reduce adalah fungsi yang melakukan perulangan pada setiap elemen di dalam aray cartItems
        // di kode ini cartitems menjadi item yang memanggil harga dan quantity
        const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const orderResult = await client.query(`INSERT INTO orders (user_id, total, status) VALUES ( $1, $2, $3 ) RETURNING id`,[userId, totalAmount, 'pending']);

        // mengambil id dari orders
        const orderId = orderResult.rows[0].id
        const orderItemsQuery ='INSERT INTO order_items (order_id, product_id, quantity, price_at_time) VALUES ( $1, $2, $3, $4 )'

        // loop memasukkan semua item ke order items
        for (const item of cartItems) {
            await client.query(orderItemsQuery, [orderId, item.product_id, item.quantity, item.price ])
        }
        //kalau berhasil nanti keranjangnya akan dihapus
        await client.query(`DELETE FROM cart_items where user_id = $1`, [userId])

        await client.query(`COMMIT`)
        res.status(200).json({
            id: orderId,
            message: 'berhasil mengorder barang!'
        })
        console.log('user id: ',userId)
        console.log("total amount",totalAmount)
        console.log("cart item:",cartItems)
        console.log("order id :",orderId)
    } catch (err) {
        await client.query(`ROLLBACK`)
        res.status(500).json({error: err.message})
    }
}
module.exports =  {GetOrder}
