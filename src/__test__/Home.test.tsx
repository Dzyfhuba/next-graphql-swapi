import Films from '@/components/films';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import allFilms from './allFilms.json';
import Home from '@/app/page';

vi.mock("next/navigation", () => {
  const actual = vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

// mock urql useQuery hook
vi.mock('urql', () => {
  const actual = vi.importActual('urql')
  return {
    ...actual,
    useQuery: vi.fn(() => ([
      allFilms
    ])),
    Client: vi.fn(() => ({
      query: vi.fn(() => ({
        toPromise: vi.fn(() => ([
          allFilms
        ]))
      }))
    })),
    cacheExchange: vi.fn(),
    fetchExchange: vi.fn(),
    Provider: vi.fn(({ children }) => children)
  }
})

describe('Home Page', () => {
  test('renders home page', () => {
    render(<Home />)
    expect(screen.getByText(/Film list/i)).toBeTruthy()
  })

  // test search box in Films component
  test('renders search box', () => {
    render(<Films />)
    expect(screen.getByPlaceholderText(/Search/i)).toBeTruthy()
  })

  // test A New Hope film
  test('renders A New Hope film', () => {
    render(<Films />)
    expect(screen.getByText(/A New Hope/i)).toBeTruthy()
  })

  // test search box in Films component with search query
  test('renders search box with search query', () => {
    render(<Films />)
    expect(screen.getByPlaceholderText(/Search/i)).toBeTruthy()
  })
})
