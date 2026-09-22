import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Heart, /* Mail, */ Music2, /* Quote, */ Sparkles } from 'lucide-react';

type Photo = {
  src: string;
  caption: string;
  label: string;
  fallback: string;
  position: string;
};

const originalPhotos: Photo[] = [
  {
    src: `${import.meta.env.BASE_URL}WhatsApp_Image_2026-09-22_at_8.36.08_AM.jpeg`,
    caption: 'The kind of night we always wish could last a little longer.',
    label: 'Always laughing',
    fallback: 'A little bit of magic',
    position: 'center 42%',
  },
  {
    src: `${import.meta.env.BASE_URL}WhatsApp_Image_2026-09-22_at_8.36.07_AM.jpeg`,
    caption: 'Beautiful moments, made even better with you beside me.',
    label: 'Making memories',
    fallback: 'Moments worth keeping',
    position: 'center 47%',
  },
  {
    src: `${import.meta.env.BASE_URL}WhatsApp_Image_2026-09-22_at_8.36.06_AM.jpeg`,
    caption: 'A friendship that has grown through every season.',
    label: 'Through every season',
    fallback: 'Side by side',
    position: 'center center',
  },
  {
    src: `${import.meta.env.BASE_URL}WhatsApp_Image_2026-09-22_at_8.36.05_AM.jpeg`,
    caption: 'My favorite memories have always had you in them.',
    label: 'My favorite person',
    fallback: 'My favorite memories',
    position: 'center top',
  },
];

function App() {
  const [photos] = useState<Photo[]>(originalPhotos);
  const [answered, setAnswered] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [failedPhotos, setFailedPhotos] = useState<Record<number, boolean>>({});

  const photoCountLabel = useMemo(() => `${photos.length} memories`, [photos.length]);

  function markPhotoFailed(index: number) {
    setFailedPhotos((current) => ({ ...current, [index]: true }));
  }

  return (
    <main className="site-shell">
      <section className="hero" id="top">
        <div className="hero-noise" />
        <nav className="nav-wrap" aria-label="Main navigation">
          <a className="monogram" href="#top" aria-label="Back to top">T<span>&</span>L</a>
          <div className="nav-links">
            <a href="#memories">Our memories</a>
            <a href="#letter">A little note</a>
            <a href="#question">The question</a>
          </div>
          <button className={`music-button ${musicOn ? 'is-playing' : ''}`} onClick={() => setMusicOn((value) => !value)} aria-pressed={musicOn}>
            <Music2 size={16} strokeWidth={1.8} />
            {musicOn ? 'Music on' : 'Set the mood'}
          </button>
        </nav>

        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> A note from my heart</p>
            <h1>Leticia,<br /><em>I have a special</em><br />question for you<span className="rose-dot">.</span></h1>
            <p className="hero-intro">Some people make life brighter just by being in it.<br />You are that person for me, Tish.</p>
            <a className="scroll-cue" href="#memories"><span>Scroll to open</span><ArrowDown size={16} /></a>
          </div>
          <div className="hero-portrait-frame">
            <div className="hero-portrait">
              <img className="hero-photo" src={photos[0].src} alt="Tracy and Leticia sharing a memory" onError={() => markPhotoFailed(0)} />
              {failedPhotos[0] && <div className="hero-photo-fallback photo-placeholder"><div className="placeholder-people"><span /><span /></div><p>Our story<br />starts here</p></div>}
              <div className="hero-photo-tint" />
              <p className="hero-photo-caption">Our story<br />starts here</p>
            </div>
            <div className="portrait-note"><Heart size={13} fill="currentColor" /> For my Tish</div>
            <div className="hero-stamp">Since<br /><strong>always</strong></div>
          </div>
        </div>
        <div className="hero-bottom"><span>Tracy & Leticia</span><span className="hero-bottom-rule" /><span>With all my love</span></div>
      </section>

      <section className="intro-section section-pad">
        <div className="section-kicker"><span>01</span><span className="kicker-rule" /><span>Our little archive</span></div>
        <div className="intro-grid">
          <h2>A friendship worth<br /><em>celebrating.</em></h2>
          <div className="intro-body"><p>From the ordinary days to the ones we will talk about forever, you have shown up with your whole heart. You have been my safe place, my biggest cheerleader, and one of the very best parts of my story.</p><p>So, I gathered a few favorite pieces of us here before asking you something very important.</p></div>
        </div>
      </section>

      <section className="memories-section section-pad" id="memories">
        <div className="memories-heading"><div><p className="eyebrow muted"><span className="eyebrow-line" /> A few of my favorite things</p><h2>Us, <em>in moments.</em></h2></div><div className="gallery-meta"><span>{photoCountLabel}</span></div></div>
        <div className="gallery-grid">
          {photos.slice(0, 4).map((photo, index) => (
            <article className={`memory-card card-${index + 1}`} key={`${photo.src}-${index}`}>
              <div className={`memory-image ${failedPhotos[index] ? 'photo-placeholder' : ''}`}>
                {!failedPhotos[index] && <img src={photo.src} alt={photo.caption} style={{ objectPosition: photo.position }} onError={() => markPhotoFailed(index)} />}
                {failedPhotos[index] && <><div className="placeholder-people small"><span /><span /></div><strong>{photo.fallback}</strong></>}
                <span className="memory-number">0{index + 1}</span>
              </div>
              <p className="memory-label">{photo.label}</p><p className="memory-caption">{photo.caption}</p>
            </article>
          ))}
        </div>
        {photos.length > 4 && <p className="extra-photo-note">+ {photos.length - 4} more memories added</p>}
      </section>

      {/* <section className="letter-section section-pad" id="letter">
        <div className="letter-card"><Quote className="quote-mark" size={44} strokeWidth={1} /><p className="letter-overline">Dear Tish,</p><p className="letter-main">Thank you for being the friend who makes the hard days softer and the happy days even happier. Thank you for every check-in, every laugh until we cried, and every time you believed in me before I could believe in myself.</p><p className="letter-main">When I picture the day I say “I do,” I picture you there — close enough to squeeze my hand, fix my veil, and remind me to take it all in.</p><div className="letter-signoff"><p>It would mean the world to me to have you standing next to me, not just as a friend, but as the person who has been such a constant source of love and support.</p><p>With all my love and gratitude,<br /><strong>Tracy</strong></p></div><div className="letter-flower">✳</div></div>
      </section> */}

      <section className="question-section" id="question"><div className="question-orbit orbit-one" /><div className="question-orbit orbit-two" /><Sparkles className="sparkle sparkle-one" size={21} /><Sparkles className="sparkle sparkle-two" size={15} /><div className="question-content"><p className="eyebrow light"><span className="eyebrow-line" /> The important part</p><h2>Will you be my<br /><em>Maid of Honor?</em></h2><p className="question-sub">For every chapter still to come, I want you right there beside me.</p><button className={`yes-button ${answered ? 'answered' : ''}`} onClick={() => setAnswered(true)}>{answered ? <><Check size={18} /> My heart is so happy</> : <>Yes, of course <ArrowUpRight size={18} /></>}</button>{answered && <p className="answer-note">I knew you would say yes. I love you, Tish.</p>}</div></section>

      <footer className="footer"><div className="footer-flower">✦</div><p className="eyebrow muted">A forever kind of friendship</p><h2>Thank you for being<br /><em>my person.</em></h2>{/* <a className="contact-link" href="mailto:">Send Tracy a little love <Mail size={16} /></a> */}<div className="footer-bottom"><span>Made with love by Tracy</span><a href="#top">Back to the beginning ↑</a></div></footer>
    </main>
  );
}

export default App;
