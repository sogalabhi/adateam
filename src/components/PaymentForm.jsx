import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://bcgvspkuazvdtmzaqyiw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZ3ZzcGt1YXp2ZHRtemFxeWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTE5MDYsImV4cCI6MjA1MjE2NzkwNn0.WAcWP3VRdavS_in2IIaVFRvT-Lv7iDcFL3Aag__tUp4';
const supabase = createClient(supabaseUrl, supabaseKey);
const PaymentForm = ({ lesson }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardType, setCardType] = useState('Visa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false); // State to track payment success
  const [showNextButton, setShowNextButton] = useState(false); // State to show Next button after alert
  const navigate = useNavigate();

  const adduidtousers_info = async (lesson) => {
    try {
      // Fetch the user data with the given uuid
      const user = await supabase.auth.getUser();
      const uuid = user['data']['user']['id'];
      const { data, error } = await supabase
        .from('users_info')
        .select('uuid, mycourses')
        .eq('uuid', uuid)
        .single();

      if (error && error.code === 'PGRST116') {
        // If the user does not exist, create a new row with uuid and the mycourses field
        const { insertError } = await supabase
          .from('users_info')
          .insert([{ uuid, mycourses: [lesson.uid] }]);

        if (insertError) {
          console.error('Error inserting new user:', insertError);
        } else {
          console.log('New user created successfully!');
        }
      } else if (data) {
        // If user exists, update the mycourses field
        const currentCourses = data.mycourses || [];
        const updatedCourses = [...new Set([...currentCourses, lesson.uid])];

        const { updateError } = await supabase
          .from('users_info')
          .update({ mycourses: updatedCourses })
          .eq('uuid', uuid);

        if (updateError) {
          console.error('Error updating courses:', updateError);
        } else {
          console.log('Courses updated successfully!');
        }
      }
    } catch (error) {
      console.error('Error updating mycourses:', error);
    }
  }
  const handlePurchase = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccessful(true); // Mark payment as successful
      alert('Payment Successful!.');
      adduidtousers_info(lesson);
      setShowNextButton(true); // Show the Next button after the alert
    }, 2000); // Simulate processing time
  };

  const handleCancel = () => {
    alert('Payment Canceled');
    navigate('/'); // Redirect to homepage or any other page you prefer
  };

  // Create PDF Document to be downloaded
  const MyDocument = () => (
    <Document>
        <Page style={styles.page}>
            {/* Title Section */}
            <Text style={styles.heading}>Payment Receipt </Text>
            <Text style={styles.subheading}>Thank you for your purchase!</Text>
            
            {/* Transaction Details Section */}
            <Text style={styles.sectionTitle}>Transaction Details</Text>
            <Text style={styles.detailText}>Lesson: <Text style={styles.highlight}>{lesson.title}</Text></Text>
            <Text style={styles.detailText}>Price: <Text style={styles.highlight}>${lesson.price}</Text></Text>
            <Text style={styles.detailText}>Cardholder: <Text style={styles.highlight}>{cardHolder}</Text></Text>

            {/* Footer Section */}
            <Text style={styles.footer}>If you have any questions, contact support@example.com</Text>
            <Text style={styles.footer}>Thank you for choosing our course! </Text>
        </Page>
    </Document>
  );

  // Styles for PDF
  const styles = StyleSheet.create({
    page: {
        backgroundColor: '#f0f8ff', // Light blue background
        padding: 40,
    },
    heading: {
        fontSize: 32,
        textAlign: 'center',
        color: '#1a73e8', // Google Blue
        marginBottom: 10,
        fontWeight: 'bold',
    },
    subheading: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
        fontStyle: 'italic',
    },
    sectionTitle: {
        fontSize: 24,
        marginBottom: 12,
        fontWeight: 'bold',
        color: '#1a73e8',
        borderBottom: '2px solid #1a73e8',
        paddingBottom: 5,
    },
    detailText: {
        fontSize: 18,
        marginVertical: 5,
        color: '#333',
    },
    highlight: {
        color: '#1a73e8',
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 30,
        fontSize: 14,
        textAlign: 'center',
        color: '#555',
    }
});


  // Handle navigation to video after the user clicks Next
  const handleNext = () => {
    navigate(`/video`, { state: { lesson } });
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
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  maxLength="4"
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
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="CVV"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  maxLength="3"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <span className="text-lg font-semibold">{lesson.price}</span>
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

          {/* Show download PDF option after payment success */}
          {paymentSuccessful && (
            <div className="mt-4">
              <PDFDownloadLink
                document={<MyDocument />}
                fileName="receipt.pdf"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg"
              >
                {({ loading }) =>
                  loading ? 'Generating PDF...' : 'Download Receipt'
                }
              </PDFDownloadLink>
            </div>
          )}

          {/* Show Next button after alert */}
          {showNextButton && (
            <div className="mt-4">
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white px-6 py-3 relative left-1.5 rounded-lg font-semibold text-lg"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;








