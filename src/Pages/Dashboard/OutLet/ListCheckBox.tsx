import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../../Redux/store";
import {
  AddCustomer,
  ChangeCustomerFilterCompany ,
  ChangeCustomerFilterPayment,
  ChangeCustomerFilterTags,
  deselectPerson,
  getCustomersData,
  
} from "../../../Redux/ListsSlice/listsSlice";
import CityList from "../../../Components/CityList";
import axios from "axios";


const ListCheckBox = () => {
  // const map = customers?.map((i) => i.id);
  // Selector
  const getCustomer = useSelector(
    (state: RootState) => state.lists.getCustomers
  );


  const addCustomers = useSelector(
    (state: RootState) => state.lists.addCustomers
  );
  

  const HandleChangeCompany = (value:string)=>{

    dispatch(ChangeCustomerFilterCompany(value))
  
    dispatch(getCustomersData());
  
  }

  const HandleChangePayment = (value:string)=>{
    dispatch(ChangeCustomerFilterPayment(value))
    dispatch(getCustomersData());
  }
  const HandleChangeTag = (value:string)=>{
    dispatch(ChangeCustomerFilterTags(value))
    dispatch(getCustomersData());
  }
  
  const [SelectedItem, setSelectedItem] = useState([]);
  // Dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomersData());
  }, [dispatch]);
  const handelSelect = (id: number) => {
    if (addCustomers.includes(id)) {
      dispatch(deselectPerson(id));
      setSelectedItem(SelectedItem.filter((item) => item !== id));
    } else {
      dispatch(AddCustomer(id));
      setSelectedItem([...SelectedItem, id]);
    }
  };
  
  const filteredData = getCustomer.filter(item => SelectedItem.includes(item.id));
  const [Filter, setFilter] = useState("")

  const handleSelectAll = () => {
    const allCustomerIds = getCustomer.map((customer) => customer.id);
    allCustomerIds.forEach(id => {
      dispatch(AddCustomer(id));
      setSelectedItem(prevState => [...prevState, id]);
      document.getElementById(`checkbox-${id}`).checked = true; // تحديد الـ checkbox
    });
  };

  const handleDeselectAll = () => {
    const allCustomerIds = getCustomer.map((customer) => customer.id);
    allCustomerIds.forEach(id => {
      if (addCustomers.includes(id)) {
        dispatch(deselectPerson(id));
        setSelectedItem(prevState => prevState.filter(item => item !== id));
        document.getElementById(`checkbox-${id}`).checked = false; // إلغاء تحديد الـ checkbox
      }
    });
  };
  const [ TagsFilter , setTagsFilter] = useState([])
  
  useEffect(()=>{
    const FetchFilter = async ()=>{
        const req = await axios.get("https://mediabrokers.lcisoft.it/api/v1/tags")
        setTagsFilter(req.data.tags)
    }
    FetchFilter()
  },[])
  const render = getCustomer.map((i) => {


    if (i.name.includes(Filter)) {
      return (
        <>


          <div className="flex items-center p-2 " key={i.id}>

            <label className={`flex items-center flex-row-reverse ${addCustomers.includes(i.id) && 'bg-[#016fff] text-white'} justify-between w-full p-2 rounded-lg`}>
              <input
                type="checkbox"
                id={`checkbox-${i.id}`}
                checked={addCustomers.includes(i.id)}
                className="form-checkbox px-1"
                onChange={() => handelSelect(i.id)}
                name="customers"
              />
              <span className="flex flex-col items-start justify-start ">
                <span className="ml-2">{i.name}</span>
                <span className="text-[14px]">{i.email}</span>
              </span>
            </label>
          </div>
          <hr />
        </>
      );
    }

  });

  return (
    <div className="flex-col items-center justify-center w-[100%] h-full m-auto p-2 rounded-md">
      <div className="flex justify-center mb-2  w-[100] gap-1">
        <button
          type="button"
          onClick={handleSelectAll}
          className="w-[50%] bg-gray-200 font-semibold transition duration-200 p-2 cursor-pointer hover:bg-gray-300">Seleziona tutto</button>
        <button
          onClick={handleDeselectAll}
          className="w-[50%] bg-gray-200 font-semibold transition duration-200 p-2 cursor-pointer hover:bg-gray-300">Deselezionare tutto</button>
      </div>

    <div className="flex justify-center flex-col w-full flex-wrap items-center gap-2 p-3 ">
    <div className="flex  gap-2">
    <CityList/>
    <select
    onChange={(e) => HandleChangeCompany(e.target.value)}
    className="cursor-pointer w-[200px] p-2 mt-1 rounded-md  ring-1 ring-inset ring-slate-300 outline-none">
      <option value="">Selezionare</option>
      <option value="0">nessuna compagnia</option>
      <option value="1">ha compagnia</option>
    </select>
    </div>

    <div className="flex  gap-2">
    <select
    onChange={(e) => HandleChangePayment(e.target.value)}
    className="cursor-pointer p-2 mt-1 rounded-md  w-[200px] ring-1 ring-inset ring-slate-300 outline-none">
      <option value="">Selezionare</option>
      <option value="0">nessun pagamento</option>
      <option value="1">ha pagamento</option>
    </select>
    <select
    onChange={(e) => HandleChangeTag(e.target.value)}
    className="cursor-pointer p-2 mt-1 rounded-md w-[200px] ring-1 ring-inset ring-slate-300 outline-none">
      <option value="">etichetta</option>
      {TagsFilter.map((tag)=>{
        return <option value={tag.id}>{tag.name}</option>
      })}
    </select>
    </div>
    </div>

      <input
        type="text"
        className="w-full px-2 py-2  rounded-md border-blue-300 border-[2px] outline-none"
        placeholder="Ricerca"
        onChange={(e) => setFilter(e.target.value)}

      />

      <div className="h-[280px] overflow-auto ">
        {render}
      </div>

      <div className="w-[100%] bg-gray-300 h-[70px]  flex flex-wrap overflow-auto  ">
        {filteredData.map((i) => (
          <span className="text-[12px] h-[fit-content] text-white bg-white-dark p-[4px] m-[2px]"> {i.name}  </span>
        ))}
      </div>

    </div>
  );
};

export default ListCheckBox;