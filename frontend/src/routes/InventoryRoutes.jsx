import { Routes, Route } from 'react-router-dom';
import Components from '../pages/Inventory/Components';
import ComponentForm from '../pages/Inventory/ComponentForm';
import ComponentDetails from '../pages/Inventory/ComponentDetails';
import PRs from '../pages/Inventory/PRs';
import POs from '../pages/Inventory/POs';
import PRForm from '../pages/Inventory/PRForm';
import POForm from '../pages/Inventory/POForm';
import PRView from '../pages/Inventory/PRView';
import POView from '../pages/Inventory/POView';

const InventoryRoutes = () => (
  <Routes>
    <Route path="/component" element={<Components />} />
    <Route path="/component/new" element={<ComponentForm />} />
    <Route path="/component/:id" element={<ComponentDetails />} />
    <Route path="/purchase-req" element={<PRs />} />
    <Route path="/po" element={<POs />} />
    <Route path="/purchase-order/edit/:id" element={<POForm />} />
    <Route path="/purchase-requisition/new" element={<PRForm />} />
    <Route path="/purchase-order/new" element={<POForm />} />
    <Route path="/purchase-requisition/:id" element={<PRView />} />
    <Route path="/purchase-order/:id" element={<POView />} />
  </Routes>
);

export default InventoryRoutes;
