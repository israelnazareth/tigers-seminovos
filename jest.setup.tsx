import '@testing-library/jest-dom';

const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const firstArg = args[0];
    const message = typeof firstArg === 'string' 
      ? firstArg 
      : firstArg instanceof Error 
        ? firstArg.message 
        : String(firstArg);
    
    if (
      message.includes('Not implemented: navigation') ||
      message.includes('not wrapped in act') ||
      message.includes('non-boolean attribute')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt ?? 'Image'} />;
  },
}));

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper">{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));

jest.mock('swiper/modules', () => ({
  Autoplay: jest.fn(),
  EffectFade: jest.fn(),
  Navigation: jest.fn(),
}));

jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/effect-fade', () => ({}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
