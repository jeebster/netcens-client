import CensorshipInfoView from "./views/censorship-info-view";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Open Observatory of Network Interference</h1>
      </header>
      <section>
        <CensorshipInfoView />
      </section>
    </div>
  );
}

export default App;
