"use client";

import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import { pythonBridge } from '../api/python-bridge';

export default function PriorizacaoPage() {
  const [processos, setProcessos] = useState([]);
  const [processosUrgentes, setProcessosUrgentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [relatorio, setRelatorio] = useState(null);
  
  useEffect(() => {
    carregarProcessos();
  }, []);
  
  const carregarProcessos = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Carregar todos os processos da caixa
      const resultado = await pythonBridge.listarProcessos();
      
      if (resultado.success && resultado.processos) {
        setProcessos(resultado.processos);
        
        // Priorizar processos
        const resultadoPriorizacao = await pythonBridge.priorizarProcessos(resultado.processos);
        
        if (resultadoPriorizacao.success) {
          // Obter processos críticos e de alta prioridade
          const urgentes = [
            ...(resultadoPriorizacao.processos_por_nivel?.critico || []),
            ...(resultadoPriorizacao.processos_por_nivel?.alto || [])
          ];
          
          setProcessosUrgentes(urgentes);
          setRelatorio(resultadoPriorizacao.relatorio);
        } else {
          setError('Erro ao priorizar processos.');
        }
      } else {
        setError('Erro ao carregar processos.');
      }
    } catch (err) {
      setError(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const exportarRelatorio = async () => {
    setLoading(true);
    setSuccess('');
    setError('');
    
    try {
      const resultado = await pythonBridge.exportarRelatorioPriorizacao();
      
      if (resultado.success) {
        setSuccess(`Relatório de priorização exportado com sucesso: ${resultado.caminho}`);
      } else {
        setError('Erro ao exportar relatório de priorização.');
      }
    } catch (err) {
      setError(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Priorização de Processos</h1>
        <p className="text-gray-600">
          Identifique processos urgentes que requerem atenção imediata.
        </p>
      </div>
      
      {error && (
        <Alert 
          type="error" 
          title="Erro" 
          className="mb-6"
          dismissible
          onDismiss={() => setError('')}
        >
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert 
          type="success" 
          title="Sucesso" 
          className="mb-6"
          dismissible
          onDismiss={() => setSuccess('')}
        >
          {success}
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Processos Urgentes</h2>
            <div className="flex space-x-2">
              <Button 
                onClick={carregarProcessos} 
                disabled={loading}
                variant="outline"
                size="sm"
              >
                {loading ? 'Atualizando...' : 'Atualizar'}
              </Button>
              <Button 
                onClick={exportarRelatorio} 
                disabled={loading}
                size="sm"
              >
                Exportar Relatório
              </Button>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Analisando processos...</p>
            </div>
          ) : processosUrgentes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Nenhum processo urgente encontrado.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {processosUrgentes.map((processo, index) => (
                <div 
                  key={index} 
                  className={`border-l-4 p-4 rounded-md shadow-sm ${
                    processo.urgencia?.nivel === 'critico' 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-orange-500 bg-orange-50'
                  }`}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium">
                      {processo.numero}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      processo.urgencia?.nivel === 'critico' 
                        ? 'bg-red-200 text-red-800' 
                        : 'bg-orange-200 text-orange-800'
                    }`}>
                      {processo.urgencia?.nivel === 'critico' ? 'Crítico' : 'Alta Prioridade'}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1">{processo.assunto}</p>
                  
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Recebido:</span> {processo.data_recebimento}
                    </div>
                    <div>
                      <span className="text-gray-500">Prazo:</span> {processo.urgencia?.detalhes?.prazo?.data_prazo || 'N/A'}
                    </div>
                    <div>
                      <span className="text-gray-500">Remetente:</span> {processo.remetente}
                    </div>
                    <div>
                      <span className="text-gray-500">Tipo:</span> {processo.tipo_processo}
                    </div>
                  </div>
                  
                  {processo.urgencia?.detalhes?.prazo?.dias_restantes !== undefined && (
                    <div className="mt-2">
                      <span className={`text-sm font-medium ${
                        processo.urgencia.detalhes.prazo.dias_restantes < 0 
                          ? 'text-red-600' 
                          : processo.urgencia.detalhes.prazo.dias_restantes === 0 
                            ? 'text-orange-600' 
                            : 'text-blue-600'
                      }`}>
                        {processo.urgencia.detalhes.prazo.dias_restantes < 0 
                          ? `ATRASADO por ${Math.abs(processo.urgencia.detalhes.prazo.dias_restantes)} dias` 
                          : processo.urgencia.detalhes.prazo.dias_restantes === 0 
                            ? 'VENCE HOJE' 
                            : `Vence em ${processo.urgencia.detalhes.prazo.dias_restantes} dias`}
                      </span>
                    </div>
                  )}
                  
                  <div className="mt-3 flex justify-end">
                    <Button size="sm">
                      Processar Agora
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
        
        <Card title="Estatísticas">
          {loading ? (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Carregando...</p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <h3 className="text-2xl font-medium text-blue-800">{processos.length}</h3>
                  <p className="text-sm text-blue-600">Total de Processos</p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <h3 className="text-2xl font-medium text-red-800">{processosUrgentes.length}</h3>
                  <p className="text-sm text-red-600">Processos Urgentes</p>
                </div>
              </div>
              
              <h3 className="text-md font-medium mb-2">Distribuição por Urgência</h3>
              <div className="space-y-2 mb-4">
                {['critico', 'alto', 'medio', 'baixo'].map(nivel => {
                  const count = processos.filter(p => p.urgencia?.nivel === nivel).length;
                  const percentage = processos.length > 0 ? Math.round((count / processos.length) * 100) : 0;
                  
                  return (
                    <div key={nivel}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm capitalize">{nivel}</span>
                        <span className="text-sm">{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            nivel === 'critico' ? 'bg-red-600' :
                            nivel === 'alto' ? 'bg-orange-500' :
                            nivel === 'medio' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`} 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4">
                <h3 className="text-md font-medium mb-2">Critérios de Priorização</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Palavras-chave de urgência (30%)</li>
                  <li>Prazos e datas (40%)</li>
                  <li>Tipo de processo (20%)</li>
                  <li>Remetente/Origem (10%)</li>
                </ul>
              </div>
            </div>
          )}
        </Card>
      </div>
      
      {relatorio && (
        <Card title="Relatório de Priorização" className="mb-6">
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: relatorio.replace(/\n/g, '<br>') }} />
          </div>
        </Card>
      )}
    </Layout>
  );
}
