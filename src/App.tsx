import {Route, Routes} from 'react-router-dom';
import Transactions from './containers/Transactions/Transactions.tsx';
import Layout from './components/Layout/Layout.tsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import Categories from './containers/Categories/Categories.tsx';
import TransactionModal from "./containers/Transactions/TransactionModal.tsx";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/"  element={
            <Transactions/>
          }/>
          <Route path="/categories"  element={
            <Categories/>
          }/>
        </Routes>
      </Layout>

      <TransactionModal/>
    </>
  )
};

export default App
