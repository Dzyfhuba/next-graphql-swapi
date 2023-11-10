import Characters from "@/app/characters/page";
import People from "@/components/people";
import { act, cleanup, fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import allPeople from './allPeople.json'
import allFilms from './allFilms.json'
import Films from "@/components/films";
import Home from "@/app/page";
import React, { useEffect, useLayoutEffect } from "react";
import userEvent from '@testing-library/user-event'

afterEach(cleanup)
let container = null as Element | null;

beforeEach(() => {
  // set up a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  if (container) {
    // unmountComponentAtNode(container)
    container.remove();
    container = null;
  }
});

// mock useMediaQuery from 'usehooks-ts'
vi.mock("usehooks-ts", () => {
  const actual = vi.importActual("usehooks-ts");
  return {
    ...actual,
    useMediaQuery: vi.fn(() => true),
    useIntersectionObserver: vi.fn(() => ({
      isIntersecting: true,
    })),
  };
});

vi.mock('urql', () => {
  const actual = vi.importActual('urql')
  return {
    ...actual,
    useQuery: vi.fn(() => ([
      allFilms,
      vi.fn()
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

// mock spy useEffect and useState
vi.spyOn(React, "useEffect");
vi.spyOn(React, "useState");

beforeAll(() => {
  vi.spyOn(React, "useEffect").mockImplementation(React.useLayoutEffect);
})
// afterAll(() => React.useEffect.mockRestore())

// make me able to call React.useEffect.mock.calls[0][0]() in act()
vi.spyOn(React, "useEffect").mockImplementation(React.useLayoutEffect);

describe('Characters Page', () => {
  let originFetch:any;
  beforeEach(() => {
    originFetch = (global as any).fetch;
  })
  afterEach(() => {
    (global as any).fetch = originFetch;
  })
  test('renders characters page', async () => {
    const wrapper = render(<Characters />)
    console.log('h', wrapper.getByText(/Characters/i))

    expect(wrapper.getByText(/Loading/i)).toBeTruthy()
  })

  // test people and reExecutePeopleQuery from useQuery mock
  test('renders people', async () => {
    const wrapper = render(<People />)
  })

  // Luke Skywalker and C-3PO are the first two characters
  // test('renders Luke Skywalker and C-3PO', () => {
  //   render(<People />)
  //   expect(screen.getByText(/Luke Skywalker/i)).toBeTruthy()
  //   expect(screen.getByText(/C-3PO/i)).toBeTruthy()
  // })
})

// describe('Home Page', () => {
//   test('renders home page', () => {
//     render(<Home />)
//     expect(screen.getByText(/Film list/i)).toBeTruthy()
//   })

//   // test search box in Films component
//   test('renders search box', () => {
//     render(<Films />)
//     expect(screen.getByPlaceholderText(/Search/i)).toBeTruthy()
//   })

//   // test A New Hope film
//   test('renders A New Hope film', () => {
//     render(<Films />)
//     expect(screen.getByText(/A New Hope/i)).toBeTruthy()
//   })

//   // test search box in Films component with search query
//   test('renders search box with search query', () => {
//     render(<Films />)
//     expect(screen.getByPlaceholderText(/Search/i)).toBeTruthy()
//   })
// })