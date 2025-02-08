import {  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from './pages/NotFoundPage';
import SingleCategoryPage from "./pages/categories/CategoryPage"; 
import AdminForm from './pages/categories/AdminForm';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';
import DoctorCalendar from './components/DoctorCalendar';



// import Testing from "./pages/Testing"



const router = createBrowserRouter(
createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>

    <Route index element={ <HomePage /> }/>
    <Route path='*' element={<NotFoundPage/>}/>
    <Route 
        path='/category/:categoryId' 
        element={<SingleCategoryPage />} 
      />    

    <Route path='/admin' element= {<AdminForm/>}/>
    <Route path='/calendar' element= { <DoctorCalendar/> } />
  </Route>
));


const App = () => {


return (<>
<RouterProvider router={router} />


</>
);

};

export default App