import { Link } from "react-router-dom";
import Table from "../../../Components/ui/Table";
import { ITables } from "../../../interfaces";
import { FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemplateData } from "../../../Redux/isOpen/TemplateSlice/TemplateSlice";
import { RootState } from "../../../Redux/store";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import EditTemplate from "../../../Components/EditTemplate";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { SaveTemplate } from "../../../Redux/ListsSlice/listsSlice";
import SendEmails from "./SendEmails";

const Templates = () => {
  const headerTable: ITables[] = [
    {
      name: "id",
      class: "center w-[20px]",
    },
    {
      name: "Nome modello",
      class: "center",
    },

    {
      name: "Azioni",
      class: "center",
    },
  ];

  const Selector = useSelector(
    (state: RootState) => state.template.gettemplates
  );
  const dispatch = useDispatch();

  const [Token , setToken] = useState("")

  sessionStorage.setItem("Token" , Token)

  useEffect(() => {
    dispatch(getTemplateData());
  }, [dispatch]);

  const [Alert, setAlert] = useState(false);

  const Templat = useSelector((state: RootState) => state.lists.SingleTemplate);

  const EmailsSelected = useSelector(
    (state: RootState) => state.lists.SelectorEmails
  );
  const [Status, setStatus] = useState("");

  const Subject = localStorage.getItem("Subject");


const [Fromemail , setFromemail] = useState("")

  const [SuccNoti , setSuccNoti] = useState(false)

useEffect(()=>{
  const HandleEmailFrom = async() =>{
    const req = await axios.get("https://mediabrokers.lcisoft.it/api/v1/turbosmtp/email")
    setFromemail(req.data.email)
  }
  
  HandleEmailFrom()
},[])
  const HandleSendMails = async () => {
    try {
      const req = await axios.post(
        "https://api.turbo-smtp.com/api/v2/mail/send ",
        {
          headers: {
            Token,
          },
          authuser: "info@lci-agency.it",

          authpass: "vZZz04C8",

          from: Fromemail,
          to: `${EmailsSelected}` ,
          subject: Subject,
          cc: "cc_user@example.com",
          bcc: "bcc_user@example.com",
          content: "This is plain text version of the message.",
          html_content: Templat,
        }
      );
      console.log("Mail has Sent Success");
      setSuccNoti(true)
      setStatus("Mail has Sent Success");


    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setSuccNoti(false)

      document.querySelector(".x-Close").click();

        setStatus("");

    }, 2000);
  };

 

  

  const DeleteTemplate = async (id) => {
    const Confirm = window.confirm(
      "Vuoi davvero rimuovere questo modello?"
    );

    if (Confirm) {
      try {
        const res = await axios.delete(
          `https://mediabrokers.lcisoft.it/api/v1/email-template/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setTimeout(() => {
          setAlert(true);
        }, 0);
        setTimeout(() => {
          setAlert(false);
        }, 2000);
        dispatch(getTemplateData());
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [ShowMailList, setShowMailList] = useState(false);
  const getToken = async () => {
    if(!sessionStorage.Token){
      const req = await axios.get("https://mediabrokers.lcisoft.it/api/v1/turbosmtp/token")
      setToken(req.data.auth)
    console.log(req.data.auth)

    }


  }

  const HandlePassData = (data) => {
    dispatch(SaveTemplate(data));
    setShowMailList(true);
    console.log(ShowMailList);
    getToken()
  };

  const [Edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [content, setcontent] = useState("");

  return (
    <div className="relative flex flex-col w-full space-y-4">
      <div className="flex justify-between items-center py-[18px]">

<div></div>
        <div>
          <Link
            to="create-template"
            className="inline-block p-2 text-white bg-blue-500 rounded-lg"
          >
            Crea il tuo modello

          </Link>
        </div>
      </div>
      
      {SuccNoti ===true  && 
                  <div
                  className="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400"
                  role="alert"
                >
                  <span className="font-medium">
                  {Status}
                  </span>
                </div>
      }
      
      
      <div>
        <div>
          {Alert && (
            <div
              className="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">
              Il modello è stato eliminato correttamente
              </span>
            </div>
          )}
          
          <Table Header={headerTable}>
            {Selector?.map((i: string & number[], idx) => {
              return (
                <tr
                  key={i.id}
                  className="w-full font-semibold text-center bg-white"
                >
                  <td className="whitespace-nowrap pl-4 w-[20px] py-6 font-medium text-gray-700 text-[16px] text-center">
                    {idx + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-[16px]  text-center">
                    {i.name}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-[16px]">
                    <div className="flex items-center justify-center gap-2">
                      <FaTrash
                        onClick={() => DeleteTemplate(i.id)}
                        size={22}
                        title="Delete Template"
                        className="text-red-500 transition-all duration-300 cursor-pointer hover:text-red-600"
                      />
                      <MdFormatListBulletedAdd
                        onClick={() => HandlePassData(i.content)}
                        title="Select List To Send Mails"
                        size={22}
                        className="text-green-500 transition-all duration-300 cursor-pointer hover:text-green-600"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </Table>

          <div
            className={`${
              Edit ? "flex" : "hidden"
            } z-0 w-full h-[88vh] absolute  items-center justify-center   top-0 left-0 bg-[rgba(0,0,0,0.5)]`}
          >
            <div className="absolute top-10 closeBTN left-10 bg-white-dark w-[50px] h-[50px] flex items-center justify-center rounded-full">
              <IoClose
                size={26}
                color="white"
                cursor={"pointer"}
                onClick={() => setEdit(false)}
              />
            </div>

            <div className="bg-white-light w-[50%] m-auto p-3  z-50 rounded-lg">
              <EditTemplate
                name={name}
                content={content}
                SetName={setName}
                SetContent={setcontent}
                setEdit={setEdit}
              />
            </div>
          </div>
        </div>
        {ShowMailList ? (
          <div
            className="absolute w-screen z-[10] h-screen top-[-10%] left-[50%] translate-x-[-50%] bg-[#06060669]
              flex flex-col gap-3 items-center justify-center
            "
          >
            <div className="h-[400px] bg-white w-[400px] flex flex-col items-center rounded-lg">
              <span
                className=" x-Close ml-[-90%] cursor-pointer p-3 font-bold"
                onClick={() => setShowMailList(false)}
              >
                X
              </span>
              <div className="h-[300px]">
                <div>
                  <SendEmails />
                </div>
              </div>
                  <button
                onClick={() => HandleSendMails()}
                className="p-1 w-[70%]  flex justify-center items-center
                 text-white m-auto bg-blue-500 rounded-lg"
              >
                Inviare
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Templates;
