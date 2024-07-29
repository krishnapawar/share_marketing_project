import React from 'react'

const Form = ({action="",method="", encType='multipart/form-data',events = {},children}) => {
  return (
    <form action={action} encType={encType} method={method} {...events}>
        {children}
    </form>
  )
}

export default Form