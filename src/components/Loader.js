import { useState } from "react";
import RiseLoader from "react-spinners/RiseLoader";

function App() {
  let [loading, setLoading] = useState(true);

  return (
    <div
      className="sweet-loading"
      style={{ textAlign: "center", marginTop: "150px" }}
    >
      <RiseLoader
        color="#000"
        loading={loading}
        cssOverride=""
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default App;
