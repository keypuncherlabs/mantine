import React, { forwardRef } from 'react';
import {
  DefaultProps,
  useComponentDefaultProps,
  StylesApiProvider,
  Selectors,
} from '@mantine/styles';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import { Box } from '../Box';
import { TabsList, TabsListStylesNames } from './TabsList/TabsList';
import { TabsPanel, TabsPanelStylesNames } from './TabsPanel/TabsPanel';
import { Tab, TabStylesNames } from './Tab/Tab';
import { TabsProvider, TabsProviderProps } from './TabsProvider';
import { TabsStylesParams } from './Tabs.types';
import useStyles from './Tabs.styles';

export type TabsStylesNames =
  | Selectors<typeof useStyles>
  | TabsListStylesNames
  | TabsPanelStylesNames
  | TabStylesNames;

export interface TabsProps
  extends TabsProviderProps,
    DefaultProps<TabsStylesNames, TabsStylesParams>,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof TabsProviderProps> {}

type TabsComponent = ForwardRefWithStaticComponents<
  HTMLDivElement,
  TabsProps,
  {
    List: typeof TabsList;
    Tab: typeof Tab;
    Panel: typeof TabsPanel;
  }
>;

const defaultProps: Partial<TabsProps> = {
  orientation: 'horizontal',
  loop: true,
  activateTabWithKeyboard: true,
  allowTabDeactivation: false,
  unstyled: false,
  inverted: false,
  variant: 'default',
};

export const Tabs: TabsComponent = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
    defaultValue,
    value,
    orientation,
    loop,
    activateTabWithKeyboard,
    allowTabDeactivation,
    children,
    id,
    onTabChange,
    variant,
    color,
    className,
    unstyled,
    classNames,
    styles,
    radius,
    inverted,
    keepMounted,
    ...others
  } = useComponentDefaultProps('Tabs', defaultProps, props);

  const { classes, cx } = useStyles(
    { orientation, color, variant, radius, inverted },
    { unstyled, name: 'Tabs', classNames, styles }
  );

  return (
    <StylesApiProvider classNames={classNames} styles={styles} unstyled={unstyled}>
      <TabsProvider
        activateTabWithKeyboard={activateTabWithKeyboard}
        defaultValue={defaultValue}
        orientation={orientation}
        onTabChange={onTabChange}
        value={value}
        id={id}
        loop={loop}
        allowTabDeactivation={allowTabDeactivation}
        color={color}
        variant={variant}
        radius={radius}
        inverted={inverted}
        keepMounted={keepMounted}
      >
        <Box {...others} className={cx(classes.root, className)} id={id} ref={ref}>
          {children}
        </Box>
      </TabsProvider>
    </StylesApiProvider>
  );
}) as any;

Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = TabsPanel;

Tabs.displayName = '@mantine/core/Tabs';
