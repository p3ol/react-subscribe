import { createRoot } from 'react-dom/client';
import { SubscribeContext, SigninButton } from '@poool/react-subscribe';

const App = () => (
  <SubscribeContext
    config={{ debug: true }}
    appId="155PF-L7Q6Q-EB2GG-04TF8"
  >
    <SigninButton />
  </SubscribeContext>
);

createRoot(document.getElementById('app')).render(<App />);
