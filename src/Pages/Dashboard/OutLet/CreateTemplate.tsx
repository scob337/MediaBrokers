import Button from "../../../Components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import EmailEditor from "react-email-editor";
import { useRef, useState } from "react";
import axios from "axios";
import {
  SelectingEmails,
  SingleTemplateName,
} from "../../../Redux/ListsSlice/listsSlice";
import { useDispatch } from "react-redux";

const CreateTemplate = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const Navigation = useNavigate();

  // Editor PoST
  SingleTemplateName;
  const emailEditorRef = useRef(null);
  const [HTML, setHTML] = useState();
  const [Name, setName] = useState("");
  const exportHtml = () => {
    if (Name.length != "") {
      emailEditorRef.current.editor.exportHtml((data) => {
        const { design, html } = data;
        setHTML(html);
        HandlePOST(html);
      });
    }
  };
  const onLoad = () => {};
  const onReady = () => {
  };
  const [Loading, setLoading] = useState(false);
  const [Status, setStatus] = useState("");

  const [From, setFrom] = useState("");
  const [Subject, setSubject] = useState("");

  const HandlePOST = async (data) => {
    setLoading(true);
    try {
      const req = await axios.post(
        "https://mediabrokers.lcisoft.it/api/v1/email-template",
        {
          headers: {
            "Content-Type": "application/json",
          },
          name: Name,
          content: data,
        }
      );
      setStatus("Il modello è stato salvato");
      localStorage.setItem("From", From);
      localStorage.setItem("Subject", Subject);
      dispatch(SelectingEmails({}));
      setLoading(false);

      setTimeout(() => {
        Navigation("/templates");
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Editor PoST

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="mb-4 text-3xl font-bold">Editor di modelli di posta elettronica
</h1>

      <input
        type="text"
        placeholder="Nome modello "
        className="p-2 mb-4 border rounded-md"
        value={Name}
        onChange={(e) => setName(e.target.value)}
        required
        minLength={5}
      />

      <div
        className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
        role="alert"
      >
        {Status === "Template Has Been Saved" && (
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
        )}

        <span className="sr-only">Informazioni</span>
        <div>{Status}</div>
      </div>
      <div>
        <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
      </div>

      <div className="flex justify-between gap-2 mt-4">
        <Button
          className="p-2 text-white bg-blue-500 rounded-md"
          width="w-fit"
          onClick={exportHtml}
          disabled={Loading}
        >
          Salva modello

        </Button>
      </div>
    </div>
  );
};

export default CreateTemplate;
