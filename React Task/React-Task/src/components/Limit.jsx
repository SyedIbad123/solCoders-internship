import Input from "./Input";
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
        <Input type="number" name="limit" placeholder="Set Limit" onChange={handleChange} className="w-9/12 p-2 m-2 border border-gray-500 rounded-md"/>
    </div>
  )
}

export default Limit;