package in.visheshsharma.billingsoftware.service;

import in.visheshsharma.billingsoftware.io.OrderRequest;
import in.visheshsharma.billingsoftware.io.OrderResponse;
import in.visheshsharma.billingsoftware.io.PaymentVerificationRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrders();

    OrderResponse verifyPayment(PaymentVerificationRequest request);

    Double sumSalesByDate(LocalDate date);

    Long countByOrderDate(LocalDate date);

    List<OrderResponse> findRecentOrders();
}
