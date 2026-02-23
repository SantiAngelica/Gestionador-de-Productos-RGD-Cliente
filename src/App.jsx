import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NewProductForm from './components/NewProductForm/NewProductForm';
import ProductList from './components/ProductsList/ProductList';
import ProductItem from './components/ProductItem/ProductItem';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Protected from './components/Protected/Protected';
import Layout from './components/Layout/Layout';
import UsersList from './components/UsersList/UsersList';
import NewUserForm from './components/NewUserForm/NewUserForm';



function App() {


  return (
    <BrowserRouter>
      <Layout>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home"
            element={
              <Protected>
                <ProductList />
              </Protected>
            }
          />
          <Route path="/home/:id"
            element={
              <Protected>
                <ProductItem />
              </Protected>
            }
          />

          <Route path="/new-product"
            element={
              <Protected>
                <NewProductForm />
              </Protected>
            }
          />
          <Route path="/users-list"
            element={
              <Protected needingRole={"superAdmin"}>
                <UsersList />
              </Protected>
            }
          />
          <Route path="/new-user"
            element={
              <Protected needingRole={"superAdmin"}>
                <NewUserForm />
              </Protected>
            }
          />

          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
