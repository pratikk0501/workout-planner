import { useState } from "react";
import Layout from "./components/Layout";
import Grid from "./components/Grid";
import Hero from "./components/Hero";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <main>
        <Hero />
        <Grid />
      </main>
    </Layout>
  );
}

export default App;
