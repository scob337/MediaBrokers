import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../../Redux/store";
import {
  AddCustomer,
  deselectPerson,
  getCustomersData,
  getEmailData,
  SelectingEmails,
} from "../../../Redux/ListsSlice/listsSlice";

const SendEmails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmailData());
  }, [dispatch]);

  const [selectedEmails, setSelectedEmails] = useState([]);

  const Data = useSelector((state: RootState) => state.lists.getLists);

  // Selector
  const addCustomers = useSelector(
    (state: RootState) => state.lists.addCustomers
  );
  // Dispatch
  useEffect(() => {
    dispatch(getCustomersData());
  }, [dispatch]);
  const handelSelect = (id: number) => {
    if (addCustomers.includes(id)) {
      dispatch(deselectPerson(id));
    } else {
      dispatch(AddCustomer(id));
    }
  };

  
  const [Filter, setFilter] = useState("");
  const [Subject, setSubject] = useState("");

  localStorage.setItem("Subject", Subject);


  const handleCheckboxChange = (e, customers) => {
    const checked = e.target.checked;
    const customerEmails = customers.map((customer) => customer.email);
    setSelectedEmails((prevEmails) => {
      if (checked) {
        return [...prevEmails, ...customerEmails];
      } else {
        return prevEmails.filter((email) => !customerEmails.includes(email));
      }
      
    });
    
  };
  useEffect(() => {
    dispatch(SelectingEmails(selectedEmails));
    
  }, [dispatch, selectedEmails]);

    // const handleCheckboxChange = (e, customers) => {
    //   const checked = e.target.checked;
    //   const customerEmails = customers.map((customer) => customer.email);

    //   if (checked) {
    //     setSelectedEmails((prevEmails) => [...prevEmails, ...customerEmails]);
    //   } else {
    //     setSelectedEmails((prevEmails) =>
    //       prevEmails.filter((email) => !customerEmails.includes(email))
    //     );
    //   }
    // };

    // useEffect(() => {
    //   dispatch(SelectingEmails(selectedEmails));
    // }, [dispatch, selectedEmails]);

    
    
  // Render

  const render = Data.map((i) => {
    if (i.name.includes(Filter)) {
      return (
        <div
          key={i.id}
          className="flex items-center p-2 h"
        >
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              name={i.name}
              onChange={(e) => handleCheckboxChange(e, i.customers)}
            />
            <span className="ml-2">{i.name}</span>
          </label>
          <hr />
        </div>
      );
    } else if (Filter === "") {
      return (
        <>
          <div className="flex items-center p-2">
            <label>
              <input
                type="checkbox"
                className="form-checkbox"
                name={i.name}
                onChange={(e) => handleCheckboxChange(e, i.customers)}
              />
              <span className="ml-2">{i.name}</span>
            </label>
          </div>
          <hr />
        </>
      );
    }
  });

  return (
    <div className=" p-4 rounded-md h-[300px]">
      <div>
        <input
          type="text"
          className="w-full p-2 mb-6 rounded-lg outline-none ring-1"
          placeholder="Search"
          onChange={(e) => setFilter(e.target.value)}
          value={Filter}
        />

        <input
          type="text"
          className="w-full p-2 rounded-lg outline-none ring-1"
          placeholder="Soggetto"
          onChange={(e) => setSubject(e.target.value)}
          value={Subject}
        />
      </div>
      <div className="h-[180px] overflow-auto"> {render}</div>
    </div>
  );
};

export default SendEmails;
