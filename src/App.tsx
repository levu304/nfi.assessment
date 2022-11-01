import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [account, setAccount] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);

  useEffect(() => {
    const ethereum = window.ethereum;

    const init = async () => {
      const chainId = await ethereum.request({ method: "eth_chainId" });
      setNetwork(chainId);
      setLoading(false);
    };

    init();

    const handleChainChanged = (_chainId: string) => {
      setNetwork(_chainId);
    };

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts[0] !== account) {
        setAccount(accounts[0]);
      }
    };

    ethereum.on("chainChanged", handleChainChanged);
    ethereum.on("accountsChanged", handleAccountsChanged);
  }, []);

  const connect = async () => {
    const ethereum = window.ethereum;
    const accounts: string[] = await ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length !== 0) {
      setAccount(accounts[0]);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Network ID</p>
          <p
            style={{
              background: "#ccc",
              padding: 10,
              color: "black",
            }}
          >
            {network}
          </p>
          {account ? (
            <>
              <p>Account</p>
              <p
                style={{
                  background: "#ccc",
                  padding: 10,
                  color: "black",
                }}
              >
                {account}
              </p>
            </>
          ) : (
            <button onClick={connect}>Connect</button>
          )}
        </>
      )}
    </div>
  );
}

export default App;
