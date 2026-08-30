import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Solucoes from './pages/Solucoes'
import Fundos from './pages/Fundos'
import FundoDetalhe from './pages/FundoDetalhe'
import Contato from './pages/Contato'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'sobre', Component: Sobre },
      { path: 'solucoes', Component: Solucoes },
      { path: 'fundos', Component: Fundos },
      { path: 'fundos/:slug', Component: FundoDetalhe },
      { path: 'contato', Component: Contato },
    ],
  },
])
