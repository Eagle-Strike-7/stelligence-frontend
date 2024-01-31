import '@testing-library/jest-dom';
import Page from '@/app/debateList/page';
import { render } from '@testing-library/react';

describe('debateList', () => {
  it('renders a heading', () => {
    render(<Page />);
  });
});
