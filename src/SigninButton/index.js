import { forwardRef } from 'react';

import Element from '../Element';

const SigninButton = forwardRef((props, ref) => (
  <Element type="signin-button" {...props} ref={ref} />
));

SigninButton.displayName = 'SigninButton';

export default SigninButton;
