import AppError from "../../errors/AppError";
import { Booking } from "../booking/booking.model";
import { getTemplate, verifyPayment } from "./payment.util"
import { readFileSync } from "fs"
import { join } from "path"

const confirmPaymentIntoDB = async (query: Record<string, unknown>) => {
    const { transactionId, status, bookingId } = query;

    const verificationResponse = await verifyPayment(transactionId as string);

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

    const template = getTemplate(message);

    return template;

    // try {
    //     const filePath = join(__dirname, "./confirmation.html")
    //     let template = readFileSync(filePath, 'utf-8')

    //     template = template.replace('{{msg}}', message);

    //     console.log(template);

    //     return template;
    // } catch (err: Error | any) {
    //     throw new AppError(500, err)
    // }
}

export const PaymentServices = {
    confirmPaymentIntoDB
}