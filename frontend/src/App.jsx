import { useState, useEffect, useMemo } from 'react';
import './App.css';

// SVG Icons defined inline for clean, dependency-free premium design
const Icons = {
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
    </svg>
  ),
  Products: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  Customers: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Orders: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  Logout: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Add: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  Edit: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Delete: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Search: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  User: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  ThemeDark: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  ThemeLight: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  ChevronDown: () => (
    <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  ),
  Cart: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
};

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  // Auth State
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [mockEmailInput, setMockEmailInput] = useState('');
  const [mockNameInput, setMockNameInput] = useState('');

  // Core Data States
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Tab State
  const [activeTab, setActiveTab] = useState('overview');

  // Search States
  const [productSearch, setProductSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Toast System
  const [toasts, setToasts] = useState([]);

  // Modal / Side Panel States
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null means adding new
  const [productForm, setProductForm] = useState({ sku: '', name: '', price: '', stock: '', description: '' });

  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customerForm, setCustomerForm] = useState({ name: '', email: '', phone: '' });

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [newOrderCustomer, setNewOrderCustomer] = useState('');
  const [newOrderItems, setNewOrderItems] = useState([{ product_id: '', quantity: 1 }]);

  const [expandedOrder, setExpandedOrder] = useState(null); // ID of order showing details

  // Apply theme class
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fetch core data upon login
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  // Toast Trigger Helper
  const triggerToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Parallel fetches for products, customers, orders
      const [prodRes, custRes, ordRes] = await Promise.all([
        fetch(`${API_BASE_URL}/products`),
        fetch(`${API_BASE_URL}/customers`),
        fetch(`${API_BASE_URL}/orders`)
      ]);

      if (!prodRes.ok || !custRes.ok || !ordRes.ok) {
        throw new Error("Failed to fetch dashboard data. Please check if the backend is running.");
      }

      const prods = await prodRes.json();
      const custs = await custRes.json();
      const ords = await ordRes.json();

      setProducts(prods);
      setCustomers(custs);
      setOrders(ords);
    } catch (err) {
      console.error(err);
      setError(err.message);
      triggerToast(err.message, 'danger');
    } finally {
      setLoading(false);
    }
  };

  // Auth Operations
  const handleMockLogin = async (e) => {
    e.preventDefault();
    if (!mockNameInput.trim()) {
      setAuthError('Please enter a display name');
      return;
    }
    setAuthLoading(true);
    setAuthError('');
    try {
      const emailSuffix = mockNameInput.trim().toLowerCase().replace(/\s+/g, '');
      const simulatedToken = `mock_token_${emailSuffix}`;
      
      const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: simulatedToken })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setToken(data.access_token);
      setUser(data.user);
      triggerToast(`Welcome back, ${data.user.name}!`);
    } catch (err) {
      setAuthError(err.message);
      triggerToast(err.message, 'danger');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
    setActiveTab('overview');
    triggerToast('Logged out successfully');
  };

  // Product Operations
  const openProductAdd = () => {
    setEditingProduct(null);
    setProductForm({ sku: '', name: '', price: '', stock: '', description: '' });
    setShowProductModal(true);
  };

  const openProductEdit = (product) => {
    setEditingProduct(product);
    setProductForm({
      sku: product.sku,
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description || ''
    });
    setShowProductModal(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      sku: productForm.sku.trim(),
      name: productForm.name.trim(),
      price: parseFloat(productForm.price),
      stock: parseInt(productForm.stock),
      description: productForm.description.trim() || null
    };

    try {
      const url = editingProduct 
        ? `${API_BASE_URL}/products/${editingProduct.id}`
        : `${API_BASE_URL}/products`;
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Error saving product');
      }

      triggerToast(`Product ${editingProduct ? 'updated' : 'created'} successfully!`);
      setShowProductModal(false);
      fetchData();
    } catch (err) {
      triggerToast(err.message, 'danger');
    }
  };

  const handleProductDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Error deleting product');
      }
      triggerToast('Product deleted successfully');
      fetchData();
    } catch (err) {
      triggerToast(err.message, 'danger');
    }
  };

  // Customer Operations
  const openCustomerAdd = () => {
    setEditingCustomer(null);
    setCustomerForm({ name: '', email: '', phone: '' });
    setShowCustomerModal(true);
  };

  const openCustomerEdit = (customer) => {
    setEditingCustomer(customer);
    setCustomerForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone || ''
    });
    setShowCustomerModal(true);
  };

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: customerForm.name.trim(),
      email: customerForm.email.trim(),
      phone: customerForm.phone.trim() || null
    };

    try {
      const url = editingCustomer
        ? `${API_BASE_URL}/customers/${editingCustomer.id}`
        : `${API_BASE_URL}/customers`;
      const method = editingCustomer ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Error saving customer');
      }

      triggerToast(`Customer ${editingCustomer ? 'updated' : 'created'} successfully!`);
      setShowCustomerModal(false);
      fetchData();
    } catch (err) {
      triggerToast(err.message, 'danger');
    }
  };

  const handleCustomerDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer? All associated orders will be deleted!")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Error deleting customer');
      }
      triggerToast('Customer deleted successfully');
      fetchData();
    } catch (err) {
      triggerToast(err.message, 'danger');
    }
  };

  // Order Operations
  const addOrderItemRow = () => {
    setNewOrderItems((prev) => [...prev, { product_id: '', quantity: 1 }]);
  };

  const removeOrderItemRow = (index) => {
    setNewOrderItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateOrderItemRow = (index, field, value) => {
    setNewOrderItems((prev) => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!newOrderCustomer) {
      triggerToast('Please select a customer', 'warning');
      return;
    }

    // Filter invalid item selections
    const filteredItems = newOrderItems
      .filter((item) => item.product_id !== '')
      .map((item) => ({
        product_id: parseInt(item.product_id),
        quantity: parseInt(item.quantity)
      }));

    if (filteredItems.length === 0) {
      triggerToast('Please add at least one valid product to the order', 'warning');
      return;
    }

    const payload = {
      customer_id: parseInt(newOrderCustomer),
      items: filteredItems
    };

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to place order');
      }

      triggerToast('Order placed successfully! Stock levels updated.');
      setShowOrderModal(false);
      setNewOrderCustomer('');
      setNewOrderItems([{ product_id: '', quantity: 1 }]);
      fetchData();
    } catch (err) {
      triggerToast(err.message, 'danger');
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to update order status');
      }

      triggerToast(`Order status updated to ${newStatus}.`);
      fetchData();
    } catch (err) {
      triggerToast(err.message, 'danger');
    }
  };

  // Stats Calculations
  const stats = useMemo(() => {
    let totalStock = 0;
    let lowStockCount = 0;
    let totalRevenue = 0;

    products.forEach((p) => {
      totalStock += p.stock;
      if (p.stock < 10) lowStockCount++;
    });

    orders.forEach((o) => {
      if (o.status === 'completed') {
        totalRevenue += parseFloat(o.total_price);
      }
    });

    return {
      totalProducts: products.length,
      totalStock,
      lowStockCount,
      totalCustomers: customers.length,
      totalOrders: orders.length,
      totalRevenue: totalRevenue.toFixed(2)
    };
  }, [products, customers, orders]);

  // Filtering Lists
  const filteredProducts = useMemo(() => {
    if (!productSearch) return products;
    const s = productSearch.toLowerCase();
    return products.filter((p) => p.sku.toLowerCase().includes(s) || p.name.toLowerCase().includes(s));
  }, [products, productSearch]);

  const filteredCustomers = useMemo(() => {
    if (!customerSearch) return customers;
    const s = customerSearch.toLowerCase();
    return customers.filter((c) => c.name.toLowerCase().includes(s) || c.email.toLowerCase().includes(s));
  }, [customers, customerSearch]);

  const filteredOrders = useMemo(() => {
    if (!orderSearch) return orders;
    const s = orderSearch.toLowerCase();
    return orders.filter(
      (o) =>
        o.id.toString().includes(s) ||
        o.customer.name.toLowerCase().includes(s) ||
        o.status.toLowerCase().includes(s)
    );
  }, [orders, orderSearch]);

  // Helper: map product ID to product object
  const productMap = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      map[p.id] = p;
    });
    return map;
  }, [products]);

  // Theme Toggler Component
  const themeToggle = (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="theme-toggler"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
    >
      {theme === 'dark' ? <Icons.ThemeLight /> : <Icons.ThemeDark />}
    </button>
  );

  // Render Login screen if not authenticated
  if (!token) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-card-header">
            <h1 className="brand-title">Inventory Hub</h1>
            <p className="brand-subtitle">Order & Inventory Management System</p>
          </div>
          
          <form onSubmit={handleMockLogin} className="login-form">
            <div className="form-group">
              <label>Simulated Username / Full Name</label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={mockNameInput}
                onChange={(e) => setMockNameInput(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={authLoading} className="btn btn-primary w-full">
              {authLoading ? 'Signing in...' : 'Sign In with Mock Account'}
            </button>

            {authError && <div className="alert alert-danger">{authError}</div>}
          </form>

          <div className="login-footer">
            <p>Mock login bypasses Google Auth to allow swift local testing.</p>
            {themeToggle}
          </div>
        </div>

        {/* Floating Toast Alerts */}
        <div className="toasts-container">
          {toasts.map((t) => (
            <div key={t.id} className={`toast toast-${t.type}`}>
              {t.message}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Inventory Hub</h2>
          <span className="premium-badge">PRO v1.0</span>
        </div>

        <nav className="sidebar-menu">
          <button
            onClick={() => setActiveTab('overview')}
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
          >
            <Icons.Dashboard />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
          >
            <Icons.Products />
            <span>Products</span>
            {stats.lowStockCount > 0 && <span className="badge-danger">{stats.lowStockCount}</span>}
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`}
          >
            <Icons.Customers />
            <span>Customers</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
          >
            <Icons.Orders />
            <span>Orders</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className="user-email">{user?.email}</span>
            </div>
          </div>
          <div className="sidebar-footer-actions">
            {themeToggle}
            <button onClick={handleLogout} className="btn-icon" title="Logout">
              <Icons.Logout />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-viewport">
        {/* Top Header */}
        <header className="viewport-header">
          <div>
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            <p className="text-muted">Manage your operations seamlessly</p>
          </div>
          <div className="header-actions">
            {loading && <div className="spinner"></div>}
            <button onClick={fetchData} className="btn btn-secondary">
              Refresh Data
            </button>
          </div>
        </header>

        <div className="content-container">
          {error && (
            <div className="alert alert-danger flex-between">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="close-btn">&times;</button>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="tab-pane">
              {/* KPI Cards Grid */}
              <div className="kpi-grid">
                <div className="kpi-card">
                  <div className="kpi-icon text-primary"><Icons.Products /></div>
                  <div className="kpi-data">
                    <span className="kpi-title">Total Products</span>
                    <span className="kpi-value">{stats.totalProducts}</span>
                  </div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-icon text-success"><Icons.Cart /></div>
                  <div className="kpi-data">
                    <span className="kpi-title">Revenue (Completed)</span>
                    <span className="kpi-value">${stats.totalRevenue}</span>
                  </div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-icon text-warning"><Icons.Orders /></div>
                  <div className="kpi-data">
                    <span className="kpi-title">Total Orders</span>
                    <span className="kpi-value">{stats.totalOrders}</span>
                  </div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-icon text-info"><Icons.Customers /></div>
                  <div className="kpi-data">
                    <span className="kpi-title">Total Customers</span>
                    <span className="kpi-value">{stats.totalCustomers}</span>
                  </div>
                </div>
              </div>

              {/* Secondary stats & alerts */}
              <div className="dashboard-columns">
                {/* Low Stock Alerts */}
                <div className="panel card">
                  <div className="panel-header">
                    <h3>Low Stock Alert ({stats.lowStockCount})</h3>
                  </div>
                  <div className="panel-body">
                    {products.filter(p => p.stock < 10).length === 0 ? (
                      <p className="no-data">All products are healthy in stock! 👍</p>
                    ) : (
                      <div className="alert-list">
                        {products.filter(p => p.stock < 10).map((p) => (
                          <div key={p.id} className="alert-item">
                            <div>
                              <strong>{p.name}</strong>
                              <span className="text-xs text-muted block">SKU: {p.sku}</span>
                            </div>
                            <div className="text-right">
                              <span className={`stock-badge ${p.stock === 0 ? 'out' : 'low'}`}>
                                {p.stock} units left
                              </span>
                              <div className="progress-bar-container">
                                <div className="progress-bar" style={{ width: `${Math.min((p.stock / 10) * 100, 100)}%` }}></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="panel card">
                  <div className="panel-header">
                    <h3>Recent Orders</h3>
                  </div>
                  <div className="panel-body">
                    {orders.length === 0 ? (
                      <p className="no-data">No orders recorded yet.</p>
                    ) : (
                      <div className="recent-orders-list">
                        {orders.slice(0, 5).map((o) => (
                          <div key={o.id} className="recent-order-item">
                            <div>
                              <strong>Order #{o.id}</strong>
                              <span className="text-xs text-muted block">{o.customer.name}</span>
                            </div>
                            <div className="text-right">
                              <span className="recent-order-price">${parseFloat(o.total_price).toFixed(2)}</span>
                              <span className={`status-badge badge-${o.status}`}>
                                {o.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="tab-pane">
              <div className="table-controls card">
                <div className="search-wrapper">
                  <Icons.Search />
                  <input
                    type="text"
                    placeholder="Search products by SKU or Name..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                  />
                </div>
                <button onClick={openProductAdd} className="btn btn-primary">
                  <Icons.Add /> Add Product
                </button>
              </div>

              <div className="table-wrapper card">
                <table>
                  <thead>
                    <tr>
                      <th>SKU</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Stock Quantity</th>
                      <th>Description</th>
                      <th className="actions-header">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="no-data-cell">No products found.</td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => (
                        <tr key={p.id} className={p.stock < 10 ? 'row-warning' : ''}>
                          <td className="font-mono">{p.sku}</td>
                          <td><strong>{p.name}</strong></td>
                          <td>${parseFloat(p.price).toFixed(2)}</td>
                          <td>
                            <span className={`stock-pill ${p.stock === 0 ? 'zero' : p.stock < 10 ? 'low' : 'healthy'}`}>
                              {p.stock}
                            </span>
                          </td>
                          <td className="text-ellipsis">{p.description || '-'}</td>
                          <td className="actions-cell">
                            <button onClick={() => openProductEdit(p)} className="btn-icon text-primary" title="Edit">
                              <Icons.Edit />
                            </button>
                            <button onClick={() => handleProductDelete(p.id)} className="btn-icon text-danger" title="Delete">
                              <Icons.Delete />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="tab-pane">
              <div className="table-controls card">
                <div className="search-wrapper">
                  <Icons.Search />
                  <input
                    type="text"
                    placeholder="Search customers by Name or Email..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                  />
                </div>
                <button onClick={openCustomerAdd} className="btn btn-primary">
                  <Icons.Add /> Add Customer
                </button>
              </div>

              <div className="table-wrapper card">
                <table>
                  <thead>
                    <tr>
                      <th>Customer ID</th>
                      <th>Full Name</th>
                      <th>Email Address</th>
                      <th>Phone Number</th>
                      <th className="actions-header">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="no-data-cell">No customers registered.</td>
                      </tr>
                    ) : (
                      filteredCustomers.map((c) => (
                        <tr key={c.id}>
                          <td>#{c.id}</td>
                          <td><strong>{c.name}</strong></td>
                          <td>{c.email}</td>
                          <td>{c.phone || '-'}</td>
                          <td className="actions-cell">
                            <button onClick={() => openCustomerEdit(c)} className="btn-icon text-primary" title="Edit">
                              <Icons.Edit />
                            </button>
                            <button onClick={() => handleCustomerDelete(c.id)} className="btn-icon text-danger" title="Delete">
                              <Icons.Delete />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ORDERS */}
          {activeTab === 'orders' && (
            <div className="tab-pane">
              <div className="table-controls card">
                <div className="search-wrapper">
                  <Icons.Search />
                  <input
                    type="text"
                    placeholder="Search orders by ID, customer name or status..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                  />
                </div>
                <button onClick={() => setShowOrderModal(true)} className="btn btn-primary">
                  <Icons.Add /> Place New Order
                </button>
              </div>

              <div className="orders-list">
                {filteredOrders.length === 0 ? (
                  <div className="card no-data">No orders match the search.</div>
                ) : (
                  filteredOrders.map((o) => (
                    <div key={o.id} className={`order-card card ${expandedOrder === o.id ? 'expanded' : ''}`}>
                      <div className="order-card-header" onClick={() => setExpandedOrder(expandedOrder === o.id ? null : o.id)}>
                        <div className="order-main-info">
                          <span className="order-id">Order #{o.id}</span>
                          <span className="order-date">{new Date(o.created_at).toLocaleString()}</span>
                        </div>
                        <div className="order-meta-info">
                          <span className="order-customer"><strong>{o.customer.name}</strong> ({o.customer.email})</span>
                          <span className="order-price">${parseFloat(o.total_price).toFixed(2)}</span>
                          <span className={`status-badge badge-${o.status}`}>{o.status}</span>
                          <button className="expand-trigger">
                            <Icons.ChevronDown />
                          </button>
                        </div>
                      </div>

                      {expandedOrder === o.id && (
                        <div className="order-details-drawer">
                          <h4>Order Items</h4>
                          <div className="order-items-table">
                            <div className="items-header">
                              <div>Product</div>
                              <div className="text-right">Price at Order</div>
                              <div className="text-right">Quantity</div>
                              <div className="text-right">Subtotal</div>
                            </div>
                            {o.items.map((item) => (
                              <div key={item.id} className="item-row">
                                <div>
                                  <strong>{item.product.name}</strong>
                                  <span className="text-xs text-muted block">SKU: {item.product.sku}</span>
                                </div>
                                <div className="text-right">${parseFloat(item.price_at_order).toFixed(2)}</div>
                                <div className="text-right">x {item.quantity}</div>
                                <div className="text-right">
                                  <strong>${(parseFloat(item.price_at_order) * item.quantity).toFixed(2)}</strong>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="drawer-footer">
                            <div className="status-management">
                              <span>Update Order Status:</span>
                              <div className="status-buttons">
                                <button
                                  onClick={() => handleUpdateOrderStatus(o.id, 'pending')}
                                  className={`btn-status pending ${o.status === 'pending' ? 'active' : ''}`}
                                >
                                  Pending
                                </button>
                                <button
                                  onClick={() => handleUpdateOrderStatus(o.id, 'completed')}
                                  className={`btn-status completed ${o.status === 'completed' ? 'active' : ''}`}
                                >
                                  Completed
                                </button>
                                <button
                                  onClick={() => handleUpdateOrderStatus(o.id, 'cancelled')}
                                  className={`btn-status cancelled ${o.status === 'cancelled' ? 'active' : ''}`}
                                >
                                  Cancel (Restock)
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* --- FLOATING MODALS --- */}

      {/* 1. PRODUCT ADD / EDIT MODAL */}
      {showProductModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setShowProductModal(false)} className="close-btn">&times;</button>
            </div>
            <form onSubmit={handleProductSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Unique SKU (Stock Keeping Unit)</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingProduct}
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    placeholder="e.g. LAP-MAC-16"
                  />
                </div>
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. MacBook Pro 16"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Unit Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      min="0"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      placeholder="e.g. 1999.99"
                    />
                  </div>
                  <div className="form-group">
                    <label>Available Stock</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      placeholder="e.g. 50"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Product Description (Optional)</label>
                  <textarea
                    rows="3"
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    placeholder="Provide detail on specs, warranty, or brand..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowProductModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. CUSTOMER ADD / EDIT MODAL */}
      {showCustomerModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>{editingCustomer ? 'Edit Customer Info' : 'Register Customer'}</h3>
              <button onClick={() => setShowCustomerModal(false)} className="close-btn">&times;</button>
            </div>
            <form onSubmit={handleCustomerSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    required
                    value={customerForm.name}
                    onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                    placeholder="e.g. Jane Smith"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    value={customerForm.email}
                    onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                    placeholder="e.g. jane.smith@gmail.com"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number (Optional)</label>
                  <input
                    type="text"
                    value={customerForm.phone}
                    onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                    placeholder="e.g. +1 555-019-2834"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowCustomerModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCustomer ? 'Save Details' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. PLACE ORDER MODAL */}
      {showOrderModal && (
        <div className="modal-overlay">
          <div className="modal-card order-modal">
            <div className="modal-header">
              <h3>Place New Order</h3>
              <button onClick={() => setShowOrderModal(false)} className="close-btn">&times;</button>
            </div>
            <form onSubmit={handleOrderSubmit}>
              <div className="modal-body">
                {/* Select Customer */}
                <div className="form-group">
                  <label>Select Purchasing Customer</label>
                  <select
                    required
                    value={newOrderCustomer}
                    onChange={(e) => setNewOrderCustomer(e.target.value)}
                  >
                    <option value="">-- Choose Customer --</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Items Section */}
                <div className="items-selector-section">
                  <div className="flex-between m-b-2">
                    <label>Order Items</label>
                    <button type="button" onClick={addOrderItemRow} className="btn-text">
                      + Add Item
                    </button>
                  </div>

                  {newOrderItems.map((item, idx) => {
                    const selectedProd = productMap[item.product_id] || null;
                    const stockLimit = selectedProd ? selectedProd.stock : 0;
                    const isStockError = selectedProd && parseInt(item.quantity) > stockLimit;

                    return (
                      <div key={idx} className="item-row-builder">
                        {/* Select Product */}
                        <div className="form-group flex-1">
                          <select
                            required
                            value={item.product_id}
                            onChange={(e) => updateOrderItemRow(idx, 'product_id', e.target.value)}
                          >
                            <option value="">-- Select Product --</option>
                            {products.map((p) => (
                              <option key={p.id} value={p.id} disabled={p.stock === 0}>
                                {p.name} {p.stock === 0 ? '(OUT OF STOCK)' : `(SKU: ${p.sku} | $${parseFloat(p.price).toFixed(2)} | Stock: ${p.stock})`}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Quantity */}
                        <div className="form-group flex-qty">
                          <input
                            type="number"
                            required
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateOrderItemRow(idx, 'quantity', e.target.value)}
                            placeholder="Qty"
                          />
                        </div>

                        {/* Actions */}
                        <div className="builder-actions">
                          <button
                            type="button"
                            onClick={() => removeOrderItemRow(idx)}
                            className="btn-icon text-danger"
                            disabled={newOrderItems.length === 1}
                          >
                            &times;
                          </button>
                        </div>

                        {/* Stock Check Alert */}
                        {isStockError && (
                          <div className="stock-error-text text-danger text-xs">
                            Insufficient Stock. Available: {stockLimit}. Ordered: {item.quantity}.
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowOrderModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={newOrderItems.some((item) => {
                    const p = productMap[item.product_id];
                    return p && parseInt(item.quantity) > p.stock;
                  })}
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toast Alerts */}
      <div className="toasts-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
