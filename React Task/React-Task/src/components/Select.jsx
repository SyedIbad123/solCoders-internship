const Select = ({item,setProducts,category}) => {
  
  const distinct = [{slug: 'all', name : "All"}, ...category.map(item => item)];

  async function handleChange(e){
    const slug = e.target.value;
    if(slug === "all"){
      setProducts(item);
      return; 
    }
    const url = `https://dummyjson.com/products/category/${slug}`;
    const res = await fetch(url);
    const body = await res.json();
    const result = body.products;
    setProducts({
      ...item, 
      products: result,
    });
  }


  return (
    <div  className="w-full">
      <select className="w-6/12 p-2 m-2 border border-gray-500 rounded-md" onChange={handleChange}>
      {distinct.map((product,index) => (
        <option key={index} value={product.slug} >{product.name}</option>
      ))}
      </select>
    </div>
  );
};

export default Select;
