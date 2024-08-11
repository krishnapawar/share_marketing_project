import React from 'react'

const ModalFooter = ({children}) => {
  return (
    <div className="bg-gray-50 py-2 sm:flex sm:flex-row-reverse sm:px-6">
        {children}
    </div>
  )
}

export default ModalFooter