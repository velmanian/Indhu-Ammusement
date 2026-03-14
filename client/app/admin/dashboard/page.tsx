'use client';

import { useState, useEffect, useRef } from 'react';
import { fetchAdmin, createProduct, updateProduct, deleteProduct, updateEnquiryStatus, deleteEnquiry, bulkUploadExcel, bulkUploadZip } from '@/lib/adminApi';
import { Enquiry, Product, Category } from '@/types';
import { LayoutDashboard, ShoppingBag, MessageSquare, LogOut, Loader2, Plus, Edit, Trash2, FileUp, FileArchive, RefreshCw, X, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProductModal from '@/components/ProductModal';
import EnquiryDetailModal from '@/components/EnquiryDetailModal';

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'enquiries' | 'products'>('enquiries');
  const [viewType, setViewType] = useState<'grid' | 'table'>('grid');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'RESPONDED' | 'CLOSED'>('ALL');
  const [selectedEnquiries, setSelectedEnquiries] = useState<any[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [bulkLoading, setBulkLoading] = useState(false);
  const [selectedExcelFile, setSelectedExcelFile] = useState<File | null>(null);
  const [selectedZipFile, setSelectedZipFile] = useState<File | null>(null);
  const [selectedEnquiryForDetail, setSelectedEnquiryForDetail] = useState<Enquiry | null>(null);
  const excelInputRef = useRef<HTMLInputElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Loading admin data...');
        const [enqData, prodData, catData] = await Promise.all([
          fetchAdmin('/enquiries'),
          fetchAdmin('/products'),
          fetchAdmin('/categories')
        ]);
        console.log('Categories loaded:', catData);
        console.log('Enquiries loaded:', enqData);
        // Log the structure of the first enquiry to debug
        if (enqData.length > 0) {
          console.log('First enquiry structure:', enqData[0]);
          console.log('First enquiry selectedProducts:', enqData[0].selectedProducts);
        }
        setEnquiries(enqData);
        setProducts(prodData);
        setCategories(catData);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleUpdateEnquiryStatus = async (enquiryId: any, newStatus: string) => {
    // 1. Store original states for potential revert
    const originalEnquiries = [...enquiries];
    const originalSelectedDetail = selectedEnquiryForDetail ? { ...selectedEnquiryForDetail } : null;

    // 2. Apply optimistic updates
    setEnquiries(prev => prev.map(enq =>
      (enq._id === enquiryId || enq.id === enquiryId) ? { ...enq, status: newStatus } : enq
    ));

    if (selectedEnquiryForDetail && (selectedEnquiryForDetail._id === enquiryId || selectedEnquiryForDetail.id === enquiryId)) {
      setSelectedEnquiryForDetail({ ...selectedEnquiryForDetail, status: newStatus });
    }

    try {
      // 3. Update the status in the backend
      await updateEnquiryStatus(enquiryId, { status: newStatus });
      console.log('Enquiry status updated successfully');
    } catch (error) {
      console.error('Error updating enquiry status:', error);

      // 4. Revert states if the update failed
      setEnquiries(originalEnquiries);
      if (originalSelectedDetail && (originalSelectedDetail._id === enquiryId || originalSelectedDetail.id === enquiryId)) {
        setSelectedEnquiryForDetail(originalSelectedDetail);
      }

      alert('Failed to update enquiry status. Please try again.');
    }
  };

  const handleDeleteEnquiry = async (enquiryId: any) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      // Delete from backend
      await deleteEnquiry(enquiryId);

      // Update local state
      setEnquiries(prev => prev.filter(enq => enq._id !== enquiryId && enq.id !== enquiryId));

      // Remove from selection if it was selected
      setSelectedEnquiries(prev => prev.filter(id => id !== enquiryId));

      console.log('Enquiry deleted successfully');
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      alert('Failed to delete enquiry');
    }
  };

  const handleDeleteSelectedEnquiries = async () => {
    if (selectedEnquiries.length === 0) return;

    if (!confirm(`Are you sure you want to delete ${selectedEnquiries.length} enquiries?`)) return;

    try {
      // Delete all selected enquiries
      await Promise.all(
        selectedEnquiries.map(id => deleteEnquiry(id))
      );

      // Update local state
      setEnquiries(prev => prev.filter(enq => !selectedEnquiries.includes(enq._id) && !selectedEnquiries.includes(enq.id)));
      setSelectedEnquiries([]);

      console.log(`${selectedEnquiries.length} enquiries deleted successfully`);
    } catch (error) {
      console.error('Error deleting enquiries:', error);
      alert('Failed to delete some enquiries');
    }
  };

  const toggleEnquirySelection = (enquiryId: any) => {
    setSelectedEnquiries(prev =>
      prev.includes(enquiryId)
        ? prev.filter(id => id !== enquiryId)
        : [...prev, enquiryId]
    );
  };

  const selectAllEnquiries = (filteredEnquiries: Enquiry[]) => {
    if (selectedEnquiries.length === filteredEnquiries.length) {
      setSelectedEnquiries([]);
    } else {
      setSelectedEnquiries(filteredEnquiries.map(enq => enq._id || enq.id));
    }
  };

  // Filter enquiries based on status
  const filteredEnquiries = enquiries.filter(enq =>
    statusFilter === 'ALL' || enq.status === statusFilter
  );

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    product.category?.name?.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const [enqData, prodData, catData] = await Promise.all([
        fetchAdmin('/enquiries'),
        fetchAdmin('/products'),
        fetchAdmin('/categories')
      ]);
      setEnquiries(enqData);
      setProducts(prodData);
      setCategories(catData);
    } catch (err) {
      console.error('Error refreshing data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExcelSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedExcelFile(file);
    if (excelInputRef.current) excelInputRef.current.value = '';
  };

  const handleZipSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedZipFile(file);
    if (zipInputRef.current) zipInputRef.current.value = '';
  };

  const handleBulkSubmit = async () => {
    if (!selectedExcelFile) {
      alert('Please select an Excel file first.');
      return;
    }

    setBulkLoading(true);
    try {
      // 1. Upload ZIP if exists
      if (selectedZipFile) {
        console.log('Step 1: Uploading ZIP...');
        const zipRes = await bulkUploadZip(selectedZipFile);
        console.log('ZIP upload success:', zipRes);
      }

      // 2. Upload Excel
      console.log('Step 2: Uploading Excel...');
      const excelRes = await bulkUploadExcel(selectedExcelFile);
      alert(excelRes.message);

      // Reset selection and refresh
      setSelectedExcelFile(null);
      setSelectedZipFile(null);
      await refreshData();
    } catch (error: any) {
      console.error('Bulk submission error:', error);
      alert('Bulk upload failed: ' + (error.message || 'Unknown error'));
    } finally {
      setBulkLoading(false);
    }
  };

  const downloadTemplate = () => {
    const headers = ['Product Name', 'Category', 'Description', 'Image Name', 'Dimensions', 'Material', 'Age Group', 'Installation', 'Warranty', 'Status'];
    const sampleRow = ['Kids Slide', 'Slides', 'Outdoor playground slide', 'slide1.jpg', '6ft', 'FRP', '3–10 yrs', 'Yes', '1 Year', 'Active'];
    const csvContent = [headers.join(','), sampleRow.join(',')].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'products_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddProduct = async (productData: any) => {
    setSubmitLoading(true);
    try {
      if (editingProduct) {
        // Edit mode
        const id = String((editingProduct as any)._id || editingProduct.id);
        await updateProduct(id, productData);
      } else {
        // Add mode
        await createProduct(productData);
      }
      setShowProductModal(false);
      setEditingProduct(null);
      // Refresh products list
      const prodData = await fetchAdmin('/products');
      setProducts(prodData);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;
    try {
      const id = String((product as any)._id || product.id);
      await deleteProduct(id);
      const prodData = await fetchAdmin('/products');
      setProducts(prodData);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="animate-spin text-blue-900" size={48} />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'enquiries' ? 'bg-white/20' : 'hover:bg-white/10'}`}
          >
            <MessageSquare size={20} /> Enquiries
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'products' ? 'bg-white/20' : 'hover:bg-white/10'}`}
          >
            <ShoppingBag size={20} /> Products
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500 transition mt-20"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 md:p-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">{activeTab}</h1>
          <div className="flex flex-wrap gap-3">
            {activeTab === 'enquiries' && (
              <>
                {selectedEnquiries.length > 0 && (
                  <button
                    onClick={handleDeleteSelectedEnquiries}
                    className="bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium flex items-center gap-1 sm:gap-2 hover:bg-red-600 transition text-sm sm:text-base"
                  >
                    <Trash2 size={14} className="sm:w-4 sm:h-4" /> Delete {selectedEnquiries.length}
                  </button>
                )}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">All Enquiries</option>
                  <option value="PENDING">Pending</option>
                  <option value="RESPONDED">Responded</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </>
            )}
            {activeTab === 'products' && (
              <div className="flex flex-wrap gap-2 items-center">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                />
                <div className="bg-gray-100 p-1 rounded-xl flex mr-2">
                  <button
                    onClick={() => setViewType('grid')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${viewType === 'grid' ? 'bg-white shadow-sm text-blue-900' : 'text-gray-500 hover:bg-gray-200'}`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewType('table')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${viewType === 'table' ? 'bg-white shadow-sm text-blue-900' : 'text-gray-500 hover:bg-gray-200'}`}
                  >
                    Table
                  </button>
                </div>
                <input
                  type="file"
                  ref={excelInputRef}
                  onChange={handleExcelSelection}
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                />
                <input
                  type="file"
                  ref={zipInputRef}
                  onChange={handleZipSelection}
                  accept=".zip"
                  className="hidden"
                />

                {/* File Status & Submit */}
                {(selectedExcelFile || selectedZipFile) && (
                  <div className="flex items-center gap-3 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 mr-2">
                    <div className="text-xs">
                      {selectedZipFile && (
                        <div className="text-orange-600 font-bold flex items-center gap-1">
                          <FileArchive size={12} /> ZIP Ready
                        </div>
                      )}
                      {selectedExcelFile && (
                        <div className="text-green-600 font-bold flex items-center gap-1">
                          <FileUp size={12} /> Excel Ready
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleBulkSubmit}
                      disabled={bulkLoading || !selectedExcelFile}
                      className="bg-blue-900 text-white px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-blue-800 transition disabled:opacity-50 flex items-center gap-2"
                    >
                      {bulkLoading ? <Loader2 size={12} className="animate-spin" /> : 'Finish & Submit'}
                    </button>
                    <button
                      onClick={() => { setSelectedExcelFile(null); setSelectedZipFile(null); }}
                      className="text-gray-400 hover:text-red-500 transition"
                      title="Clear Selection"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <button
                  onClick={() => zipInputRef.current?.click()}
                  className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 transition text-xs sm:text-sm ${selectedZipFile ? 'bg-orange-100 text-orange-600 border border-orange-200' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                  title="Step 1: Select images ZIP"
                >
                  <FileArchive size={18} /> {selectedZipFile ? 'ZIP Selected' : '1. Select ZIP'}
                </button>

                <button
                  onClick={() => excelInputRef.current?.click()}
                  className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 transition text-xs sm:text-sm ${selectedExcelFile ? 'bg-green-100 text-green-600 border border-green-200' : 'bg-green-600 text-white hover:bg-green-700'}`}
                  title="Step 2: Select products Excel"
                >
                  <FileUp size={18} /> {selectedExcelFile ? 'Excel Selected' : '2. Select Excel'}
                </button>
                <button
                  onClick={downloadTemplate}
                  className="bg-gray-100 text-gray-700 px-3 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200 transition text-xs sm:text-sm"
                  title="Download Excel Template"
                >
                  <FileUp size={18} className="rotate-180" /> Template
                </button>
                <button
                  onClick={openAddModal}
                  className="bg-blue-900 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-800 transition text-xs sm:text-sm"
                >
                  <Plus size={18} /> Add Product
                </button>
                <button
                  onClick={refreshData}
                  className="bg-gray-200 text-gray-700 p-2 rounded-xl hover:bg-gray-300 transition"
                  title="Refresh Data"
                >
                  <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                </button>
              </div>
            )}
          </div>
        </div>

        {activeTab === 'enquiries' ? (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50/50">
                  <tr key="header-row">
                    <th className="px-6 py-5 text-left">
                      <input
                        type="checkbox"
                        checked={selectedEnquiries.length > 0 && selectedEnquiries.length === filteredEnquiries.length}
                        onChange={() => selectAllEnquiries(filteredEnquiries)}
                        className="h-5 w-5 text-blue-900 rounded-lg border-gray-300 focus:ring-blue-900 transition-all"
                      />
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Customer & Date</th>
                    <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Products</th>
                    <th className="hidden md:table-cell px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Location</th>
                    <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredEnquiries.map((enq, idx) => (
                    <tr
                      key={enq._id || enq.id || `enq-${idx}`}
                      className={`group hover:bg-blue-50/30 transition-all duration-200 ${(selectedEnquiries as any).includes(enq._id || enq.id) ? 'bg-blue-50/50' : ''}`}
                    >
                      <td className="px-6 py-6 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={(selectedEnquiries as any).includes(enq._id || enq.id)}
                          onChange={() => toggleEnquirySelection((enq._id || enq.id) as any)}
                          className="h-5 w-5 text-blue-900 rounded-lg border-gray-300 focus:ring-blue-900 transition-all"
                        />
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-gray-900 group-hover:text-blue-900 transition-colors">{enq.name}</span>
                          <span className="text-xs font-bold text-gray-400 mt-0.5">{new Date(enq.createdAt).toLocaleDateString()}</span>
                          <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-gray-500">
                            <span className="bg-gray-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <MessageSquare size={10} /> {enq.phone}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex -space-x-3 hover:space-x-1 transition-all duration-300">
                          {enq.selectedProducts && Array.isArray(enq.selectedProducts) && enq.selectedProducts.length > 0 ? (
                            enq.selectedProducts.slice(0, 4).map((prod: any, idx: number) => (
                              <div
                                key={`${enq._id || enq.id}-${idx}`}
                                className="w-10 h-10 rounded-xl border-2 border-white shadow-sm overflow-hidden bg-gray-100 flex-shrink-0 relative group/thumb"
                              >
                                <img
                                  src={prod.image || '/placeholder-image.png'}
                                  alt={prod.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                                  <span className="text-[8px] text-white font-black text-center px-1 leading-tight">{prod.name}</span>
                                </div>
                              </div>
                            ))
                          ) : enq.product ? (
                            <div className="w-10 h-10 rounded-xl border-2 border-white shadow-sm overflow-hidden bg-gray-100 flex-shrink-0">
                              <img
                                src={enq.product.images?.[0] || '/placeholder-image.png'}
                                alt={enq.product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => (e.currentTarget.src = '/placeholder-image.png')}
                              />
                            </div>
                          ) : (
                            <span className="text-xs font-bold text-gray-400 italic">General Enquiry</span>
                          )}
                          {enq.selectedProducts && enq.selectedProducts.length > 4 && (
                            <div className="w-10 h-10 rounded-xl border-2 border-white shadow-sm bg-blue-900 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                              +{enq.selectedProducts.length - 4}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-6 py-6">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                          <MapPin size={14} className="text-blue-900" />
                          {enq.location}
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${enq.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                          enq.status === 'RESPONDED' ? 'bg-green-50 text-green-700 border-green-100' :
                            'bg-gray-50 text-gray-700 border-gray-100'
                          }`}>
                          {enq.status}
                        </span>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap text-right">
                        <div className="flex justify-end items-center gap-2">
                          <button
                            onClick={() => setSelectedEnquiryForDetail(enq)}
                            className="p-2 bg-blue-50 text-blue-900 rounded-xl hover:bg-blue-900 hover:text-white transition-all duration-300"
                            title="View Full Details"
                          >
                            <LayoutDashboard size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteEnquiry((enq._id || enq.id) as any)}
                            className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
                            title="Delete Enquiry"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">No products found</p>
                <p className="text-gray-400 text-sm mt-1">Try a different search or add a new product</p>
              </div>
            ) : viewType === 'grid' ? (
              filteredProducts.map(product => (
                <div key={(product as any)._id || product.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0">
                      {product.images && product.images[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={e => {
                            (e.target as HTMLImageElement).src = '/placeholder-image.png';
                          }}
                        />
                      ) : (
                        <div className="text-gray-400 text-xs text-center p-2">No Image</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{product.category?.name || 'Uncategorized'}</p>
                      {product.description && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{product.description}</p>
                      )}
                      <div className="mt-3 flex gap-3">
                        <button
                          onClick={() => openEditModal(product)}
                          className="text-blue-900 text-sm font-bold hover:underline flex items-center gap-1"
                        >
                          <Edit size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product)}
                          className="text-red-500 text-sm font-bold hover:underline flex items-center gap-1"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Slug</th>
                        <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProducts.map(product => (
                        <tr key={(product as any)._id || product.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                {product.images?.[0] ? (
                                  <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
                                ) : (
                                  <div className="h-full w-full flex items-center justify-center text-[10px] text-gray-400">No Img</div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-bold text-gray-900">{product.name}</div>
                                <div className="text-xs text-gray-500 truncate max-w-[200px]">{product.description || 'No description'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-bold">
                              {product.category?.name || 'Uncategorized'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400 font-mono">
                            {product.slug}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-3">
                              <button onClick={() => openEditModal(product)} className="text-blue-900 hover:text-blue-700"><Edit size={18} /></button>
                              <button onClick={() => handleDeleteProduct(product)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <ProductModal
        isOpen={showProductModal}
        onClose={() => { setShowProductModal(false); setEditingProduct(null); }}
        onSubmit={handleAddProduct}
        categories={categories}
        loading={submitLoading}
        editingProduct={editingProduct}
      />

      <EnquiryDetailModal
        enquiry={selectedEnquiryForDetail}
        onClose={() => setSelectedEnquiryForDetail(null)}
        onUpdateStatus={handleUpdateEnquiryStatus}
      />
    </div>
  );
}