package in.visheshsharma.billingsoftware.service;

import com.razorpay.RazorpayException;
import in.visheshsharma.billingsoftware.io.RazorpayOrderResponse;

public interface RazorpayService {

    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
