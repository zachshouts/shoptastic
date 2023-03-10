const stripe = require('stripe')(process.env.STRIPE_KEY);

module.exports = {
    async checkoutSession(req, res) {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: 'price_1MjtdeGFNcYX1JBmGG0DZNYC',
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/`,
            cancel_url: `http://localhost:3000/`
        });

        res.redirect(303, session.url);
    }
}