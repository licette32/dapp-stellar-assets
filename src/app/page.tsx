// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import WalletConnect from '@/components/WalletConnect';

export default function Home() {
  const [publicKey, setPublicKey] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#082D36] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#C43556]/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-[#86DDE4]/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-96 h-96 bg-[#197074]/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMzQsIDIyMSwgMjI4LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-[#86DDE4]/10 backdrop-blur-md bg-[#082D36]/50">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Logo/Icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#86DDE4] to-[#197074] rounded-2xl blur-xl opacity-50"></div>
                <div className="relative bg-gradient-to-br from-[#197074] to-[#86DDE4] p-4 rounded-2xl shadow-2xl">
                  <svg className="w-12 h-12 text-[#082D36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-4xl md:text-6xl font-black mb-3">
                  <span className="bg-gradient-to-r from-[#86DDE4] via-[#F9CCCB] to-[#C43556] bg-clip-text text-transparent">
                    Assets Nativos
                  </span>
                </h1>
                <p className="text-[#86DDE4]/80 text-lg md:text-xl font-medium">
                  Stellar Testnet • Stablecoins sin contratos
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 px-4 py-2 bg-[#197074]/30 rounded-full border border-[#86DDE4]/30 backdrop-blur-sm">
                <div className="w-2 h-2 bg-[#86DDE4] rounded-full animate-pulse"></div>
                <span className="text-[#86DDE4] text-sm font-medium">Testnet Activo</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Wallet Connect */}
            <div className="flex justify-center lg:justify-end">
              <WalletConnect onConnect={setPublicKey} />
            </div>

            {/* Right Column - Info/Stats */}
            <div className="space-y-6">
              {publicKey ? (
                /* Connected State - Show Stats */
                <div className="space-y-4">
                  {/* Wallet Info Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#86DDE4] to-[#197074] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative bg-gradient-to-br from-[#082D36] to-[#450A18] p-6 rounded-2xl border border-[#86DDE4]/20">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#197074]/30 rounded-lg">
                          <svg className="w-5 h-5 text-[#86DDE4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-[#86DDE4]">Conexión Activa</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[#86DDE4]/60 text-sm">Network</span>
                          <span className="text-[#F9CCCB] font-mono text-sm">Testnet</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#86DDE4]/60 text-sm">Status</span>
                          <span className="text-[#86DDE4] font-medium text-sm flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#86DDE4] rounded-full animate-pulse"></div>
                            Online
                          </span>
                        </div>
                        <div className="pt-3 border-t border-[#197074]/30">
                          <span className="text-[#86DDE4]/60 text-xs">Address</span>
                          <p className="text-[#F9CCCB] font-mono text-xs mt-1 break-all">{publicKey}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#C43556] to-[#F9CCCB] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative bg-gradient-to-br from-[#082D36] to-[#7B182F]/30 p-6 rounded-2xl border border-[#C43556]/20">
                      <h3 className="text-lg font-bold text-[#F9CCCB] mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        Próximos Pasos
                      </h3>
                      <ul className="space-y-3">
                        {[
                          { icon: '✓', text: 'Wallet conectada', done: !!publicKey },
                          { icon: '→', text: 'Crear Trustline para USDC', done: false },
                          { icon: '→', text: 'Ver balance de assets', done: false },
                          { icon: '→', text: 'Enviar transacciones', done: false }
                        ].map((step, i) => (
                          <li key={i} className={`flex items-center gap-3 ${step.done ? 'text-[#86DDE4]' : 'text-[#F9CCCB]/60'}`}>
                            <span
                              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                step.done
                                  ? 'bg-[#197074]/30 text-[#86DDE4]'
                                  : 'bg-[#7B182F]/30 text-[#F9CCCB]/60'
                              }`}
                            >
                              {step.icon}
                            </span>
                            <span className="text-sm">{step.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                /* Not Connected State - Show Features */
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-[#86DDE4] mb-6">Características</h2>
                  
                  {[
                    {
                      icon: '🚀',
                      title: 'Sin Contratos',
                      desc: 'Assets nativos del protocolo Stellar',
                      color: 'from-[#86DDE4] to-[#197074]'
                    },
                    {
                      icon: '⚡',
                      title: 'Ultra Rápido',
                      desc: 'Transacciones en 3-5 segundos',
                      color: 'from-[#C43556] to-[#F9CCCB]'
                    },
                    {
                      icon: '💎',
                      title: 'Casi Gratis',
                      desc: '$0.000005 por transacción',
                      color: 'from-[#197074] to-[#86DDE4]'
                    }
                  ].map((feature, i) => (
                    <div key={i} className="relative group">
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300`}></div>
                      <div className="relative bg-[#082D36]/80 backdrop-blur-sm p-5 rounded-xl border border-[#86DDE4]/10">
                        <div className="flex items-start gap-4">
                          <span className="text-3xl">{feature.icon}</span>
                          <div>
                            <h3 className="text-[#86DDE4] font-bold mb-1">{feature.title}</h3>
                            <p className="text-[#86DDE4]/60 text-sm">{feature.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Instructions Section */}
          <div className="mt-16">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#197074] via-[#86DDE4] to-[#197074] rounded-2xl blur-lg opacity-20"></div>
              <div className="relative bg-gradient-to-br from-[#082D36] to-[#197074]/20 p-8 rounded-2xl border border-[#86DDE4]/20 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-[#86DDE4] mb-6 flex items-center gap-3">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Guía Rápida
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      num: '1',
                      title: 'Instalar',
                      desc: 'Descarga Freighter Wallet',
                      link: 'https://www.freighter.app'
                    },
                    {
                      num: '2',
                      title: 'Configurar',
                      desc: 'Cambia a Testnet en settings',
                      link: null
                    },
                    {
                      num: '3',
                      title: 'Conectar',
                      desc: 'Click en "Conectar Freighter"',
                      link: null
                    }
                  ].map((step, i) => (
                    <div key={i} className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-[#86DDE4] to-[#197074] rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                      <div className="relative bg-[#197074]/20 p-6 rounded-xl border border-[#86DDE4]/20">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#86DDE4] to-[#197074] rounded-full flex items-center justify-center text-[#082D36] font-bold text-lg shadow-lg">
                            {step.num}
                          </div>
                          <h4 className="text-[#86DDE4] font-bold">{step.title}</h4>
                        </div>
                        <p className="text-[#86DDE4]/70 text-sm mb-3">{step.desc}</p>
                        {step.link && (
                          <a
                            href={step.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#F9CCCB] text-sm hover:text-[#86DDE4] transition-colors inline-flex items-center gap-1"
                          >
                            Ver más
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[#86DDE4]/10 backdrop-blur-md bg-[#082D36]/50 mt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
              <p className="text-[#86DDE4]/60 text-sm">
                Construido con <span className="text-[#C43556]">♥</span> por Tiburonas Builders
              </p>
              <div className="flex items-center gap-6">
                <a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="text-[#86DDE4]/60 hover:text-[#86DDE4] transition-colors text-sm">
                  Stellar.org
                </a>
                <a href="https://developers.stellar.org" target="_blank" rel="noopener noreferrer" className="text-[#86DDE4]/60 hover:text-[#86DDE4] transition-colors text-sm">
                  Docs
                </a>
                <a href="https://laboratory.stellar.org" target="_blank" rel="noopener noreferrer" className="text-[#86DDE4]/60 hover:text-[#86DDE4] transition-colors text-sm">
                  Laboratory
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}