import React, { forwardRef } from 'react';
import { DefaultProps, MantineNumberSize, useComponentDefaultProps } from '@mantine/styles';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import { Box } from '../Box';
import { Col } from './Col/Col';
import { GridProvider } from './Grid.context';
import useStyles from './Grid.styles';

export interface GridProps extends DefaultProps, React.ComponentPropsWithoutRef<'div'> {
  /** <Col /> components only */
  children: React.ReactNode;

  /** Spacing between columns predefined value from theme.spacing or number for gutter in px  */
  gutter?: MantineNumberSize;

  /** Should columns in the last row take 100% of grid width */
  grow?: boolean;

  /** Set grid justify-content property */
  justify?: React.CSSProperties['justifyContent'];

  /** Set grid align-content property */
  align?: React.CSSProperties['alignContent'];

  /** Amount of columns in each row */
  columns?: number;
}

type GridComponent = ForwardRefWithStaticComponents<HTMLDivElement, GridProps, { Col: typeof Col }>;

const defaultProps: Partial<GridProps> = {
  gutter: 'md',
  justify: 'flex-start',
  align: 'stretch',
  columns: 12,
};

export const Grid: GridComponent = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const { gutter, children, grow, justify, align, columns, className, id, unstyled, ...others } =
    useComponentDefaultProps('Grid', defaultProps, props);
  const { classes, cx } = useStyles({ gutter, justify, align }, { unstyled, name: 'Grid' });

  return (
    <GridProvider value={{ gutter, grow, columns }}>
      <Box className={cx(classes.root, className)} ref={ref} {...others}>
        {children}
      </Box>
    </GridProvider>
  );
}) as any;

Grid.Col = Col;
Grid.displayName = '@mantine/core/Grid';
