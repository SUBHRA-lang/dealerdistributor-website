import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Mail, Phone, Package, FileText, Loader2 } from 'lucide-react';
import { popupAPI } from '../services/api';

const PopupModal = ({ onClose }) => {
  const [activeType, setActiveType] = useState('distributor');
  const [role, setRole] = useState('looking');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', mobile: '', product: '', requirement: '' });
  const [errors, setErrors] = useState({});
  const autoCloseTimer = useRef(null);

  // Auto-close after 4s IF the user hasn't interacted yet
  useEffect(() => {
    autoCloseTimer.current = setTimeout(() => onClose(), 4000);
    return () => clearTimeout(autoCloseTimer.current);
  }, [onClose]);

  // Cancel the timer the moment user touches anything
  const cancelAutoClose = () => clearTimeout(autoCloseTimer.current);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.mobile.trim()) e.mobile = 'Mobile number is required';
    if (!form.product.trim()) e.product = 'Product name is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) { setErrors(fieldErrors); return; }
    setLoading(true);
    try {
      const res = await popupAPI.submitInquiry({ type: activeType, role, ...form });
      const data = res.data;
      if (data.errors) { setErrors(data.errors); }
      else { setSubmitted(true); setTimeout(() => onClose(), 3000); }
    } catch {
      setSubmitted(true);
      setTimeout(() => onClose(), 3000);
    } finally {
      setLoading(false);
    }
  };

  const setField = (key, val) => {
    cancelAutoClose();                                   // stop timer on any input
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(er => ({ ...er, [key]: '' }));
  };

  /* ── Labelled input row ── */
  const InputRow = ({ icon: Icon, label, id, ...props }) => (
    <div className="space-y-1">
      <label htmlFor={id} className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border bg-gray-50 transition
        ${errors[id] ? 'border-red-400' : 'border-gray-200 focus-within:border-[#2C3E95] focus-within:bg-white'}`}>
        <Icon size={16} className={errors[id] ? 'text-red-400' : 'text-gray-400'} />
        <input
          id={id}
          {...props}
          value={form[id]}
          onChange={ev => setField(id, ev.target.value)}   // cancelAutoClose called inside setField
          className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
        />
      </div>
      {errors[id] && <p className="text-xs text-red-500 flex items-center gap-1">⚠ {errors[id]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-[450px] h-[630px] overflow-auto bg-white rounded-3xl shadow-2xl z-10">

        {/* ── Header ── */}
        <div className="relative bg-gradient-to-br from-[#1e2d8a] via-[#2C3E95] to-[#4C3F91] px-6 pt-6 pb-5 overflow-hidden">
          {/* decorative circles */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5" />
          <div className="relative">
            <span className="inline-block text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full mb-2">
              Fast Track Your Business
            </span>
            <h2 className="text-2xl font-extrabold text-white leading-tight">
              What are you<br />looking for?
            </h2>
          </div>
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
            aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {submitted ? (
          /* ── Success ── */
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-green-50 border-4 border-green-200 flex items-center justify-center mb-5">
              <Check size={36} className="text-green-500" strokeWidth={3} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Inquiry Submitted!</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Thank you! Your requirement has been sent to our team.<br />
              We'll get back to you within 24 hours.
            </p>
            <div className="mt-6 w-full bg-gray-100 rounded-full h-1 overflow-hidden">
              <div className="h-full bg-green-500 rounded-full animate-[progress_3s_linear_forwards]" style={{ width: '100%', animation: 'progress 3s linear forwards' }} />
            </div>
            <p className="text-xs text-gray-400 mt-2">Closing automatically…</p>
          </div>
        ) : (
          <div className="px-6 py-5 space-y-5">
            {/* ── Type toggle ── */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">I am interested in</p>
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-2xl">
                {['distributor', 'franchise'].map(type => (
                  <button key={type} onClick={() => { cancelAutoClose(); setActiveType(type); }}
                    className={`py-2.5 rounded-xl text-sm font-semibold transition
                      ${activeType === type
                        ? 'bg-[#2C3E95] text-white shadow-md'
                        : 'text-gray-500 hover:text-gray-700'}`}>
                    {type === 'distributor' ? 'Distributor' : 'Franchise'}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Role ── */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">My goal</p>
              <div className="space-y-2">
                {[
                  ['looking', `Looking for a ${activeType}`, '🔍'],
                  ['become', `Want to become a ${activeType}`, '✋'],
                ].map(([val, label, icon]) => (
                  <label key={val}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition
                      ${role === val ? 'border-[#2C3E95] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="role" value={val} checked={role === val}
                      onChange={() => { cancelAutoClose(); setRole(val); }} className="hidden" />
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition
                      ${role === val ? 'border-[#2C3E95] bg-[#2C3E95]' : 'border-gray-300'}`}>
                      {role === val && <Check size={12} className="text-white" strokeWidth={3} />}
                    </span>
                    <span className="text-sm font-medium text-gray-700">{icon} {label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* ── Fields ── */}
            <div className="space-y-3">
              <InputRow icon={Mail} id="email" type="email" label="Email Address *" placeholder="you@example.com" />

              {/* Mobile with country code */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Mobile Number *</label>
                <div className={`flex items-center gap-2 rounded-xl border bg-gray-50 overflow-hidden transition
                  ${errors.mobile ? 'border-red-400' : 'border-gray-200 focus-within:border-[#2C3E95] focus-within:bg-white'}`}>
                  <div className="flex items-center gap-1 px-3 py-2.5 border-r border-gray-200 bg-gray-100 text-sm font-medium text-gray-600 shrink-0">
                    🇮🇳 +91
                  </div>
                  <Phone size={15} className="text-gray-400 shrink-0" />
                  <input type="tel" placeholder="Enter mobile number" value={form.mobile}
                    onChange={ev => setField('mobile', ev.target.value)}
                    className="flex-1 py-2.5 pr-3 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none" />
                </div>
                {errors.mobile && <p className="text-xs text-red-500">⚠ {errors.mobile}</p>}
              </div>

              <InputRow icon={Package} id="product" type="text" label="Product / Industry *" placeholder="e.g. FMCG, Electronics…" />

              {/* Requirement textarea */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Requirement</label>
                <div className="flex gap-2 px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus-within:border-[#2C3E95] focus-within:bg-white transition">
                  <FileText size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  <textarea placeholder="Describe your requirement…" rows={2} value={form.requirement}
                    onChange={ev => setField('requirement', ev.target.value)}
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none resize-none" />
                </div>
              </div>
            </div>

            {/* ── Submit ── */}
            <button onClick={handleSubmit} disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B2C] to-[#f05a1a] hover:from-[#e55a1f] hover:to-[#d44e15] disabled:opacity-60 text-white font-bold text-sm shadow-lg transition flex items-center justify-center gap-2">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : 'Submit Inquiry →'}
            </button>

            <p className="text-center text-xs text-gray-400">
              🔒 Your information is 100% secure and confidential
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupModal;
