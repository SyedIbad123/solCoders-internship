import { useEffect,useState } from "react";
import { productState, loadingState } from "../Services/Recoil";
import { useRecoilState } from "recoil";
import LoaderSpinner from "./LoaderSpinner"; 
import ImageLoading from "./ImageLoading";
import SearchInput from "./SearchInput";
import Select from "./Select";
import Limit from "./Limit";
import Pagination from "./Pagination";
import TableRows from "./TableData";
import { limitProductState } from "../Services/Recoil";
import { useRecoilValue } from "recoil";


const Table = () => {
  const [products, setProducts] = useRecoilState(productState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const limitState = useRecoilValue(limitProductState);
  const [originalProducts, setOriginalProducts] = useState(null);
  
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const url = `https://dummyjson.com/products?limit=${limitState === "" || limitState <= 0 || limitState > products.total ? 30  : limitState}`;
      const res = await fetch(url);
      const body = await res.json();
      if (res.ok && res.status === 200) {
        setLoading(false);
        setProducts(body);
        setOriginalProducts(body);
      }else if(!res.ok && res.status === 404){
        setLoading(false);
      }
    };
    getProducts();
  }, [limitState]);
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold underline text-center mt-10 mb-20">
        Products Table
      </h1>
      <div className="my-2 flex flex-row justify-center items-center">
        <SearchInput item={originalProducts} setProducts={setProducts}/>
        <Select item={originalProducts} setProducts={setProducts}/>
        <Limit item={products} setProducts={setProducts}/>
      </div> 
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr className="text-center">
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Thumbnail</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Rating</th> 
            </tr>
          </thead>
          <tbody>
            {products && products?.products?.length > 0 ? (
              products.products.map((item, index) => (
                <tr
                  key={item.id}
                  className="bg-gray-100 border-b hover:bg-gray-200"
                >
                  <TableRows item={index+1}/>
                  <TableRows item={ 
                    <ImageLoading
                      src={item.thumbnail}
                      alt={item.title}
                      productId={item.id}
                    />
                  }/>
                  <TableRows item={item.title} clickable={true} id={item.id} />
                  <TableRows item={item.category}/>
                  <TableRows item={item.price} dollar={true}/>
                  <TableRows item={item.minimumOrderQuantity}/>
                  <TableRows item={item.rating}/>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-60 py-40 text-center text-gray-500"
                >
                  <LoaderSpinner color="black" loading={loading} size={100} />
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr  className="bg-gray-800 border-b" >
              <td colSpan="3" className=" px-40 py-2 text-start text-white">
                Total Products: <span className="text-white-900 font-extrabold">{products.total}</span> 
              </td>
              <td colSpan="5" className=" px-4 py-2 text-center text-white">
                Total Pages:  <span className="text-white-900 font-extrabold"> {Math.ceil(products.total/products.limit)}</span>
              </td>
            </tr>
          </tfoot>
        </table>
        <Pagination item={products}/>
      </div>
    </div>
  );
};

export default Table;
