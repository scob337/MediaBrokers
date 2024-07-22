interface Iprops{
    Value:string;
}
const SelectionFilterForm : React.FC<Iprops> = ({Value}) => {
  
  return ( 
    <>
        <option className="cursor-pointer  p-2  bg-[#f5f5f5] hover:bg-[#f0f0f0]" value={Value}>{Value}</option>
    </>
  )
}


export default SelectionFilterForm
