import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SavedInvoice from "../components/SavedInvoice";
import easyinvoice from "easyinvoice";

const Dashboard = () => {
  const [invoiceNumber] = useState(uuidv4().replace(/-/g, "").slice(0, 12));
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [savedInvoice, setSavedInvoice] = useState([]);
  const [loading, setLaoding] = useState(false);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
    calculateTotal(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    calculateTotal(newItems);
  };

  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setTotalAmount(total);
  };

  const handlePrint = async (invoice) => {
    if (!invoice.customerName) {
      return toast.error("Customer name is required");
    }

    if (!invoice.customerAddress) {
      return toast.error("Customer address is required");
    }

    if (
      invoice.items.length === 0 ||
      invoice.items.some((item) => !item.name || item.price <= 0)
    ) {
      return toast.error(
        "At least one valid item is required with a name and a positive price."
      );
    }

    const data = {
      documentTitle: "INVOICE",
      currency: "INR",
      taxNotation: "gst",
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      images: {
        logo: "https://tryidoltech.com/wp-content/uploads/2024/02/tryidol.png",
      },
      sender: {
        company: "Tryidol Technologies",
        address:
          "B-48, Bagh Dilkusha, Lala Lajpat Rai Colony, Aish Bagh, Bhopal, Madhya Pradesh 462023",
        zip: "462023",
        city: "Bhopal",
        country: "Madhya Pradesh",
      },
      client: {
        company: invoice.customerName,
        address: invoice.customerAddress,
        zip: "",
        city: invoice.customerNumber,
        country: "",
      },
      information: {
        number: invoice.invoiceNumber,
        date: invoice.date,
      },
      invoiceDate: invoice.date,
      products: invoice.items.map((item) => ({
        quantity: item.quantity,
        description: item.name,
        tax: 0,
        price: item.price,
      })),
      bottomNotice: "Thank you for your business.",
    };

    try {
      setLaoding(true);
      const result = await easyinvoice.createInvoice(data);
      easyinvoice.download(`invoice_${invoice.invoiceNumber}.pdf`, result.pdf);
    } catch (error) {
      console.log(error);
    } finally {
      setLaoding(false);
      setCustomerName("");
      setCustomerAddress("");
      setCustomerNumber("");
      setItems([{ name: "", quantity: 1, price: 0 }]);
    }
  };

  const handleSave = () => {
    // Validation
    if (!customerName) {
      return toast.error("Customer name is required.");
    }

    if (!customerAddress) {
      return toast.error("Customer address is required.");
    }

    if (
      items.length === 0 ||
      items.some((item) => !item.name || item.price <= 0)
    ) {
      return toast.error(
        "At least one valid item is required with a name and a positive price."
      );
    }

    // Invoice data
    const invoiceData = {
      invoiceNumber,
      date,
      customerName,
      customerAddress,
      customerNumber,
      items,
      totalAmount,
    };

    // Retrieve saved invoices
    let savedInvoices = [];
    try {
      savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
      if (!Array.isArray(savedInvoices)) {
        savedInvoices = [];
      }
    } catch (error) {
      console.error("Error parsing invoices from localStorage:", error);
      savedInvoices = [];
    }

    // Save to localStorage
    localStorage.setItem(
      "invoices",
      JSON.stringify([...savedInvoices, invoiceData])
    );
    setSavedInvoice([...savedInvoice, invoiceData]);
    toast.success("Invoice saved successfully");
  };

  useEffect(() => {
    let savedInvoices = [];
    try {
      savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
      if (!Array.isArray(savedInvoices)) {
        savedInvoices = [];
      }
    } catch (error) {
      console.error("Error parsing invoices from localStorage:", error);
      savedInvoices = [];
    }
    setSavedInvoice(savedInvoices);
  }, []);

  return (
    <>
      <Navbar />

      <main className="px-4 sm:px-6 lg:px-20 min-h-screen mt-24 mb-10">
        {savedInvoice.length > 0 && (
          <SavedInvoice
            savedInvoice={savedInvoice}
            setSavedInvoice={setSavedInvoice}
            handlePrint={handlePrint}
            loading={loading}
          />
        )}
        <div className="max-w-full mx-auto p-4 sm:p-6 bg-white border shadow-md rounded-lg">
          <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
            Genrate Invoice
          </h1>
          <div className="mb-4">
            <label className="block text-gray-700">
              Invoice Number:
              <span className="bg-gray-200 ml-4 px-3 py-2 rounded-md font-semibold text-black">
                {invoiceNumber}
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-3"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Customer Name:</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Customer Address:</label>
            <input
              type="text"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Customer Number (optional):
            </label>
            <input
              type="number"
              value={customerNumber}
              onChange={(e) => setCustomerNumber(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-3"
            />
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Items</h2>
            {items.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center mb-2">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                  className="mr-2 flex-1 p-2.5 mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  required
                  className="mr-2 w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mt-3"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                  required
                  className="mr-2 w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mt-3"
                />
                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white py-2 px-3 mt-3 rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={addItem}
              className="bg-black py-2 mt-2 px-5 rounded-lg text-white hover:bg-black/90 transition duration-300 self-center sm:self-start"
            >
              Add Item
            </button>
          </div>
          <div className="mb-4 mt-6">
            <h2 className="text-xl font-semibold">
              Total Amount: ₹ {totalAmount.toFixed(2)}
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-5">
            <button
              onClick={() =>
                handlePrint({
                  invoiceNumber,
                  date,
                  customerName,
                  customerAddress,
                  customerNumber,
                  items,
                  totalAmount,
                })
              }
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              {loading ? "Printing" : " Print"}
            </button>
            <button
              onClick={handleSave}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Dashboard;
