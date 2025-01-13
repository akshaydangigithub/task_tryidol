import React from "react";
import toast from "react-hot-toast";

const SavedInvoice = ({
  savedInvoice,
  setSavedInvoice,
  handlePrint,
  loading,
}) => {
  const handleDeleteInvoice = (invoiceNumber, index) => {
    const updatedInvoices = savedInvoice.filter(
      (invoice) => invoice.invoiceNumber !== invoiceNumber
    );
    setSavedInvoice(updatedInvoices);
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    toast.success("Invoice deleted successfully");
  };

  return (
    <div className="mb-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Saved Invoices</h1>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Invoice Number</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Customer Name</th>
            <th className="border px-4 py-2">Total Amount</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {savedInvoice.map((invoice, index) => (
            <tr key={index}>
              <td className="border px-2 sm:px-4 py-2">
                {invoice.invoiceNumber}
              </td>
              <td className="border px-2 sm:px-4 py-2">{invoice.date}</td>
              <td className="border px-2 sm:px-4 py-2">
                {invoice.customerName}
              </td>
              <td className="border px-2 sm:px-4 py-2">
                ₹ {invoice.totalAmount.toFixed(2)}
              </td>
              <td className="border px-2 sm:px-4 py-2">
                <button
                  onClick={() => {
                    handlePrint(invoice);
                  }}
                  className="bg-green-500 text-white px-2 sm:px-4 py-2 rounded-md"
                >
                  {loading ? "Printing..." : "Print"}
                </button>
                <button
                  onClick={() =>
                    handleDeleteInvoice(invoice.invoiceNumber, index)
                  }
                  className="bg-red-500 text-white px-2 sm:px-4 py-2 rounded-md ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedInvoice;
