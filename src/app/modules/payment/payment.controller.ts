import catchAsync from "../../utils/catchAsync";
import { PaymentServices } from "./payment.service";

const confirmPayment = catchAsync(async (req, res) => {
    console.log("hello");
    const result = await PaymentServices.confirmPaymentIntoDB(req.query);

    res.send(result);
})

export const PaymentControllers = {
    confirmPayment
}