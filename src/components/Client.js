import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import ClientDataService from "../services/ClientService";

const Client = props => {

  let  initialTutorialState = {};
  const [currentClient, setCurrentClient] = useState(initialTutorialState);
  const [message, setMessage] = useState("");
    console.log(initialTutorialState, 'initialTutorialState')
  const { schema } = props
  let fields = Object.keys(schema?.properties)

  

  for (const key in schema?.properties) {
    initialTutorialState[key] = schema?.properties?.[key]?.default || ""
  }

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleValidation = (fieldObj) => {
    let newErrors = {...errors}
    
  };

  const getClient = id => {
    ClientDataService.get(id)
      .then(response => {
        setCurrentClient(response.data.data);
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getClient(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentClient({ ...currentClient, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentClient.id,
      title: currentClient.title,
      description: currentClient.description,
      published: status
    };

    ClientDataService.update(currentClient.id, data)
      .then(response => {
        setCurrentClient({ ...currentClient, published: status });
        console.log(response.data);
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateClient = () => {
    console.log(currentClient, 'currentClient', currentClient);
    ClientDataService.update(currentClient._id, currentClient)
      .then(response => {
        console.log(response.data);
        setMessage("The client was updated successfully!");
        props.history.push("/clients");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    ClientDataService.remove(currentClient._id)
      .then(response => {
        console.log(response.data);
        props.history.push("/clients");
      })
      .catch(e => {
        console.log(e);
      });
  };
  console.log(currentClient, 'currentClient')
  return (
    <div className="submit-form">
      {currentClient ? (
        <div>
        {fields?.length ? fields?.map((item, i)=>  {
          let fieldObj = schema?.properties[item]
          return <FormField key = {i} 
          value={currentClient[fieldObj?.name]} 
          handleInputChange={handleInputChange} 
          fieldObj = {fieldObj} 
          errorMsg = {errors[item]  }
          />
        } ) : <p> invalid scheam provided </p>}

        <button onClick={updateClient} className="btn btn-success">
          Update Client
        </button>
      </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Client...</p>
        </div>
      )}
    </div>
  );
};

export default Client;
