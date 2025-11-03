// src/components/types/freighter.d.ts
declare module '@stellar/freighter-api' {
  /** Verifica si Freighter está instalado */
  export function isConnected(): Promise<boolean>;

  /** Obtiene la dirección pública */
  export function getAddress(): Promise<{ address: string; error?: string }>;

  /** Solicita permiso de conexión (freighter.requestAccess) */
  export function requestAccess(): Promise<{ address: string; error?: string }>;

  /** Firma una transacción */
  export function signTransaction(
    xdr: string,
    opts?: { networkPassphrase: string }
  ): Promise<{ signedTx: string; error?: string }>;
}
