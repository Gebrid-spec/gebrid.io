import { useState, useCallback, useEffect } from 'react';
import { BrowserProvider, formatEther } from 'ethers';

const CHAINS = {
  1:    { name: 'Ethereum', symbol: 'ETH', explorer: 'https://etherscan.io' },
  137:  { name: 'Polygon', symbol: 'MATIC', explorer: 'https://polygonscan.com' },
  42161:{ name: 'Arbitrum', symbol: 'ETH', explorer: 'https://arbiscan.io' },
  10:   { name: 'Optimism', symbol: 'ETH', explorer: 'https://optimistic.etherscan.io' },
  8453: { name: 'Base', symbol: 'ETH', explorer: 'https://basescan.org' },
  11155111: { name: 'Sepolia', symbol: 'ETH', explorer: 'https://sepolia.etherscan.io' },
};

export function useWallet() {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [chainInfo, setChainInfo] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState(null);

  const connected = !!address;

  const updateChain = useCallback((hexChainId) => {
    const id = parseInt(hexChainId, 16);
    setChainId(id);
    setChainInfo(CHAINS[id] || { name: `Chain ${id}`, symbol: 'ETH', explorer: '' });
  }, []);

  const fetchBalance = useCallback(async (prov, addr) => {
    try {
      const bal = await prov.getBalance(addr);
      setBalance(formatEther(bal));
    } catch { setBalance(null); }
  }, []);

  const connect = useCallback(async () => {
    setError(null);
    setConnecting(true);

    if (!window.ethereum) {
      setError('No wallet detected. Install MetaMask or another Web3 wallet.');
      setConnecting(false);
      return;
    }

    try {
      const prov = new BrowserProvider(window.ethereum);
      const accounts = await prov.send('eth_requestAccounts', []);
      const addr = accounts[0];
      const network = await prov.getNetwork();

      setProvider(prov);
      setAddress(addr);
      setChainId(Number(network.chainId));
      setChainInfo(CHAINS[Number(network.chainId)] || { name: `Chain ${network.chainId}`, symbol: 'ETH', explorer: '' });

      await fetchBalance(prov, addr);
    } catch (err) {
      if (err.code === 4001) {
        setError('Connection rejected by user.');
      } else {
        setError(err.message || 'Failed to connect wallet.');
      }
    } finally {
      setConnecting(false);
    }
  }, [fetchBalance]);

  const disconnect = useCallback(() => {
    setAddress(null);
    setBalance(null);
    setChainId(null);
    setChainInfo(null);
    setProvider(null);
  }, []);

  const shortAddr = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  // Listen for account/chain changes
  useEffect(() => {
    if (!window.ethereum) return;
    const onAccounts = (accs) => {
      if (accs.length === 0) disconnect();
      else {
        setAddress(accs[0]);
        if (provider) fetchBalance(provider, accs[0]);
      }
    };
    const onChain = (hexId) => {
      updateChain(hexId);
      // Re-create provider on chain change
      const prov = new BrowserProvider(window.ethereum);
      setProvider(prov);
      if (address) fetchBalance(prov, address);
    };

    window.ethereum.on('accountsChanged', onAccounts);
    window.ethereum.on('chainChanged', onChain);
    return () => {
      window.ethereum.removeListener('accountsChanged', onAccounts);
      window.ethereum.removeListener('chainChanged', onChain);
    };
  }, [address, provider, disconnect, fetchBalance, updateChain]);

  // Auto-reconnect if previously connected
  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum.request({ method: 'eth_accounts' }).then(accs => {
      if (accs.length > 0) connect();
    }).catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    address,
    shortAddr,
    balance,
    chainId,
    chainInfo,
    connected,
    connecting,
    error,
    provider,
    connect,
    disconnect,
    hasWallet: !!window.ethereum,
  };
}
