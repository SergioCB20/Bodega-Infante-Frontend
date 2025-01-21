import React from 'react'
import { PanelProps } from '../interfaces/componentsProps'

const Panel: React.FC<PanelProps> = ({title, options}) => {
  return (
    <div className='w-full h-full p-8'>
    <h1 className="text-2xl font-bold">{title}</h1>
    <div className="grid grid-cols-2 gap-4 mt-6">
      {options.map((option, index) => (
        <button onClick={option.onClick} key={index} className="bg-white hover:bg-slate-100 p-8 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">{option.title}</h2>
          <p className="text-gray-500 mt-2">{option.description}</p>
        </button>
      ))}
      </div>
  </div>
  )
}

export default Panel;
