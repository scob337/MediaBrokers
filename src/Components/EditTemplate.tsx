const EditTemplate = ({ SetName, SetContent, name, content, ID }) => {
  const HandleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://mediabrokers.lcisoft.it/api/v1/email-template/${ID}/update`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          name: name,
          content: content,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="max-w-sm mx-auto" onSubmit={(e) => HandleUpdate(e)}>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {" "}
          Nome
        </label>
        <input
          onChange={(e) => SetName(e.target.value)}
          value={name}
          type="text"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
       dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Contenuto
        </label>
        <input
          onChange={(e) => SetContent(e.target.value)}
          value={content}
          type="text"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Modificare

      </button>
    </form>
  );
};

export default EditTemplate;
