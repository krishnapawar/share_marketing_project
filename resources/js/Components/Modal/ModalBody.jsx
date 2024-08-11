import React from 'react'

const ModalBody = ({children,icon=false}) => {
  return (
    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
        {
            icon &&
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                {icon}
            </div>
        }
            
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                {children}
            </div>
        </div>
    </div>
  )
}

export default ModalBody