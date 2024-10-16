import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Booking } from "../booking/booking.model";
import { verifyPayment } from "./payment.util"
import { readFileSync } from "fs"
import { join } from "path"

const confirmPaymentIntoDB = async (query: Record<string, unknown>) => {
    try {
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

        const filePath = join(__dirname, "./confirmation.html")
        let template = readFileSync(filePath, 'utf-8')

        template = template.replace('{{msg}}', message);

        return template;
    } catch (err) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Payment verification failure")
    }

}

export const PaymentServices = {
    confirmPaymentIntoDB
}