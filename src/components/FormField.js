import React from 'react'
import { inputTypes } from "../Utils/schema/register_client_schema"



export default function FormField(props) {

  let { label, value, fieldObj, name, handleInputChange, errorMsg } = props
  let inputType = fieldObj?.inputType
  // console.log("inputType props", props);
  return <React.Fragment>
    {inputType == inputTypes.textfield ?  (
    <div className="form-group">
      <label >{fieldObj?.title || ""}</label>
      <input type={fieldObj?.inputProps?.type || "text"}
        className="form-control"
        // id="title" 
        required
        value={value}
        onChange={(e) => handleInputChange(e)}
        name={fieldObj?.name}

      />
    </div> )
    :inputType == inputTypes.radio ? (
      <>
      <label style={{marginRight:10}}>{fieldObj.title}</label>
      <div class="form-check-inline">
      <label class="form-check-label" for="radio1"> {fieldObj.options[0].label}
        <input type={fieldObj?.inputType || "text"} 
            className="form-check-input" 
            id="radio1"
            required
            value={fieldObj.options[0].value}
            onChange={props.handleInputChange}
            name={fieldObj.name}
        />
      </label>
      </div>
      <div class="form-check-inline">
      <label class="form-check-label" for="radio2">{fieldObj.options[1].label}
        <input type={fieldObj?.inputType || "text"} 
            className="form-check-input" 
            id="radio2"
            required
            value={fieldObj.options[1].value}
            onChange={props.handleInputChange}
            name={fieldObj.name}
        />
      </label>
      </div>
      </>
       )
    :inputType == inputTypes.checkbox ? <p>use checkbox</p>
    :inputType == inputTypes.textArea ? <p>use textArea</p>
    :inputType == inputTypes.dropdown ? (
      <div className="form-group">
        <label >{fieldObj?.title || ""}</label>
        <select type={fieldObj?.inputProps?.type || "text"}
          className="form-control"
          // id="title" 
          required
          value={value}
          onChange={(e) => handleInputChange(e)}
          name={fieldObj?.name}
  
        >
        {fieldObj?.options?.length ? (
          fieldObj?.options?.map((obj, i)=> <option key = {i} value = {obj?.value}> {obj?.label} </option> )
        ) : null }
        </select>
      </div> )
    : "invalid input type"}
    {errorMsg && <span className='small text-danger' > {errorMsg} </span>}
  </React.Fragment>
    ;
}


