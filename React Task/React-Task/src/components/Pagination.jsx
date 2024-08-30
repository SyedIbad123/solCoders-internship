
const Pagination = ({item}) => {
  
  
  console.log("item in pagination : ", item);


  const totalPages = Math.ceil(item?.total/item?.limit);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="overflow-x-scroll">
        <ul className="flex justify-end gap-6 p-8 font-semibold">
          <li className="border-gray-500 border-2 p-2 rounded-lg cursor-pointer"><a href="">Previous</a></li>
          {pageNumbers && pageNumbers.map((number,index) => (
            <li className="border-gray-900 border-2 py-2 px-4 bg-slate-900 text-red-600 rounded-lg cursor-pointer" key={index}><a href="">{number}</a></li>
          ))}
            <li className="border-gray-500 border-2 py-2 px-4 rounded-lg cursor-pointer"><a href="">Next</a></li>
        </ul>
    </div>
  )
}

export default Pagination;