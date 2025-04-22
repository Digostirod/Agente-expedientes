"use client";

import React from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Layout>
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Agente de Processos Administrativos</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Automatize a leitura de processos administrativos e obtenha sugestões de respostas com análise técnica de engenharia e jurídica.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link href="/processos">
            <Button size="lg">Ver Processos</Button>
          </Link>
          <Link href="/configuracoes">
            <Button variant="outline" size="lg">Configurações</Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card title="Resumo Inteligente">
          <p className="mb-4">
            Antes de sugerir uma resposta, o agente emite um resumo dos pontos importantes e das respostas já dadas em expedientes similares.
          </p>
          <ul className="list-disc pl-5 mb-4 text-gray-700">
            <li>Identificação de prazos e datas</li>
            <li>Destaque de valores monetários</li>
            <li>Requisitos e pendências</li>
            <li>Referências a legislação</li>
          </ul>
        </Card>
        
        <Card title="Análise Técnica">
          <p className="mb-4">
            Análise técnica especializada em engenharia e aspectos jurídicos para processos administrativos estaduais.
          </p>
          <ul className="list-disc pl-5 mb-4 text-gray-700">
            <li>Interpretação de normas técnicas</li>
            <li>Avaliação de requisitos legais</li>
            <li>Verificação de conformidade</li>
            <li>Sugestões fundamentadas</li>
          </ul>
        </Card>
        
        <Card title="Aprendizado Contínuo">
          <p className="mb-4">
            O agente aprende com o tempo, adaptando-se à dinâmica específica de cada tipo de expediente e às suas preferências.
          </p>
          <ul className="list-disc pl-5 mb-4 text-gray-700">
            <li>Personalização de respostas</li>
            <li>Melhoria contínua</li>
            <li>Adaptação a diferentes tipos de processo</li>
            <li>Feedback para aprimoramento</li>
          </ul>
        </Card>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">Como Funciona</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-800 text-2xl font-bold">1</span>
            </div>
            <h3 className="font-medium mb-2">Acesso ao Processo</h3>
            <p className="text-gray-600">O agente acessa o portal PROA ou processa arquivos PDF de processos.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-800 text-2xl font-bold">2</span>
            </div>
            <h3 className="font-medium mb-2">Análise do Conteúdo</h3>
            <p className="text-gray-600">Extração e processamento do texto para identificar pontos importantes.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-800 text-2xl font-bold">3</span>
            </div>
            <h3 className="font-medium mb-2">Geração de Resumo</h3>
            <p className="text-gray-600">Criação de um resumo com pontos importantes e respostas similares anteriores.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-800 text-2xl font-bold">4</span>
            </div>
            <h3 className="font-medium mb-2">Sugestão de Resposta</h3>
            <p className="text-gray-600">Geração de uma resposta personalizada com base na análise técnica e jurídica.</p>
          </div>
        </div>
      </div>
      
      <Card title="Comece Agora">
        <p className="mb-4">
          Acesse a lista de processos para começar a utilizar o agente de processos administrativos.
        </p>
        <Link href="/processos">
          <Button>Ver Processos</Button>
        </Link>
      </Card>
    </Layout>
  );
}
