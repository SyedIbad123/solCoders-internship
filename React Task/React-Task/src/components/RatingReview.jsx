const RatingReview = ({setReview,review}) => {
  const starRating = 5;
  const starRatingArr = Array.from({ length: starRating }, (_, i) => i + 1);


  function handleClick(index){
      setReview((prev)=>{
        return {
          ...prev,
          rating: index + 1
        }
      });
    }


  return (
    <>
      <div className="flex flex-row justify-start items-center p-6">
        <h5 className="mr-10  font-bold text-xl">Give Rating</h5>
        <div className="flex flex-row text-center">
          {starRatingArr.map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill={review.rating >= index + 1 ? 'yellow' : 'none'}
              viewBox="0 0 24 24"
              strokeWidth="0.5"
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => handleClick(index)}
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
    </>
  );
};

export default RatingReview;
