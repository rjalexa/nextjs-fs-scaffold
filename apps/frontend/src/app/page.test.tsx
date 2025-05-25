import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'ui-components';

import Home from './page';

// Mock the technology data
jest.mock('./shared/technology-data', () => ({
  technologies: [
    {
      id: 'test-tech',
      name: 'Test Technology',
      description: 'A test technology for testing',
      category: 'Testing',
      logo: '/images/test.png',
      website: 'https://test.com',
      documentation: 'https://test.com/docs',
      features: ['Feature 1', 'Feature 2'],
      useCases: ['Use case 1', 'Use case 2'],
      pros: ['Pro 1', 'Pro 2'],
      cons: ['Con 1', 'Con 2'],
    },
  ],
}));

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />, { wrapper: TestWrapper });
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('renders the technologies section', () => {
    render(<Home />, { wrapper: TestWrapper });
    
    // Look for the Technologies heading
    const techHeading = screen.getByText('Technologies');
    expect(techHeading).toBeInTheDocument();
  });

  it('has proper page structure with footer', () => {
    render(<Home />, { wrapper: TestWrapper });
    
    // Check that the page has a footer element
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
    // Check for copyright text
    const copyright = screen.getByText(/Next.js Tailwind DaisyUI Fullstack Scaffold/);
    expect(copyright).toBeInTheDocument();
  });
});
