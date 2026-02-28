// Test component to verify product display logic
import React from 'react';

interface TestProduct {
  name: string;
  id: number;
}

interface TestEnquiry {
  id: number;
  name: string;
  selectedProducts?: TestProduct[];
  product?: TestProduct;
}

const TestAdminDashboard = () => {
  // Mock test data
  const testEnquiries: TestEnquiry[] = [
    {
      id: 1,
      name: "Test Customer 1",
      selectedProducts: [
        { id: 1, name: "Wave Slide" },
        { id: 2, name: "Straight Slide" },
        { id: 3, name: "Circular Swing" }
      ]
    },
    {
      id: 2,
      name: "Test Customer 2",
      product: { id: 4, name: "Horse Rider" }
    },
    {
      id: 3,
      name: "Test Customer 3",
      selectedProducts: []
    }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Test Admin Dashboard - Product Display</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Selected Products
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testEnquiries.map(enq => (
              <tr key={enq.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{enq.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    {/* Selected Products List */}
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-1">Products:</div>
                      {enq.selectedProducts && enq.selectedProducts.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {enq.selectedProducts.map((prod: TestProduct, index: number) => (
                            <span 
                              key={`${enq.id}-${index}`} 
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              title={prod.name}
                            >
                              {prod.name}
                            </span>
                          ))}
                        </div>
                      ) : enq.product ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {enq.product.name}
                        </span>
                      ) : (
                        <div className="text-xs text-gray-500 italic">General Enquiry</div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">Expected Output:</h2>
        <ul className="list-disc list-inside text-blue-700">
          <li>Customer 1 should show 3 blue badges: "Wave Slide", "Straight Slide", "Circular Swing"</li>
          <li>Customer 2 should show 1 blue badge: "Horse Rider"</li>
          <li>Customer 3 should show "General Enquiry" text</li>
        </ul>
      </div>
    </div>
  );
};

export default TestAdminDashboard;