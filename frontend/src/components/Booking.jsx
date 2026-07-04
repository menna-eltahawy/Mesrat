import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function Booking() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    type: 'Individual',
    name: '',
    email: '',
    visitors: 1,
    date: ''
  });
  const [ticketGenerated, setTicketGenerated] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const ticketTypes = [
    { id: 'Individual', price: 'EGP 250' },
    { id: 'Group (5+)', price: 'EGP 180/person' },
    { id: 'VIP Experience', price: 'EGP 650' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm(
      'service_h7dtcbe',
      'template_djwwj0p',
      formRef.current,
      '_Ofa55HybiX6ivRyP'
    )
    .then(() => {
      setTicketGenerated(true);
      setIsSending(false);
    })
    .catch(() => {
      setIsSending(false);
    });
  };

  return (
    <section id="booking" className="py-24 bg-[#050508] text-white">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <div className="text-center lg:text-left mb-12">
            <h3 className="text-primary tracking-[0.2em] uppercase text-xs mb-4">Reserve Your Journey</h3>
            <h2 className="text-5xl font-serif text-white mb-4">Book Your <span className="italic text-primary">Visit</span></h2>
            <p className="text-white/50 text-sm">Secure your place in Egypt's most immersive cultural experience</p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            <input type="hidden" name="ticket_type" value={formData.type} />
            <div>
              <label className="block text-xs tracking-widest text-white/50 uppercase mb-4">Ticket Type</label>
              <div className="grid grid-cols-3 gap-4">
                {ticketTypes.map(t => (
                  <button 
                    key={t.id} 
                    type="button" 
                    onClick={() => setFormData({...formData, type: t.id})} 
                    className={`p-4 flex flex-col items-center justify-center border transition-all ${
                      formData.type === t.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-white/10 hover:border-white/30 bg-[#0a0a0f]'
                    }`}
                  >
                    <span className={formData.type === t.id ? 'text-primary' : 'text-white'}>{t.id}</span>
                    <span className="text-white/40 text-xs mt-1">{t.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest text-white/50 uppercase mb-2">Full Name</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </span>
                <input type="text" name="user_name" placeholder="Your full name" required
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-sm py-3 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-colors"
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest text-white/50 uppercase mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </span>
                <input type="email" name="user_email" placeholder="your@email.com" required
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-sm py-3 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-colors"
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-widest text-white/50 uppercase mb-2">Visitors</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  </span>
                  <input type="number" name="visitors" min="1" placeholder="1" required
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-sm py-3 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-colors"
                    onChange={(e) => setFormData({...formData, visitors: e.target.value})} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-widest text-white/50 uppercase mb-2">Visit Date</label>
                <input type="date" name="visit_date" required
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-sm py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-primary transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                  onChange={(e) => setFormData({...formData, date: e.target.value})} 
                />
              </div>
            </div>

            <button type="submit" disabled={isSending} className="w-full py-4 bg-primary text-[#050508] font-bold tracking-widest hover:bg-white transition-colors disabled:opacity-50">
              {isSending ? 'SENDING...' : 'GENERATE MY TICKET'}
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center justify-center">
          {ticketGenerated ? (
            <div className="w-full animate-in fade-in zoom-in duration-500">
              <div className="flex flex-col items-center mb-6">
                <svg className="w-12 h-12 text-primary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p className="text-white/70 text-sm">Your ticket has been generated successfully and sent to your email.</p>
              </div>
              <div className="w-full max-w-[600px] mx-auto drop-shadow-2xl">
                <img src="/Tickit.png" alt="Masarat Ticket" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          ) : (
            <div className="w-full h-[400px] border border-dashed border-white/10 bg-white/[0.02] flex items-center justify-center text-white/30">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
                <p>Your ticket will appear here after booking</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}