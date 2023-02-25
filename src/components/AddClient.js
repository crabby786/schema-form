import React, { useState } from "react";
import FormField from "./FormField";
import ClientDataService from "../services/ClientService";

const AddClient = (props) => {
  const { schema } = props

  const initialTutorialState = {}
  

  for (const key in schema?.properties) {
    initialTutorialState[key] = schema?.properties?.[key]?.default || ""
  }
  console.log('initialTutorialState', initialTutorialState);

  const [formState, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...formState, [name]: value });
  };
  const handleValidation = (fieldObj) => {
    let newErrors = {...errors}
    
  };

  const saveTutorial = () => {
    var data = {
      ...formState
    };
    console.log("data", data);

    ClientDataService.create(data)
      .then(response => {
        setSubmitted(true);
        console.log(response.data);
        props.history.push("/clients");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };
  let fields = Object.keys(schema?.properties)

  //  console.log("fields", fields);
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          {fields?.length ? fields?.map((item, i)=>  {
            let fieldObj = schema?.properties[item]
            return <FormField key = {i} 
            value={formState[fieldObj?.name]} 
            handleInputChange={handleInputChange} 
            fieldObj = {fieldObj} 
            errorMsg = {errors[item]  }
            />
          } ) : <p> invalid scheam provided </p>}

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddClient;
