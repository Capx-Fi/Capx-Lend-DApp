import Header from "../Header";
import Footer from "../Footer/Footer";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import FirefoxIllustration from "../../assets/FirefoxIllustration.png";
import { injected } from "../../utils/connector";
import MetamaskIcon from "../../assets/MetamaskIcon.svg";
import { WRONG_CHAIN_MESSAGE } from "../../constants/config";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import "./MetamaskModal.scss"
import "../../translations/i18n";


export default function MetamaskModal() {
	const { active, account, library, connector, activate } = useWeb3React();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { error } = useWeb3React();
	const { t } = useTranslation();
	const isMetamask = window.ethereum && window.ethereum.isMetaMask;
	const unsupportedChainIdError =
		error && error instanceof UnsupportedChainIdError;
	
	async function connect() {
		try {
			await activate(injected);
			if (unsupportedChainIdError) {
				enqueueSnackbar(WRONG_CHAIN_MESSAGE, {
				variant: "error",
				});
			}
			} catch (ex) {
			if (error instanceof UnsupportedChainIdError) {
				enqueueSnackbar(WRONG_CHAIN_MESSAGE, {
				variant: "error",
				});
			}
			alert(ex);
			}
	}

	return (
    <article className="metamaskmodalscreen">
    <Header />
    <section className="metamaskmodalscreen_maincontainer">
        <div className="metamaskmodalscreen_maincontainer_herocontainer">
        <div className="metamaskmodalscreen_maincontainer_herocontainer_title">
            {t("please_connect_metamask")}
            <br /> {t("please_connect_metamask_2")}
        </div>
        {isMetamask ? (
            <div
            className="metamaskmodalscreen_maincontainer_herocontainer_button"
            onClick={() => {
                connect();
            }}
            >
            <img
                className="metamaskmodalscreen_maincontainer_herocontainer_button_icon"
                src={MetamaskIcon}
                alt="Metamask Icon"
            />
            <div className="metamaskmodalscreen_maincontainer_herocontainer_button_text">
			{t("connect_metamask")}
            </div>
            </div>
        ) : (
            <div
            className="metamaskmodalscreen_maincontainer_herocontainer_button"
            onClick={() => {
                var win = window.open("https://metamask.io/", "_blank");
                win.focus();
            }}
            >
            <img
                className="metamaskmodalscreen_maincontainer_herocontainer_button_icon"
                src={MetamaskIcon}
                alt="Metamask Icon"
            />
            <div className="metamaskmodalscreen_maincontainer_herocontainer_button_text">
                {t("install_metamask")}
            </div>
            </div>
        )}
        <img
            className="metamaskmodalscreen_maincontainer_herocontainer_firefoxillustration"
            src={FirefoxIllustration}
            alt="ETH Illustration"
        />
        </div>
    </section>
    <Footer />
    </article>
	)
}
