import Input from "./Input.jsx";
import { searchProductState } from "../Services/Recoil.js";
import { useRecoilState } from "recoil";
import { useCallback } from "react"; 

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const SearchInput = ({ item, setProducts }) => {
  const [search, setSearch] = useRecoilState(searchProductState);

  const handleChange = useCallback(
    debounce(async (e) => {
      const query = e.target.value.toLowerCase();
      setSearch(query);
      if(query === ""){
        setProducts(item);
        return;
      }
      const filteredProducts = item?.products.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
      setProducts({
        ...item,
        products: filteredProducts.length > 0 ? filteredProducts : [],
        total: filteredProducts.length, 
      });

    }, 200),
    [item, setProducts, setSearch]
  );

  return (
    <div className="w-full">
      <Input
        type="text"
        name="search"
        className="w-6/12 p-2 m-2 border border-gray-500 rounded-md"
        placeholder="Search..."
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
