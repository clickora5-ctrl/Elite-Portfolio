import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
 {
  icon: Mail,
  label: 'Email',
  value: 'clickora5@gmail.com',
  href: 'mailto:clickora5@gmail.com',
},
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/clickora5-ctrl',
    href: 'https://github.com/clickora5-ctrl',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/wajeeh',
    href: 'https://www.linkedin.com/in/wajeeh-hassan-a36a98268/',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Available Worldwide',
    href: '#',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

   const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const phoneNumber = "923718096565";

  const text = `🚀 New Contact Form Message

👤 Name: ${formData.name}
📧 Email: ${formData.email}
💬 Message: ${formData.message}`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

  setTimeout(() => {
    window.open(whatsappURL, "_blank");

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setIsSubmitted(false), 5000);
  }, 500);
};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2467ec]/10 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-[#2467ec] font-medium mb-2 tracking-wide">Get In Touch</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Contact Me</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Send me a message and let's create something amazing together.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2467ec] to-[#4a90e2] mx-auto rounded-full mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-8"
          >
            <h3 className="text-xl font-semibold mb-6">Send a Message</h3>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#10b981]/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-[#10b981]" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                <p className="text-white/60">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Your Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#2467ec] focus:ring-[#2467ec]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Your Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#2467ec] focus:ring-[#2467ec]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Your Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#2467ec] focus:ring-[#2467ec]/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2467ec] hover:bg-[#1a5ad1] text-white gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            )}
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-white/60 mb-8">
                I'm always open to discussing new projects, creative ideas, or 
                opportunities to be part of your vision. Reach out through any 
                of these channels.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a
                    key={index}
                    href={info.href}
                    className="group flex items-center gap-4 glass p-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#2467ec]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-[#2467ec]" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50">{info.label}</p>
                      <p className="text-white group-hover:text-[#2467ec] transition-colors duration-300">
                        {info.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Availability Badge */}
            <div className="glass p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-[#10b981] animate-pulse" />
                <span className="font-semibold">Available for Work</span>
              </div>
              <p className="text-white/60 text-sm">
                I'm currently open to new projects and collaborations. 
                Let's discuss how I can help bring your ideas to life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
