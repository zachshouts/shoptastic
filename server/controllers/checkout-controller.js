const stripe = require('stripe')(process.env.STRIPE_KEY);

module.exports = {
    async checkoutSession(req, res) {
        const priceArr = req.body.Price;
        const quantityArr = req.body.Quantity;
        
        const lineItemsArr = [];
        for (let i = 0; i < priceArr.length; i++) {
            lineItemsArr.push({ price: priceArr[i], quantity: quantityArr[i] });
        };

        const session = await stripe.checkout.sessions.create({
            line_items: lineItemsArr,
            mode: 'payment',
            success_url: `http://localhost:3000/`,
            cancel_url: `http://localhost:3000/`
        });

        res.redirect(303, session.url);
    }
}

