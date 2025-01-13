import React from 'react';
import { debounce } from 'lodash';
import axios from "axios"

function App() {
  const [data, setData] = React.useState([])
  const inputRef = React.useRef(null);
  const cancelTokenSource = React.useRef(null);

  const fetchApiData = debounce(async () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel();
    }

    cancelTokenSource.current = axios.CancelToken.source();

    try {
      const { data } = await axios.get(`http://localhost:5000/search?q=${inputRef.current.value}`, {
        cancelToken: cancelTokenSource.current.token,
      });

      setData(data)
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.log("Backend hala çalışmamış olabilir.");
      }
    }

  }, 200);

  return (
    <div style={{ padding: "24px" }}>
      <input type="text" onChange={fetchApiData} ref={inputRef} />
      <ol>
        {data.map((e) => {
          return <li key={e.iata}> {e.name}</li>
        })}
      </ol>
    </div>
  );
}

export default App;
