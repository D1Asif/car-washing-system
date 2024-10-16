import config from "../../config"
import { TPaymentData } from "./payment.interface";

export const payment = async (paymentData: TPaymentData) => {
    const paymentBody = {
        store_id: "aamarpaytest",
        tran_id: paymentData.transactionId,
        success_url: `${config.deployment_url}api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success&bookingId=${paymentData.bookingId}`,
        fail_url: `${config.deployment_url}api/payment/confirmation?status=failure`,
        cancel_url: config.frontend_deployment_url,
        amount: paymentData.amount,
        currency: "USD",
        signature_key: config.payment_signature_key,
        desc: "Booking Payment",
        cus_name: paymentData.customerName,
        cus_email: paymentData.customerEmail,
        cus_phone: paymentData.customerPhone,
        type: "json"
    }

    const res = await fetch(config.payment_api_url as string, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(paymentBody)
    })

    const data = await res.json();

    return data;
}

export const verifyPayment = async (transactionId: string) => {
    const res = await fetch(`${config.payment_verification_url}?request_id=${transactionId}&store_id=${config.payment_store_id}&signature_key=${config.payment_signature_key}&type=json`);

    const data = res.json();

    return data;
}

export const getTemplate = (message: string) => {
    return `
        <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Payment Confirmation</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
                    rel="stylesheet">
                <style>
                    body {
                        font-family: 'Roboto', sans-serif;
                    }
                </style>
            </head>

            <body>
                <div
                    style="display: flex; flex-direction: column; align-items: center; justify-content: center; height:100svh; font-size: xx-large;">
                    ${message}
                    <a
                        href="https://car-washing-system-client-sigma.vercel.app/"
                        style="margin-top: 20px; background: #006adb; color: white; border: none; padding: 10px; border-radius: 10px; font-size: large; text-decoration: none;">
                        Go to Home
                    </a>
                </div>
            </body>

        </html>
    `
}