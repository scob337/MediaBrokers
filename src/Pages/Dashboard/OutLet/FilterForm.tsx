import React from 'react';
import SelectionFilterForm from './SelectionFilterForm';
import { IoCloseSharp } from "react-icons/io5";

interface Iprops {

    ToggleFilters:React.Dispatch<React.SetStateAction<boolean>>;
    setMessaggi:React.Dispatch<React.SetStateAction<string>>;
    setCategoria:React.Dispatch<React.SetStateAction<string>>;
    setFonte:React.Dispatch<React.SetStateAction<string>>;
    setstatus:React.Dispatch<React.SetStateAction<string>>;
    setCampagna:React.Dispatch<React.SetStateAction<string>>;
    setLead:React.Dispatch<React.SetStateAction<string>>;
}



const FilterForm = ({ToggleFilters , setMessaggi , setCategoria , setFonte , setstatus , setCampagna , setLead}:Iprops) => {


  return (
    <div className='bg-white h-[570px] w-[70%] md:w-[40%] p-5 relative flex flex-col gap-3'>
              
          <div className="text-right p-3 bg-white w-[40px]
           h-[40px] absolute right-[-15px] top-[-15px]
           transition-all duration-75
           flex justify-center items-center cursor-pointer mb-3
           font-semibold  hover:bg-slate-200
           
           "
           onClick={()=> ToggleFilters(false)}
           >

              <IoCloseSharp  size={36}
              />
          </div>



        <label className='flex flex-col mt-5' htmlFor="Messaggio">Tipo Messaggio
        <select
        onChange={(e)=> setMessaggi(e.target.value)}
        id="Messaggio" className='
        
        cursor-pointer p-2 mt-1 ring-1 rounded-md ring-inset ring-slate-300 outline-none'>
        <SelectionFilterForm   Value="Hello"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Hello World!"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Welcome"/>
    </select>
    </label>

    <label className='flex flex-col' htmlFor="Categoria">Categoria  Template Messaggio
        <select 
        onChange={(e)=> setCategoria(e.target.value)}
        
        id="Categoria" className='cursor-pointer rounded-md  p-2 mt-1 ring-1 ring-inset ring-slate-300 outline-none'>
        <SelectionFilterForm  Value="Hello"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Hello World!"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Welcome"/>
    </select>

        </label>

        <label className='flex flex-col' htmlFor="Fonte">Fonte Lead
        <select
        onChange={(e)=> setFonte(e.target.value)}
        
        id="Fonte" className='cursor-pointer p-2 rounded-md  mt-1 ring-1 ring-inset ring-slate-300 outline-none'>
        <SelectionFilterForm  Value="Hello"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Hello World!"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Welcome"/>
    </select>
        </label>

        <label className='flex flex-col' htmlFor="state">Stato Lead
        <select
        onChange={(e)=> setstatus(e.target.value)}
        
        id="state" className='cursor-pointer p-2 rounded-md  mt-1 ring-1 ring-inset ring-slate-300 outline-none'>
        <SelectionFilterForm  Value="Hello"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Hello World!"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Welcome"/>
    </select>
        </label>

        <label className='flex flex-col' htmlFor="Campagna">Campagna Lead
        <select
        onChange={(e)=> setCampagna(e.target.value)}
        
        id="Campagna" className='cursor-pointer rounded-md  p-2 mt-1 ring-1 ring-inset ring-slate-300 outline-none'>
        <SelectionFilterForm  Value="Hello"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Hello World!"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Welcome"/>
    </select>
        </label>

        <label className='flex flex-col' htmlFor="Lead"> Lead
        <select 
        onChange={(e)=> setLead(e.target.value)}
        
        id="Lead" className='cursor-pointer p-2 mt-1 rounded-md  ring-1 ring-inset ring-slate-300 outline-none'  >
        <SelectionFilterForm  Value="Hello"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Hello World!"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Welcome"/>
        <SelectionFilterForm  Value="Welcome"/>
    </select>
        </label>
        <button className='
        transition-all duration-300 hover:bg-blue-600
        bg-blue-500 p-2 w-[50%] text-white font-semibold m-auto'>Find</button>
    </div>
  )
}

export default FilterForm
