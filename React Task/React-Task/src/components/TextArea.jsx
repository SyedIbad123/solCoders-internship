
const TextArea = ({setReview,review}) => {

  function handleChange(e){
    const value = e.target.value;

    setReview((prev) => {
      return {
        ...prev,
        comment: value
      }
    });
  }

  
  return (
    <div className='w-full flex flex-col p-8 justify-start items-center'>
        <h1 className='text-center p-10 font-bold text-4xl'>Submit Your Review</h1>
        <textarea className='w-3/4 rounded-lg p-2 outline-none resize-none' name="review" id="review" placeholder='Your Review' value={review?.comment}  onChange={handleChange}></textarea>  
    </div>
  ) 
}

export default TextArea