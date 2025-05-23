import '@types/jest';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toHaveStyle(style: Record<string, string | number>): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveTextContent(text: string | RegExp): R;
    }
  }
}
