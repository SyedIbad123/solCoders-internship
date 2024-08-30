

const Select = ({item,setProducts}) => {


  const distinct = Array.from(new Set(item?.products.map(product => product.category)));
  const categories = distinct.unshift("All");

  function handleChange(e){
    const query = e.target.value;
    console.log("query : ", query);

    if(query === "All"){
      setProducts(item);
      return;
    }
    const filteredProducts = item?.products.filter(product => product.category === query);
    setProducts({
      ...item,
      products: filteredProducts.length > 0 ? filteredProducts : [],
      total: filteredProducts.length,
    });
  }

  



  return (
    <div  className="w-full">
      <select className="w-6/12 p-2 m-2 border border-gray-500 rounded-md" onChange={handleChange}>
      {distinct.map((product,index) => (
        <option key={index} value={product} >{product}</option>
      ))}
      </select>
    </div>
  );
};

export default Select;
