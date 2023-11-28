import './Home.scss';
import { Button } from 'rsuite';

export function Home() {
  return (
    <div className="page-container">
      <h1>Welcome to MusiGit</h1>
      <div className="actions-container">
        <Button appearance="primary">Sign In</Button>
        <Button appearance="ghost">Sign Up</Button>
      </div>
    </div>
  );
}
