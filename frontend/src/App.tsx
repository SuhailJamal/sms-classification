import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  // State for navigation
  const [currentPage, setCurrentPage] = useState<'classifier' | 'about'>('classifier');
  
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // State for form and results
  const [smsInput, setSmsInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{
    isSpam: boolean;
    error?: boolean;
  } | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!smsInput.trim()) {
      alert('Please enter an SMS message');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Replace with your actual backend URL
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      
      // This is a mock response for demonstration
      // In a real application, you would uncomment the fetch code below
      
      
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: smsInput }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setResult(data);
      
setIsLoading(false);
      
    } catch (error) {
      console.error('Error:', error);
      setResult({ isSpam: false, error: true });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-6">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-indigo-600 font-bold text-2xl">SMS Shield</div>
            
            <div className="hidden md:flex space-x-8 justify-center">
              <button
                onClick={() => setCurrentPage('classifier')}
                className={`${
                  currentPage === 'classifier'
                    ? 'text-indigo-600 font-medium'
                    : 'text-gray-500 hover:text-gray-900'
                } text-lg transition-colors duration-200`}
              >
                Spam Classifier
              </button>
              <button
                onClick={() => setCurrentPage('about')}
                className={`${
                  currentPage === 'about'
                    ? 'text-indigo-600 font-medium'
                    : 'text-gray-500 hover:text-gray-900'
                } text-lg transition-colors duration-200`}
              >
                About
              </button>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-500 hover:text-gray-900 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col items-center space-y-4 pb-4">
              <button
                onClick={() => {
                  setCurrentPage('classifier');
                  setMobileMenuOpen(false);
                }}
                className={`${
                  currentPage === 'classifier'
                    ? 'text-indigo-600 font-medium'
                    : 'text-gray-500 hover:text-gray-900'
                } text-lg`}
              >
                Spam Classifier
              </button>
              <button
                onClick={() => {
                  setCurrentPage('about');
                  setMobileMenuOpen(false);
                }}
                className={`${
                  currentPage === 'about'
                    ? 'text-indigo-600 font-medium'
                    : 'text-gray-500 hover:text-gray-900'
                } text-lg`}
              >
                About
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Classifier Section */}
          {currentPage === 'classifier' && (
            <section>
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  <span className="block mb-2">Detect SMS Spam</span>
                  <span className="text-indigo-600">with AI Precision</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Our advanced algorithm helps you identify spam messages instantly.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="sms-input" className="block text-lg font-medium text-gray-700 mb-3">
                      Enter SMS Message
                    </label>
                    <textarea
                      id="sms-input"
                      rows={4}
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Paste your SMS message here..."
                      value={smsInput}
                      onChange={(e) => setSmsInput(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-4 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                      {isLoading ? 'Analyzing...' : 'Check Message'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Results Section */}
              {result && (
                <div className="mt-8">
                  <div
                    className={`rounded-xl p-8 border-2 ${
                      result.error
                        ? 'border-gray-300 bg-gray-50'
                        : result.isSpam
                        ? 'border-red-300 bg-red-50'
                        : 'border-green-300 bg-green-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex-shrink-0 h-14 w-14 rounded-full flex items-center justify-center ${
                          result.error
                            ? 'bg-gray-200'
                            : result.isSpam
                            ? 'bg-red-200'
                            : 'bg-green-200'
                        }`}
                      >
                        {result.error ? (
                          <svg
                            className="h-8 w-8 text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        ) : result.isSpam ? (
                          <svg
                            className="h-8 w-8 text-red-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-8 w-8 text-green-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="ml-6">
                        <h3
                          className={`text-2xl font-medium ${
                            result.error
                              ? 'text-gray-800'
                              : result.isSpam
                              ? 'text-red-800'
                              : 'text-green-800'
                          }`}
                        >
                          {result.error
                            ? 'Error'
                            : result.isSpam
                            ? 'Spam Detected'
                            : 'Legitimate Message'}
                        </h3>
                        <p
                          className={`text-lg mt-1 ${
                            result.error
                              ? 'text-gray-600'
                              : result.isSpam
                              ? 'text-red-600'
                              : 'text-green-600'
                          }`}
                        >
                          {result.error
                            ? 'There was an error processing your request. Please try again.'
                            : `This message appears to be ${
                                result.isSpam ? 'spam' : 'legitimate'
                              }`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* About Section */}
          {currentPage === 'about' && (
            <section>
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  About SMS Shield
                </h2>
                <p className="text-xl text-gray-600">
                  Protecting you from unwanted and potentially harmful messages
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="prose prose-lg max-w-none text-gray-600">
                  <p className="text-lg">
                    SMS Shield is a cutting-edge spam classification service designed to help you identify and filter out unwanted text messages. 
                    Our advanced machine learning algorithms analyze message content to determine whether a message is legitimate or spam.
                  </p>
                  <p className="text-lg">
                    With the increasing prevalence of SMS scams and phishing attempts, it's more important than ever to have reliable tools to protect yourself. 
                    SMS Shield provides an easy-to-use interface that gives you instant results, helping you stay safe from potential threats.
                  </p>
                  <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">How It Works</h3>
                  <p className="text-lg">
                    Our system uses a sophisticated natural language processing model trained on thousands of examples of both legitimate and spam messages. 
                    When you submit a message, our algorithm analyzes various features including:
                  </p>
                  <ul className="text-lg">
                    <li className="mb-2">Text patterns and keywords commonly found in spam</li>
                    <li className="mb-2">Message structure and formatting</li>
                    <li className="mb-2">Presence of suspicious links or requests</li>
                    <li className="mb-2">Urgency indicators and emotional manipulation tactics</li>
                  </ul>
                  <p className="text-lg">
                    The result is a highly accurate classification that helps you make informed decisions about the messages you receive.
                  </p>
                  <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Privacy First</h3>
                  <p className="text-lg">
                    We take your privacy seriously. Messages submitted to our service are processed securely and are not stored permanently. 
                    Your data is never shared with third parties or used for advertising purposes.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="max-w-3xl mx-auto px-4">
        
          <div className="flex justify-center space-x-6 mb-6">
          
            <a href="https://github.com/SuhailJamal/sms-classification" className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">GitHub</span>
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        
        </div>
      </footer>
    </div>
  );
};

export default App;