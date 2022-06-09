function remove_from_wishlist(product_id) {
    const csrf_val = $("input[name='csrfmiddlewaretoken']").val();
    var current_url = window.location.href
    $.ajax({
        url: "{% url 'wishlist:remove-item' %}",
        type: "POST",
        data: {"product_id": product_id, "is_ajax": true, "csrfmiddlewaretoken": csrf_val, "current_url": current_url},
        success: function (data) {
            if(data["status"] == true){
                console.log(data["msg"])
                if(current_url.includes("products/product-details/")){
                    my_id = '#update-wishlist-'+product_id
                    $(my_id).html(data.resp1)
                    my_orther_id= '#update-other-wishlist-'+product_id
                    $(my_orther_id).html(data.resp2)
                    my_orther_id= '#update-other-recently-wishlist-'+product_id
                    $(my_orther_id).html(data.resp2)
                } else {
                    my_id = '#update-wishlist-'+product_id
                    $(my_id).html(data.resp)
                }
                var msg = `<strong>Item removed from Wishlist !</strong>`;
                $("#wishlist-msg-success").html(msg);
                $("#wishlist-msg-success").show();
            } else {
                var msg = `<strong>Error in removing Item from Wishlist !</strong>`;
                $("#wishlist-msg-failed").html(msg);
                $("#wishlist-msg-failed").show();
                console.log("Error in adding to wishlist ! Error: "+data["msg"])
            }

        },
        error: function (error) {
            console.log(error);
        }
    });
}