import { useEffect, useState } from "react";
import { axiosApi } from "../../../Api/Api";
import Card from "../../../Components/ui/Card";
import Table from "../../../Components/ui/Table";
import { ITables } from "../../../interfaces";
import { FaFilter  } from "react-icons/fa";
import FilterForm from "./FilterForm";
import axios from "axios";

const Campaigns = () => {
  // ---HeaderData-----
  const headerTable: ITables[] = [
    {
      name: "DATA",
      class: "text-start",
    },
    {
      name: "Eventi",
    },
    {
      name: "Destinatario",
    },
    {
      name: "Oggetto",
    },
    {
      name: "Mittente" ,
    }

  ];


  const [Token ]= useState("0e1e50f66605a04a2a527e1bec13924a69eeb1f9")

  
// useEffect(()=>{
//   const getToken = async () => {
//     if(!sessionStorage.TokenCamp){

//       const req = await axios.post("https://pro.api.serversmtp.com/api/v2/authorize",{
//         headers:{
//           "Content-Type":"application/json",

//         },
        
//      "email":"info@lci-agency.it",
//       "password":"vZZz04C8",
//       "no_expire":true
    
//     }
    
//       )
//       sessionStorage.setItem("TokenCamp",req.data.auth)
//     }

      
//   }

//   getToken()

// },[])











  const [Customers, setCustomers] = useState([])
  const [fromDate, setfromDate] = useState("2020-05-01")
  const [toDate, settoDate] = useState("2024-05-09")

  // const [Messaggio, setMessaggio] = useState("")
  // const [Categoria, setCategoria] = useState("")
  // const [Fonte, setFonte] = useState("")
  // const [status, setstatus] = useState("")
  // const [Campagna, setCampagna] = useState("")
  // const [Lead, setLead] = useState("")
  // const [ToggleFilter , setToggleFilter] = useState(false)
  useEffect(() => {



    const FetchAnalytics = async () => {
      try {
        const req = await axiosApi.get(`https://pro.api.serversmtp.com/api/v2/analytics?from=${fromDate}&to=${toDate}&smart_search=false&orderby=send_time&ordertype=desc&tz=-07%3A00`, {
          headers: {
            Authorization: Token
          }
        })

        setCustomers(req.data.results)

      } catch (error) {
        console.log(error)
      }

    }
    FetchAnalytics()
  }, [fromDate, toDate])

  // ----Render-----

  

  const [Consegnate, setConsegnate] = useState(0)
  const [Aperte, setAperte] = useState(0)
  const [Click, setClick] = useState(0)
  const [Bounce, setBounce] = useState(0)


  useEffect(() => {
    Customers.map((i) => {
      if (i.status === "SUCCESS") {
        setConsegnate(Consegnate + 1)
      }
      if (i.status === "OPEN") {
        setAperte(Aperte + 1)
      }
      if (i.status === "CLICK") {
        setClick(Click + 1)
      }
      if (i.status === "SYSFAIL") {
        setBounce(Bounce + 1)
      }
    })

  }, [fromDate, toDate])






  return (
    <div>
      {/* {ToggleFilter && (
        <div 
        className="w-full h-full bg-[#ddddddd9] absolute z-10 flex items-center justify-center">
            
          <FilterForm
            ToggleFilters={setToggleFilter}
            setMessaggi={(value: string) => setMessaggio(value)}
            setCategoria={(value: string) => setCategoria(value)}
            setFonte={(value: string) => setFonte(value)}
            setstatus={(value: string) => setstatus(value)}
            setCampagna={(value: string) => setCampagna(value)}
            setLead={(value: string) => setLead(value)}

          />
        </div>
      )} */}

      <div className="grid grid-cols-4 gap-4 md:grid-cols-4 lg:grid-cols-4">
        <Card
          Coolor={`text-blue-400`}
          name={"Consegnate"}
          number={Consegnate / 100}
        />
        <Card Coolor={`text-blue-900`} name={"Aperte"} number={Aperte / 100} />
        <Card Coolor={`text-green-500`} name={"Click"} number={Click / 100} />
        <Card
          Coolor={`text-yellow-500`}
          name={"Bounce"}
          number={Bounce / 100}
        />
      </div>

      <div className="flex gap-2 p-3 ring-white-dark ring-1 md:w-[50%] justify-around">
        <div className="flex flex-col gap-2 p-3 ring-white-dark ring-1 w-[50%] justify-around">
          <label htmlFor="from">Dalla data</label>
          <input
            type="date"
            id="from"
            className="p-1 ring-white-dark ring-1"
            value={fromDate}
            onChange={(e) => setfromDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 p-3 ring-white-dark ring-1 w-[50%] justify-around">
          <label htmlFor="to">Ad oggi</label>
          <input
            type="date"
            id="to"
            className="p-1 ring-white-dark ring-1"
            value={toDate}
            onChange={(e) => settoDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 p-3 ring-white-dark cursor-pointer  justify-around ">
          <FaFilter size={26} onClick={() => setToggleFilter(true)} />
        </div>
      </div>
      <div className="h-[350px] overflow-auto">
        <Table Header={headerTable}>
          {Customers.map((i) => {
            return (
              <tr
                key={i.id}
                className="w-full font-semibold text-center bg-white"
              >
                <td className="whitespace-nowrap px-4 py-6 font-medium text-gray-700 text-[16px] text-center underline curser-pointer">
                  {i.send_time as number}
                </td>

                <td className="whitespace-nowrap px-4 py-6 font-medium text-gray-700 text-[16px] text-center underline curser-pointer">
                  {(i.status as string) === "NEW" && "NUOVA"}
                  {(i.status as string) === "DEFER" && "DIFFERIRE"}
                  {(i.status as string) === "SUCCESS" && "SUCCESSO"}
                  {(i.status as string) === "OPEN" && "APRIRE"}
                  {(i.status as string) === "CLICK " && "CLIC"}
                  {(i.status as string) === "REPORT" && "RAPPORTO"}
                  {(i.status as string) === "FAIL" && "FALLIRE"}
                  {(i.status as string) === "SYSFAIL" && "SYSFAIL"}
                  {(i.status as string) === "UNSUB" && "ANNULLA L'ISCRIZIONE"}
                </td>
                <td className="whitespace-nowrap px-4 py-6 font-medium text-gray-700 text-[19px] text-center underline curser-pointer">
                  {i.recipient}
                </td>
                <td className="whitespace-nowrap px-4 py-6 font-medium text-gray-700 text-[16px] text-center underline curser-pointer">
                  {i.subject.substring(0, 20)}
                </td>
                <td className="whitespace-nowrap px-4 py-6 font-medium text-gray-700 text-[19px] text-center underline curser-pointer">
                  {i.sender}
                </td>
              </tr>
            );
          })}
        </Table>
      </div>
    </div>
  );
};
export default Campaigns;
