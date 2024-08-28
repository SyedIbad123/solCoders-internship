import { useEffect } from "react";
import { productState,loadingState } from "../Services/Recoil"; 
import { useRecoilState } from "recoil";
import LoaderSpinner from "./LoaderSpinner";


const Table = () => {
  const [products, setProducts] = useRecoilState(productState);
  const [loading, setLoading] = useRecoilState(loadingState);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const url = "https:///dummyjson.com/products";
      const res = await fetch(url);
      const body = await res.json();
      if(body){
        setLoading(false);
        setProducts(body.products);
      }
      console.log(body.products);
    };
    getProducts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold underline text-center mb-8">
        Product Table
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr className="text-center">
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Images</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
            </tr>
          </thead>

          <tbody>
            {products && products.length > 0 ? (
              products.map((item, index) => (
                <tr
                  key={item.id}
                  className="bg-gray-100 border-b hover:bg-gray-200"
                >
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="rounded-full w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">{item.title}</td>
                  <td className="px-4 py-2 text-center">{item.category}</td>
                  <td className="px-4 py-2 text-center">{item.price}</td>
                  <td className="px-4 py-2 text-center">
                    {item.minimumOrderQuantity}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-40 text-center text-gray-500"
                >
                  <LoaderSpinner color="black" loading={loading} size={100} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
