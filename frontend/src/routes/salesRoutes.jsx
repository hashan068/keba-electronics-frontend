import { Routes, Route } from 'react-router-dom';
import Product from '../pages/Sales/Product';
import ProductDetails from '../pages/ProductDetails';
import SalesOrder from '../pages/Sales/SalesOrder';
import SalesOrderForm from '../pages/Sales/SalesOrderForm';
import SalesOrderDetails from '../pages/Sales/SalesOrderDetails';
import Quotations from '../pages/Sales/Quotations';
import QuotationDetail from '../pages/Sales/QuotationDetail';
import QuotationForm from '../pages/Sales/QuotationForm';

const SalesRoutes = () => (
  <Routes>
    <Route path="product" element={<Product />} />
    <Route path="product/new" element={<ProductDetails />} />
    <Route path="product/:id" element={<ProductDetails />} />
    <Route path="quotations" element={<Quotations />} />
    <Route path="quotations/new" element={<QuotationForm />} />
    <Route path="quotation/:id" element={<QuotationDetail />} />
    <Route path="salesorder" element={<SalesOrder />} />
    <Route path="salesorder/new" element={<SalesOrderForm />} />
    <Route path="salesorder/:id" element={<SalesOrderDetails />} />
    {/* Add other sales-related routes here */}
  </Routes>
);

export default SalesRoutes;
