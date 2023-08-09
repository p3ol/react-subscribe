![CI](https://github.com/p3ol/react-subscribe/workflows/CI/badge.svg)

# Poool Subscribe - React SDK

> The easiest way to add Poool Subscribe to your React app ✨


## Installation

```bash
yarn add @poool/react-subscribe
```

## Usage

```jsx
import { SubscribeContext, SigninButton } from '@poool/react-subscribe';

export default = () => {
  // Wrap everything with our SubscribeContext component
  return (
    <SubscribeContext appId="insert_your_app_id">
      { /*
        Place your element where you want it to be displayed
      */ }
      <SigninButton styles={{ custom_css: 'body { font-family: serif; }' }} />
    </SubscribeContext>
  );
};
```

## Documentation

### `<SubscribeContext />`

#### Props

- `appId` {`String`} Your Poool App ID
- `config` {`Object`} (optional) Default paywall config (see the [configuration](https://poool.dev/docs/subscribe/javascript/configuration) documentation).
- `events` {`Object`} (optional) Paywall events listeners (see the [events](https://poool.dev/docs/subscribe/javascript/events) documentation).
- `scriptUrl` {`String`} (optional, default: `'https://assets.poool-subscribe.fr/subscribe.js'`) Default Poool Subscribe SDK url

### `<Element />`

#### Props

- `type` {`String`} Element type (see the [createAuthElement](https://poool.dev/fr/docs/subscribe/javascript/methods#createauthelement) method documentation for available types).
- `styles` {`Object`} (optional) Custom styles for the element. Use `{ custom_css: '' }` to add custom CSS.

### `<SigninButton />`

#### Props

- `styles` {`Object`} (optional) Custom styles for the element. Use `{ custom_css: '' }` to add custom CSS.

### `<SigninWithSubscribeButton />`

#### Props

- `styles` {`Object`} (optional) Custom styles for the element. Use `{ custom_css: '' }` to add custom CSS.
- `offer` {`String`} (optional) Offer ID used to display a `Starting at X` text.

### useSubscribe()

Can be used to retrieve some properties from the current subscribe context, as well as the Subscribe SDK itself.

#### Returns

- `lib` {`Function`} The entire Subscribe sdk
- `appId` {`String`} Current app ID
- `config` {`Object`} Current subscribe context config
- `events` {`Object`} Current subscribe context events listeners
- `scriptURL` {`Object`} Subscribe SDK url

#### Example

```js
const { appId, lib: subscribe } = useSubscribe();
```

## Contributing

[![](https://contrib.rocks/image?repo=p3ol/react-subscribe)](https://github.com/p3ol/react-subscribe/graphs/contributors)

Please check the [CONTRIBUTING.md](https://github.com/p3ol/react-subscribe/blob/master/CONTRIBUTING.md) doc for contribution guidelines.


## Development

Install dependencies:

```bash
yarn install
```

Run examples at http://localhost:63001/ with webpack dev server:

```bash
yarn serve
```

And test your code:

```bash
yarn test
```

## License

This software is licensed under [MIT](https://github.com/p3ol/react-subscribe/blob/master/LICENSE).
