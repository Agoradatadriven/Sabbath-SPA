import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';

type BookingFormData = {
  name: string;
  email: string;
  date: string;
  treatment: string;
};

export default function Booking() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<BookingFormData>();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (data: BookingFormData) => {
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-accent text-text relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side - Content */}
        <div className="flex flex-col justify-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif leading-tight mb-8"
          >
            Reserve your <br/>
            <span className="italic font-light text-primary">experience.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg font-light leading-relaxed max-w-md text-text/80 mb-12"
          >
            Select your preferred offering and time. Our team will gladly confirm your reservation shortly via email.
          </motion.p>

          <div className="flex flex-col gap-6 text-sm tracking-widest uppercase font-medium">
            <div className="flex flex-col gap-2">
              <span className="text-primary">Location</span>
              <span className="leading-relaxed">L 3330-B Governor Padilla Road,<br/>Satisima Trinidad, Malolos Bulacan</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary">Contact</span>
              <span className="lowercase normal-case">sabbathwellnesshub@gmail.com</span>
              <span>0917 199 7772</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-[#0a0a0a] p-8 md:p-12 rounded-3xl shadow-2xl border border-white/5"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs uppercase tracking-widest font-medium text-text/70">Full Name</label>
              <input 
                {...register("name", { required: "Name is required" })}
                className="border-b border-white/20 bg-transparent py-3 focus:outline-none focus:border-primary transition-colors text-text"
                placeholder="Jane Doe"
              />
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs uppercase tracking-widest font-medium text-text/70">Email Address</label>
              <input 
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                })}
                className="border-b border-white/20 bg-transparent py-3 focus:outline-none focus:border-primary transition-colors text-text"
                placeholder="jane@example.com"
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="treatment" className="text-xs uppercase tracking-widest font-medium text-text/70">Offering</label>
              <select 
                {...register("treatment", { required: "Please select an offering" })}
                className="border-b border-white/20 bg-transparent py-3 focus:outline-none focus:border-primary transition-colors appearance-none text-text [&>option]:bg-accent"
              >
                <option value="">Select an offering</option>
                <option value="Sabbath Signature Massage">Sabbath Signature Massage</option>
                <option value="Swedish Massage">Swedish Massage</option>
                <option value="Shiatsu Massage">Shiatsu Massage</option>
                <option value="Sabbath Signature Foot Reflexology">Sabbath Signature Foot Reflexology</option>
                <option value="Le Nail Salon">Le Nail Salon</option>
                <option value="Sabasu">Sabasu</option>
              </select>
              {errors.treatment && <span className="text-red-500 text-xs">{errors.treatment.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="date" className="text-xs uppercase tracking-widest font-medium text-text/70">Preferred Date</label>
              <input 
                type="date"
                {...register("date", { required: "Date is required" })}
                className="border-b border-white/20 bg-transparent py-3 focus:outline-none focus:border-primary transition-colors text-text [color-scheme:dark]"
              />
              {errors.date && <span className="text-red-500 text-xs">{errors.date.message}</span>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="mt-8 bg-primary text-text py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-secondary hover:text-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Request Booking'}
            </button>

            {submitStatus === 'success' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-secondary text-sm text-center mt-4 font-medium"
              >
                Thank you! Your booking request has been received. Please check your email for confirmation.
              </motion.p>
            )}
            
            {submitStatus === 'error' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center mt-4 font-medium"
              >
                Something went wrong. Please try again later.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
