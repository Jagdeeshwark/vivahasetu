import { useEffect, useState, type FormEvent } from 'react';
import { ChevronDown, Heart, Menu, Search, UserRound, X } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const categories = ['Venues', 'Vendors', 'Photos', 'Real Weddings', 'Blog', 'E-Invites'];

export function Header() {
  const [open, setOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [city, setCity] = useState('Hyderabad');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notice, setNotice] = useState<'review' | 'app' | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setCityOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  function selectCity(nextCity: string) {
    setCity(nextCity);
    setCityOpen(false);
    navigate(`/vendors/${nextCity.toLowerCase()}`);
  }

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    navigate(`/vendors/${city.toLowerCase()}?q=${encodeURIComponent(query)}`);
  }

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="utility-bar">
        <div className="header-inner utility-inner">
          <div className="utility-links"><button onClick={() => setNotice('review')}>Write a Review</button><button onClick={() => setNotice('app')}>Download App</button></div>
          <strong>India's Favourite Wedding Planning Platform</strong>
          <button className="city-button" onClick={() => setCityOpen((value) => !value)} aria-expanded={cityOpen}>
            {city} <ChevronDown size={14} />
          </button>
          {cityOpen && (
            <div className="city-menu">
              {['Hyderabad', 'Mumbai', 'Bangalore', 'Goa', 'Jaipur'].map((option) => <button key={option} onClick={() => selectCity(option)}>{option}</button>)}
            </div>
          )}
        </div>
      </div>
      <div className="main-nav">
        <div className="header-inner nav-inner">
          <NavLink className="brand" to="/" aria-label="VivahaSetu home"><span>Vivaha</span><Heart fill="currentColor" size={20} /><span>Setu</span></NavLink>
          <nav className={open ? 'desktop-nav desktop-nav--open' : 'desktop-nav'} aria-label="Primary navigation">
            {categories.map((item) => (
              <NavLink
                key={item}
                to={item === 'Vendors' ? `/vendors/${city.toLowerCase()}` : `/discover/${item.toLowerCase().replaceAll(' ', '-')}`}
                className={({ isActive }) => isActive ? 'nav-active' : undefined}
              >
                {item}
              </NavLink>
            ))}
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-active' : undefined}>Planning</NavLink>
          </nav>
          <div className="nav-actions">
            <button aria-label="Search" onClick={() => setSearchOpen((value) => !value)} aria-expanded={searchOpen}><Search size={19} /></button>
            <NavLink className="login-link" to="/login"><UserRound size={17} /> Log In</NavLink>
            <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {searchOpen && (
        <div className="header-search" role="search">
          <form onSubmit={submitSearch}>
            <Search size={20} />
            <input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder={`Search wedding vendors in ${city}`} />
            <button type="submit">Search</button>
          </form>
        </div>
      )}
      {notice && (
        <div className="header-modal-backdrop" role="presentation" onMouseDown={() => setNotice(null)}>
          <section className="header-modal" role="dialog" aria-modal="true" aria-label={notice === 'review' ? 'Write a review' : 'Download the app'} onMouseDown={(event) => event.stopPropagation()}>
            <button className="header-modal-close" onClick={() => setNotice(null)} aria-label="Close"><X /></button>
            {notice === 'review' ? <><h2>Share your experience</h2><p>Choose a vendor you booked, then add its details to submit a review.</p><button className="button button--primary" onClick={() => navigate(`/vendors/${city.toLowerCase()}`)}>Find a vendor</button></> : <><h2>Take your wedding plan with you</h2><p>VivahaSetu planning works on every modern phone and desktop browser.</p><button className="button button--primary" onClick={() => navigate('/dashboard')}>Open planner</button></>}
          </section>
        </div>
      )}
    </header>
  );
}
