import ProductLink from "./ProductLink";
const TableRows = ({item,clickable,id,dollar}) => {
  return (
    <td className={`px-4 py-2 text-center ${clickable ? 'cursor-pointer' : ''}`}>
      {clickable ? (
        <ProductLink to={`/productsDetails/${id}`}>
          {item}
        </ProductLink>
      ) : (
        (dollar == true ? <span className="font-bold">${item}</span> : item)
      )}
    </td>
  );
}

export default TableRows; 