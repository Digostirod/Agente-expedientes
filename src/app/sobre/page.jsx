"use client";

import React from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';

export default function SobrePage() {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Sobre o Agente de Processos Administrativos</h1>
        <p className="text-gray-600">
          Conheça mais sobre este projeto e como ele pode ajudar na gestão de processos administrativos.
        </p>
      </div>
      
      <Card title="Visão Geral" className="mb-6">
        <p className="mb-4">
          O Agente de Processos Administrativos é uma solução completa para automatizar a leitura, análise e sugestão de respostas para processos administrativos do portal PROA (Processos Administrativos e-Gov).
        </p>
        
        <p className="mb-4">
          Desenvolvido para atender às necessidades específicas de profissionais que lidam com processos administrativos estaduais, o agente utiliza técnicas avançadas de automação web, processamento de linguagem natural e aprendizado de máquina para melhorar progressivamente suas sugestões.
        </p>
        
        <p>
          A solução é capaz de acessar o portal via web, extrair informações de processos, analisar seu conteúdo, gerar um resumo dos pontos importantes, apresentar respostas anteriores similares e sugerir respostas adequadas com análise técnica de engenharia e jurídica.
        </p>
      </Card>
      
      <Card title="Arquitetura" className="mb-6">
        <p className="mb-4">O agente é composto por cinco módulos principais:</p>
        
        <div className="mb-4">
          <h3 className="font-medium mb-1">1. Automação Web</h3>
          <p className="text-gray-700">
            Responsável por acessar o portal PROA, navegar entre os processos, extrair dados e capturar documentos.
          </p>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium mb-1">2. Processamento de Texto</h3>
          <p className="text-gray-700">
            Extrai e processa texto de processos administrativos, seja a partir de documentos PDF ou de conteúdo extraído via web.
          </p>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium mb-1">3. Análise e Sugestão de Respostas</h3>
          <p className="text-gray-700">
            Analisa processos administrativos e gera sugestões de respostas com base em templates personalizáveis.
          </p>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium mb-1">4. Mecanismo de Aprendizado</h3>
          <p className="text-gray-700">
            Permite que o agente aprenda com o tempo, adaptando-se às necessidades específicas do usuário e melhorando progressivamente suas sugestões.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-1">5. Resumo de Pontos Importantes</h3>
          <p className="text-gray-700">
            Gera um resumo dos pontos importantes do processo e apresenta respostas anteriores similares antes de sugerir uma resposta.
          </p>
        </div>
      </Card>
      
      <Card title="Tecnologias Utilizadas" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Backend</h3>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Python 3.8+</li>
              <li>Playwright (automação web)</li>
              <li>spaCy (processamento de linguagem natural)</li>
              <li>PyMuPDF (processamento de PDF)</li>
              <li>API REST para comunicação com frontend</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Frontend</h3>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Next.js (framework React)</li>
              <li>Tailwind CSS (estilização)</li>
              <li>React Markdown (renderização de conteúdo)</li>
              <li>Cloudflare Workers (hospedagem)</li>
            </ul>
          </div>
        </div>
      </Card>
      
      <Card title="Benefícios">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Eficiência</h3>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Redução do tempo de análise de processos</li>
              <li>Automação de tarefas repetitivas</li>
              <li>Padronização de respostas</li>
              <li>Acesso rápido a informações relevantes</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Qualidade</h3>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Análise técnica especializada</li>
              <li>Consistência nas respostas</li>
              <li>Redução de erros humanos</li>
              <li>Melhoria contínua através de feedback</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Personalização</h3>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Adaptação às preferências do usuário</li>
              <li>Aprendizado da dinâmica de cada expediente</li>
              <li>Templates personalizáveis</li>
              <li>Configurações ajustáveis</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Conhecimento</h3>
            <ul className="list-disc pl-5 mb-4 text-gray-700">
              <li>Histórico de respostas anteriores</li>
              <li>Estatísticas de uso</li>
              <li>Base de conhecimento expansível</li>
              <li>Compartilhamento de experiências</li>
            </ul>
          </div>
        </div>
      </Card>
    </Layout>
  );
}
