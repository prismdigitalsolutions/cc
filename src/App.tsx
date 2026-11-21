import { useEffect, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CalendarDays, Check, ChevronDown, Clock3, HeartPulse,
  Menu, Phone, Mail, MapPin, MessageCircle, ShieldCheck, Stethoscope,
  Activity, Droplets, Users, ArrowUp, X,
  BadgeCheck, ClipboardCheck, UserRoundCheck, Globe, Share2,
} from 'lucide-react'
import { siteConfig } from './data/siteConfig'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65 },
}

const navItems = [
  ['Home', 'home'], ['About', 'about'], ['Specialities', 'services'],
  ['Why Us', 'why-us'], ['Patient Journey', 'journey'], ['Contact', 'contact'],
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      setShowTop(window.scrollY > 700)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submitAppointment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    'Hello Meridian Care, I would like to enquire about an appointment.',
  )}`

  const icons = [Stethoscope, ShieldCheck, Activity, Droplets, HeartPulse, Users]

  return (
    <div className="site-shell">
      <div className="announcement">
        <div className="container announcement-inner">
          <span><Clock3 size={14} /> {siteConfig.workingHours}</span>
          <div>
            <a href={`tel:${siteConfig.phone}`}><Phone size={14} /> {siteConfig.phone}</a>
            <span className="demo-label">Fictional demo clinic</span>
          </div>
        </div>
      </div>

      <header className={`navbar ${scrolled ? 'navbar-solid' : ''}`}>
        <div className="container nav-inner">
          <button className="brand" onClick={() => scrollTo('home')} aria-label="Go to home">
            <span className="brand-mark"><HeartPulse size={21} /></span>
            <span>{siteConfig.clinicName}<small>HEALTHCARE</small></span>
          </button>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}>{label}</button>
            ))}
          </nav>
          <button className="nav-cta" onClick={() => scrollTo('contact')}>
            Book Appointment <ArrowRight size={16} />
          </button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navItems.map(([label, id]) => (
                <button key={id} onClick={() => { scrollTo(id); setMenuOpen(false) }}>{label}</button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="container hero-grid">
            <motion.div className="hero-copy" initial="initial" animate={{ opacity: 1, y: 0 }} transition={{ staggerChildren: 0.12 }}>
              <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>Professional Healthcare</motion.div>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                Your health deserves <span>expert care.</span>
              </motion.h1>
              <motion.p className="hero-description" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
                {siteConfig.tagline}. Experience clear guidance, personal attention, and modern healthcare support.
              </motion.p>
              <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}>
                <button className="button button-primary" onClick={() => scrollTo('contact')}>Book an appointment <ArrowRight size={18} /></button>
                <button className="button button-secondary" onClick={() => scrollTo('services')}>Explore services</button>
              </motion.div>
              <motion.div className="hero-trust" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
                <span><BadgeCheck size={18} /> Patient-focused care</span>
                <span><ShieldCheck size={18} /> Professional approach</span>
              </motion.div>
            </motion.div>

            <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <div className="hero-image-wrap">
                <img
                  src="https://images.unsplash.com/photo-1659353888906-adb3e0041693?auto=format&fit=crop&w=900&q=85"
                  alt="Healthcare professional in a modern consultation setting"
                />
              </div>
              <motion.div className="floating-card availability" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <span className="status-dot" />
                <div><small>Appointments</small><strong>Request a visit</strong></div>
              </motion.div>
              <motion.div className="floating-card care-card" animate={{ y: [0, 7, 0] }} transition={{ duration: 4.5, repeat: Infinity }}>
                <div className="care-icon"><HeartPulse size={20} /></div>
                <div><strong>Care that listens</strong><small>Personal attention</small></div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Clinic values">
          <div className="container trust-grid">
            {[
              ['Professional approach', 'Clear, considered care'],
              ['Patient-first', 'Your concerns matter'],
              ['Modern healthcare', 'Contemporary guidance'],
              ['Connected care', 'Support beyond the visit'],
            ].map(([title, text]) => (
              <div key={title}><span><Check size={17} /></span><div><strong>{title}</strong><small>{text}</small></div></div>
            ))}
          </div>
        </section>

        <section className="section about" id="about">
          <div className="container about-grid">
            <motion.div className="about-image" {...reveal}>
              <div className="image-frame">
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=85" alt="Fictional medical professional for demonstration" loading="lazy" />
              </div>
              <div className="profile-badge"><span>Demo</span><strong>Profile</strong></div>
            </motion.div>
            <motion.div className="about-copy" {...reveal}>
              <div className="section-label">About the doctor</div>
              <h2>Care built on clarity, compassion, and trust.</h2>
              <p className="lead">{siteConfig.doctor.name} is a <strong>{siteConfig.doctor.role}</strong>.</p>
              <p>{siteConfig.doctor.biography}</p>
              <div className="doctor-details">
                <div><small>Qualifications</small><strong>{siteConfig.doctor.qualifications}</strong></div>
                <div><small>Experience profile</small><strong>{siteConfig.doctor.experience}</strong></div>
              </div>
              <button className="button button-primary" onClick={() => scrollTo('contact')}>Book an appointment <ArrowRight size={18} /></button>
            </motion.div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <motion.div className="section-heading" {...reveal}>
              <div><div className="section-label">Our specialities</div><h2>Comprehensive care for your health</h2></div>
              <p>Accessible, coordinated healthcare services tailored to individual needs.</p>
            </motion.div>
            <div className="services-grid">
              {siteConfig.services.map((service, index) => {
                const Icon = icons[index % icons.length]
                return (
                  <motion.article className="service-card" key={service.title} {...reveal} transition={{ duration: 0.55, delay: index * 0.07 }}>
                    <div className="service-icon"><Icon size={24} /></div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <button onClick={() => scrollTo('contact')}>Learn more <ArrowRight size={16} /></button>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section why-section" id="why-us">
          <div className="container why-grid">
            <motion.div className="why-content" {...reveal}>
              <div className="section-label">Why choose us</div>
              <h2>A calmer, more connected healthcare experience.</h2>
              <p className="why-lead">From the first conversation to continued care, we keep the process clear and reassuring.</p>
              <div className="feature-list">
                {[
                  [UserRoundCheck, 'Patient-centred approach', 'Thoughtful visits with space for your questions.'],
                  [ClipboardCheck, 'Clear medical guidance', 'Understand the next step before you leave.'],
                  [CalendarDays, 'Convenient appointment requests', 'Simple options to plan your visit.'],
                ].map(([Icon, title, text]) => {
                  const FeatureIcon = Icon as typeof UserRoundCheck
                  return <div className="feature" key={title as string}><span><FeatureIcon size={21} /></span><div><strong>{title as string}</strong><p>{text as string}</p></div></div>
                })}
              </div>
            </motion.div>
            <motion.div className="why-image" {...reveal}>
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85" alt="Modern healthcare consultation environment" loading="lazy" />
              <div className="why-overlay"><HeartPulse size={24} /><div><strong>Human care</strong><small>Every step of the way</small></div></div>
            </motion.div>
          </div>
        </section>

        <section className="section journey" id="journey">
          <div className="container">
            <motion.div className="section-heading centered" {...reveal}>
              <div className="section-label">Your care journey</div>
              <h2>Simple steps, thoughtful care</h2>
            </motion.div>
            <div className="timeline">
              {[
                ['01', 'Book an appointment', 'Choose a preferred time and share basic details.'],
                ['02', 'Visit the clinic', 'Receive a warm welcome and clear directions.'],
                ['03', 'Consultation', 'Discuss concerns and plan the appropriate next step.'],
                ['04', 'Continued care', 'Follow agreed guidance and plan future support.'],
              ].map(([number, title, text], index) => (
                <motion.div className="timeline-step" key={number} {...reveal} transition={{ duration: 0.55, delay: index * 0.1 }}>
                  <div className="timeline-number">{number}</div>
                  <h3>{title}</h3><p>{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section credentials">
          <div className="container credentials-grid">
            <motion.div {...reveal}>
              <div className="section-label">Professional credentials</div>
              <h2>Clarity about qualifications matters.</h2>
              <p>This demo uses clearly identified placeholder information. Replace it only with documents and details supplied by the real clinic.</p>
            </motion.div>
            <motion.div className="credential-card" {...reveal}>
              <div className="certificate-placeholder"><BadgeCheck size={38} /></div>
              <div><strong>Qualifications</strong><span>Placeholder document area</span></div>
            </motion.div>
            <motion.div className="credential-card" {...reveal}>
              <div className="certificate-placeholder"><ShieldCheck size={38} /></div>
              <div><strong>Professional memberships</strong><span>Supplied by clinic owner</span></div>
            </motion.div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-grid">
            <motion.div {...reveal}>
              <div className="section-label">Common questions</div>
              <h2>Answers before your visit.</h2>
              <p>Need something else? Our demo contact team is available during working hours.</p>
            </motion.div>
            <motion.div className="faq-list" {...reveal}>
              {siteConfig.faqs.map(([question, answer], index) => (
                <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={question}>
                  <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                    <span>{question}</span><ChevronDown size={20} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === index && (
                      <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                        <p>{answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-grid">
            <motion.div className="contact-info" {...reveal}>
              <div className="section-label">Contact the clinic</div>
              <h2>Let’s plan your next step.</h2>
              <p>Send an appointment enquiry. A real clinic would confirm availability before booking.</p>
              <div className="contact-details">
                <a href={`tel:${siteConfig.phone}`}><span><Phone size={20} /></span><div><small>Call</small><strong>{siteConfig.phone}</strong></div></a>
                <a href={`mailto:${siteConfig.email}`}><span><Mail size={20} /></span><div><small>Email</small><strong>{siteConfig.email}</strong></div></a>
                <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer"><span><MapPin size={20} /></span><div><small>Location</small><strong>{siteConfig.address}</strong></div></a>
                <div><span><Clock3 size={20} /></span><div><small>Working hours</small><strong>{siteConfig.workingHours}</strong></div></div>
              </div>
              <a className="whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={19} /> Contact via WhatsApp</a>
            </motion.div>

            <motion.form className="appointment-form" onSubmit={submitAppointment} {...reveal}>
              <h3>Appointment enquiry</h3>
              {submitted ? (
                <div className="success-message" role="status">
                  <span><Check size={22} /></span>
                  <div><strong>Enquiry ready</strong><p>This demo does not send data or confirm appointments. Connect a real booking service before launch.</p></div>
                </div>
              ) : (
                <>
                  <div className="form-grid">
                    <label>Patient name<input name="name" required placeholder="Full name" /></label>
                    <label>Phone number<input name="phone" type="tel" required placeholder="+1 555..." /></label>
                    <label>Preferred date<input name="date" type="date" required /></label>
                    <label>Preferred time<input name="time" type="time" required /></label>
                  </div>
                  <label>Appointment enquiry<textarea name="message" rows={4} placeholder="Briefly describe how we can help" /></label>
                  <label className="consent"><input type="checkbox" required /><span>I consent to this clinic using these details to respond to my enquiry.</span></label>
                  <button className="button button-primary form-button" type="submit">Send appointment request <ArrowRight size={18} /></button>
                  <small className="form-note">No sensitive medical information. Your request requires confirmation.</small>
                </>
              )}
            </motion.form>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="brand footer-logo"><span className="brand-mark"><HeartPulse size={21} /></span><span>{siteConfig.clinicName}<small>HEALTHCARE</small></span></div>
            <p>A fictional healthcare demo designed to show a premium, configurable clinic website.</p>
            <div className="socials"><a href="#" aria-label="Website"><Globe size={18} /></a><a href="#" aria-label="Share"><Share2 size={18} /></a><a href="#" aria-label="Healthcare community"><HeartPulse size={18} /></a></div>
          </div>
          <div><h4>Quick links</h4>{navItems.slice(0, 5).map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}</div>
          <div><h4>Services</h4>{siteConfig.services.slice(0, 5).map(service => <button key={service.title} onClick={() => scrollTo('services')}>{service.title}</button>)}</div>
          <div><h4>Contact</h4><p>{siteConfig.address}</p><a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><p>{siteConfig.workingHours}</p></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.clinicName}. Demo template.</span><div><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a></div></div>
      </footer>

      <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contact via WhatsApp"><MessageCircle size={23} /></a>
      <AnimatePresence>{showTop && <motion.button className="back-top" onClick={() => scrollTo('home')} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} aria-label="Back to top"><ArrowUp size={20} /></motion.button>}</AnimatePresence>
    </div>
  )
}

export default App
