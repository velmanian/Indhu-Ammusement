'use client';

import { useState, useEffect } from 'react';
import { fetchAdmin, createProduct, updateProduct, deleteProduct, updateEnquiryStatus, deleteEnquiry } from '@/lib/adminApi';
import { Enquiry, Product, Category } from '@/types';
import { LayoutDashboard, ShoppingBag, MessageSquare, LogOut, Loader2, Plus, Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProductModal from '@/components/ProductModal';

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'enquiries' | 'products'>('enquiries');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'RESPONDED' | 'CLOSED'>('ALL');
  const [selectedEnquiries, setSelectedEnquiries] = useState<number[]>([]);
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

  const handleUpdateEnquiryStatus = async (enquiryId: number, newStatus: string) => {
    try {
      // Update the status in the backend
      await updateEnquiryStatus(enquiryId, { status: newStatus });

      // Update the local state
      setEnquiries(prev => prev.map(enq =>
        enq.id === enquiryId ? { ...enq, status: newStatus } : enq
      ));

      console.log('Enquiry status updated successfully');
    } catch (error) {
      console.error('Error updating enquiry status:', error);
      // Revert the status in UI if the update failed
      setEnquiries(prev => prev.map(enq =>
        enq.id === enquiryId ? { ...enq, status: enquiries.find(e => e.id === enquiryId)?.status || enq.status } : enq
      ));
    }
  };

  const handleDeleteEnquiry = async (enquiryId: number) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      // Delete from backend
      await deleteEnquiry(enquiryId);

      // Update local state
      setEnquiries(prev => prev.filter(enq => enq.id !== enquiryId));

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
      setEnquiries(prev => prev.filter(enq => !selectedEnquiries.includes(enq.id)));
      setSelectedEnquiries([]);

      console.log(`${selectedEnquiries.length} enquiries deleted successfully`);
    } catch (error) {
      console.error('Error deleting enquiries:', error);
      alert('Failed to delete some enquiries');
    }
  };

  const toggleEnquirySelection = (enquiryId: number) => {
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
      setSelectedEnquiries(filteredEnquiries.map(enq => enq.id));
    }
  };

  // Filter enquiries based on status
  const filteredEnquiries = enquiries.filter(enq =>
    statusFilter === 'ALL' || enq.status === statusFilter
  );

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
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
              <button
                onClick={openAddModal}
                className="bg-blue-900 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-800 transition"
              >
                <Plus size={20} /> Add Product
              </button>
            )}
          </div>
        </div>

        {activeTab === 'enquiries' ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <tr key="header-row">
                    <th className="px-2 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedEnquiries.length > 0 && selectedEnquiries.length === filteredEnquiries.length}
                        onChange={() => selectAllEnquiries(filteredEnquiries)}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-2 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date & Contact</th>
                    <th className="px-2 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Products & Purpose</th>
                    <th className="hidden md:table-cell px-2 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Location</th>
                    <th className="hidden lg:table-cell px-2 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Message</th>
                    <th className="px-2 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEnquiries.map(enq => (
                    <tr key={enq.id} className={`hover:bg-blue-50 transition duration-150 ease-in-out ${selectedEnquiries.includes(enq.id) ? 'bg-blue-50' : ''}`}>
                      <td className="px-2 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedEnquiries.includes(enq.id)}
                          onChange={() => toggleEnquirySelection(enq.id)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-2 py-3 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">{enq.name}</div>
                        <div className="text-sm text-gray-500">{new Date(enq.createdAt).toLocaleDateString()}</div>
                        <div className="mt-2 flex flex-col gap-1">
                          <div className="flex items-center text-xs text-gray-600">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.448 3.853a1 1 0 01-.5 1.172l-2.187 1.148a1 1 0 00-.45 1.353l1.27 2.118a1 1 0 01-.2 1.253l-1.6 1.2a1 1 0 00-.25 1.1l.6 1.4a1 1 0 01-.3 1.2l-1.4.6a1 1 0 00-1.1.25l-1.2 1.6a1 1 0 01-1.253.2l-2.118-1.27a1 1 0 00-1.353.45l-1.148 2.187a1 1 0 01-1.172.5L4 17.28A1 1 0 013 16.28V5z" />
                            </svg>
                            {enq.phone}
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {enq.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <div className="space-y-1">
                          {/* Selected Products List */}
                          <div>
                            <div className="text-xs font-semibold text-gray-500 mb-1">Products:</div>
                            {enq.selectedProducts && Array.isArray(enq.selectedProducts) && enq.selectedProducts.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {enq.selectedProducts.map((prod: any, index: number) => (
                                  <span
                                    key={enq.id + '-' + index}
                                    className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                    title={prod.name || prod.id || 'Unknown Product'}
                                  >
                                    {prod.name || prod.id || 'Unknown Product'}
                                  </span>
                                ))}
                              </div>
                            ) : enq.product ? (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {enq.product.name}
                              </span>
                            ) : (
                              <div className="text-xs text-gray-500 italic">General</div>
                            )}
                          </div>

                          {/* Usage Purpose */}
                          {enq.usagePurpose && enq.usagePurpose.length > 0 && (
                            <div>
                              <div className="text-xs font-semibold text-gray-500 mb-1">Usage:</div>
                              <div className="flex flex-wrap gap-1">
                                {enq.usagePurpose.map((purpose: string, index: number) => (
                                  <span
                                    key={enq.id + '-purpose-' + index}
                                    className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                  >
                                    {purpose}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-2 py-3">
                        <div className="text-sm text-gray-500 max-w-[120px] truncate">{enq.location}</div>
                      </td>
                      <td className="hidden lg:table-cell px-2 py-3">
                        <div className="text-sm text-gray-900 max-w-[150px] truncate hidden lg:block" title={enq.message}>{enq.message}</div>
                        <div className="mt-2">
                          <span className={'px-2 py-1 rounded-full text-xs font-bold ' +
                            (enq.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                              enq.status === 'RESPONDED' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800')
                          }>
                            {enq.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-2 py-3 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-col gap-2">
                          <select
                            value={enq.status}
                            onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                            className="w-full text-xs font-bold px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="RESPONDED">RESPONDED</option>
                            <option value="CLOSED">CLOSED</option>
                          </select>
                          <div className="flex gap-2 mt-2">
                            <a
                              href={'https://wa.me/' + enq.phone.replace(/[^0-9]/g, '') + '?text=Hello ' + encodeURIComponent(enq.name) + ', we received your enquiry about ' + (enq.selectedProducts && enq.selectedProducts.length > 0 ? enq.selectedProducts[0]?.name : enq.product?.name || 'our products') + ' and would like to assist you.'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition duration-200"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                                <path d="M17.502 16.842c-.94-.618-1.826-1.132-2.905-1.132-1.387 0-2.33.722-3.42 2.158-1.957-1.044-3.75-3.419-3.75-5.81 0-3.312 2.96-6.437 6.96-6.437 3.867 0 6.54 2.812 6.54 6.06 0 1.866-.84 3.533-2.375 4.724zm-4.835-9.69c-2.077 0-3.75 1.8-3.75 4 0 1.08.66 2.106 1.83 2.64.3.12.42.3.3.54l-1.02 2.34c-.12.3.06.42.3.48l2.46-.54c.72 0 1.38-.18 1.98-.48.96-.42 1.62-1.26 1.62-2.28 0-2.2-1.68-4-3.75-4z" /><circle cx="10.5" cy="9" r="1" /><circle cx="13.5" cy="9" r="1" /><path d="M18 3H6c-1.657 0-3 1.343-3 3v12c0 1.657 1.343 3 3 3h12c1.657 0 3-1.343 3-3V6c0-1.657-1.343-3-3-3zm.5 15c0 .276-.224.5-.5.5H6c-.276 0-.5-.224-.5-.5V6c0-.276.224-.5.5-.5h12c.276 0 .5.224.5.5v12z" />
                              </svg>
                              <span className="text-xs font-bold ml-1">WhatsApp</span>
                            </a>
                            <a
                              href={'mailto:' + enq.email + '?subject=Regarding your enquiry&body=Hello ' + encodeURIComponent(enq.name) + ', we received your enquiry about ' + (enq.selectedProducts && enq.selectedProducts.length > 0 ? enq.selectedProducts[0]?.name : enq.product?.name || 'our products') + ' and would like to assist you.'}
                              className="flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition duration-200"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                                <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
                              </svg>
                              <span className="text-xs font-bold ml-1">Email</span>
                            </a>
                            <button
                              onClick={() => handleDeleteEnquiry(enq.id)}
                              className="flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition duration-200"
                            >
                              <Trash2 size={16} />
                              <span className="text-xs font-bold ml-1">Delete</span>
                            </button>
                          </div>
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
            {products.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">No products yet</p>
                <p className="text-gray-400 text-sm mt-1">Click "Add Product" to get started</p>
              </div>
            ) : (
              products.map(product => (
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
    </div>
  );
}