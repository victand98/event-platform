import { render, RenderOptions } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from './test-wrapper';

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: TestWrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
