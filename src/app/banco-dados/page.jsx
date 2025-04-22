// Componente para visualização e gerenciamento do banco de dados Excel
"use client";

import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import { pythonBridge } from '../api/python-bridge';

export default function BancoDadosPage() {
  const [processos, setProcessos] = useState([]);
  const [estatisticas, setEstatisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filtro, setFiltro] = useState('todos');
  
  useEffect(() => {
    carregarDados();
  }, []);
  
  const carregarDados = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Carregar processos do banco de dados Excel
      const resultado = await pythonBridge.carregarBancoDados();
      
      if (resultado.success) {
        setProcessos(resultado.processos || []);
        setEstatisticas(resultado.estatisticas || null);
      } else {
        setError('Erro ao carregar dados do banco de dados Excel.');
      }
    } catch (err) {
      setError(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const exportarRelatorio = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const resultado = await pythonBridge.exportarRelatorio();
      
      if (resultado.success) {
        setSuccess(`Relatório exportado com sucesso: ${resultado.caminho}`);
      } else {
        setError('Erro ao exportar relatório.');
      }
    } catch (err) {
      setError(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const filtrarProcessos = () => {
    if (filtro === 'todos') {
      return processos;
    }
    
    return processos.filter(processo => processo.nivel_urgencia === filtro);
  };
  
  const processosFiltrados = filtrarProcessos();
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Banco de Dados de Processos</h1>
        <p className="text-gray-600">
          Visualize e gerencie o histórico de processos respondidos.
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card title="Estatísticas">
          {loading ? (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Carregando estatísticas...</p>
            </div>
          ) : estatisticas ? (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 mb-1">{estatisticas.total_processos || 0}</h3>
                  <p className="text-sm text-blue-600">Total de Processos</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-green-800 mb-1">
                    {estatisticas.tempo_medio_resposta ? `${estatisticas.tempo_medio_resposta.toFixed(2)}h` : 'N/A'}
                  </h3>
                  <p className="text-sm text-green-600">Tempo Médio de Resposta</p>
                </div>
              </div>
              
              <h3 className="text-md font-medium mb-2">Distribuição por Tipo</h3>
              {estatisticas.tipos_processo && Object.keys(estatisticas.tipos_processo).length > 0 ? (
                <div className="space-y-2 mb-4">
                  {Object.entries(estatisticas.tipos_processo).map(([tipo, quantidade]) => (
                    <div key={tipo} className="flex justify-between items-center">
                      <span className="text-sm">{tipo}</span>
                      <span className="text-sm font-medium">{quantidade}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-4">Nenhum dado disponível</p>
              )}
              
              <h3 className="text-md font-medium mb-2">Distribuição por Urgência</h3>
              {estatisticas.niveis_urgencia && Object.keys(estatisticas.niveis_urgencia).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(estatisticas.niveis_urgencia).map(([nivel, quantidade]) => (
                    <div key={nivel} className="flex justify-between items-center">
                      <span className="text-sm">{nivel}</span>
                      <span className="text-sm font-medium">{quantidade}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Nenhum dado disponível</p>
              )}
            </div>
          ) : (
            <p className="text-gray-600">Nenhuma estatística disponível.</p>
          )}
        </Card>
        
        <Card title="Ações">
          <div className="space-y-4">
            <div>
              <h3 className="text-md font-medium mb-2">Exportar Relatório</h3>
              <p className="text-sm text-gray-600 mb-2">
                Exporte um relatório detalhado de todos os processos respondidos em formato Excel.
              </p>
              <Button 
                onClick={exportarRelatorio} 
                disabled={loading}
              >
                {loading ? 'Exportando...' : 'Exportar Relatório'}
              </Button>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-2">Atualizar Dados</h3>
              <p className="text-sm text-gray-600 mb-2">
                Atualize os dados do banco de dados para visualizar as informações mais recentes.
              </p>
              <Button 
                onClick={carregarDados} 
                disabled={loading}
                variant="outline"
              >
                {loading ? 'Atualizando...' : 'Atualizar Dados'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      <Card title="Histórico de Processos">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filtrar por Nível de Urgência
          </label>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="todos">Todos os Processos</option>
            <option value="critico">Crítico</option>
            <option value="alto">Alto</option>
            <option value="medio">Médio</option>
            <option value="baixo">Baixo</option>
          </select>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Carregando processos...</p>
          </div>
        ) : processosFiltrados.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            Nenhum processo encontrado com os filtros selecionados.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Número
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assunto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Resposta
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Urgência
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {processosFiltrados.map((processo, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {processo.numero_processo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {processo.assunto}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {processo.data_resposta}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {processo.tipo_processo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        processo.nivel_urgencia === 'critico' ? 'bg-red-100 text-red-800' :
                        processo.nivel_urgencia === 'alto' ? 'bg-orange-100 text-orange-800' :
                        processo.nivel_urgencia === 'medio' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {processo.nivel_urgencia}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {processo.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </Layout>
  );
}
