import Label from "./Label";
import { limitProductState } from "../Services/Recoil";
import { useRecoilState } from "recoil";

const Limit = () => {
  const [limit, setLimit] = useRecoilState(limitProductState);

  const handleChange = (e) => {
    setLimit(e.target.value);
  }

  return (
    <div className='w-6/12'>
        <Label text="Limit : " htmlFor="limit" />
        <select value={limit} className="w-9/12 p-2 m-2 border border-gray-500 rounded-md" onChange={handleChange}>
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
    </div>
  )
} 

export default Limit;