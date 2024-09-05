import { paginationState } from "../Services/Recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { limitProductState } from "../Services/Recoil";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Pagination = ({ item, setProducts, setOriginalProducts }) => {
  const [pagination, setPagination] = useRecoilState(paginationState);
  const limitState = useRecoilValue(limitProductState);
  const limit =
    limitState === "" || limitState <= 0 || limitState > item?.total
      ? 30
      : limitState;

  const totalPages = Math.ceil(item?.total / limit);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const truncatePageNumbers = [];

  if (totalPages <= 10) {
    truncatePageNumbers.push(...pageNumbers);
  } else {
    if (pagination >= 4) {
      truncatePageNumbers.push(1);
      if (pagination >= 5) {
        truncatePageNumbers.push("...");
      }
    }

    const startPage = Math.max(1, pagination - 2);
    const endPage = Math.min(totalPages, pagination + 3);

    for (let i = startPage; i <= endPage; i++) {
      truncatePageNumbers.push(i);
    }
    if (pagination < totalPages - 3) {
      if (pagination < totalPages - 4) {
        truncatePageNumbers.push("...");
      }
      truncatePageNumbers.push(totalPages);
    }
  }

  console.log("truncatePageNumbers : ", truncatePageNumbers);
  console.log("totalPages : ", totalPages);

  async function handlePagination(pageNumber) {
    setPagination(pageNumber);
    const skip = (pageNumber - 1) * limit;
    const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const body = await res.json();
      setProducts(body);
      setOriginalProducts(body);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useEffect(() => {
    setPagination(1);
  }, [limitState, setProducts]);

  return (
    <div>
      <ul className="flex overflow-x-auto w-full gap-6 p-8 font-semibold">
        <li
          className="border-gray-500 border-2 p-2 rounded-lg cursor-pointer"
          onClick={() => handlePagination(pagination > 1 ? pagination - 1 : 1)}
        >
          <Link href="">Previous</Link>
        </li>
        {truncatePageNumbers.map((number, index) => (
          <>
            <li
              className={`border-gray-900 border-2 py-2 px-4 hover:bg-slate-900 transition-all duration-100 text-red-600 rounded-lg cursor-pointer ${
                pagination === number ? "bg-slate-900 text-red-600" : "bg-white"
              }`}
              key={index}
              onClick={() => handlePagination(number)}
            >
              <Link>{number}</Link>
            </li>
          </>
        ))}
        <li
          className="border-gray-500 border-2 py-2 px-4 rounded-lg cursor-pointer"
          onClick={() =>
            handlePagination(
              pagination < totalPages ? pagination + 1 : totalPages
            )
          }
        >
          <Link>Next</Link>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
