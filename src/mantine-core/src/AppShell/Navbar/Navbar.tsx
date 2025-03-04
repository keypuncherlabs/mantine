import React, { forwardRef } from 'react';
import { getDefaultZIndex, useComponentDefaultProps } from '@mantine/styles';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import {
  HorizontalSection,
  HorizontalSectionSharedProps,
} from '../HorizontalSection/HorizontalSection';
import { Section } from '../HorizontalSection/Section/Section';

export interface NavbarProps
  extends HorizontalSectionSharedProps,
    React.ComponentPropsWithoutRef<'nav'> {
  /** Navbar content */
  children: React.ReactNode;
}

type NavbarComponent = ForwardRefWithStaticComponents<
  HTMLElement,
  NavbarProps,
  { Section: typeof Section }
>;

const defaultProps: Partial<NavbarProps> = {
  fixed: false,
  position: { top: 0, left: 0 },
  zIndex: getDefaultZIndex('app'),
  hiddenBreakpoint: 'md',
  hidden: false,
};

export const Navbar: NavbarComponent = forwardRef<HTMLElement, NavbarProps>(
  (props: NavbarProps, ref) => {
    const _props = useComponentDefaultProps('Navbar', defaultProps, props);
    return <HorizontalSection section="navbar" __staticSelector="Navbar" ref={ref} {..._props} />;
  }
) as any;

Navbar.Section = Section;
Navbar.displayName = '@mantine/core/Navbar';
