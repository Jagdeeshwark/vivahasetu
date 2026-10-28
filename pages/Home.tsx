import { ArrowRight, CalendarHeart, Gem, HeartHandshake, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="home-hero-copy"><span className="eyebrow">YOUR WEDDING, BEAUTIFULLY PLANNED</span><h1>Everything for the celebration of a lifetime.</h1><p>Discover inspiring ideas, trusted professionals and a planning workspace that keeps every detail together.</p><div><Link className="button button--primary" to="/vendors/hyderabad">Explore vendors <ArrowRight size={18} /></Link><Link className="button button--light" to="/dashboard">Start planning</Link></div></div>
        <div className="hero-collage"><div><img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=90" alt="Wedding celebration" /></div><div><img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=90" alt="Wedding table" /></div></div>
      </section>
      <section className="feature-row page-shell">{[
        [CalendarHeart, 'Plan', 'One checklist for every milestone'], [Gem, 'Discover', 'Vendors with real reviews'], [Sparkles, 'Imagine', 'Curated ideas and inspiration'], [HeartHandshake, 'Celebrate', 'Keep every detail personal']
      ].map(([Icon, title, copy]) => <article key={String(title)}><Icon /><h3>{String(title)}</h3><p>{String(copy)}</p></article>)}</section>
    </main>
  );
}
