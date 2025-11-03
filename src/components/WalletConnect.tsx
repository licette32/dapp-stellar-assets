'use client';

import { useState, useEffect } from 'react';

interface Props {
  onConnect: (publicKey: string) => void;
}

export default function WalletConnect({ onConnect }: Props) {
  const [publicKey, setPublicKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkConnection = async () => {
      try {
        const freighter = await import('@stellar/freighter-api');
        const connected = await freighter.isConnected();
        if (connected) {
          const result = await freighter.getAddress();
          if (result.address && result.address !== '') {
            setPublicKey(result.address);
            onConnect(result.address);
          }
        }
      } catch (err: any) {
        console.error('Error checking connection:', err);
      }
    };
    checkConnection();
  }, [mounted, onConnect]);

  const connectWallet = async () => {
    setLoading(true);
    setError(null);
    try {
      if (typeof window === 'undefined') {
        throw new Error('Este código solo funciona en el navegador');
      }
      const freighter = await import('@stellar/freighter-api');
      const connected = await freighter.isConnected();
      if (!connected) {
        throw new Error('Por favor instala Freighter desde https://freighter.app');
      }

      console.log('🔐 Solicitando acceso a Freighter...');
      const accessResult = await freighter.requestAccess();
      console.log('📊 Resultado de requestAccess:', accessResult);
      if (accessResult.error) {
        throw new Error(`Acceso denegado: ${accessResult.error}`);
      }

      console.log('🔑 Obteniendo dirección...');
      const addressResult = await freighter.getAddress();
      console.log('📦 Resultado:', addressResult);

      if (addressResult.address && addressResult.address !== '') {
        setPublicKey(addressResult.address);
        onConnect(addressResult.address);
      } else {
        throw new Error('No se pudo obtener la dirección. Verifica que Freighter esté desbloqueado.');
      }
    } catch (err: any) {
      console.error('❌ Error:', err);
      setError(err.message || 'Error al conectar');
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setPublicKey('');
    onConnect('');
  };

  const formatAddress = (addr: string) => addr ? `${addr.slice(0, 8)}...${addr.slice(-6)}` : '';

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(publicKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative w-full max-w-md transition-all duration-500 hover:scale-[1.01]">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#C43556] via-[#86DDE4] to-[#197074] rounded-2xl blur-2xl opacity-25 animate-pulse"></div>

      <div className="relative bg-gradient-to-br from-[#082D36] to-[#07313D] p-8 rounded-2xl shadow-xl border border-[#86DDE4]/20 backdrop-blur-sm hover:shadow-[#197074]/40">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#86DDE4] to-[#197074] mb-4 shadow-lg">
            <svg className="w-8 h-8 text-[#082D36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#86DDE4] to-[#F9CCCB] bg-clip-text text-transparent">
            Conectar Wallet
          </h2>
          <p className="text-[#86DDE4]/70 text-sm mt-2">Usa Freighter para acceder</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-[#7B182F]/20 border border-[#C43556] rounded-xl backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#F9CCCB] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-[#F9CCCB] text-sm flex-1">{error}</p>
            </div>
          </div>
        )}

        {/* Connected State */}
        {publicKey ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-[#197074]/30 to-[#86DDE4]/30 rounded-xl border border-[#86DDE4]/30 backdrop-blur-sm">
              <svg className="w-5 h-5 text-[#86DDE4]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[#86DDE4] font-medium text-sm">Wallet Conectada</span>
            </div>

            <div className="bg-[#082D36]/50 p-4 rounded-xl border border-[#197074]/30 backdrop-blur-sm">
              <p className="text-[#86DDE4]/60 text-xs mb-2">Dirección Pública</p>
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[#F9CCCB] text-sm flex-1 truncate">
                  {formatAddress(publicKey)}
                </p>
                <button
                  onClick={copyToClipboard}
                  className="flex-shrink-0 p-2 bg-[#197074]/30 hover:bg-[#197074]/50 rounded-lg border border-[#86DDE4]/20 transition-all duration-200 group"
                  title="Copiar dirección"
                >
                  {copied ? (
                    <svg className="w-4 h-4 text-[#86DDE4]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-[#86DDE4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-[#86DDE4]/40 text-xs mt-3 break-all">{publicKey}</p>
            </div>

            <button
              onClick={disconnectWallet}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#7B182F] to-[#C43556] hover:from-[#C43556] hover:to-[#7B182F] text-[#F9CCCB] font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-[#C43556]/50"
            >
              Desconectar Wallet
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={connectWallet}
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#86DDE4] to-[#197074] hover:from-[#197074] hover:to-[#86DDE4] text-[#082D36] font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-[#86DDE4]/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-[#082D36] border-t-transparent rounded-full animate-spin"></div>
                  <span>Conectando...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Conectar Freighter</span>
                </>
              )}
            </button>

            <div className="p-4 bg-[#197074]/20 rounded-xl border border-[#86DDE4]/20 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#86DDE4] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="text-[#86DDE4] text-sm font-medium mb-1">¿No tienes Freighter?</p>
                  <a
                    href="https://www.freighter.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F9CCCB] text-sm hover:text-[#86DDE4] transition-colors underline"
                  >
                    Descárgala aquí →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
