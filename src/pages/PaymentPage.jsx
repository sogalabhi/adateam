import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lesson = location.state?.lesson; // Get the selected lesson from state

  if (!lesson) {
    navigate('/'); // Redirect to homepage if no lesson is found
    return null;
  }

  return (
    <div>
      <h3 className="text-3xl text-center font-semibold text-blue-600 my-6">Complete Your Purchase</h3>
      <PaymentForm lesson={lesson} />
    </div>
  );
};

export default PaymentPage;
