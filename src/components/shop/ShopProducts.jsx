import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { apiGet } from "../../services/api/axios.methods";

function ShopProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const { data, error } = await apiGet("/api/products");
      if (data && !error) {
        console.log("data.data", data.data);
        setProducts(data.data);
      }
    }
    getProducts();
  }, []);
  return (
    <div className="shop-products-wrapper">
      <div className="shop-products-wrapper--header">
        <p className="shop-products-wrapper--header__title">Products</p>
        <p className="shop-products-wrapper--header__description">
          The products listed here are the ones that customers see in the
          ordering app.
        </p>
      </div>
      <div className="shop-products-wrapper--card-wrapper">
        {products.map((product, i) => (
          <div key={i} className="shop-products-wrapper--card-wrapper--card">
            <div className="shop-products-wrapper--card-wrapper--card__image-wrapper">
              <img src={product.gallon[0].gallon_image} alt="" />
            </div>
            <div className="shop-products-card-description">
              <p className="shop-products-card-description--name">
                {product.gallon[0].name}
              </p>
              <p className="shop-products-card-description--volume">
                {product.gallon[0].liter} Liter(s)
              </p>
              <p className="shop-products-card-description--price">
                P {product.price}
              </p>
            </div>
            <div className="shop-products-wrapper--card-wrapper--card__buttons-wrapper">
              <button>
                <Icon icon="material-symbols:delete-sharp" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopProducts;
