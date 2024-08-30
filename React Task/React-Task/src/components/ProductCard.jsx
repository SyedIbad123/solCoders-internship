import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { singleProductState, loadingState } from "../Services/Recoil";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ToastFailure } from "../Services/ToastService";
import LoaderSpinner from "./LoaderSpinner";
import ImageLoading from "./ImageLoading";

const ProductCard = () => {
  const [singleProduct, setSingleProduct] = useRecoilState(singleProductState);
  const productLoading = useRecoilValue(loadingState);
  const setProductLoading = useSetRecoilState(loadingState);
  const { id } = useParams();
  const starRating = 5;
  const starRatingArr = Array.from({ length: starRating }, (_, i) => i + 1);
  const starRatingFill = Math.ceil(singleProduct.rating);
  const discount = singleProduct.discountPercentage;
  const discountPrice = singleProduct.price - (singleProduct.price * discount) / 100;

  useEffect(() => {
    async function handleSingleProduct() {
      const url = `https://dummyjson.com/products/${id}`;
      if (id) {
        setProductLoading(true);
        try {
          const res = await fetch(url);
          const body = await res.json();
          if (res.ok && res.status === 200) {
            setSingleProduct(body);
          } else {
            ToastFailure("Failed to fetch product");
          }
        } catch (error) {
          ToastFailure(error.message);
        } finally {
          setProductLoading(false);
        }
      }
    }
    handleSingleProduct();
  }, [id, setProductLoading, setSingleProduct]);

  return (
    <section className="w-full h-screen">
      {productLoading ? (
        <div className="w-full mt-60 h-full text-center">
          <LoaderSpinner color="black" loading={productLoading} size={100} />
        </div>
      ) : (
        <>
          <div>
            <h1 className="text-4xl font-bold text-center p-14">
              {singleProduct.title}
            </h1>
          </div>
          <div className="flex flex-row">
            <div className="h-lg w-6/12 p-8">
              <ImageLoading
                size={true}
                src={`${singleProduct.thumbnail}`}
                alt="productImage"
                productId={id}
              />
            </div>
            <div className=" w-full p-6 flex flex-col gap-6 h-full ml-4">
              <div>
                <h2 className="font-bold text-2xl">Description</h2>
                <p>{singleProduct.description}</p>
              </div>
              <div>
                <h2 className="font-bold text-xl">Category</h2>
                <h4>{singleProduct.category}</h4>
              </div>
              <div>
                <div>
                <h2 className="font-bold text-xl">Price</h2>
                {discount ? (
                  <div className="flex flex-row gap-8">
                    <h4 className="line-through">${singleProduct.price}</h4>
                    <h4 className="underline font-semibold">${discountPrice}</h4>
                  </div>
                ) : null}
                </div>
              </div>
              <div>
                <h2 className="font-bold text-xl">Quanity</h2>
                <h5>{singleProduct.minimumOrderQuantity}</h5>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="font-bold text-xl">Rating</h2>
                <div className="flex flex-row">
                  {starRatingArr.map((_, index) => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={index < starRatingFill ? "yellow" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth="0.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductCard;
