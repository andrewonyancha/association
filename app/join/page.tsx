'use client';

import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, CreditCard, MapPin, User } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import dynamic from 'next/dynamic';

const PaystackButton = dynamic(() => import('@makozi/paystack-react-pay').then(mod => ({ default: mod.PaystackButton })), { ssr: false });

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

type FormData = {
  companyName?: string;
  yearsInBusiness?: string;
  employeeCount?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  services?: string[];
  coverage?: string;
  businessType?: string;
  industry?: string;
  shippingNeeds?: string;
  preferredRegions?: string[];
  references?: Array<{
    name: string;
    email: string;
    phone: string;
    relationship: string;
  }>;
};

interface FormProps {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  selectedType: 'freight' | 'traders' | null;
  setSelectedType: Dispatch<SetStateAction<'freight' | 'traders' | null>>;
}

export default function JoinPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState<'freight' | 'traders' | null>(null);
  const [formData, setFormData] = useState<FormData>({});

  // Category Selection Step
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-purple-50 -mt-2">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Freight Forwarders Container */}
                <div
                  onClick={() => {
                    setSelectedType('freight');
                    setCurrentStep(1);
                  }}
                  className={`p-6 rounded-xl border-2 transition-all text-left cursor-pointer hover:shadow-md ${
                    selectedType === 'freight'
                      ? 'border-purple-900 bg-purple-50'
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 mr-4">
                        <img 
                          src="/icons/freight-icon.png" 
                          alt="Freight Forwarders"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Freight Forwarders</h3>
                    </div>
                    <ArrowRight className={`w-5 h-5 ${
                      selectedType === 'freight' ? 'text-purple-900' : 'text-gray-400'
                    }`} />
                  </div>
                </div>

                {/* Traders & Shippers Container */}
                <div
                  onClick={() => {
                    setSelectedType('traders');
                    setCurrentStep(1);
                  }}
                  className={`p-6 rounded-xl border-2 transition-all text-left cursor-pointer hover:shadow-md ${
                    selectedType === 'traders'
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-300 hover:border-orange-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 mr-4">
                        <img 
                          src="/icons/trader-icon.png" 
                          alt="Traders & Shippers"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Traders & Shippers</h3>
                    </div>
                    <ArrowRight className={`w-5 h-5 ${
                      selectedType === 'traders' ? 'text-orange-600' : 'text-gray-400'
                    }`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Form Steps
  return (
    <div className="min-h-screen bg-purple-50">
     
      <div className="container mx-auto px-4 py-12">
        {selectedType === 'freight' && (
           <FreightForwarderForm
             currentStep={currentStep}
             setCurrentStep={setCurrentStep}
             formData={formData}
             setFormData={setFormData}
             selectedType={selectedType}
             setSelectedType={setSelectedType}
           />
         )}
         {selectedType === 'traders' && (
           <TraderForm
             currentStep={currentStep}
             setCurrentStep={setCurrentStep}
             formData={formData}
             setFormData={setFormData}
             selectedType={selectedType}
             setSelectedType={setSelectedType}
           />
         )}
      </div>
    </div>
  );
}

// Freight Forwarder Form Component
function FreightForwarderForm({ currentStep, setCurrentStep, formData, setFormData, selectedType, setSelectedType }: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentSkipped, setPaymentSkipped] = useState(false);

  const steps = [
    { number: 1, title: 'Company', icon: User },
    { number: 2, title: 'Services', icon: MapPin },
    { number: 3, title: 'References', icon: User },
    { number: 4, title: 'Payment', icon: CreditCard, optional: true }
  ];

  // Paystack configuration
  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: formData.email || '',
    amount: 29900, // 299 USD in kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key_here',
    currency: 'usd',
    metadata: {
      custom_fields: [
        {
          display_name: "Company Name",
          variable_name: "company_name",
          value: formData.companyName || 'N/A'
        },
        {
          display_name: "Contact Person",
          variable_name: "contact_person", 
          value: formData.contactName || 'N/A'
        },
        {
          display_name: "User Type",
          variable_name: "user_type",
          value: "freight_forwarder"
        }
      ]
    },
    channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'] as const,
  };

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReferenceChange = (index: number, field: string, value: string) => {
    const updatedReferences = [...(formData.references || [])];
    if (!updatedReferences[index]) {
      updatedReferences[index] = { name: '', email: '', phone: '', relationship: '' };
    }
    updatedReferences[index] = { ...updatedReferences[index], [field]: value };
    handleInputChange('references', updatedReferences);
  };

  const addReference = () => {
    const updatedReferences = [...(formData.references || []), { name: '', email: '', phone: '', relationship: '' }];
    handleInputChange('references', updatedReferences);
  };

  const removeReference = (index: number) => {
    const updatedReferences = formData.references?.filter((_, i) => i !== index) || [];
    handleInputChange('references', updatedReferences);
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Prevent auto-submission - user must explicitly initiate
    if (!paymentCompleted && !paymentSkipped) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare data for Firebase
      const submissionData = {
        userType: 'freight_forwarder',
        ...formData,
        status: 'pending',
        submittedAt: Timestamp.now(),
        paymentStatus: paymentCompleted ? 'paid' : 'pending',
        paymentMethod: paymentCompleted ? 'paystack' : 'pay_later',
        paymentReference: paymentCompleted ? paystackConfig.reference : null,
      };

      // Submit to Firebase
      const docRef = await addDoc(collection(db, 'applications'), submissionData);
      
      console.log('Application submitted with ID:', docRef.id);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({});
        setCurrentStep(0);
        setPaymentCompleted(false);
        setPaymentSkipped(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onPaystackSuccess = (reference: any) => {
    // Payment successful
    console.log('Payment successful:', reference);
    setPaymentCompleted(true);
    
    // You can also send the reference to your backend for verification
    if (reference.reference) {
      console.log('Payment reference:', reference.reference);
    }
  };

  const onPaystackClose = () => {
    // Payment modal closed
    console.log('Payment modal closed');
  };

  const handleSkipPayment = () => {
    setPaymentSkipped(true);
  };

  const handleSwitchType = () => {
    setFormData({});
    setSelectedType('traders');
    setCurrentStep(1);
    setPaymentCompleted(false);
    setPaymentSkipped(false);
  };

  // Paystack button component props
  const paystackProps = {
    ...paystackConfig,
    text: paymentCompleted ? "Payment Completed" : "Pay with Paystack",
    onSuccess: onPaystackSuccess,
    onClose: onPaystackClose,
    className: `w-full py-3 px-6 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none font-semibold transition-colors flex items-center justify-center gap-2 ${
      paymentCompleted
        ? 'bg-green-600 text-white cursor-not-allowed'
        : formData.email
        ? 'bg-purple-900 hover:bg-purple-800 text-white'
        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
    }`,
    disabled: paymentCompleted || !formData.email,
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white md:rounded-none rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none  border border-gray-200 p-8">
        {/* Switch Type Button - Above Progress Steps */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleSwitchType}
            className="text-orange-600 text-sm font-medium transition-colors hover:text-purple-900 bg-white px-0.5 border-b"
          >
            Switch to Trader & Shipper
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 relative">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                currentStep >= step.number
                  ? 'bg-purple-900 border-purple-900 text-white'
                  : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <span className={`mt-2 text-sm font-medium ${
                currentStep >= step.number ? 'text-purple-900' : 'text-gray-500'
              }`}>
                {step.title}
                {step.optional && <span className="text-xs ml-1">(Optional)</span>}
              </span>
            </div>
          ))}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
            <div 
              className="h-full bg-purple-900 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Submission Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none ">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <p className="text-green-800 font-medium">Application submitted successfully!</p>
            </div>
            <p className="text-green-700 text-sm mt-1">Redirecting you back to the homepage...</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none">
            <div className="flex items-center">
              <div className="w-5 h-5 text-red-600 mr-2">!</div>
              <p className="text-red-800 font-medium">Error submitting application. Please try again.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Company Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Company Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName || ''}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-purple-900 focus:border-purple-900"
                    placeholder="Enter company name"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Years in Business *</label>
                    <select
                      required
                      value={formData.yearsInBusiness || ''}
                      onChange={(e) => handleInputChange('yearsInBusiness', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-purple-900 focus:border-purple-900"
                    >
                      <option value="">Select years</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Employees *</label>
                    <select
                      required
                      value={formData.employeeCount || ''}
                      onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-purple-900 focus:border-purple-900"
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="200+">200+ employees</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Contact Person *</label>
                    <input
                      type="text"
                      required
                      value={formData.contactName || ''}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-purple-900 focus:border-purple-900"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-purple-900 focus:border-purple-900"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-purple-900 focus:border-purple-900"
                    placeholder="+1234567890"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Services */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Services & Coverage</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-4 font-medium">Services Offered *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Air Freight', 'Sea Freight', 'Road Transport', 'Warehousing', 'Customs Brokerage'].map(service => (
                      <label key={service} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.services?.includes(service) || false}
                          onChange={(e) => {
                            const updated = e.target.checked
                              ? [...(formData.services || []), service]
                              : (formData.services || []).filter(s => s !== service);
                            handleInputChange('services', updated);
                          }}
                          className="rounded border-gray-300 text-purple-900 focus:ring-purple-900"
                        />
                        <span className="text-gray-700">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Geographic Coverage *</label>
                  <textarea
                    required
                    value={formData.coverage || ''}
                    onChange={(e) => handleInputChange('coverage', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-purple-900 focus:border-purple-900"
                    placeholder="List countries or regions you serve..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: References */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Professional References</h3>
              <div className="space-y-6">
                <div className="bg-purple-50 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none p-4 border border-purple-200">
                  <p className="text-purple-800 text-sm">
                    Please provide at least 2 professional references from clients or business partners.
                  </p>
                </div>
                
                {(formData.references || []).map((reference, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-900">Reference #{index + 1}</h4>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeReference(index)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Name *</label>
                        <input
                          type="text"
                          required
                          value={reference.name}
                          onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-purple-900 focus:border-purple-900"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Relationship *</label>
                        <input
                          type="text"
                          required
                          value={reference.relationship}
                          onChange={(e) => handleReferenceChange(index, 'relationship', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-purple-900 focus:border-purple-900"
                          placeholder="Client, Partner, etc."
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Email *</label>
                        <input
                          type="email"
                          required
                          value={reference.email}
                          onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-purple-900 focus:border-purple-900"
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Phone *</label>
                        <input
                          type="tel"
                          required
                          value={reference.phone}
                          onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-purple-900 focus:border-purple-900"
                          placeholder="+1234567890"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addReference}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors"
                >
                  + Add Another Reference
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Membership Payment</h3>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="text-center mb-6">
                  <CreditCard className="w-12 h-12 text-purple-900 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Complete Your Registration</h4>
                  <p className="text-gray-600">Choose your payment option to complete registration</p>
                </div>
                <div className="bg-purple-50 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none p-4 text-center mb-6 border border-purple-200">
                  <div className="text-2xl font-bold text-purple-900 mb-1">$299</div>
                  <div className="text-purple-700">Annual Membership Fee</div>
                </div>
                
                {/* Payment Options */}
                <div className="space-y-4">
                  {/* Paystack Button */}
                  {paymentCompleted ? (
                    <button
                      disabled
                      className="w-full py-3 px-6 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none font-semibold bg-green-600 text-white cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Payment Completed
                    </button>
                  ) : (
                    <PaystackButton {...paystackProps}>
                      {!formData.email && 'Add email to make payment'}
                    </PaystackButton>
                  )}

                  {/* Skip Payment Option */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleSkipPayment}
                      disabled={paymentSkipped || paymentCompleted}
                      className={`text-sm font-medium transition-colors ${
                        paymentSkipped 
                          ? 'text-green-600 cursor-not-allowed' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {paymentSkipped ? 'Payment Skipped - Ready to Submit' : 'Skip payment for now'}
                    </button>
                    {paymentSkipped && (
                      <p className="text-xs text-gray-500 mt-1">
                        You can complete payment later. Your application will be processed.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {submitStatus !== 'success' && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1 || isSubmitting}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none transition-colors ${
                  currentStep === 1 || isSubmitting
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-purple-900 hover:bg-purple-800 text-white px-6 py-3 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || (!paymentCompleted && !paymentSkipped)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none transition-colors ${
                    (paymentCompleted || paymentSkipped) && !isSubmitting
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// Trader Form Component (remains the same as before)
function TraderForm({ currentStep, setCurrentStep, formData, setFormData, selectedType, setSelectedType }: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const steps = [
    { number: 1, title: 'Business', icon: User },
    { number: 2, title: 'Needs', icon: MapPin },
    { number: 3, title: 'References', icon: User }
  ];

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReferenceChange = (index: number, field: string, value: string) => {
    const updatedReferences = [...(formData.references || [])];
    if (!updatedReferences[index]) {
      updatedReferences[index] = { name: '', email: '', phone: '', relationship: '' };
    }
    updatedReferences[index] = { ...updatedReferences[index], [field]: value };
    handleInputChange('references', updatedReferences);
  };

  const addReference = () => {
    const updatedReferences = [...(formData.references || []), { name: '', email: '', phone: '', relationship: '' }];
    handleInputChange('references', updatedReferences);
  };

  const removeReference = (index: number) => {
    const updatedReferences = formData.references?.filter((_, i) => i !== index) || [];
    handleInputChange('references', updatedReferences);
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const submissionData = {
        userType: 'trader_shipper',
        ...formData,
        status: 'pending',
        submittedAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, 'applications'), submissionData);
      
      console.log('Trader application submitted with ID:', docRef.id);
      setSubmitStatus('success');
      
      setTimeout(() => {
        setFormData({});
        setCurrentStep(0);
      }, 3000);

    } catch (error) {
      console.error('Error submitting trader application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSwitchType = () => {
    setFormData({});
    setSelectedType('freight');
    setCurrentStep(1);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg md:rounded-none  border border-gray-200 p-8">
        {/* Switch Type Button - Above Progress Steps */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleSwitchType}
            className="text-orange-600 hover:text-purple-900 text-sm font-medium transition-colors bg-white px-0.5 border-b"
          >
            Switch to Freight Forwarder
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 relative">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                currentStep >= step.number
                  ? 'bg-orange-600 border-orange-600 text-white'
                  : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <span className={`mt-2 text-sm font-medium ${
                currentStep >= step.number ? 'text-orange-600' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
            <div 
              className="h-full bg-orange-600 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Submission Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <p className="text-green-800 font-medium">Application submitted successfully!</p>
            </div>
            <p className="text-green-700 text-sm mt-1">Redirecting you back to the homepage...</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none">
            <div className="flex items-center">
              <div className="w-5 h-5 text-red-600 mr-2">!</div>
              <p className="text-red-800 font-medium">Error submitting application. Please try again.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Business Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Business Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName || ''}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                    placeholder="Enter company name"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Business Type *</label>
                    <select
                      required
                      value={formData.businessType || ''}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                    >
                      <option value="">Select type</option>
                      <option value="manufacturer">Manufacturer</option>
                      <option value="retailer">Retailer</option>
                      <option value="wholesaler">Wholesaler</option>
                      <option value="ecommerce">E-commerce</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Industry *</label>
                    <select
                      required
                      value={formData.industry || ''}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                    >
                      <option value="">Select industry</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="food">Food & Beverage</option>
                      <option value="automotive">Automotive</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Contact Person *</label>
                    <input
                      type="text"
                      required
                      value={formData.contactName || ''}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                    placeholder="+1234567890"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Shipping Needs */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Shipping Requirements</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Shipping Needs *</label>
                  <textarea
                    required
                    value={formData.shippingNeeds || ''}
                    onChange={(e) => handleInputChange('shippingNeeds', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                    placeholder="Describe your shipping requirements..."
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-3 font-medium">Preferred Regions *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['North America', 'Europe', 'Asia', 'Africa', 'South America'].map(region => (
                      <label key={region} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.preferredRegions?.includes(region) || false}
                          onChange={(e) => {
                            const updated = e.target.checked
                              ? [...(formData.preferredRegions || []), region]
                              : (formData.preferredRegions || []).filter(r => r !== region);
                            handleInputChange('preferredRegions', updated);
                          }}
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                        />
                        <span className="text-gray-700">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: References */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Business References</h3>
              <div className="space-y-6">
                <div className="bg-orange-50 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none p-4 border border-orange-200">
                  <p className="text-orange-800 text-sm">
                    Please provide at least 2 business references from suppliers or partners.
                  </p>
                </div>
                
                {(formData.references || []).map((reference, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-900">Reference #{index + 1}</h4>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeReference(index)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Name *</label>
                        <input
                          type="text"
                          required
                          value={reference.name}
                          onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Relationship *</label>
                        <input
                          type="text"
                          required
                          value={reference.relationship}
                          onChange={(e) => handleReferenceChange(index, 'relationship', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                          placeholder="Supplier, Partner, etc."
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Email *</label>
                        <input
                          type="email"
                          required
                          value={reference.email}
                          onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                          placeholder="email@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium">Phone *</label>
                        <input
                          type="tel"
                          required
                          value={reference.phone}
                          onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                          placeholder="+1234567890"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addReference}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors"
                >
                  + Add Another Reference
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {submitStatus !== 'success' && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1 || isSubmitting}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none transition-colors ${
                  currentStep === 1 || isSubmitting
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg md:rounded-none md:rounded-none md:rounded-none md:rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}