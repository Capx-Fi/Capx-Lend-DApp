import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "../src/redux/store";
import { useEffect, useState } from "react";

// import {LendLogo} from "./assets/lend-logo.svg";
import './App.less';
import LoadingScreen from "./containers/LoadingScreen";
import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import MetamaskModal from "./components/MetamaskModal/MetamaskModal";
import {SnackbarProvider} from "notistack";
import {useWeb3React, Web3ReactProvider} from "@web3-react/core";
import SvgSprite from "./utils/SvgSpriteLoader";
import svgFile from "./assets/images/svg/svg-sprite.svg";
import { publicRoutes } from "./routes";
import history from './utils/history';


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
      {/* {loading ?
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
      } */}
      <SvgSprite url={svgFile} />
        <Router
          history={history}
          basename={process.env.REACT_APP_BASENAME || ""}
        >
          {publicRoutes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={(props) => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                }}
              />
            );
          })}
        </Router>
    </>
  );
}

export default App;