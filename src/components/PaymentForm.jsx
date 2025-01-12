import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ lesson }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardType, setCardType] = useState('Visa'); // Default card type
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePurchase = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Payment Successful!');
      navigate(`/video`, { state: { lesson } }); // Navigate to the video page
    }, 2000); // Simulate processing time
  };

  const handleCvvChange = (e) => {
    // Limit CVV input to 3 digits
    if (e.target.value.length <= 3) {
      setCvv(e.target.value);
    }
  };

  const handleExpiryDateChange = (e) => {
    // Ensure expiry date is in MM/YY format and has 4 digits
    if (e.target.value.length <= 5) {
      setExpiryDate(e.target.value);
    }
  };

  const handleCancel = () => {
    alert('Payment Canceled');
    navigate('/'); // Redirect to homepage or any other page you prefer
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white flex w-4/5 md:w-1/2 rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="w-2/5 flex justify-center relative bg-blue-600">
        <img 
                src="src/assets/17395a71e08f8ed379d8ca6d5d24befd.gif" // Adjust path accordingly
                alt="Waving Bear Mascot"
                className="absolute right-0.2 top-[20%] w-70 h-70  object-contain"

            />
          
        </div>

        {/* Payment Form Section */}
        <div className="w-3/5 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h3>
          <form onSubmit={handlePurchase}>
            <div className="mb-4">
              <label htmlFor="cardHolder" className="block text-gray-700 mb-2">Cardholder Name</label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter your card number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <label htmlFor="expiryDate" className="block text-gray-700 mb-2">Expiry Date (MM/YY)</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder="MM/YY"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="cvv" className="block text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={cvv}
                  onChange={handleCvvChange}
                  placeholder="CVV"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  maxLength="3"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="cardType" className="block text-gray-700 mb-2">Card Type</label>
              <select
                id="cardType"
                name="cardType"
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="Rupay">Rupay</option>
              </select>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                disabled={isProcessing}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transform transition-transform duration-300 ease-in-out hover:bg-blue-700 disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Purchase'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold text-lg transform transition-transform duration-300 ease-in-out hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;




