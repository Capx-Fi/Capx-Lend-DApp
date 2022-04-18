// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "../src/redux/store";
import { useEffect, useState } from "react";

// import {LendLogo} from "./assets/lend-logo.svg";
import './App.css';
import LoadingScreen from "./containers/LoadingScreen";
import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import MetamaskModal from "./components/MetamaskModal/MetamaskModal";
import {SnackbarProvider} from "notistack";
import {useWeb3React, Web3ReactProvider} from "@web3-react/core";

function App() {
  const [loading, setLoading] = useState(true);
  const { active, account, chainId } = useWeb3React();


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);


  return (
    <>
      {loading ?
      (
        <LoadingScreen />
      ) : (
        <div>
        {!active ? (
        <MetamaskModal />
        ) : (
          <>
            <h2 className="text-white text-paragraph-2 flex justify-center align-center">The wallet connection state is active</h2>
          </>
        )}
        </div>
      )
      }
    </>
  );
}

export default App;
