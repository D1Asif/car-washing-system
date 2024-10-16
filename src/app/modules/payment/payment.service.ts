import { Booking } from "../booking/booking.model";
import { verifyPayment } from "./payment.util"
import { readFileSync } from "fs"
import { join } from "path"

const confirmPaymentIntoDB = async (query: Record<string, unknown>) => {
    const { transactionId, status, bookingId } = query;

    console.log("before verification");

    const verificationResponse = await verifyPayment(transactionId as string);

    console.log("after verification", verificationResponse);

    let result;
    let message;

    if (verificationResponse && verificationResponse.pay_status === 'Successful' && status === 'success') {
        result = await Booking.findByIdAndUpdate(
            bookingId,
            { paymentStatus: 'paid' },
            { new: true }
        )

        message = "Payment Successful!"
    } else {
        message = "Payment failed!"
    }

    console.log(result, "booking");

    const filePath = join(__dirname, "./confirmation.html")
    let template = readFileSync(filePath, 'utf-8')

    console.log("After join");

    template = template.replace('{{msg}}', message);

    console.log(template);

    return template;
}

export const PaymentServices = {
    confirmPaymentIntoDB
}