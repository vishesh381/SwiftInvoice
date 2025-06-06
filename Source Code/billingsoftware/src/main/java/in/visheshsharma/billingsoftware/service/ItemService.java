package in.visheshsharma.billingsoftware.service;

import in.visheshsharma.billingsoftware.io.ItemRequest;
import in.visheshsharma.billingsoftware.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file) throws IOException;

    List<ItemResponse> fetchItems();

    void deleteItem(String itemId);
}
