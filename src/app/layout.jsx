import './globals.css'

export const metadata = {
  title: 'Agente de Processos Administrativos',
  description: 'Sistema para leitura de processos administrativos e sugestão de respostas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}
