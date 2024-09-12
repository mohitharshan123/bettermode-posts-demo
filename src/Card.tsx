import { useState } from "react";
import { useFetchPosts } from "./hooks/graphql/usePosts";

function Card() {
  const [count, setCount] = useState(0);
  const {data} = useFetchPosts()
  return (
    <div className="card">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>{" "}
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  );
}

export default Card;
