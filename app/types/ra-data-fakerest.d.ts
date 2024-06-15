
declare module 'ra-data-fakerest' {
    var exports: any;
    export = exports;
}

import { NextRouter } from 'next/router';

interface CustomRouter extends NextRouter {
  query: {
    [key: string]: string | string[] | undefined;
  };
}
