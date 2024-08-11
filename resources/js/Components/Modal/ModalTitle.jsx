import React from 'react'

const ModalTitle = ({title=''}) => {
  return (
    <>
        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{title}</h3>
    </>
  )
}

export default ModalTitle