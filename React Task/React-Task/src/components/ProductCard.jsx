import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleProductState, loadingState } from "../Services/Recoil";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ToastFailure } from "../Services/ToastService";
import LoaderSpinner from "./LoaderSpinner";
import ImageLoading from "./ImageLoading";
import TextArea from "./TextArea";
import RatingReview from "./RatingReview";
import Button from "./Button";
import RelatedProducts from "./RelatedProducts";

const ProductCard = () => {
  const [singleProduct, setSingleProduct] = useRecoilState(singleProductState);
  const productLoading = useRecoilValue(loadingState);
  const setProductLoading = useSetRecoilState(loadingState);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({comment: "", rating: 0, reviewerEmail:"ibad@gmail.com", reviewerName:"Ibad"});

  const { id } = useParams();
  const starRating = 5;
  const starRatingArr = Array.from({ length: starRating }, (_, i) => i + 1);
  const starRatingFill = Math.ceil(singleProduct.rating);
  const discount = singleProduct.discountPercentage;
  const discountPrice =
    singleProduct.price - (singleProduct.price * discount) / 100;

  useEffect(() => {
    async function handleSingleProduct() {
      if (id) {
        const url = `https://dummyjson.com/products/${id}`;
        setProductLoading(true);
        try {
          const res = await fetch(url);
          const body = await res.json();
          if (res.ok && res.status === 200) {
            setSingleProduct(body);
            const newReviews = JSON.parse(localStorage.getItem("reviews"));
            if (newReviews?.length) {
              setReviews(newReviews);
            } else {
              setReviews(body?.reviews);
            }
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
  }, [id]);

  function handleReviewClick(e) {
    e.preventDefault();
    const newReviews = [...reviews, review];  // important note: this is a shallow copy
    setReviews(newReviews);
    setReview({ comment: "", rating: 0 });
    localStorage.setItem("reviews", JSON.stringify(newReviews));
  }

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
                      <h4 className="line-through">${singleProduct?.price}</h4>
                      <h4 className="underline font-semibold">
                        ${discountPrice?.toFixed(2)}
                      </h4>
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
                      key={index}
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

          <div className="w-full pb-40 flex flex-col gap-2 bg-yellow-100">
            <h1 className="text-center font-extrabold text-6xl p-20">
              Reviews
            </h1>

            <div className="w-4/5 h-60 justify-center items-center m-6 mt-10 ml-28 flex flex-row flex-wrap gap-10">
              {singleProduct &&
                reviews?.map((review, index) => (
                  <div
                    key={index}
                    className="h-auto flex flex-col flex-wrap gap-4 p-4 bg-white shadow-2xl rounded-lg"
                  >
                    <div>
                      <h1 className="font-bold text-lg">
                        {review?.reviewerName}
                      </h1>
                    </div>
                    <div>
                      <h3>{review?.reviewerEmail}</h3>
                      <h4 className="underline">{review?.comment}</h4>
                      <h4>{review?.rating}</h4>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="w-full flex flex-col bg-red-400 items-center p-10">
            <TextArea setReview={setReview} review={review} />
            <RatingReview review={review} setReview={setReview} />
            <Button
              type="submit"
              category="Submit"
              className="bg-black text-white ml-[-28px]"
              onClick={handleReviewClick}
            />
          </div>

          <div>

            <div className="w-full h-screen">
              <RelatedProducts singleProduct={singleProduct}/>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductCard;
