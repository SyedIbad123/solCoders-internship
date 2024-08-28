import ClipLoader from "react-spinners/ClipLoader";
const LoaderSpinner = ({color,loading,size}) => {

  return (
    <ClipLoader
        color={color}
        loading={loading}
        size={size}
    />
  )
}

export default LoaderSpinner;





