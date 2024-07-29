import { Routes, Route } from 'react-router-dom';
import Components from '../pages/Inventory/Component/Components';
import ComponentForm from '../pages/Inventory/Component/ComponentForm';
import ComponentDetails from '../pages/Inventory/Component/ComponentDetails';
import PRs from '../pages/Inventory/PR/PRs';
import PRView from '../pages/Inventory/PR/PRView';
import PRForm from '../pages/Inventory/PR/PRForm';
import POs from '../pages/Inventory/PurchaseOrder/POs';
import POForm from '../pages/Inventory/PurchaseOrder/POForm';
import POEdit from '../pages/Inventory/PurchaseOrder/POEdit';
import POView from '../pages/Inventory/PurchaseOrder/POView';
import InventoryReport from '../pages/Reports/InventoryReport';
import Suppliers from '../pages/Inventory/Suppliers/Suppliers';
import SupplierForm from '../pages/Inventory/Suppliers/SupplierForm';

const InventoryRoutes = () => (
  <Routes>
    <Route path="/component" element={<Components />} />
    <Route path="/component/new" element={<ComponentForm />} />
    <Route path="/component/:id" element={<ComponentDetails />} />
    <Route path="/purchase-req" element={<PRs />} />
    <Route path="/purchase-requisition/new" element={<PRForm />} /> 
    <Route path="/purchase-requisition/:id" element={<PRView />} />
    <Route path="/po" element={<POs />} />
    <Route path="/purchase-order/new" element={<POForm />} />
    <Route path="/purchase-order/edit/:id" element={<POEdit />} />
    <Route path="/purchase-order/:id" element={<POView />} />
    <Route path="/suppliers" element={<Suppliers />} />
    <Route path="/supplier/new" element={<SupplierForm />} />
    <Route path="/inventory-reports" element={<InventoryReport />} />
  </Routes>
);

export default InventoryRoutes;


