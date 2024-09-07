import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const RelatedProducts = ({ singleProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function handleRelatedProducts() {
      if (singleProduct) {
        const url = `https://dummyjson.com/products/category/${singleProduct.category}`;
        const res = await fetch(url);
        const body = await res.json();
        setRelatedProducts(body?.products);
      }
    }
    handleRelatedProducts();
  }, [singleProduct]);


  function handleRelatedProductsClick(productId) {
    navigate(`/productsDetails/${productId}`);
  }

  return (
    <div>
      <h1 className="text-center font-extrabold text-6xl p-20">
        Related Products
      </h1>
      <div className="w-full flex flex-row flex-wrap gap-10 justify-center items-center">
        {relatedProducts &&
          relatedProducts.length > 0 &&
          relatedProducts.map((product, index) => (
            <div
              key={index}
              className="w-3/12 flex flex-col flex-wrap gap-4 p-8 bg-white shadow-2xl rounded-lg"
            >
              <div>
                <h1 className="font-bold text-lg">{product.title}</h1>
              </div>
              <div onClick={() => handleRelatedProductsClick(product?.id)}>
                <img
                  src={product?.images[0]}
                  alt="product images"
                  className="w-16 h-16 rounded-full object-cover hover:scale-125 transition-all duration-100 cursor-pointer"
                  value={product?.id}
                />
              </div>
              <div></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
