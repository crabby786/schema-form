import React from 'react'


function FormField(props) {
  let {label, } = props
  return (<div className="form-group">
    <label htmlFor="title">{label || ""}</label>
    <input type="text" className="form-control" id="title" required 
    value={props.title} 
    onChange={props.handleInputChange} 
    name="title" 
    
    />
  </div>);
}
