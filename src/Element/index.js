import {
  useRef,
  useMemo,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import { classNames } from '@poool/junipero-utils';

import { useSubscribe } from '../hooks';
import { generateId } from '../utils';

const Element = forwardRef(({
  styles,
  type,
  className,
  tag: Tag = 'div',
  useGlobalFactory = true,
  ...rest
}, ref) => {
  const containerRef = useRef();
  const elementRef = useRef();
  const id = useMemo(() => generateId(), []);
  const { lib, globalFactory, createFactory } = useSubscribe();

  useImperativeHandle(ref, () => ({
    containerRef,
    elementRef,
    destroy,
  }));

  useEffect(() => {
    const factory = useGlobalFactory ? globalFactory : createFactory();

    if (!factory) {
      return;
    }

    if (elementRef.current) {
      elementRef.current.destroy();
    }

    elementRef.current = factory.createAuthElement(type, {
      target: containerRef.current,
      styles,
      ...rest,
    });

    return () => {
      destroy();
    };
  }, [lib, globalFactory]);

  const destroy = () => {
    elementRef.current?.destroy?.();
  };

  return (
    <Tag
      ref={containerRef}
      className={classNames('p3-element', className)}
      id={id}
    />
  );
});

Element.displayName = 'Element';
Element.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.object,
  type: PropTypes.string.isRequired,
  tag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType,
  ]),
  useGlobalFactory: PropTypes.bool,
};

export default Element;
