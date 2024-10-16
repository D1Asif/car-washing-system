import config from "../../config"
import { TPaymentData } from "./payment.interface";

export const payment = async (paymentData: TPaymentData) => {
    const paymentBody = {
        store_id: "aamarpaytest",
        tran_id: paymentData.transactionId,
        success_url: `http://localhost:5000/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success&bookingId=${paymentData.bookingId}`,
        fail_url: `http://localhost:5000/api/payment/confirmation?status=failure`,
        cancel_url: "http://localhost:5000/",
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