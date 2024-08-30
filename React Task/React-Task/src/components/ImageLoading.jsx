import {useRecoilValue, useSetRecoilState } from "recoil";
import LoaderSpinner from "./LoaderSpinner";
import { imageLoadingState } from "../Services/Recoil";

const ImageLoading = ({ src, alt, productId,size }) => {
  const isImageLoading = useRecoilValue(imageLoadingState(productId));
  const setImageLoading = useSetRecoilState(imageLoadingState(productId));
  return ( 
    <>
      {isImageLoading && (
        <LoaderSpinner color="black" loading={isImageLoading} size={50} />
      )}
      <img
        src={src} 
        alt={alt}
        className={`${size === true ? "w-full rounded-2xl" : "w-16 h-16 rounded-full"} object-cover mx-auto`}
        onLoad={() => setImageLoading(false)}
        style={{ display: isImageLoading ? "none" : "block" }}
      />
    </>
  );
};
export default ImageLoading;
