import React, { forwardRef } from 'react';
import { getDefaultZIndex, useComponentDefaultProps } from '@mantine/styles';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import {
  HorizontalSection,
  HorizontalSectionSharedProps,
} from '../HorizontalSection/HorizontalSection';
import { Section } from '../HorizontalSection/Section/Section';

export interface AsideProps
  extends HorizontalSectionSharedProps,
    React.ComponentPropsWithoutRef<'nav'> {
  /** Aside content */
  children: React.ReactNode;
}

type AsideComponent = ForwardRefWithStaticComponents<
  HTMLElement,
  AsideProps,
  { Section: typeof Section }
>;

const defaultProps: Partial<AsideProps> = {
  fixed: false,
  position: { top: 0, right: 0 },
  zIndex: getDefaultZIndex('app'),
  hiddenBreakpoint: 'md',
  hidden: false,
};

export const Aside: AsideComponent = forwardRef<HTMLElement, AsideProps>(
  (props: AsideProps, ref) => {
    const _props = useComponentDefaultProps('Aside', defaultProps, props);
    return <HorizontalSection section="aside" __staticSelector="Aside" ref={ref} {..._props} />;
  }
) as any;

Aside.Section = Section;
Aside.displayName = '@mantine/core/Aside';
