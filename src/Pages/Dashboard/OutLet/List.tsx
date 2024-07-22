import { FaEdit } from "react-icons/fa";
import Table from "../../../Components/ui/Table";
import { ITables } from "../../../interfaces";
import { FaTrash } from "react-icons/fa6";
import Button from "../../../Components/ui/Button";
import Modal from "../../../Components/ui/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal, toggleSidebar } from "../../../Redux/isOpen/reduxSlice";
import ListCheckBox from "./ListCheckBox";
import { FormEvent, useEffect, useState } from "react";
import { RootState } from "../../../Redux/store";

import {
  ChangeCustomerFilterAddress,
  ChangeCustomerFilterCompany,
  ChangeCustomerFilterPayment,
  ChangeCustomerFilterTags,
  DeleteEmailData,
  addEmailData,
  deselectPersonAll,
  editEmailData,
  getCustomersData,
  getEmailData,
  getEmailDataByID,
} from "../../../Redux/ListsSlice/listsSlice";
import CityList from "../../../Components/CityList";
import axios from "axios";

const Lists = () => {
  
  const [nameCreate, setNameCreate] = useState("");
  const [Loading, setLoading] = useState(false);
  const [EditLoading, setEditLoading] = useState(false);
  const [DeleteLoading, setDeleteLoading] = useState(false);
  const [Error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    customers: [],
  });
  const [name, setName] = useState(formData.name);
  const [selectedCustomers, setSelectedCustomers] = useState(
    formData.customers
  );

  // Selector
  const getData = useSelector((state: RootState) => state.lists.getLists);
  // Dispatch
  const dispatch = useDispatch();
  const dispatchEdit = useDispatch();
  // Function

  const handleClick = () => {
    dispatch(toggleSidebar());
    dispatch(ChangeCustomerFilterAddress(""))
    dispatch(ChangeCustomerFilterCompany(""))
    dispatch(ChangeCustomerFilterPayment(""))
    dispatch(ChangeCustomerFilterTags(""))

    dispatch(getCustomersData());
  };
  const handleClickAdd = () => {
    dispatch(toggleModal());
    dispatch(ChangeCustomerFilterAddress(""))
    dispatch(ChangeCustomerFilterCompany(""))
    dispatch(ChangeCustomerFilterPayment(""))
    dispatch(ChangeCustomerFilterTags(""))
    dispatch(getCustomersData());
  };



  const handleEditBTN = (id: number) => {
    
    dispatch(toggleSidebar());
    dispatchEdit(getEmailDataByID(id))
      .unwrap()
      .then((data) => {
        setFormData({
          name: data.name,
          customers: data.customers.map((customer) => customer.id),
        });
      });
   

  };
  useEffect(() => {
    setName(formData.name);
    setSelectedCustomers(formData.customers);
  }, [formData]);
  const handleInputChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };


const handleCheckboxChange = (customerId) => {
  if (selectedCustomers.includes(customerId)) {
    setFormData({
      ...formData,
      customers: formData.customers.filter((id) => id !== customerId),
    });
  } else {
    setFormData({
      ...formData,
      customers: [...formData.customers, customerId],
    });
  }
};

  
  const [Status, setStatus] = useState("");
  const [StatusRes, setStatusRes] = useState("");
  const handelDelete = (id: number) => {
    const Confirm = window.confirm("Vuoi davvero rimuovere questo elenco?");
    if (Confirm) {
      setDeleteLoading(true);
      try {
        dispatch(DeleteEmailData(id)).then(() => {
          dispatch(getEmailData());
          setStatusRes("Delete");
          setStatus("Elenco eliminato con successo ");
          setDeleteLoading(false);

          setTimeout(()=>{
              setStatus("");
              setStatusRes("");
            },2000)

        });
      } catch (error) {
        setStatusRes("Fallito");
        setStatus("Qualcosa è andato storto");
      }

    }
  };
  


  const getCustomer = useSelector(
    (state: RootState) => state.lists.getCustomers
  );

  useEffect(() => {
    dispatch(getCustomersData());
  }, [dispatch]);

  //  Header
  const headerTable: ITables[] = [
    {
      name: "id",
      class: "text-start",
    },
    {
      name: "LETTERA DI NOTIZIE",
      class: "text-center",
    },
    {
      name: "Clienti",
      class: "text-center",
    },
    {
      name: "Azione",
      class: "text-center",
    },
  ];
  // Get
  useEffect(() => {
    dispatch(getEmailData());
  }, [dispatch]);

  const [Filter, setFilter] = useState("");

  // -----Render-------
  const [ TagsFilter , setTagsFilter] = useState([])

  useEffect(()=>{
    const FetchFilter = async ()=>{
        const req = await axios.get("https://mediabrokers.lcisoft.it/api/v1/tags")
        setTagsFilter(req.data.tags)
    }
    FetchFilter()
  },[])
  const render = getData?.map((data, idx) => {
    return (
      <tr
        key={data.id}
        className="w-full py-4 font-semibold text-center bg-white ">
        <td
          className="whitespace-nowrap px-4  text-gray-700 text-[16px] text-start w-[20px]"
          key={data.id}
        >
          {idx + 1}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-gray-700 text-[16px] text-center">
          {data.name}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-gray-700 text-[16px] text-center">
          {data?.customers?.length}
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-gray-700 text-[16px]">
          <div className="flex items-center justify-center gap-2">
            <FaEdit
              onClick={() => handleEditBTN(data?.id)}
              size={22}
              className="text-blue-500 transition-all duration-300 cursor-pointer hover:text-blue-600"
            />
            <FaTrash
              onClick={() => handelDelete(data.id)}
              size={22}
              className="text-red-500 transition-all duration-300 cursor-pointer hover:text-red-600"
            />
          </div>
        </td>
      </tr>

    );
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

if(nameCreate !="" && selectedCustomers !=[]){
    
    setLoading(true)
try {

  dispatch(addEmailData(nameCreate))
    .unwrap()
    .then(() => {
      dispatch(getEmailData())
        .unwrap()
        .then(() => {
          dispatch(toggleModal());
          setNameCreate("");
        });
      dispatch(deselectPersonAll())
      setLoading(false)
      setStatusRes("addSuccess");
      setStatus("Creato con successo");
      setTimeout(()=>{
        setStatusRes("");
        setStatus(" ");

      },3000)
      dispatch(ChangeCustomerFilterAddress(""))
      dispatch(ChangeCustomerFilterCompany(""))
      dispatch(ChangeCustomerFilterPayment(""))
    dispatch(ChangeCustomerFilterTags(""))

      dispatch(getCustomersData());
       
      
});
} 
catch (error) {

  setError(error.statusText);
  setLoading(false)
}
}

  };


  const handleSelectAll = () => {
    const allCustomerIds = getCustomer.map((customer) => customer.id);
    setSelectedCustomers(allCustomerIds);
    setFormData({ ...formData, customers: allCustomerIds });
  };

  const handleDeselectAll = () => {
    setSelectedCustomers([]);
    setFormData({ ...formData, customers: [] });
  };
  
  const formEditList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(formData.name !=""){

      setEditLoading(true)

      dispatch(
        editEmailData({ name: formData.name, customers: formData.customers })
      )
        .unwrap()
        .then(() => {
          dispatch(getEmailData())
            .unwrap()
            .then(() => {
              dispatch(toggleSidebar());
              setFormData({ name: "", customers: [] });
            });
        setEditLoading(false)
        setStatusRes("Edit");
        setStatus("Elenco modifica con successo ");
        setTimeout(()=>{
          setStatusRes("");
          setStatus(" ");
        },3000)
        });
        dispatch(ChangeCustomerFilterAddress(""))
        dispatch(ChangeCustomerFilterCompany(""))
        dispatch(ChangeCustomerFilterPayment(""))
        dispatch(ChangeCustomerFilterTags(""))
        dispatch(getCustomersData());
    }


  };


// Filters


const HandleChangeCompany = (value)=>{

  dispatch(ChangeCustomerFilterCompany(value))

  dispatch(getCustomersData());

}
const HandleChangeTags = (value)=>{

  dispatch(ChangeCustomerFilterCompany(value))

  dispatch(getCustomersData());

}

const HandleChangePayment = (value)=>{
  dispatch(ChangeCustomerFilterPayment(value))
  dispatch(getCustomersData());

}



// Filters 
  const RenderCheckBox = getCustomer.map((i) => {

    if (i.name.includes(Filter)) {
      return (
        <>

          <div key={i.id} className={` p-2 mt-6 ${selectedCustomers.includes(i.id) && 'bg-[#016fff] text-white'} `}>

            <label htmlFor={i.id}
              title={i.email}
              className="cursor-pointer flex  items-center justify-between ">
              <span>              
                <span>{i.name}</span>
                <br/>
                <span>{i.email}</span>
              </span>
              <input
                type="checkbox"
                id={i.id}
                checked={selectedCustomers.includes(i.id)}
                onChange={() => handleCheckboxChange(i.id)}
                className="form-checkbox"
              />
            </label>

          </div>
          <hr />
        </>
      );
    }
  });
  return (
    <div className="relative w-[100%] ">
      <div className="flex justify-between items-center py-[18px] ">
        <div></div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleClickAdd}
            className="inline-block p-2 text-white bg-blue-500 rounded-lg"
            width="w-fit"
          >
            
            Aggiungi newsletter

          </Button>
        </div>
      </div>
      <div>

        {StatusRes !=="" && 
                <p
                className={`   
              p-2 rounded-xl
              ${StatusRes === "Hidden" ? "hidden" : "flex"}
              ${StatusRes === "Edit"  &&  "text-green-800 bg-green-400 "}
              ${StatusRes === "addSuccess" && "text-green-800 bg-green-400 "}
              ${StatusRes === "Delete" &&  "text-red-800 bg-red-200  "}
              font-semibold
              
              `}
                  
              >
      
                {Status}
              </p>
        }


        <Table Header={headerTable}>{render}</Table>
        <Modal
          name="Modifica la newsletter"
          handleClick={handleClick}
          switchModal={true}
        
        >

          <form
            onSubmit={formEditList}
            className=" flex flex-col gap-4 h-[650px]  "
          >
            <div>
              <div className="h-full ">
                <div className="flex-col items-center  justify-center w-[100%] h-[500px] m-auto p-2 rounded-md">

                <div className="flex flex-col justify-center mb-2  w-full gap-1">

        <div className="flex  justify-center mb-2   w-full gap-1">
        <button
          onClick={handleSelectAll}
          type="button"
          className="w-[50%] bg-gray-200 font-semibold transition duration-200 
          p-2 cursor-pointer hover:bg-gray-300">Seleziona tutto</button>
        <button
          type="button"
          onClick={handleDeselectAll}
          className="w-[50%] bg-gray-200 font-semibold transition duration-200 p-2 
          cursor-pointer hover:bg-gray-300">Deselezionare tutto</button>
        </div>
<div className="flex justify-center flex-wrap w-full flex-col items-center gap-2 p-3">
    
        <div className="flex gap-2">
        <CityList />
<select 
      onChange={(e)=>HandleChangeCompany(e.target.value)}
    className="cursor-pointer p-2 mt-1 w-[200px] rounded-md  ring-1 ring-inset ring-slate-300 outline-none">
      <option value="">Selezionare</option>
      <option value="0">nessuna compagnia</option>
      <option value="1">ha compagnia</option>
    </select>
        </div>

      <div className="flex gap-2 justify-between ">


      <select 
     onChange={(e)=>HandleChangePayment(e.target.value)}
    className="cursor-pointer p-2 mt-1 rounded-md  w-[200px] ring-1 ring-inset ring-slate-300 outline-none">
      <option value="">Selezionare</option>
      <option value="0">nessun pagamento</option>
      <option value="1">ha pagamento</option>
    </select>

    <select
    onChange={(e) => HandleChangeTags(e.target.value)}
    className="cursor-pointer p-2 mt-1 rounded-md w-[200px] ring-1 ring-inset ring-slate-300 outline-none">
      
      <option value="">etichetta</option>
      {TagsFilter.map((tag)=>{
        return <option value={tag.id}>{tag.name}</option>
      })}
    </select>


        </div> 
    </div>

      </div>

                  <input
                    type="text"
                    className="w-full px-2 py-2 rounded-md border-blue-300 border-[2px] outline-none"
                    placeholder="Ricerca"
                    onChange={(e) => setFilter(e.target.value)}
                  />

                  <div className="h-[350px]  overflow-auto">
                    {RenderCheckBox}
                  </div>
                </div>
              </div>
            </div>

            <input
              type="text"
              value={formData.name}
              className="w-full px-2 py-2 rounded-md border-blue-300 border-[2px] outline-none"
              onChange={handleInputChange}
            />
            <div className="w-[200px] mx-auto">
              <Button 
              disabled={EditLoading}

              className={`text-white  
              ${formData.name ==""  && "cursor-not-allowed opacity-[.8]"}


              ${selectedCustomers.length === 0   && "cursor-not-allowed opacity-[.8]"}
              
              bg-blue-500 py-2 px-6 text-[18px] ${EditLoading && "cursor-not-allowed"} `}>
               
                {EditLoading ? <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
</svg> :  "Conferma modifica" }
              </Button>
            </div>
          </form>
        </Modal>












        <Modal
          name="Crea una newsletter"
          handleClickAdd={handleClickAdd}
          switchModal={false}

        >
          <form className=" flex flex-col  gap-2 h-[600px]" onSubmit={onSubmit}>
            <div>
              <div>
                <div className="h-[520px] ">

                  <ListCheckBox />
                </div>
              </div>

              <input
                type="text"
                className="w-full px-2 py-2 rounded-md border-blue-300 border-[2px] outline-none"
                placeholder="Nome NewsLetter"
                value={nameCreate}
                onChange={(e) => setNameCreate(e.target.value)}
              />

            </div>

            <div className="w-[200px] mx-auto">
            
<Button 

              
              className={`${Loading && "cursor-not-allowed"}

              ${nameCreate ==""  && "cursor-not-allowed opacity-[.8]"}
              
              
              text-white bg-blue-500 py-2 px-6 text-[18px]
              
              `

              }>
                
                {Loading ? <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
</svg> : 
                " Confermare"
          }
              </Button> 
              

            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};
export default Lists;
