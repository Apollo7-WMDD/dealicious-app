import "./globals.css";
import Provider from "./components/Provider";
// 

import ThemeWrapper from "./components/ThemeWrapper";
import { UserTypeProvider } from "./context/UserTypeContext";


export const metadata = {
  title: "Dealicious",
  description: "Best App for Deals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
<<<<<<< HEAD
        <UserTypeProvider>
          <Provider>
            <div
              style={{
                display: "flex",
              }}
            >
              <ThemeWrapper />
              <div style={{ margin: "2rem 2%" }}>{children}</div>
            </div>
          </Provider>
        </UserTypeProvider>
=======
        <Provider>
          <ThemeWrapper>
            {/* <Link
              href={`/`}
              className=" mr-auto mt-5 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
            >
              <button className="">HOME</button>
            </Link> */}
          </ThemeWrapper>
          {children}
        </Provider>
>>>>>>> c8b5d6b97c5f2d750f2252ab66a02042812e86de
      </body>
    </html>
  );
}
