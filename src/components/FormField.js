import React from 'react'
import {inputTypes} from "../Utils/schema/register_client_schema"



export default function FormField(props) {
  let { label, value, fieldObj } = props
  let inputType = fieldObj?.inputType
  console.log("inputType", inputType);
  return inputType == inputTypes.textfield ?  (
  <div className="form-group">
    <label htmlFor="title">{label || ""}</label>
    <input type={fieldObj?.inputProps?.type || "text"} 
    className="form-control" 
    id="title" 
    required
      value={props.value}
      onChange={props.handleInputChange}
      name={props.value}

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


