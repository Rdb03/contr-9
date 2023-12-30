import {Route, Routes} from 'react-router-dom';
import Transactions from './containers/Transactions/Transactions.tsx';
import Layout from './components/Layout/Layout.tsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import Categories from './containers/Categories/Categories.tsx';

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
    </>
  )
};

export default App
