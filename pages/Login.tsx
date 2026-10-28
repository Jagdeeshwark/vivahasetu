import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';

export function Login() {
  const [value, setValue] = useState('');
  const [sent, setSent] = useState(false);
  const [provider, setProvider] = useState('');
  const [vendorNotice, setVendorNotice] = useState(false);
  const navigate = useNavigate();

  function demoSignIn(method: string) {
    setProvider(method);
    localStorage.setItem('vivahasetu-auth', JSON.stringify({ method, signedIn: true }));
  }
  return (
    <main className="auth-page">
      <section className="auth-panel"><Heart fill="currentColor" /><span className="eyebrow">WELCOME TO VIVAHASETU</span><h1>Sign in or sign up</h1><p>Continue planning your wedding across every device.</p>
        <div className="social-grid"><button onClick={() => demoSignIn('Google')}>Continue with Google</button><button onClick={() => demoSignIn('Facebook')}>Continue with Facebook</button></div>
        <div className="auth-divider"><span>or</span></div>
        <form onSubmit={(event) => { event.preventDefault(); if (value.trim()) { setSent(true); localStorage.setItem('vivahasetu-auth', JSON.stringify({ method: 'email-or-mobile', value, signedIn: true })); } }}><label>Enter email or mobile*</label><input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Email or +91 mobile number" /><button disabled={!value.trim()}>Continue <ArrowRight size={18} /></button></form>
        {sent && <p className="auth-success" role="status">Demo sign-in complete for {value}. <button onClick={() => navigate('/dashboard')}>Open planner</button></p>}
        {provider && <p className="auth-success" role="status">Demo sign-in with {provider} complete. <button onClick={() => navigate('/dashboard')}>Open planner</button></p>}
        <small>Are you a vendor? <button type="button" className="inline-link" onClick={() => setVendorNotice(true)}>Business sign in</button></small>
        {vendorNotice && <p className="auth-success" role="status">Vendor sign-in is ready for backend integration. <button onClick={() => setVendorNotice(false)}>Close</button></p>}
      </section>
    </main>
  );
}
