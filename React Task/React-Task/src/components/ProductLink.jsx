import { Link } from "react-router-dom";

const ProductLink = ({children,...props}) => {
  return (
    <Link className="hover:underline font-semibold" {...props}>{children}</Link>
  )
} 

export default ProductLink;