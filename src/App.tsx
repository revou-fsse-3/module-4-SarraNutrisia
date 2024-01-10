
import './App.css'
import { HomeContainer, LoginContainer, ListContainer } from './containers';
import CreateCategory from './containers/CreateCategoryContainer';
import PublicLayout from './layouts/PublicLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {
      element: <PublicLayout />,
      children: [
        {
          path: '/',
          element: <HomeContainer />
        },
        {
          path: '/login',
          element: <LoginContainer />
        },
        {
          path: '/list',
          element: <ListContainer />
        },
        {
          path: '/createCategory',
          element: <CreateCategory />
        },

      ]
    },
    {
      path: '*',
      element: <h1>404</h1>
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
