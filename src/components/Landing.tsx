import './Landing.css';
import Button from './Button';
import GoogleLogo from './GoogleLogo';

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing-gradient" />
      <header className="landing-header">
        <h1 className="landing-title">Weedlog</h1>
      </header>
      <footer className="landing-footer">
        <Button icon={<GoogleLogo />}>Sign in with Google</Button>
      </footer>
    </div>
  );
}
