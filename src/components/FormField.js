import React from 'react'
import {inputTypes} from "../Utils/schema/register_client_schema"



export default function FormField(props) {

  let { label, value, fieldObj, name, handleInputChange } = props
  let inputType = fieldObj?.inputType
  // console.log("inputType props", props);
  return inputType == inputTypes.textfield ?  (
  <div className="form-group">
    <label htmlFor="title">{label || ""}</label>
    <input type={fieldObj?.inputProps?.type || "text"} 
    className="form-control" 
    // id="title" 
    required
      value={value}
      onChange={handleInputChange}
      name={fieldObj?.name}

    />
  </div> ) 
   :inputType == inputTypes.radio ? <p>use radio</p>
   :inputType == inputTypes.datepicker ? <p>use datepicker</p>
   :inputType == inputTypes.checkbox ? <p>use checkbox</p>
   :inputType == inputTypes.textArea ? <p>use textArea</p>
   :inputType == inputTypes.dropdown ? <p>use dropdown</p>
  : "invalid input type"
  ;
}


