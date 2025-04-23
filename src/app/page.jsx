"use client";

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">
              Agente de Processos Administrativos
            </h1>
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
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Bem-vindo ao Agente de Processos Administrativos</h2>
            <p className="text-gray-700 mb-4">
              Esta ferramenta foi desenvolvida para automatizar a leitura de processos administrativos e sugerir respostas
              adequadas, combinando análise técnica de engenharia e jurídica.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Funcionalidades Principais</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Acesso automatizado ao portal PROA</li>
                  <li>• Processamento de processos via web ou PDF</li>
                  <li>• Resumo inteligente de pontos importantes</li>
                  <li>• Sugestão de respostas personalizadas</li>
                  <li>• Priorização de processos urgentes</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Benefícios</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Economia de tempo na análise de processos</li>
                  <li>• Padronização de respostas</li>
                  <li>• Redução de erros técnicos e jurídicos</li>
                  <li>• Histórico completo de processos respondidos</li>
                  <li>• Aprendizado contínuo com suas interações</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Processos</h3>
              <p className="text-gray-700 mb-4">
                Acesse e gerencie todos os processos administrativos em um só lugar.
              </p>
              <Link href="/processos" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                Ver Processos
              </Link>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-orange-700 mb-3">Priorização</h3>
              <p className="text-gray-700 mb-4">
                Identifique processos urgentes que requerem atenção imediata.
              </p>
              <Link href="/priorizacao" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded">
                Ver Urgentes
              </Link>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Banco de Dados</h3>
              <p className="text-gray-700 mb-4">
                Consulte o histórico de processos respondidos e estatísticas.
              </p>
              <Link href="/banco-dados" className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded">
                Ver Histórico
              </Link>
            </div>
          </div>
        </div>
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
