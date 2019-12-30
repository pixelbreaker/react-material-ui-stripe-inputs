"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useStripe = function (apiKey) {
    // guard against SSR
    if (typeof window === undefined) {
        return null;
    }
    var loadTimer = react_1.useRef(null);
    var _a = react_1.useState(null), stripe = _a[0], setStripe = _a[1];
    // initiate stripe js
    if (document.getElementById('stripe-js') !== undefined &&
        window.Stripe === undefined) {
        var script = document.createElement('script');
        script.async = true;
        script.id = 'stripe-js';
        script.src = 'https://js.stripe.com/v3/';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
        // check if the stripe scripts are loaded before rendering the form
        react_1.useEffect(function () {
            loadTimer.current = setInterval(function () {
                if (window.Stripe !== undefined) {
                    setStripe(window.Stripe(apiKey));
                    clearInterval(loadTimer.current);
                }
            }, 100);
            return function () {
                clearInterval(loadTimer.current);
            };
        }, []);
    }
    return stripe;
};
exports.useStripe = useStripe;
