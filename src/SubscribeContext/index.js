import { useEffect, useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';
import { mockState, mergeDeep } from '@poool/junipero-utils';

import { SubscribeContext as Ctx } from '../contexts';
import { loadScript } from '../utils';

const SubscribeContext = ({
  appId,
  config,
  events,
  scriptUrl = 'https://assets.poool-subscribe.fr/subscribe.js',
  ...rest
}) => {
  const [state, dispatch] = useReducer(mockState, {
    lib: null,
    factory: null,
  });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (
      !globalThis.Subscribe ||
      !globalThis.Subscribe.isPoool ||
      !globalThis.PooolSubscribe ||
      !globalThis.PooolSubscribe.isPoool
    ) {
      await loadScript(scriptUrl, 'poool-react-subscribe-lib');
    }

    const lib = globalThis.Subscribe.noConflict();

    const factory = lib
      .init(appId)
      .config(config);

    Object
      .entries(events || {})
      .forEach(([event, callback]) => {
        if (callback.once) {
          factory.once(event, callback.callback);
        } else {
          factory.on(event, callback);
        }
      });

    dispatch({ lib, factory });
  };

  const createFactory = (opts = {}) => {
    if (!state.lib) {
      return;
    }

    const factory = state.lib
      .init(appId)
      .config(mergeDeep({}, config, opts.config));

    Object
      .entries(events || {})
      .concat(Object.entries(opts.events || {}))
      .forEach(([event, callback]) => {
        if (callback.once) {
          factory.once(event, callback.callback);
        } else {
          factory.on(event, callback);
        }
      });

    return factory;
  };

  const getContext = useCallback(() => ({
    appId,
    config,
    events,
    scriptUrl,
    lib: state.lib,
    globalFactory: state.factory,
    createFactory,
  }), [state.lib, state.factory]);

  return (
    <Ctx.Provider value={getContext()} { ...rest } />
  );
};

SubscribeContext.displayName = 'SubscribeContext';
SubscribeContext.propTypes = {
  appId: PropTypes.string.isRequired,
  config: PropTypes.object,
  events: PropTypes.object,
  scriptUrl: PropTypes.string,
};

export default SubscribeContext;
