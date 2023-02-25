import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";
import FormField from "../components/FormField";





const AddTutorial = (props) => {
  const { schema } = props

  const initialTutorialState = {}
  

  for (const key in schema?.properties) {
    initialTutorialState[key] = schema?.properties?.[key]?.default || ""
  }
  console.log('initialTutorialState', initialTutorialState);

  const [formState, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...formState, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      ...formState
    };
    console.log("data", data);
    // return

    TutorialDataService.create(data)
      .then(response => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
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
            />
          } ) : <p> invalid scheam provided </p>}
          

          {/* <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div> */}

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
