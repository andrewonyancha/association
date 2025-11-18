'use client';

import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { MoveRight, ArrowLeft, CheckCircle, CreditCard, MapPin, User } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import dynamic from 'next/dynamic';
import Image from 'next/image';

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
  investmentAmount?: string;
  investmentType?: string;
  investmentFocus?: string[];
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
  selectedType: 'freight' | 'traders' | 'investor' | null;
  setSelectedType: Dispatch<SetStateAction<'freight' | 'traders' | 'investor' | null>>;
}

export default function JoinPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState<'freight' | 'traders' | 'investor' | null>(null);
  const [formData, setFormData] = useState<FormData>({});

  // Category Selection Step
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-purple-50 -mt-2">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto">
            <div className="bg-purple-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Freight Forwarders Container */}
                <div
                  onClick={() => {
                    setSelectedType('freight');
                    setCurrentStep(1);
                  }}
                  className={`px-4 py-6 bg-white rounded-lg border transition-all text-left cursor-pointer ${
                    selectedType === 'freight'
                      ? 'border-purple-900 bg-purple-50'
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="aspect-[3/2] mr-4">
                        <Image
                          src="/images/hero.jpg"
                          alt="Freight Forwarders"
                          width={96}
                          height={128}
                          className="w-full h-full rounded-lg object-contain"
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <h3 className="md:text-lg text-sm font-semibold text-gray-900">Join as Forwarder</h3>
                    </div>
                    <MoveRight className={`w-5 h-5 ${
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
                  className={`py-6 px-4 bg-white rounded-lg border transition-all text-left cursor-pointer ${
                    selectedType === 'traders'
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-300 hover:border-orange-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="aspect-[3/2] mr-4">
                        <Image
                          src="/images/trader.jpg"
                          alt="Freight Forwarders"
                          width={96}
                          height={128}
                          className="w-full h-full rounded-lg object-contain"
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <h3 className="md:text-lg text-sm font-semibold text-gray-900">Join as Trader</h3>
                    </div>
                    <MoveRight className={`w-5 h-5 ${
                      selectedType === 'traders' ? 'text-orange-600' : 'text-gray-400'
                    }`} />
                  </div>
                </div>

                {/* Investor Container */}
                <div
                  onClick={() => {
                    setSelectedType('investor');
                    setCurrentStep(1);
                  }}
                  className={`py-6 px-4 bg-white rounded-lg border transition-all text-left cursor-pointer ${
                    selectedType === 'investor'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="aspect-[3/2] mr-4">
                        <Image
                          src="/images/TMX-goldcoin.png"
                          alt="Investor"
                          width={96}
                          height={128}
                          className="w-full h-full rounded-lg object-contain"
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <h3 className="md:text-lg text-sm font-semibold text-gray-900">Join as Investor</h3>
                    </div>
                    <MoveRight className={`w-5 h-5 ${
                      selectedType === 'investor' ? 'text-blue-600' : 'text-gray-400'
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
    <div className="min-h-screen bg-purple-50 -mt-2">
      <div className="container mx-auto md:px-4 px-2 py-10">
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
        {selectedType === 'investor' && (
          <InvestorForm
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

// Validation and Sanitization Functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
};

const sanitizeInput = (input: string): string => {
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

const validateRequired = (value: any): boolean => {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'string') return sanitizeInput(value).length > 0;
  return !!value;
};

// Freight Forwarder Form Component
function FreightForwarderForm({ currentStep, setCurrentStep, formData, setFormData, selectedType, setSelectedType }: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentSkipped, setPaymentSkipped] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

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

  // Check if form can be submitted
  useEffect(() => {
    if (currentStep === 4) {
      setCanSubmit(paymentCompleted || paymentSkipped);
    } else {
      setCanSubmit(false);
    }
  }, [currentStep, paymentCompleted, paymentSkipped]);

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!validateRequired(formData.companyName)) errors.companyName = 'Company name is required';
      if (!validateRequired(formData.yearsInBusiness)) errors.yearsInBusiness = 'Years in business is required';
      if (!validateRequired(formData.employeeCount)) errors.employeeCount = 'Employee count is required';
      if (!validateRequired(formData.contactName)) errors.contactName = 'Contact name is required';
      if (!validateRequired(formData.email)) {
        errors.email = 'Email is required';
      } else if (!validateEmail(formData.email as string)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!validateRequired(formData.phone)) {
        errors.phone = 'Phone number is required';
      } else if (!validatePhone(formData.phone as string)) {
        errors.phone = 'Please enter a valid phone number';
      }
    }

    if (step === 2) {
      if (!validateRequired(formData.services)) errors.services = 'At least one service is required';
      if (!validateRequired(formData.coverage)) errors.coverage = 'Geographic coverage is required';
    }

    if (step === 3) {
      if (!formData.references || formData.references.length < 2) {
        errors.references = 'At least 2 references are required';
      } else {
        formData.references.forEach((ref, index) => {
          if (!validateRequired(ref.name)) errors[`ref_${index}_name`] = `Reference ${index + 1} name is required`;
          if (!validateRequired(ref.relationship)) errors[`ref_${index}_relationship`] = `Reference ${index + 1} relationship is required`;
          if (!validateRequired(ref.email)) {
            errors[`ref_${index}_email`] = `Reference ${index + 1} email is required`;
          } else if (!validateEmail(ref.email)) {
            errors[`ref_${index}_email`] = `Reference ${index + 1} email is invalid`;
          }
          if (!validateRequired(ref.phone)) {
            errors[`ref_${index}_phone`] = `Reference ${index + 1} phone is required`;
          } else if (!validatePhone(ref.phone)) {
            errors[`ref_${index}_phone`] = `Reference ${index + 1} phone is invalid`;
          }
        });
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleReferenceChange = (index: number, field: string, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    const updatedReferences = [...(formData.references || [])];
    if (!updatedReferences[index]) {
      updatedReferences[index] = { name: '', email: '', phone: '', relationship: '' };
    }
    updatedReferences[index] = { ...updatedReferences[index], [field]: sanitizedValue };
    handleInputChange('references', updatedReferences);

    // Clear reference validation errors
    const errorKey = `ref_${index}_${field}`;
    if (validationErrors[errorKey]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
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
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!canSubmit) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Sanitize all data before submission
      const sanitizedData = {
        companyName: formData.companyName ? sanitizeInput(formData.companyName) : '',
        yearsInBusiness: formData.yearsInBusiness || '',
        employeeCount: formData.employeeCount || '',
        contactName: formData.contactName ? sanitizeInput(formData.contactName) : '',
        email: formData.email ? sanitizeInput(formData.email) : '',
        phone: formData.phone ? sanitizeInput(formData.phone) : '',
        services: formData.services?.map(service => sanitizeInput(service)) || [],
        coverage: formData.coverage ? sanitizeInput(formData.coverage) : '',
        references: formData.references?.map(ref => ({
          name: sanitizeInput(ref.name),
          email: sanitizeInput(ref.email),
          phone: sanitizeInput(ref.phone),
          relationship: sanitizeInput(ref.relationship)
        })) || []
      };

      const submissionData = {
        userType: 'freight_forwarder',
        ...sanitizedData,
        status: 'pending',
        submittedAt: Timestamp.now(),
        paymentStatus: paymentCompleted ? 'paid' : 'pending',
        paymentMethod: paymentCompleted ? 'paystack' : 'pay_later',
        paymentReference: paymentCompleted ? paystackConfig.reference : null,
        ipAddress: await getClientIP(),
        userAgent: navigator.userAgent,
        submissionTimestamp: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'applications'), submissionData);
      
      console.log('Application submitted with ID:', docRef.id);
      setSubmitStatus('success');
      
      setTimeout(() => {
        setFormData({});
        setCurrentStep(0);
        setPaymentCompleted(false);
        setPaymentSkipped(false);
        setCanSubmit(false);
        setValidationErrors({});
      }, 3000);

    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getClientIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'unknown';
    }
  };

  const onPaystackSuccess = (reference: any) => {
    console.log('Payment successful:', reference);
    setPaymentCompleted(true);
  };

  const onPaystackClose = () => {
    console.log('Payment modal closed');
  };

  const handleSkipPayment = () => {
    setPaymentSkipped(true);
  };

  const handleSwitchType = () => {
    if (window.confirm('Are you sure you want to switch? Your current form data will be lost.')) {
      setFormData({});
      setSelectedType('traders');
      setCurrentStep(1);
      setPaymentCompleted(false);
      setPaymentSkipped(false);
      setCanSubmit(false);
      setValidationErrors({});
    }
  };

  // Paystack button component props
  const paystackProps = {
    ...paystackConfig,
    text: paymentCompleted ? "Payment Completed" : "Pay with Paystack",
    onSuccess: onPaystackSuccess,
    onClose: onPaystackClose,
    className: `w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
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
      <div className="bg-white rounded-lg border border-gray-200 md:p-8 p-4">
        {/* Switch Type Button - Above Progress Steps */}
        <div className="flex justify-between mb-6">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Are you sure you want to go back? Your current progress will be saved.')) {
                setCurrentStep(0);
                setSelectedType(null);
              }
            }}
            className="text-purple-900 text-sm font-medium transition-colors hover:text-purple-700 bg-white px-0.5 border-b"
          >
            ← Back to Selection
          </button>
          <button
            type="button"
            onClick={handleSwitchType}
            className="text-purple-900 text-sm font-medium transition-colors hover:text-orange-600 bg-white px-0.5 border-b"
          >
            Switch to Trader
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 relative">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border transition-colors ${
                currentStep >= step.number
                  ? 'bg-purple-900 border-purple-900 text-white'
                  : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </div>
              <span className={`mt-2 text-xs md:text-sm font-medium ${
                currentStep >= step.number ? 'text-purple-900' : 'text-gray-500'
              }`}>
                {step.title}
                {step.optional && <span className="text-xs text-gray-400 ml-1">(Optional)</span>}
              </span>
            </div>
          ))}
          <div className="absolute top-4 md:top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
            <div 
              className="h-full bg-purple-900 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Submission Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <p className="text-green-800 font-medium text-sm md:text-base">Application submitted successfully!</p>
            </div>
            <p className="text-green-700 text-xs md:text-sm mt-1">Redirecting you back to the homepage...</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-5 h-5 text-red-600 mr-2">!</div>
              <p className="text-red-800 font-medium text-sm md:text-base">Error submitting application. Please try again.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Company Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Company Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName || ''}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-purple-900 focus:border-purple-900 text-sm md:text-base ${
                      validationErrors.companyName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter company name"
                  />
                  {validationErrors.companyName && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.companyName}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Years in Business *</label>
                    <select
                      required
                      value={formData.yearsInBusiness || ''}
                      onChange={(e) => handleInputChange('yearsInBusiness', e.target.value)}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-purple-900 focus:border-purple-900 text-sm md:text-base ${
                        validationErrors.yearsInBusiness ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select years</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                    {validationErrors.yearsInBusiness && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.yearsInBusiness}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Employees *</label>
                    <select
                      required
                      value={formData.employeeCount || ''}
                      onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-purple-900 focus:border-purple-900 text-sm md:text-base ${
                        validationErrors.employeeCount ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="200+">200+ employees</option>
                    </select>
                    {validationErrors.employeeCount && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.employeeCount}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Contact Person *</label>
                    <input
                      type="text"
                      required
                      value={formData.contactName || ''}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-purple-900 focus:border-purple-900 text-sm md:text-base ${
                        validationErrors.contactName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Full name"
                    />
                    {validationErrors.contactName && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.contactName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-purple-900 focus:border-purple-900 text-sm md:text-base ${
                        validationErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-purple-900 focus:border-purple-900 text-sm md:text-base ${
                      validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+1234567890"
                  />
                  {validationErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Services */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Services & Coverage</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-4 font-medium text-sm md:text-base">Services Offered *</label>
                  {validationErrors.services && (
                    <p className="text-red-500 text-xs mb-2">{validationErrors.services}</p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Air Freight', 'Sea Freight', 'Road Transport', 'Warehousing', 'Customs Brokerage'].map(service => (
                      <label key={service} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
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
                        <span className="text-gray-700 text-sm md:text-base">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Geographic Coverage *</label>
                  <textarea
                    required
                    value={formData.coverage || ''}
                    onChange={(e) => handleInputChange('coverage', e.target.value)}
                    rows={3}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-purple-900 focus:border-purple-900 text-sm md:text-base ${
                      validationErrors.coverage ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="List countries or regions you serve..."
                  />
                  {validationErrors.coverage && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.coverage}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: References */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Professional References</h3>
              <div className="space-y-6">
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-purple-800 text-xs md:text-sm">
                    Please provide at least 2 professional references from clients or business partners.
                  </p>
                </div>
                
                {validationErrors.references && (
                  <p className="text-red-500 text-xs">{validationErrors.references}</p>
                )}
                
                {(formData.references || []).map((reference, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 md:p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-900 text-sm md:text-base">Reference #{index + 1}</h4>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeReference(index)}
                          className="text-red-600 hover:text-red-800 text-xs md:text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Name *</label>
                        <input
                          type="text"
                          required
                          value={reference.name}
                          onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                          className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-purple-900 focus:border-purple-900 text-sm md:text-base ${
                            validationErrors[`ref_${index}_name`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Full name"
                        />
                        {validationErrors[`ref_${index}_name`] && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors[`ref_${index}_name`]}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Relationship *</label>
                        <input
                          type="text"
                          required
                          value={reference.relationship}
                          onChange={(e) => handleReferenceChange(index, 'relationship', e.target.value)}
                          className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-purple-900 focus:border-purple-900 text-sm md:text-base ${
                            validationErrors[`ref_${index}_relationship`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Client, Partner, etc."
                        />
                        {validationErrors[`ref_${index}_relationship`] && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors[`ref_${index}_relationship`]}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Email *</label>
                        <input
                          type="email"
                          required
                          value={reference.email}
                          onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                          className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-purple-900 focus:border-purple-900 text-sm md:text-base ${
                            validationErrors[`ref_${index}_email`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="email@example.com"
                        />
                        {validationErrors[`ref_${index}_email`] && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors[`ref_${index}_email`]}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Phone *</label>
                        <input
                          type="tel"
                          required
                          value={reference.phone}
                          onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                          className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-purple-900 focus:border-purple-900 text-sm md:text-base ${
                            validationErrors[`ref_${index}_phone`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="+1234567890"
                        />
                        {validationErrors[`ref_${index}_phone`] && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors[`ref_${index}_phone`]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addReference}
                  className="w-full py-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors text-sm md:text-base"
                >
                  + Add Another Reference
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Membership Payment</h3>
              <div className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200">
                <div className="text-center mb-6">
                  <CreditCard className="w-10 h-10 md:w-12 md:h-12 text-purple-900 mx-auto mb-4" />
                  <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Complete Your Registration</h4>
                  <p className="text-gray-600 text-sm md:text-base">Choose your payment option to complete registration</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center mb-6 border border-purple-200">
                  <div className="text-xl md:text-2xl font-bold text-purple-900 mb-1">$299</div>
                  <div className="text-purple-700 text-sm md:text-base">Annual Membership Fee</div>
                </div>
                
                {/* Payment Options */}
                <div className="space-y-4">
                  {/* Paystack Button */}
                  {paymentCompleted ? (
                    <button
                      disabled
                      className="w-full py-3 px-6 rounded-lg font-semibold bg-green-600 text-white cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
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
                      className={`text-xs md:text-sm font-medium transition-colors ${
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
                className={`flex items-center gap-2 px-4 md:px-6 py-0 md:py-0 rounded-full transition-colors text-sm md:text-base ${
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
                  className="flex items-center gap-2 bg-purple-900 hover:bg-purple-800 text-white px-4 md:px-6 py-0 md:py-0 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  Next
                  <MoveRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !canSubmit}
                  className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base ${
                    canSubmit && !isSubmitting
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin"></div>
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

// Trader Form Component
function TraderForm({ currentStep, setCurrentStep, formData, setFormData, selectedType, setSelectedType }: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, title: 'Business', icon: User },
    { number: 2, title: 'Needs', icon: MapPin },
    { number: 3, title: 'References', icon: User }
  ];

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!validateRequired(formData.companyName)) errors.companyName = 'Company name is required';
      if (!validateRequired(formData.businessType)) errors.businessType = 'Business type is required';
      if (!validateRequired(formData.industry)) errors.industry = 'Industry is required';
      if (!validateRequired(formData.contactName)) errors.contactName = 'Contact name is required';
      if (!validateRequired(formData.email)) {
        errors.email = 'Email is required';
      } else if (!validateEmail(formData.email as string)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!validateRequired(formData.phone)) {
        errors.phone = 'Phone number is required';
      } else if (!validatePhone(formData.phone as string)) {
        errors.phone = 'Please enter a valid phone number';
      }
    }

    if (step === 2) {
      if (!validateRequired(formData.shippingNeeds)) errors.shippingNeeds = 'Shipping needs description is required';
      if (!validateRequired(formData.preferredRegions)) errors.preferredRegions = 'At least one preferred region is required';
    }

    if (step === 3) {
      if (!formData.references || formData.references.length < 2) {
        errors.references = 'At least 2 references are required';
      } else {
        formData.references.forEach((ref, index) => {
          if (!validateRequired(ref.name)) errors[`ref_${index}_name`] = `Reference ${index + 1} name is required`;
          if (!validateRequired(ref.relationship)) errors[`ref_${index}_relationship`] = `Reference ${index + 1} relationship is required`;
          if (!validateRequired(ref.email)) {
            errors[`ref_${index}_email`] = `Reference ${index + 1} email is required`;
          } else if (!validateEmail(ref.email)) {
            errors[`ref_${index}_email`] = `Reference ${index + 1} email is invalid`;
          }
          if (!validateRequired(ref.phone)) {
            errors[`ref_${index}_phone`] = `Reference ${index + 1} phone is required`;
          } else if (!validatePhone(ref.phone)) {
            errors[`ref_${index}_phone`] = `Reference ${index + 1} phone is invalid`;
          }
        });
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleReferenceChange = (index: number, field: string, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    const updatedReferences = [...(formData.references || [])];
    if (!updatedReferences[index]) {
      updatedReferences[index] = { name: '', email: '', phone: '', relationship: '' };
    }
    updatedReferences[index] = { ...updatedReferences[index], [field]: sanitizedValue };
    handleInputChange('references', updatedReferences);

    const errorKey = `ref_${index}_${field}`;
    if (validationErrors[errorKey]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
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
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Sanitize all data before submission
      const sanitizedData = {
        companyName: formData.companyName ? sanitizeInput(formData.companyName) : '',
        businessType: formData.businessType || '',
        industry: formData.industry || '',
        contactName: formData.contactName ? sanitizeInput(formData.contactName) : '',
        email: formData.email ? sanitizeInput(formData.email) : '',
        phone: formData.phone ? sanitizeInput(formData.phone) : '',
        shippingNeeds: formData.shippingNeeds ? sanitizeInput(formData.shippingNeeds) : '',
        preferredRegions: formData.preferredRegions?.map(region => sanitizeInput(region)) || [],
        references: formData.references?.map(ref => ({
          name: sanitizeInput(ref.name),
          email: sanitizeInput(ref.email),
          phone: sanitizeInput(ref.phone),
          relationship: sanitizeInput(ref.relationship)
        })) || []
      };

      const submissionData = {
        userType: 'trader_shipper',
        ...sanitizedData,
        status: 'pending',
        submittedAt: Timestamp.now(),
        ipAddress: await getClientIP(),
        userAgent: navigator.userAgent,
        submissionTimestamp: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'applications'), submissionData);
      
      console.log('Trader application submitted with ID:', docRef.id);
      setSubmitStatus('success');
      
      setTimeout(() => {
        setFormData({});
        setCurrentStep(0);
        setValidationErrors({});
      }, 3000);

    } catch (error) {
      console.error('Error submitting trader application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getClientIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'unknown';
    }
  };

  const handleSwitchType = () => {
    if (window.confirm('Are you sure you want to switch? Your current form data will be lost.')) {
      setFormData({});
      setSelectedType('freight');
      setCurrentStep(1);
      setValidationErrors({});
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 md:p-8 p-4">
        {/* Switch Type Button - Above Progress Steps */}
        <div className="flex justify-between mb-6">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Are you sure you want to go back? Your current progress will be saved.')) {
                setCurrentStep(0);
                setSelectedType(null);
              }
            }}
            className="text-orange-600 text-sm font-medium transition-colors hover:text-orange-700 bg-white px-0.5 border-b"
          >
            ← Back to Selection
          </button>
          <button
            type="button"
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
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border transition-colors ${
                currentStep >= step.number
                  ? 'bg-orange-600 border-orange-600 text-white'
                  : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </div>
              <span className={`mt-2 text-xs md:text-sm font-medium ${
                currentStep >= step.number ? 'text-orange-600' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
          <div className="absolute top-4 md:top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
            <div 
              className="h-full bg-orange-600 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Submission Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <p className="text-green-800 font-medium text-sm md:text-base">Application submitted successfully!</p>
            </div>
            <p className="text-green-700 text-xs md:text-sm mt-1">Redirecting you back to the homepage...</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-5 h-5 text-red-600 mr-2">!</div>
              <p className="text-red-800 font-medium text-sm md:text-base">Error submitting application. Please try again.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Business Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Business Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName || ''}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-sm md:text-base ${
                      validationErrors.companyName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter company name"
                  />
                  {validationErrors.companyName && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.companyName}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Business Type *</label>
                    <select
                      required
                      value={formData.businessType || ''}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-sm md:text-base ${
                        validationErrors.businessType ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select type</option>
                      <option value="manufacturer">Manufacturer</option>
                      <option value="retailer">Retailer</option>
                      <option value="wholesaler">Wholesaler</option>
                      <option value="ecommerce">E-commerce</option>
                    </select>
                    {validationErrors.businessType && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.businessType}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Industry *</label>
                    <select
                      required
                      value={formData.industry || ''}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-sm md:text-base ${
                        validationErrors.industry ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select industry</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="food">Food & Beverage</option>
                      <option value="automotive">Automotive</option>
                    </select>
                    {validationErrors.industry && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.industry}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Contact Person *</label>
                    <input
                      type="text"
                      required
                      value={formData.contactName || ''}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-sm md:text-base ${
                        validationErrors.contactName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Full name"
                    />
                    {validationErrors.contactName && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.contactName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-sm md:text-base ${
                        validationErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-sm md:text-base ${
                      validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+1234567890"
                  />
                  {validationErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Shipping Needs */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Shipping Requirements</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Shipping Needs *</label>
                  <textarea
                    required
                    value={formData.shippingNeeds || ''}
                    onChange={(e) => handleInputChange('shippingNeeds', e.target.value)}
                    rows={4}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-sm md:text-base ${
                      validationErrors.shippingNeeds ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe your shipping requirements..."
                  />
                  {validationErrors.shippingNeeds && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.shippingNeeds}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-3 font-medium text-sm md:text-base">Preferred Regions *</label>
                  {validationErrors.preferredRegions && (
                    <p className="text-red-500 text-xs mb-2">{validationErrors.preferredRegions}</p>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['North America', 'Europe', 'Asia', 'Africa', 'South America'].map(region => (
                      <label key={region} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
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
                        <span className="text-gray-700 text-sm md:text-base">{region}</span>
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
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Business References</h3>
              <div className="space-y-6">
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <p className="text-orange-800 text-xs md:text-sm">
                    Please provide at least 2 business references from suppliers or partners.
                  </p>
                </div>
                
                {validationErrors.references && (
                  <p className="text-red-500 text-xs">{validationErrors.references}</p>
                )}
                
                {(formData.references || []).map((reference, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 md:p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-900 text-sm md:text-base">Reference #{index + 1}</h4>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeReference(index)}
                          className="text-red-600 hover:text-red-800 text-xs md:text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Name *</label>
                        <input
                          type="text"
                          required
                          value={reference.name}
                          onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                          className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-sm md:text-base ${
                            validationErrors[`ref_${index}_name`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Full name"
                        />
                        {validationErrors[`ref_${index}_name`] && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors[`ref_${index}_name`]}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Relationship *</label>
                        <input
                          type="text"
                          required
                          value={reference.relationship}
                          onChange={(e) => handleReferenceChange(index, 'relationship', e.target.value)}
                          className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-sm md:text-base ${
                            validationErrors[`ref_${index}_relationship`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Supplier, Partner, etc."
                        />
                        {validationErrors[`ref_${index}_relationship`] && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors[`ref_${index}_relationship`]}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Email *</label>
                        <input
                          type="email"
                          required
                          value={reference.email}
                          onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                          className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-sm md:text-base ${
                            validationErrors[`ref_${index}_email`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="email@example.com"
                        />
                        {validationErrors[`ref_${index}_email`] && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors[`ref_${index}_email`]}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Phone *</label>
                        <input
                          type="tel"
                          required
                          value={reference.phone}
                          onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                          className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-sm md:text-base ${
                            validationErrors[`ref_${index}_phone`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="+1234567890"
                        />
                        {validationErrors[`ref_${index}_phone`] && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors[`ref_${index}_phone`]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addReference}
                  className="w-full py-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors text-sm md:text-base"
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
                className={`flex items-center gap-2 px-4 md:px-6 py-0 md:py-0 rounded-full transition-colors text-sm md:text-base ${
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
                  className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-4 md:px-6 py-0 md:py-0 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  Next
                  <MoveRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin"></div>
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

// Investor Form Component
function InvestorForm({ currentStep, setCurrentStep, formData, setFormData, selectedType, setSelectedType }: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, title: 'Profile', icon: User },
    { number: 2, title: 'Investment', icon: CreditCard },
    { number: 3, title: 'References', icon: User }
  ];

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!validateRequired(formData.companyName)) errors.companyName = 'Company/Individual name is required';
      if (!validateRequired(formData.contactName)) errors.contactName = 'Contact name is required';
      if (!validateRequired(formData.email)) {
        errors.email = 'Email is required';
      } else if (!validateEmail(formData.email as string)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!validateRequired(formData.phone)) {
        errors.phone = 'Phone number is required';
      } else if (!validatePhone(formData.phone as string)) {
        errors.phone = 'Please enter a valid phone number';
      }
    }

    if (step === 2) {
      if (!validateRequired(formData.investmentAmount)) errors.investmentAmount = 'Investment amount range is required';
      if (!validateRequired(formData.investmentType)) errors.investmentType = 'Investment type is required';
      if (!validateRequired(formData.investmentFocus)) errors.investmentFocus = 'At least one investment focus is required';
    }

    if (step === 3) {
      if (!formData.references || formData.references.length < 2) {
        errors.references = 'At least 2 references are required';
      } else {
        formData.references.forEach((ref, index) => {
          if (!validateRequired(ref.name)) errors[`ref_${index}_name`] = `Reference ${index + 1} name is required`;
          if (!validateRequired(ref.relationship)) errors[`ref_${index}_relationship`] = `Reference ${index + 1} relationship is required`;
          if (!validateRequired(ref.email)) {
            errors[`ref_${index}_email`] = `Reference ${index + 1} email is required`;
          } else if (!validateEmail(ref.email)) {
            errors[`ref_${index}_email`] = `Reference ${index + 1} email is invalid`;
          }
          if (!validateRequired(ref.phone)) {
            errors[`ref_${index}_phone`] = `Reference ${index + 1} phone is required`;
          } else if (!validatePhone(ref.phone)) {
            errors[`ref_${index}_phone`] = `Reference ${index + 1} phone is invalid`;
          }
        });
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleReferenceChange = (index: number, field: string, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    const updatedReferences = [...(formData.references || [])];
    if (!updatedReferences[index]) {
      updatedReferences[index] = { name: '', email: '', phone: '', relationship: '' };
    }
    updatedReferences[index] = { ...updatedReferences[index], [field]: sanitizedValue };
    handleInputChange('references', updatedReferences);

    const errorKey = `ref_${index}_${field}`;
    if (validationErrors[errorKey]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
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
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Sanitize all data before submission
      const sanitizedData = {
        companyName: formData.companyName ? sanitizeInput(formData.companyName) : '',
        contactName: formData.contactName ? sanitizeInput(formData.contactName) : '',
        email: formData.email ? sanitizeInput(formData.email) : '',
        phone: formData.phone ? sanitizeInput(formData.phone) : '',
        investmentAmount: formData.investmentAmount || '',
        investmentType: formData.investmentType || '',
        investmentFocus: formData.investmentFocus?.map(focus => sanitizeInput(focus)) || [],
        references: formData.references?.map(ref => ({
          name: sanitizeInput(ref.name),
          email: sanitizeInput(ref.email),
          phone: sanitizeInput(ref.phone),
          relationship: sanitizeInput(ref.relationship)
        })) || []
      };

      const submissionData = {
        userType: 'investor',
        ...sanitizedData,
        status: 'pending',
        submittedAt: Timestamp.now(),
        ipAddress: await getClientIP(),
        userAgent: navigator.userAgent,
        submissionTimestamp: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'applications'), submissionData);
      
      console.log('Investor application submitted with ID:', docRef.id);
      setSubmitStatus('success');
      
      setTimeout(() => {
        setFormData({});
        setCurrentStep(0);
        setValidationErrors({});
      }, 3000);

    } catch (error) {
      console.error('Error submitting investor application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getClientIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'unknown';
    }
  };

  const handleSwitchType = () => {
    if (window.confirm('Are you sure you want to switch? Your current form data will be lost.')) {
      setFormData({});
      setSelectedType('freight');
      setCurrentStep(1);
      setValidationErrors({});
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 md:p-8 p-4">
        {/* Switch Type Button - Above Progress Steps */}
        <div className="flex justify-between mb-6">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Are you sure you want to go back? Your current progress will be saved.')) {
                setCurrentStep(0);
                setSelectedType(null);
              }
            }}
            className="text-blue-600 text-sm font-medium transition-colors hover:text-blue-700 bg-white px-0.5 border-b"
          >
            ← Back to Selection
          </button>
          <button
            type="button"
            onClick={handleSwitchType}
            className="text-blue-600 hover:text-purple-900 text-sm font-medium transition-colors bg-white px-0.5 border-b"
          >
            Switch to Freight Forwarder
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 relative">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border transition-colors ${
                currentStep >= step.number
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </div>
              <span className={`mt-2 text-xs md:text-sm font-medium ${
                currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
          <div className="absolute top-4 md:top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Submission Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <p className="text-green-800 font-medium text-sm md:text-base">Application submitted successfully!</p>
            </div>
            <p className="text-green-700 text-xs md:text-sm mt-1">Redirecting you back to the homepage...</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-5 h-5 text-red-600 mr-2">!</div>
              <p className="text-red-800 font-medium text-sm md:text-base">Error submitting application. Please try again.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Profile Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Investor Profile</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Company/Individual Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName || ''}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm md:text-base ${
                      validationErrors.companyName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter company or individual name"
                  />
                  {validationErrors.companyName && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.companyName}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Contact Person *</label>
                    <input
                      type="text"
                      required
                      value={formData.contactName || ''}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm md:text-base ${
                        validationErrors.contactName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Full name"
                    />
                    {validationErrors.contactName && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.contactName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm md:text-base ${
                        validationErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm md:text-base ${
                      validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+1234567890"
                  />
                  {validationErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Investment Preferences */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Investment Preferences</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Investment Amount Range *</label>
                  <select
                    required
                    value={formData.investmentAmount || ''}
                    onChange={(e) => handleInputChange('investmentAmount', e.target.value)}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm md:text-base ${
                      validationErrors.investmentAmount ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select amount range</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k-500k">$100,000 - $500,000</option>
                    <option value="500k-1m">$500,000 - $1 Million</option>
                    <option value="1m-5m">$1 Million - $5 Million</option>
                    <option value="5m+">$5 Million+</option>
                  </select>
                  {validationErrors.investmentAmount && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.investmentAmount}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Investment Type *</label>
                  <select
                    required
                    value={formData.investmentType || ''}
                    onChange={(e) => handleInputChange('investmentType', e.target.value)}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm md:text-base ${
                      validationErrors.investmentType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select investment type</option>
                    <option value="venture_capital">Venture Capital</option>
                    <option value="private_equity">Private Equity</option>
                    <option value="angel_investing">Angel Investing</option>
                    <option value="debt_financing">Debt Financing</option>
                    <option value="strategic_investment">Strategic Investment</option>
                  </select>
                  {validationErrors.investmentType && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.investmentType}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-3 font-medium text-sm md:text-base">Investment Focus Areas *</label>
                  {validationErrors.investmentFocus && (
                    <p className="text-red-500 text-xs mb-2">{validationErrors.investmentFocus}</p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Logistics Tech', 'Supply Chain', 'E-commerce', 'Maritime', 'Aviation', 'Rail & Road', 'Warehousing', 'Last Mile Delivery'].map(focus => (
                      <label key={focus} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.investmentFocus?.includes(focus) || false}
                          onChange={(e) => {
                            const updated = e.target.checked
                              ? [...(formData.investmentFocus || []), focus]
                              : (formData.investmentFocus || []).filter(f => f !== focus);
                            handleInputChange('investmentFocus', updated);
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                        />
                        <span className="text-gray-700 text-sm md:text-base">{focus}</span>
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
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Professional References</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-blue-800 text-xs md:text-sm">
                    Please provide at least 2 professional references from business partners or financial institutions.
                  </p>
                </div>
                
                {validationErrors.references && (
                  <p className="text-red-500 text-xs">{validationErrors.references}</p>
                )}
                
                {(formData.references || []).map((reference, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 md:p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-900 text-sm md:text-base">Reference #{index + 1}</h4>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeReference(index)}
                          className="text-red-600 hover:text-red-800 text-xs md:text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Name *</label>
                        <input
                          type="text"
                          required
                          value={reference.name}
                          onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                          className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm md:text-base ${
                            validationErrors[`ref_${index}_name`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Full name"
                        />
                        {validationErrors[`ref_${index}_name`] && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors[`ref_${index}_name`]}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Relationship *</label>
                        <input
                          type="text"
                          required
                          value={reference.relationship}
                          onChange={(e) => handleReferenceChange(index, 'relationship', e.target.value)}
                          className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm md:text-base ${
                            validationErrors[`ref_${index}_relationship`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Partner, Banker, etc."
                        />
                        {validationErrors[`ref_${index}_relationship`] && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors[`ref_${index}_relationship`]}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Email *</label>
                        <input
                          type="email"
                          required
                          value={reference.email}
                          onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                          className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm md:text-base ${
                            validationErrors[`ref_${index}_email`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="email@example.com"
                        />
                        {validationErrors[`ref_${index}_email`] && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors[`ref_${index}_email`]}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2 font-medium text-sm md:text-base">Phone *</label>
                        <input
                          type="tel"
                          required
                          value={reference.phone}
                          onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                          className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm md:text-base ${
                            validationErrors[`ref_${index}_phone`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="+1234567890"
                        />
                        {validationErrors[`ref_${index}_phone`] && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors[`ref_${index}_phone`]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addReference}
                  className="w-full py-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors text-sm md:text-base"
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
                className={`flex items-center gap-2 px-4 md:px-6 py-0 md:py-0 rounded-full transition-colors text-sm md:text-base ${
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
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 md:px-6 py-0 md:py-0 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  Next
                  <MoveRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin"></div>
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