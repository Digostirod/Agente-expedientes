"use client";

import React from 'react';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <Link href="/" className="text-2xl font-bold mb-4 md:mb-0">
              Agente de Processos Administrativos
            </Link>
            <nav className="flex flex-wrap gap-4">
              <Link href="/" className="hover:underline">
                Início
              </Link>
              <Link href="/processos" className="hover:underline">
                Processos
              </Link>
              <Link href="/priorizacao" className="hover:underline">
                Priorização
              </Link>
              <Link href="/banco-dados" className="hover:underline">
                Banco de Dados
              </Link>
              <Link href="/configuracoes" className="hover:underline">
                Configurações
              </Link>
              <Link href="/sobre" className="hover:underline">
                Sobre
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-gray-100 border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <p className="text-gray-600 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Agente de Processos Administrativos
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/termos" className="text-gray-600 hover:text-blue-800">
                Termos de Uso
              </Link>
              <Link href="/privacidade" className="text-gray-600 hover:text-blue-800">
                Privacidade
              </Link>
              <Link href="/ajuda" className="text-gray-600 hover:text-blue-800">
                Ajuda
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
