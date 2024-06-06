import { Hero } from "@/app/components";
import  CarList  from "@/app/components/card/CarList";
export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
    </main>
  );
}

// pages/_app.tsx
// import { AppProps } from 'next/app';
// import { Provider } from 'react-redux';
// import { store } from '../Store/store'; 

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
// //   );
// }

// export default MyApp;
