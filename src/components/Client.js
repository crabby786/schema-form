import React, { useState, useEffect } from "react";
import ClientDataService from "../services/ClientService";

const Tutorial = props => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentClient, setCurrentClient] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const getClient = id => {
    ClientDataService.get(id)
      .then(response => {
        setCurrentClient(response.data.data);
        console.log(response.data);
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

  const updateTutorial = () => {
    ClientDataService.update(currentClient.id, currentClient)
      .then(response => {
        console.log(response.data);
        setMessage("The client was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    ClientDataService.remove(currentClient.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentClient ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentClient.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentClient.description}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
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

export default Tutorial;
