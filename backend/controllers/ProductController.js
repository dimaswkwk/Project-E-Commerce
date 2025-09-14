const { slugify } = require('../utils/slugify')
const client = require('../config/database');

const getProduct = async (req, res) => {
    try {
        const result = await client.query(`select id, name, price, stock, image, store_name, slug from product ORDER BY id ASC `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error : err.message});
    }
}

const PostProduct = async (req, res) => {
    try {
        console.log('request body:', req.body);
        console.log('uploaded file', req.file);
        const { name, price, stock, description, store_name } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
        // saat insert product nanti otomatis generate slugnya
        const slug = slugify(name);
        console.log('About to insert:', { name, price, stock, imagePath, description, store_name, slug });
        const result = await client.query(`INSERT INTO product ( name, price, stock, image, description, store_name, slug) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [ name, price, stock, imagePath, description, store_name,slug]
        );

        console.log('data woii plis', result);
        console.log('data: ',result.rowCount)

        res.json({
            message: 'Product Added Successfully',
            data: result.rows,
            slug: slug
        });
    } catch (error) {
      res.status(500).json({
          error: error.message,
          stack : error.stack
      });
    }
}
const GetByProduct = async (req, res) => {
    try {
    const { slug } = req.params;
    console.log ("received slug :",slug);

    const result = await client.query(`select * from product WHERE slug = $1`,
        [slug]
    );
    console.log('data woii plis', result.rows);

    if (result.rows.length === 0) {
        return res.status(404).json({error: 'Product not found'});
    }
 res.json(result.rows[0])
    } catch(error) {
        res.status(500).json({
            error : error.message,
            stack : error.stack
        });
    }
}
module.exports = {getProduct , PostProduct, GetByProduct};