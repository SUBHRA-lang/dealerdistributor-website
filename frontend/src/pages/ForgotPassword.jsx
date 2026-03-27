import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8001/forgot_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        toast({
          title: 'Error',
          description: data.detail || 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      // Even if the backend is down, show success to avoid user enumeration
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16 flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2C3E95]/10 mb-4">
              <Mail className="w-8 h-8 text-[#2C3E95]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
            <p className="text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              {submitted ? (
                /* Success State */
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Check Your Email</h2>
                  <p className="text-gray-600 text-sm mb-6">
                    If an account with <strong>{email}</strong> exists, you'll receive a password reset link shortly.
                  </p>
                  <p className="text-xs text-gray-500 mb-6">
                    Didn't receive an email? Check your spam folder or try again.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full px-8"
                    onClick={() => { setSubmitted(false); setEmail(''); }}
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                /* Form State */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="mt-2"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#2C3E95] hover:bg-[#1f2d6b] rounded-full"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </form>
              )}

              {/* Back to Sign In */}
              <div className="mt-6 text-center">
                <Link
                  to="/signin"
                  className="inline-flex items-center gap-2 text-sm text-[#2C3E95] hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </Link>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
