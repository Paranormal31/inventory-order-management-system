import { useState, useEffect, useMemo } from 'react';
import './App.css';

// Internationalization translation helper
const t = (str) => str;

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
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  // Core Data States
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Tab State
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'overview');

  // Search States
  const [productSearch, setProductSearch] = useState('');
  const [productFilterMode, setProductFilterMode] = useState('my'); // 'my' | 'all'

  const [customerSearch, setCustomerSearch] = useState('');
  const [customerFilterMode, setCustomerFilterMode] = useState('my'); // 'my' | 'all'

  const [orderSearch, setOrderSearch] = useState('');
  const [orderFilterMode, setOrderFilterMode] = useState('my'); // 'my' | 'all'

  // Toast System
  const [toasts, setToasts] = useState([]);

  // Modal / Side Panel States
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null means adding new
  const [productForm, setProductForm] = useState({ sku: '', name: '', price: '', stock: '', description: '' });
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customerForm, setCustomerForm] = useState({ name: '', phone: '', address: '' });
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [newOrderCustomer, setNewOrderCustomer] = useState('');
  const [newOrderItems, setNewOrderItems] = useState([{ product_id: '', quantity: 1 }]);

  const [expandedOrder, setExpandedOrder] = useState(null); // ID of order showing details

  // Apply theme class
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Persist Active Tab
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  // Helper to format UTC Date to local dd/mm/yyyy, h:mm AM/PM
  const formatOrderDateTime = (dateStr) => {
    if (!dateStr) return '';
    const utcStr = (dateStr.endsWith('Z') || dateStr.includes('+')) ? dateStr : `${dateStr.replace(' ', 'T')}Z`;
    const d = new Date(utcStr);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${dd}/${mm}/${yyyy}, ${hours}:${minutes} ${ampm}`;
  };

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

  // Real email + password login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setAuthError('Email and password are required');
      return;
    }
    setAuthLoading(true);
    setAuthError('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword })
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
      console.error("Login fetch error details:", err);
      setAuthError(`${err.message} (Tried endpoint: POST ${API_BASE_URL}/auth/login)`);
    } finally {
      setAuthLoading(false);
    }
  };

  // Quick login for testing — auto-fills and submits login for a test account
  const quickLogin = async (email) => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: '123456' })
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
      description: productForm.description.trim() || null,
      added_by_id: user?.id || null
    };

    try {
      const url = editingProduct 
        ? `${API_BASE_URL}/products/${editingProduct.id}?user_id=${user?.id || ''}`
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
      const response = await fetch(`${API_BASE_URL}/products/${id}?user_id=${user?.id || ''}`, { method: 'DELETE' });
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
    setCustomerForm({ name: '', phone: '', address: '' });
    setShowCustomerModal(true);
  };

  const openCustomerEdit = (customer) => {
    setEditingCustomer(customer);
    setCustomerForm({
      name: customer.name,
      phone: customer.phone || '',
      address: customer.address || ''
    });
    setShowCustomerModal(true);
  };

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: customerForm.name.trim(),
      phone: customerForm.phone.trim() || null,
      address: customerForm.address.trim() || null,
      email: editingCustomer ? editingCustomer.email : `customer_${Date.now()}@internal.com`,
      added_by_id: editingCustomer ? editingCustomer.added_by_id : (user?.id || null)
    };

    try {
      const url = editingCustomer 
        ? `${API_BASE_URL}/customers/${editingCustomer.id}?user_id=${user?.id || ''}`
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
    if (!window.confirm("Are you sure you want to delete this customer? This will also cascade delete all their orders.")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${id}?user_id=${user?.id || ''}`, { method: 'DELETE' });
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
    setNewOrderItems((prev) =>
      prev.map((item, idx) => {
        if (idx === index) {
          if (field === 'product_id') {
            return { ...item, product_id: value };
          } else if (field === 'quantity') {
            return { ...item, quantity: value };
          }
        }
        return item;
      })
    );
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
      items: filteredItems,
      added_by_id: user?.id || null
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
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status?user_id=${user?.id || ''}`, {
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

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order? This will restock all its items.")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}?user_id=${user?.id || ''}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to delete order');
      }

      triggerToast('Order deleted successfully! Stock levels updated.');
      fetchData();
    } catch (err) {
      triggerToast(err.message, 'danger');
    }
  };

  // Stats Calculations
  const stats = useMemo(() => {
    let totalStock = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;
    let totalInventoryValue = 0;
    let totalRevenue = 0;

    const userProducts = products.filter(p => p.added_by_id === user?.id);
    const userCustomers = customers.filter(c => c.added_by_id === user?.id);
    const userOrders = orders.filter(o => o.added_by_id === user?.id);

    userProducts.forEach((p) => {
      totalStock += p.stock;
      totalInventoryValue += (p.stock * parseFloat(p.price));
      if (p.stock === 0) outOfStockCount++;
      if (p.stock < 10) lowStockCount++;
    });

    userOrders.forEach((o) => {
      if (o.status === 'completed') {
        totalRevenue += parseFloat(o.total_price);
      }
    });

    return {
      totalProducts: userProducts.length,
      totalStock,
      lowStockCount,
      outOfStockCount,
      totalInventoryValue: totalInventoryValue.toFixed(2),
      totalCustomers: userCustomers.length,
      totalOrders: userOrders.length,
      totalRevenue: totalRevenue.toFixed(2)
    };
  }, [products, customers, orders, user]);

  // Category Value Breakdown for Inventory Tab
  const categoryValues = useMemo(() => {
    let networking = 0;
    let compute = 0;
    let storage = 0;
    let accessories = 0;
    const userProducts = products.filter(p => p.added_by_id === user?.id);
    userProducts.forEach((p) => {
      const name = p.name.toLowerCase();
      const sku = p.sku.toLowerCase();
      const value = p.stock * parseFloat(p.price);
      if (name.includes('switch') || name.includes('router') || name.includes('cable') || sku.includes('foc') || sku.includes('esw')) {
        networking += value;
      } else if (name.includes('laptop') || name.includes('pro') || name.includes('cpu') || name.includes('macbook') || name.includes('npu') || name.includes('gpu')) {
        compute += value;
      } else if (name.includes('ram') || name.includes('ddr5') || name.includes('ssd') || name.includes('drive')) {
        storage += value;
      } else {
        accessories += value;
      }
    });
    const total = networking + compute + storage + accessories;
    return {
      networking: networking.toFixed(2),
      compute: compute.toFixed(2),
      storage: storage.toFixed(2),
      accessories: accessories.toFixed(2),
      total: total.toFixed(2),
      netPct: total > 0 ? (networking / total) * 100 : 0,
      compPct: total > 0 ? (compute / total) * 100 : 0,
      storePct: total > 0 ? (storage / total) * 100 : 0,
      accPct: total > 0 ? (accessories / total) * 100 : 0,
    };
  }, [products]);

  // Filtering Lists
  const filteredProducts = useMemo(() => {
    let sorted = [...products].sort((a, b) => 
      a.sku.localeCompare(b.sku, undefined, { numeric: true, sensitivity: 'base' })
    );
    if (productFilterMode === 'my') {
      sorted = sorted.filter((p) => p.added_by_id === user?.id);
    }
    if (!productSearch) return sorted;
    const s = productSearch.toLowerCase();
    return sorted.filter((p) => p.sku.toLowerCase().includes(s) || p.name.toLowerCase().includes(s));
  }, [products, productSearch, productFilterMode, user]);
  const filteredCustomers = useMemo(() => {
    let filtered = customers.filter((c) => !c.email || c.email.endsWith('@internal.com'));
    if (customerFilterMode === 'my') {
      filtered = filtered.filter((c) => c.added_by_id === user?.id);
    }
    if (!customerSearch) return filtered;
    const s = customerSearch.toLowerCase();
    return filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        (c.phone && c.phone.toLowerCase().includes(s)) ||
        (c.address && c.address.toLowerCase().includes(s))
    );
  }, [customers, customerSearch, customerFilterMode, user]);
  const filteredOrders = useMemo(() => {
    let filtered = [...orders];
    if (orderFilterMode === 'my') {
      filtered = filtered.filter((o) => o.added_by_id === user?.id);
    }
    if (!orderSearch) return filtered;
    const s = orderSearch.toLowerCase();
    return filtered.filter(
      (o) =>
        o.id.toString().includes(s) ||
        o.customer.name.toLowerCase().includes(s) ||
        o.status.toLowerCase().includes(s)
    );
  }, [orders, orderSearch, orderFilterMode, user]);

  // Helper: map product ID to product object
  const productMap = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      map.set(p.id, p);
      map.set(String(p.id), p);
    });
    return map;
  }, [products]);


  // Signup handler — calls real /auth/signup endpoint
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      setAuthError('Name, email and password are required');
      return;
    }
    if (signupPassword.length < 6) {
      setAuthError('Password must be at least 6 characters');
      return;
    }
    setAuthLoading(true);
    setAuthError('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: signupName.trim(), email: signupEmail.trim(), password: signupPassword })
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Registration failed');
      }
      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(data.access_token);
      setUser(data.user);
      triggerToast(`Welcome aboard, ${data.user.name}! 🎉`);
    } catch (err) {
      console.error("Signup fetch error details:", err);
      setAuthError(`${err.message} (Tried endpoint: POST ${API_BASE_URL}/auth/signup)`);
    } finally {
      setAuthLoading(false);
    }
  };

  // Render Login / Signup screen if not authenticated
  if (!token) {
    return (
      <div className="auth-page">
        {/* Left decorative panel */}
        <div className="auth-hero">
          <div className="auth-hero-content">
            <h1 className="auth-hero-title">{t('Inventory & Order Management System')}</h1>
            <ul className="auth-feature-list">
              <li><span className="auth-feature-dot" style={{ background: 'var(--primary)' }}></span>{t('Real-time stock tracking')}</li>
            </ul>
          </div>
        </div>


        {/* Right auth card */}
        <div className="auth-panel">
          <div className="auth-card">
            {/* Mode tabs */}
            <div className="auth-tabs">
              <button
                className={`auth-tab ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => { setAuthMode('login'); setAuthError(''); }}
              >
                {t('Sign In')}
              </button>
              <button
                className={`auth-tab ${authMode === 'signup' ? 'active' : ''}`}
                onClick={() => { setAuthMode('signup'); setAuthError(''); }}
              >
                {t('Create Account')}
              </button>
            </div>

            {/* LOGIN FORM */}
            {authMode === 'login' && (
              <form onSubmit={handleLogin} className="auth-form" key="login">
                <div className="auth-form-header">
                  <h2>{t('Welcome back')}</h2>
                  <p>{t('Sign in to your workspace')}</p>
                </div>

                {/* Quick Login Test Accounts */}
                <div className="quick-login-section" style={{ marginBottom: '16px' }}>
                  <div className="quick-login-divider" style={{ marginTop: '0px', marginBottom: '12px' }}>
                    <span>{t('QUICK LOGIN (TEST ACCOUNT WITH SEEDED DATA)')}</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary auth-submit-btn"
                    style={{ marginBottom: '12px', background: 'linear-gradient(135deg, #0d9488, #0891b2)' }}
                    onClick={() => quickLogin('Manager1@temp.com')}
                    disabled={authLoading}
                  >
                    🔑 {t('Login as Manager1')}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary auth-submit-btn"
                    style={{ marginBottom: '12px', background: 'linear-gradient(135deg, #0f766e, #0d9488)' }}
                    onClick={() => quickLogin('NewUser@temp.com')}
                    disabled={authLoading}
                  >
                    🔑 {t('Login as New User (Fresh Account - No Seeded Data)')}
                  </button>
                  <div className="quick-login-other">
                    <select
                      className="quick-login-select"
                      defaultValue=""
                      onChange={(e) => { if (e.target.value) quickLogin(e.target.value); }}
                      disabled={authLoading}
                    >
                      <option value="" disabled>{t('Other test accounts...')}</option>
                      {['Manager2'].map((name) => (
                        <option key={name} value={`${name}@temp.com`}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>{t('Email Address')}</label>
                  <input
                    type="email"
                    placeholder="jane@company.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    autoFocus
                    required
                  />
                </div>

                <div className="form-group">
                  <label>{t('Password')}</label>
                  <input
                    type="password"
                    placeholder="Your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>

                {authError && <div className="alert alert-danger">{authError}</div>}

                <button type="submit" disabled={authLoading} className="btn btn-primary auth-submit-btn">
                  {authLoading ? (
                    <><span className="spinner-sm"></span> {t('Signing in...')}</>
                  ) : t('Sign In')}
                </button>

                <p className="auth-switch-hint">
                  {t("Don't have an account?")}{' '}
                  <button type="button" className="btn-link" onClick={() => { setAuthMode('signup'); setAuthError(''); }}>
                    {t('Create one')}
                  </button>
                </p>
              </form>
            )}

            {/* SIGNUP FORM */}
            {authMode === 'signup' && (
              <form onSubmit={handleSignup} className="auth-form" key="signup">
                <div className="auth-form-header">
                  <h2>{t('Create account')}</h2>
                  <p>{t('Get started with Inventory & Order Management System')}</p>
                </div>

                {/* Quick Login Test Accounts */}
                <div className="quick-login-section" style={{ marginBottom: '16px' }}>
                  <div className="quick-login-divider" style={{ marginTop: '0px', marginBottom: '12px' }}>
                    <span>{t('QUICK LOGIN (TEST ACCOUNT WITH SEEDED DATA)')}</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary auth-submit-btn"
                    style={{ marginBottom: '12px', background: 'linear-gradient(135deg, #0d9488, #0891b2)' }}
                    onClick={() => quickLogin('Manager1@temp.com')}
                    disabled={authLoading}
                  >
                    🔑 {t('Login as Manager1')}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary auth-submit-btn"
                    style={{ marginBottom: '12px', background: 'linear-gradient(135deg, #0f766e, #0d9488)' }}
                    onClick={() => quickLogin('NewUser@temp.com')}
                    disabled={authLoading}
                  >
                    🔑 {t('Login as New User (Fresh Account - No Seeded Data)')}
                  </button>
                  <div className="quick-login-other">
                    <select
                      className="quick-login-select"
                      defaultValue=""
                      onChange={(e) => { if (e.target.value) quickLogin(e.target.value); }}
                      disabled={authLoading}
                    >
                      <option value="" disabled>{t('Other test accounts...')}</option>
                      {['Manager2'].map((name) => (
                        <option key={name} value={`${name}@temp.com`}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>{t('Full Name')} <span className="required-star">*</span></label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    autoFocus
                    required
                  />
                </div>

                <div className="form-group">
                  <label>{t('Email Address')} <span className="required-star">*</span></label>
                  <input
                    type="email"
                    placeholder="jane@company.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>{t('Password')} <span className="required-star">*</span></label>
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                </div>

                {authError && <div className="alert alert-danger">{authError}</div>}

                <button type="submit" disabled={authLoading} className="btn btn-primary auth-submit-btn">
                  {authLoading ? (
                    <><span className="spinner-sm"></span> Creating account...</>
                  ) : 'Create Account'}
                </button>

                <p className="auth-switch-hint">
                  Already have an account?{' '}
                  <button type="button" className="btn-link" onClick={() => { setAuthMode('login'); setAuthError(''); }}>
                    Sign in
                  </button>
                </p>
              </form>
            )}
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
      {/* SideNavBar - Persistent Sticky Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div>
            <h2>{t('Inventory & Order Management System')}</h2>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-menu">
          <button
            onClick={() => setActiveTab('overview')}
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
          >
            <Icons.Dashboard />
            <span>{t('Dashboard')}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('products')}
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
          >
            <Icons.Products />
            <span>{t('Products')}</span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`}
          >
            <Icons.Customers />
            <span>{t('Customers')}</span>
          </button>


          <button
            onClick={() => setActiveTab('orders')}
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
          >
            <Icons.Orders />
            <span>{t('Orders')}</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
          >
            <Icons.Cart />
            <span>{t('Inventory')}</span>
          </button>
        </nav>

        {/* Sidebar Footer User Details */}
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="user-info">
              <p className="user-name">{user?.name}</p>
              <p className="user-email">{user?.email}</p>
            </div>
          </div>
          <div className="sidebar-footer-actions">
            <button onClick={handleLogout} className="btn-icon" title="Logout">
              <Icons.Logout />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-viewport">
        {/* TopAppBar - Persistent Glassmorphic Header */}
        <header className="viewport-header">
          <div className="flex items-center gap-4">
            <h1>{t(activeTab === 'overview' ? 'Overview' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1))}</h1>
          </div>
          
          <div className="header-actions">
            {loading && <div className="spinner"></div>}
          </div>
        </header>

        {/* Scrollable Content Canvas */}
        <main className="content-container scroll-smooth">
          <div className="max-w-[1600px] mx-auto">
            {error && (
              <div className="alert alert-danger flex-between" style={{ marginBottom: '24px' }}>
                <span>{error}</span>
                <button onClick={() => setError(null)} className="btn-icon">&times;</button>
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
                    <span className="kpi-title">{t('Total Products')}</span>
                    <span className="kpi-value">{stats.totalProducts}</span>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon text-success"><Icons.Cart /></div>
                  <div className="kpi-data">
                    <span className="kpi-title">{t('Revenue')}</span>
                    <span className="kpi-value">₹{stats.totalRevenue}</span>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon text-warning"><Icons.Orders /></div>
                  <div className="kpi-data">
                    <span className="kpi-title">{t('Total Orders')}</span>
                    <span className="kpi-value">{stats.totalOrders}</span>
                  </div>
                </div>


              </div>



              {/* Secondary stats & alerts */}
              <div className="dashboard-columns">
                {/* Low Stock Alerts */}
                <div className="panel card">
                  <div className="panel-header">
                    <h3>{t('Low Stock Alert (')}{stats.lowStockCount}{t(')')}</h3>
                  </div>
                    <div className="panel-body">
                    {products.filter(p => p.stock < 10 && p.added_by_id === user?.id).length === 0 ? (
                      <div className="no-data">
                        <p>{t('All products are healthy in stock!')}</p>
                      </div>
                    ) : (
                      <div className="alert-list">
                        {products.filter(p => p.stock < 10 && p.added_by_id === user?.id).map((p) => (
                          <div key={p.id} className="alert-item card">
                            <div>
                              <strong>{p.name}</strong>
                              <span className="text-xs text-muted block font-mono">{t('SKU: ')}{p.sku}</span>
                            </div>
                            <div className="text-right">
                              <span className={`stock-pill ${p.stock === 0 ? 'zero' : 'low'}`}>
                                {p.stock} {t('units')}
                              </span>
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
                    <h3>{t('Recent Orders')}</h3>
                    <button onClick={() => setActiveTab('orders')} className="btn-text" style={{ fontSize: '12px' }}>{t('View All')}</button>
                  </div>
                  <div className="panel-body">
                    {orders.filter(o => o.added_by_id === user?.id).length === 0 ? (
                      <div className="no-data">
                        <p>{t('No orders recorded yet.')}</p>
                      </div>
                    ) : (
                      <div className="recent-orders-list">
                        {orders.filter(o => o.added_by_id === user?.id).slice(0, 5).map((o) => (
                          <div key={o.id} className="recent-order-item card">
                            <div>
                              <strong>{t('Order #')}{o.id}</strong>
                              <span className="text-xs text-muted block">{o.customer.name}</span>
                            </div>
                            <div className="text-right">
                              <span className="recent-order-price font-mono">₹{parseFloat(o.total_price).toFixed(2)}</span>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                  <div className="search-wrapper" style={{ margin: 0, flex: 1, maxWidth: '400px' }}>
                    <Icons.Search />
                    <input
                      type="text"
                      placeholder="Search products by SKU or Name..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                    />
                  </div>
                  <div className="toggle-segmented" style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', padding: '4px' }}>
                    <button 
                      onClick={() => setProductFilterMode('my')} 
                      className={`btn ${productFilterMode === 'my' ? 'btn-primary' : ''}`}
                      style={{ 
                        padding: '6px 16px', 
                        fontSize: '12px', 
                        borderRadius: '6px',
                        background: productFilterMode === 'my' ? 'var(--btn-primary-bg)' : 'transparent',
                        color: productFilterMode === 'my' ? 'var(--btn-primary-text)' : 'var(--text-muted)',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {t('My Products')}
                    </button>
                    <button 
                      onClick={() => setProductFilterMode('all')} 
                      className={`btn ${productFilterMode === 'all' ? 'btn-primary' : ''}`}
                      style={{ 
                        padding: '6px 16px', 
                        fontSize: '12px', 
                        borderRadius: '6px',
                        background: productFilterMode === 'all' ? 'var(--btn-primary-bg)' : 'transparent',
                        color: productFilterMode === 'all' ? 'var(--btn-primary-text)' : 'var(--text-muted)',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {t('All Products')}
                    </button>
                  </div>
                </div>
                <button onClick={openProductAdd} className="btn btn-primary">
                  <Icons.Add /> Add Product
                </button>
              </div>

              <div className="table-wrapper card">
                <table>
                  <thead>
                    <tr>
                      <th>{t('SKU')}</th>
                      <th>{t('Product Name')}</th>
                      <th>{t('Price')}</th>
                      <th>{t('Stock Quantity')}</th>
                      <th>{t('Added By')}</th>
                      <th>{t('Description')}</th>
                      <th className="actions-header">{t('Actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="no-data-cell">{t('No products found.')}</td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => (
                        <tr key={p.id} className={p.stock < 10 ? 'row-warning' : ''}>
                          <td className="font-mono">{p.sku}</td>
                          <td><strong>{p.name}</strong></td>
                          <td>₹{parseFloat(p.price).toFixed(2)}</td>
                          <td>
                            <span className={`stock-pill ${p.stock === 0 ? 'zero' : p.stock < 10 ? 'low' : 'healthy'}`}>
                              {p.stock}
                            </span>
                          </td>
                          <td>
                            {p.added_by ? (
                              <span className="user-badge" title={p.added_by.email}>
                                {p.added_by.name}
                              </span>
                            ) : (
                              <span className="text-muted italic">{t('System')}</span>
                            )}
                          </td>
                          <td className="text-ellipsis">{p.description || '-'}</td>
                          <td className="actions-cell">
                            {(!p.added_by_id || p.added_by_id === user?.id) && (
                              <>
                                <button onClick={() => openProductEdit(p)} className="btn-icon text-primary" title="Edit">
                                  <Icons.Edit />
                                </button>
                                <button onClick={() => handleProductDelete(p.id)} className="btn-icon text-danger" title="Delete">
                                  <Icons.Delete />
                                </button>
                              </>
                            )}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                  <div className="search-wrapper" style={{ margin: 0, flex: 1, maxWidth: '400px' }}>
                    <Icons.Search />
                    <input
                      type="text"
                      placeholder={t("Search customers by Name, Phone or Address...")}
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                    />
                  </div>
                  <div className="toggle-segmented" style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', padding: '4px' }}>
                    <button 
                      onClick={() => setCustomerFilterMode('my')} 
                      className={`btn ${customerFilterMode === 'my' ? 'btn-primary' : ''}`}
                      style={{ 
                        padding: '6px 16px', 
                        fontSize: '12px', 
                        borderRadius: '6px',
                        background: customerFilterMode === 'my' ? 'var(--btn-primary-bg)' : 'transparent',
                        color: customerFilterMode === 'my' ? 'var(--btn-primary-text)' : 'var(--text-muted)',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {t('My Customers')}
                    </button>
                    <button 
                      onClick={() => setCustomerFilterMode('all')} 
                      className={`btn ${customerFilterMode === 'all' ? 'btn-primary' : ''}`}
                      style={{ 
                        padding: '6px 16px', 
                        fontSize: '12px', 
                        borderRadius: '6px',
                        background: customerFilterMode === 'all' ? 'var(--btn-primary-bg)' : 'transparent',
                        color: customerFilterMode === 'all' ? 'var(--btn-primary-text)' : 'var(--text-muted)',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {t('All Customers')}
                    </button>
                  </div>
                </div>
                <button onClick={openCustomerAdd} className="btn btn-primary">
                  <Icons.Add /> {t('Add Customer')}
                </button>
              </div>

              <div className="table-wrapper card">
                <table>
                  <thead>
                    <tr>
                      <th>{t('Customer Name')}</th>
                      <th>{t('Contact Number')}</th>
                      <th>{t('Address')}</th>
                      <th>{t('Customer Added By')}</th>
                      <th className="actions-header">{t('Actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="no-data-cell">{t('No customers found.')}</td>
                      </tr>
                    ) : (
                      filteredCustomers.map((c) => (
                        <tr key={c.id}>
                          <td><strong>{c.name}</strong></td>
                          <td>{c.phone || <span className="text-muted italic">-</span>}</td>
                          <td>{c.address || <span className="text-muted italic">-</span>}</td>
                          <td>
                            {c.added_by ? (
                              <span className="user-badge" title={c.added_by.email}>
                                {c.added_by.name}
                              </span>
                            ) : (
                              <span className="text-muted italic">{t('System')}</span>
                            )}
                          </td>
                          <td className="actions-cell">
                            {(!c.added_by_id || c.added_by_id === user?.id) && (
                              <>
                                <button onClick={() => openCustomerEdit(c)} className="btn-icon text-primary" title={t("Edit")}>
                                  <Icons.Edit />
                                </button>
                                <button onClick={() => handleCustomerDelete(c.id)} className="btn-icon text-danger" title={t("Delete")}>
                                  <Icons.Delete />
                                </button>
                              </>
                            )}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                  <div className="search-wrapper" style={{ margin: 0, flex: 1, maxWidth: '400px' }}>
                    <Icons.Search />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                    />
                  </div>
                  <div className="toggle-segmented" style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', padding: '4px' }}>
                    <button 
                      onClick={() => setOrderFilterMode('my')} 
                      className={`btn ${orderFilterMode === 'my' ? 'btn-primary' : ''}`}
                      style={{ 
                        padding: '6px 16px', 
                        fontSize: '12px', 
                        borderRadius: '6px',
                        background: orderFilterMode === 'my' ? 'var(--btn-primary-bg)' : 'transparent',
                        color: orderFilterMode === 'my' ? 'var(--btn-primary-text)' : 'var(--text-muted)',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {t('My Orders')}
                    </button>
                    <button 
                      onClick={() => setOrderFilterMode('all')} 
                      className={`btn ${orderFilterMode === 'all' ? 'btn-primary' : ''}`}
                      style={{ 
                        padding: '6px 16px', 
                        fontSize: '12px', 
                        borderRadius: '6px',
                        background: orderFilterMode === 'all' ? 'var(--btn-primary-bg)' : 'transparent',
                        color: orderFilterMode === 'all' ? 'var(--btn-primary-text)' : 'var(--text-muted)',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {t('All Orders')}
                    </button>
                  </div>
                </div>
                <button onClick={() => setShowOrderModal(true)} className="btn btn-primary">
                  <Icons.Add /> Place New Order
                </button>
              </div>

              <div className="orders-list">
                {filteredOrders.length === 0 ? (
                  <div className="panel card">
                    <div className="panel-body no-data">{t('No orders match the search.')}</div>
                  </div>
                ) : (
                  filteredOrders.map((o, idx) => (
                    <div key={o.id} className={`order-card panel card ${expandedOrder === o.id ? 'expanded' : ''}`}>
                      <div className="order-card-header" onClick={() => setExpandedOrder(expandedOrder === o.id ? null : o.id)}>
                        <div className="order-main-info">
                          <span className="order-id">{t('Order #')}{idx + 1}</span>
                          <span className="order-date-divider" style={{ margin: '0 8px', color: 'var(--text-muted)' }}>•</span>
                          <span className="order-date">{formatOrderDateTime(o.created_at)}</span>
                        </div>
                        <div className="order-meta-info" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                          {o.added_by ? (
                            <span className="user-badge" title={o.added_by.email} style={{ fontSize: '11px' }}>
                              {o.added_by.name}
                            </span>
                          ) : (
                            <span className="text-muted italic" style={{ fontSize: '11px' }}>{t('System')}</span>
                          )}
                          <span className="order-customer"><strong>{o.customer.name}</strong></span>
                          <span className="order-price font-mono">₹{parseFloat(o.total_price).toFixed(2)}</span>
                          <span className={`status-badge badge-${o.status}`}>{o.status}</span>
                          <button className="btn-icon">
                            <Icons.ChevronDown />
                          </button>
                        </div>
                      </div>

                      {expandedOrder === o.id && (
                        <div className="panel-body" style={{ borderTop: '1px solid var(--border)' }}>
                          <h4 style={{ marginBottom: '16px', color: 'var(--text-h)' }}>{t('Order Items')}</h4>
                          <div className="table-wrapper">
                            <table>
                              <thead>
                                <tr>
                                  <th>{t('Product')}</th>
                                  <th className="text-right">{t('Price')}</th>
                                  <th className="text-right">{t('Qty')}</th>
                                  <th className="text-right">{t('Subtotal')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {o.items.map((item) => (
                                  <tr key={item.id}>
                                    <td>
                                      <strong>{item.product.name}</strong>
                                      <span className="text-xs text-muted block font-mono">{t('SKU: ')}{item.product.sku}</span>
                                    </td>
                                    <td className="text-right">₹{parseFloat(item.price_at_order).toFixed(2)}</td>
                                    <td className="text-right">x {item.quantity}</td>
                                    <td className="text-right">
                                      <strong>₹{(parseFloat(item.price_at_order) * item.quantity).toFixed(2)}</strong>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="status-management" style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                              {(!o.added_by_id || o.added_by_id === user?.id) ? (
                                <>
                                  <span className="text-sm font-medium">{t('Update Status:')}</span>
                                  <div className="flex gap-2" style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleUpdateOrderStatus(o.id, 'pending'); }}
                                      className={`btn btn-secondary ${o.status === 'pending' ? 'active' : ''}`}
                                      style={{ padding: '6px 12px', fontSize: '12px' }}
                                    >
                                      Pending
                                    </button>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleUpdateOrderStatus(o.id, 'completed'); }}
                                      className={`btn btn-secondary ${o.status === 'completed' ? 'active' : ''}`}
                                      style={{ padding: '6px 12px', fontSize: '12px' }}
                                    >
                                      Completed
                                    </button>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleUpdateOrderStatus(o.id, 'cancelled'); }}
                                      className={`btn btn-secondary ${o.status === 'cancelled' ? 'active' : ''}`}
                                      style={{ padding: '6px 12px', fontSize: '12px' }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <span className="text-sm text-muted italic">{t('Only the user who placed this order can manage it.')}</span>
                              )}
                            </div>
                            {(!o.added_by_id || o.added_by_id === user?.id) && (
                              <button
                                onClick={(e) => { e.stopPropagation(); handleDeleteOrder(o.id); }}
                                className="btn btn-danger"
                                style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                              >
                                <Icons.Delete /> {t('Delete Order')}
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 5: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="tab-pane">
              {/* Top Metrics Bento */}
              <div className="kpi-grid">
                <div className="kpi-card">
                  <div className="kpi-icon text-warning"><Icons.Products /></div>
                  <div className="kpi-data">
                    <span className="kpi-title">{t('Low Stock')}</span>
                    <span className="kpi-value">{stats.lowStockCount}</span>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon text-danger"><Icons.Delete /></div>
                  <div className="kpi-data">
                    <span className="kpi-title">{t('Out of Stock')}</span>
                    <span className="kpi-value">{stats.outOfStockCount}</span>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon text-primary"><Icons.Cart /></div>
                  <div className="kpi-data">
                    <span className="kpi-title">{t('Inventory Value')}</span>
                    <span className="kpi-value">₹{parseFloat(stats.totalInventoryValue).toLocaleString()}</span>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon text-success"><Icons.Products /></div>
                  <div className="kpi-data">
                    <span className="kpi-title">{t('Total Units')}</span>
                    <span className="kpi-value">{stats.totalStock}</span>
                  </div>
                </div>
              </div>

              {/* Main Layout Columns */}
              <div className="dashboard-columns">
                <div className="panel card">
                  <div className="panel-header">
                    <h3>{t('Critical Inventory & Warehouse Allocation')}</h3>
                  </div>
                  <div className="table-wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>{t('Product / SKU')}</th>
                          <th className="text-right">{t('Stock')}</th>
                          <th className="text-center">{t('Status')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.filter(p => p.added_by_id === user?.id).length === 0 ? (
                          <tr>
                            <td colSpan="3" className="no-data">{t('No products in database.')}</td>
                          </tr>
                        ) : (
                          products
                            .filter(p => p.added_by_id === user?.id)
                            .sort((a, b) => a.stock - b.stock)
                            .map((p) => {
                            return (
                              <tr key={p.id}>
                                <td>
                                  <strong>{p.name}</strong>
                                  <span className="text-xs text-muted block font-mono">{p.sku}</span>
                                </td>
                                <td className="text-right font-mono"><strong>{p.stock}</strong></td>
                                <td className="text-center">
                                  <span className={`status-badge ${p.stock === 0 ? 'badge-cancelled' : p.stock < 10 ? 'badge-pending' : 'badge-completed'}`}>
                                    {p.stock === 0 ? t('Out') : p.stock < 10 ? t('Low') : t('OK')}
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>


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
                  <label>{t('Unique SKU (Stock Keeping Unit)')}</label>
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
                  <label>{t('Product Name')}</label>
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
                    <label>{t('Unit Price (₹)')}</label>
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
                    <label>{t('Available Stock')}</label>
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
                  <label>{t('Product Description (Optional)')}</label>
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
              <h3>{editingCustomer ? t('Edit Customer') : t('Add New Customer')}</h3>
              <button onClick={() => setShowCustomerModal(false)} className="close-btn">&times;</button>
            </div>
            <form onSubmit={handleCustomerSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>{t('Customer Name')}</label>
                  <input
                    type="text"
                    required
                    value={customerForm.name}
                    onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="form-group">
                  <label>{t('Contact Number')}</label>
                  <input
                    type="text"
                    value={customerForm.phone}
                    onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                  />
                </div>
                <div className="form-group">
                  <label>{t('Address')}</label>
                  <textarea
                    rows="3"
                    value={customerForm.address}
                    onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
                    placeholder="e.g. 123 Main St, New Delhi"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowCustomerModal(false)} className="btn btn-secondary">
                  {t('Cancel')}
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCustomer ? t('Save Changes') : t('Create Customer')}
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
              <h3>{t('Place New Order')}</h3>
              <button onClick={() => setShowOrderModal(false)} className="close-btn">&times;</button>
            </div>
            <form onSubmit={handleOrderSubmit}>
              <div className="modal-body">
                {/* Select Customer */}
                <div className="form-group">
                  <label>{t('Select Purchasing Customer')}</label>
                  <select
                    required
                    value={newOrderCustomer}
                    onChange={(e) => setNewOrderCustomer(e.target.value)}
                  >
                    <option value="">{t('-- Choose Customer --')}</option>
                    {filteredCustomers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} {c.phone ? `(${c.phone})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Items Section */}
                <div className="items-selector-section">
                  <div className="flex-between m-b-2">
                    <label>{t('Order Items')}</label>
                    <button type="button" onClick={addOrderItemRow} className="btn-text">
                      + Add Item
                    </button>
                  </div>

                  {newOrderItems.map((item, idx) => {
                    const selectedProd = productMap.get(item.product_id) || null;
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
                            <option value="">{t('-- Select Product --')}</option>
                            {products.map((p) => (
                              <option key={p.id} value={p.id} disabled={p.stock === 0}>
                                {p.name} {p.stock === 0 ? '(OUT OF STOCK)' : `(SKU: ${p.sku} | ₹${parseFloat(p.price).toFixed(2)} | Stock: ${p.stock})`}
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
                    const p = productMap.get(item.product_id);
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
    </div>
  );
}

export default App;
