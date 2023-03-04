import Product from '../../models/Product'
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let addProduct = new Product({
            title: req.body.title,
            desc: req.body.desc,
            slug: req.body.slug,
            img: req.body.img,
            category: req.body.category,
            price: req.body.price,
            prodtImage: req.body.prodtImage,
        })
        await addProduct.save();
        res.status(200).json({ success: "Item added succesfully!" })
    }
    else {
        res.status(400).json({ error: "Item not added!" })
    }
}

export default connectDb(handler);