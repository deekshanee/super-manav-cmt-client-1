import { useEffect, useState } from "react";
import Axios from "axios";
import { ListGroup, Badge } from "react-bootstrap";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [responseObject, setResponse] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  const callApi = () => {
    Axios.get(window.configObject.currentConfig.postUrl).then((response) => {
      setResponse(response.data);
      console.log(responseObject);
    });
  };
  useEffect(() => {
    fetch(
      "http://localhost:3000/api/cmt/get-client-config/?appId=62a4c7c881c5f7827c0028a9"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          window.configObject = result;
          console.log(result);
          //call to api
          callApi();
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      
        <ListGroup as="ol" numbered>
          {responseObject.map((r) => {
          return   <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{r.title}</div>
                
              </div>
              <Badge bg="primary" pill>
                {r.id}
              </Badge>
            </ListGroup.Item>;
          })}
        </ListGroup>
      
    </div>
  );
}
export default App;
