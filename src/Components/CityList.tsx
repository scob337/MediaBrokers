import { useDispatch } from "react-redux";
import { ChangeCustomerFilterAddress, getCustomersData } from "../Redux/ListsSlice/listsSlice";



const CityList = () => {

    const dispatch = useDispatch()
    const HandleChangeAddress = (value:string)=>{
        dispatch(ChangeCustomerFilterAddress(value))
        dispatch(getCustomersData());
      
      }
  return (
    <select
    onChange={(e) => HandleChangeAddress(e.target.value)}
    className="form-select cursor-pointer w-[200px] p-2 mt-1 rounded-md  ring-1 ring-inset ring-slate-300 outline-none">

    <option value="">Seleziona Città</option>
    <option value="agrigento">Agrigento</option>
    <option value="bari">Bari</option>
    <option value="bologna">Bologna</option>
    <option value="brescia">Brescia</option>
    <option value="cagliari">Cagliari</option>
    <option value="catania">Catania</option>
    <option value="florence">Florence</option>
    <option value="genoa">Genoa</option>
    <option value="lecce">Lecce</option>
    <option value="livorno">Livorno</option>
    <option value="milan">Milan</option>
    <option value="modena">Modena</option>
    <option value="naples">Naples</option>
    <option value="padua">Padua</option>
    <option value="palermo">Palermo</option>
    <option value="parma">Parma</option>
    <option value="perugia">Perugia</option>
    <option value="prato">Prato</option>
    <option value="reggio_calabria">Reggio Calabria</option>
    <option value="rimini">Rimini</option>
    <option value="rome">Rome</option>
    <option value="salerno">Salerno</option>
    <option value="sassari">Sassari</option>
    <option value="taranto">Taranto</option>
    <option value="trento">Trento</option>
    <option value="trieste">Trieste</option>
    <option value="turin">Turin</option>
    <option value="venice">Venice</option>
    <option value="verona">Verona</option>
    <option value="vicenza">Vicenza</option>

</select>
  )
}

export default CityList
