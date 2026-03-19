import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Send,
  X,
  CheckCircle,
  User,
  Mail,
  Phone,
  ChevronRight
} from 'lucide-react';

const Contact = ({ isOpen, setIsOpen }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formComplete, setFormComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [result, setResult] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCurrentStep(0);
        setFormComplete(false);
        setErrors({});
        setTouched({});
        setResult("");
      }, 300);
    }
  }, [isOpen]);

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = 'Invalid email address';
        }
        break;
      case 'message':
        if (!value.trim()) error = 'Message is required';
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateMessage = (message) => {
    const minLength = 20;
    const wordCount = message.trim().split(/\s+/).length;
    const hasLetters = /[a-zA-Z]/.test(message);
    const noSpamChars = !/(.)\1{4,}/.test(message); // avoids "aaaaa" or "!!!!!"

    if (
      message.length < minLength ||
      wordCount < 3 ||
      !hasLetters ||
      !noSpamChars
    ) {
      return "Please enter a more detailed and meaningful message.";
    }

    return "";
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "message") {
      const errorMsg = validateMessage(value);
      setErrors((prev) => ({ ...prev, message: errorMsg }));
      setTouched((prev) => ({ ...prev, message: true }));
    }
  };


  const validateStep = () => {
    let isValid = true;
    let newErrors = {};

    if (currentStep === 0) {
      const nameError = validateField('name', formData.name);
      const emailError = validateField('email', formData.email);

      if (nameError) {
        newErrors.name = nameError;
        isValid = false;
      }

      if (emailError) {
        newErrors.email = emailError;
        isValid = false;
      }
    } else if (currentStep === 1) {
      const messageError = validateField('message', formData.message);

      if (messageError) {
        newErrors.message = messageError;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateStep()) {
      setResult("Sending....");

      const formDataToSend = new FormData();
      formDataToSend.append("access_key", "0a4b5039-f6b1-4f86-b9f9-c856fd060f14");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("message", formData.message);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formDataToSend
        });

        const data = await response.json();

        if (data.success) {
          setResult("Form Submitted Successfully");
          setFormComplete(true);

          setTimeout(() => {
            setIsOpen(false);
          }, 2000);
        } else {
          console.log("Error", data);
          setResult(data.message || "Failed to submit form");
        }
      } catch (error) {
        console.error("Submission error:", error);
        setResult("Failed to submit form. Please try again.");
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.3
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="bg-[linear-gradient(to_bottom,_#0b0434_40%,_#4a4b8a_70%,_white_100%)] fixed top-1/2 left-1/2 z-50 w-[95%] max-w-md transform -translate-x-1/2 -translate-y-1/2 dark:bg-slate-900/95 rounded-2xl shadow-2xl overflow-hidden"
              style={{ maxHeight: '85vh' }}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
            >
              <div className="relative p-5 border-b border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-5 right-5 text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
                <h2 className="text-2xl font-semibold text-white dark:text-white">Let's Connect</h2>
                <p className="text-white dark:text-white mt-1 text-sm">
                  We'd love to hear from you
                </p>
              </div>

              {!formComplete && (
                <div className="px-5 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <motion.div
                        className="h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
                        initial={{ width: '0%' }}
                        animate={{
                          width: currentStep === 0 ? '50%' : '100%',
                          transition: { duration: 0.3 }
                        }}
                      />
                    </div>
                    <span className="ml-3 text-xs text-nowrap font-medium text-white dark:text-white">
                      Step {currentStep + 1} of 2
                    </span>
                  </div>
                </div>
              )}

              <div className="p-5 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 180px)' }}>
                <AnimatePresence mode="wait">
                  {formComplete ? (
                    <motion.div
                      key="success"
                      className="flex flex-col items-center justify-center py-6 text-center"
                      variants={successVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="mb-4 text-indigo-600">
                        <CheckCircle size={64} className="mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold text-white dark:text-white mb-2">Message Sent!</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Thank you for reaching out. We'll get back to you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      {currentStep === 0 && (
                        <motion.div
                          key="step1"
                          className="space-y-4"
                          variants={stepVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <div>
                            <label className="block text-sm font-medium text-white dark:text-gray-300 mb-1">
                              Your Name
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                                <User size={16} />
                              </div>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`block w-full pl-10 pr-4 py-3 border ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-lg bg-white dark:bg-slate-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all`}
                                placeholder="Name..."
                              />
                            </div>
                            {errors.name && touched.name && (
                              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-white dark:text-white mb-1">
                              Your College email ID
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                                <Mail size={16} />
                              </div>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={(e) => {
                                  const email = e.target.value;
                                  handleBlur(e);
                                  if (!email.endsWith("@kiet.edu")) {
                                    setErrors((prev) => ({ ...prev, email: "Email must end with @kiet.edu" }));
                                    setDisabled(true);
                                  } else {
                                    setErrors((prev) => ({ ...prev, email: "" }));
                                    setDisabled(false);
                                  }
                                }}
                                pattern="^[a-zA-Z0-9._%+-]+@kiet\.edu$"
                                className={`block w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-lg bg-white dark:bg-slate-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all`}
                                placeholder="yourCollegeEmailId@kiet.edu"
                              />
                            </div>
                            {errors.email && touched.email && (
                              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-white dark:text-white mb-1">
                              Phone Number <span className="text-xs text-gray-600">(Optional)</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                                <Phone size={16} />
                              </div>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => {
                                  const onlyDigits = e.target.value.replace(/\D/g, ""); // remove non-digits
                                  if (onlyDigits.length <= 10) {
                                    setFormData({ ...formData, phone: onlyDigits });
                                  }
                                }}
                                inputMode="numeric"
                                maxLength={10}
                                pattern="\d{10}"
                                className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all"
                                placeholder="1234567890"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 1 && (
                        <motion.div
                          key="step2"
                          className="space-y-4"
                          variants={stepVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <div>
                            <label className="block text-sm font-medium text-white dark:text-white mb-1">
                              Subject
                            </label>
                            <select
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all"
                            >
                              <option value="" disabled>Select a subject</option>
                              <option value="general">General Inquiry</option>
                              {/* <option value="support">Technical Support</option> */}
                              {/* <option value="billing">Billing Question</option> */}
                              <option value="feedback">Feedback</option>
                              <option value="other">Other</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-white dark:text-white mb-1">
                              Your Message
                            </label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              rows="4"
                              className={`block w-full px-4 py-3 border ${errors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-lg bg-white dark:bg-slate-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all`}
                              placeholder="Please provide details about your inquiry..."
                            />
                            {errors.message && touched.message && (
                              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                            )}
                          </div>
                        </motion.div>
                      )}

                      <div className="mt-6 flex justify-between items-center">
                        {currentStep > 0 ? (
                          <button
                            type="button"
                            onClick={() => setCurrentStep(prev => prev - 1)}
                            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                          >
                            <span className="mr-1">←</span> Previous
                          </button>
                        ) : (
                          <div />
                        )}

                        {currentStep < 1 ? (
                          <motion.button
                            type="button"
                            onClick={handleNext}
                            whileTap={{ scale: 0.95 }}
                            disabled={disabled}
                            className={`inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg shadow-md transition-all duration-300
    ${disabled ? 'bg-gradient-to-r from-indigo-300 to-purple-300 cursor-not-allowed opacity-70' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg text-white'}`}>
                            Next <ChevronRight size={16} className="ml-2" />
                          </motion.button>
                        ) : (
                          <motion.button
                            type="submit"
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            <span className="mr-1">Send Message</span> <Send size={16} />
                          </motion.button>
                        )}
                      </div>

                      {result && !formComplete && (
                        <div className="mt-4 text-center text-sm">
                          <p className={result.includes("Successfully") ? "text-green-600" : "text-red-600"}>
                            {result}
                          </p>
                        </div>
                      )}
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Contact;