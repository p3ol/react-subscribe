import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Element from '../Element';

const SigninWithSubscribeButton = forwardRef((props, ref) => (
  <Element type="signin-with-subscribe-button" {...props} ref={ref} />
));

SigninWithSubscribeButton.displayName = 'SigninWithSubscribeButton';
SigninWithSubscribeButton.propTypes = {
  offer: PropTypes.string,
};

export default SigninWithSubscribeButton;
