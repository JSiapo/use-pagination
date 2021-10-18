import React from 'react';
import { act } from 'react-dom/test-utils';
// import { useState } from 'react';
// import { usePagination } from '../../src/hooks/usePagination';
import { render, unmountComponentAtNode } from 'react-dom';
import TestComponent from '../../src/components/Test';
// const Loading = () => <div id="loading">Loading</div>;

describe('Init state', () => {
  let container: any = null;

  beforeEach(() => {
    // set up a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should start', () => {
    act(() => {
      render(<TestComponent />, container);
    });

    expect(container.textContent).toContain(
      'https://my.api.com/posts/?limit=6&offset=1'
    );
  });
});
