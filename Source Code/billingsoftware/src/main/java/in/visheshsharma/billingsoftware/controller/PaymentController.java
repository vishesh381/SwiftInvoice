package in.visheshsharma.billingsoftware.controller;

import com.razorpay.RazorpayException;
import in.visheshsharma.billingsoftware.io.OrderResponse;
import in.visheshsharma.billingsoftware.io.PaymentRequest;
import in.visheshsharma.billingsoftware.io.PaymentVerificationRequest;
import in.visheshsharma.billingsoftware.io.RazorpayOrderResponse;
import in.visheshsharma.billingsoftware.service.OrderService;
import in.visheshsharma.billingsoftware.service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException {
        ////4386 2894 0766 0153
        return razorpayService.createOrder(request.getAmount(), request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request) {
        return orderService.verifyPayment(request);
    }
}
