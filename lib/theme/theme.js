// color design tokens export
export const tokensDark = {
  base: {
    20: "#FFFFFF",
    40: "#F8F8F8",
    60: "#9B9B9B",
    80: "#454545",
    100: "#181818",
  },
  primary: {
    // RED
    20: "#FFE9BD",
    40: "#FFD27C",
    60: "#FFBD40",
    80: "#FF5938",
    100: "#CC472D",
    120: "#952822",
    140: "#780101",
  },
  secondary: {
    // Green
    20: "#BFE1CB",
    40: "#99CEAB",
    60: "#7FC296",
    80: "#F6CF3E",
    100: "#334E3C",
  },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[80],
              light: tokensDark.primary[80],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[60],
            },
            neutral: {
              ...tokensDark.base,
              main: tokensDark.base[60],
            },
            background: {
              default: tokensDark.base[80],
              alt: tokensDark.base[20],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.base[80],
              light: tokensDark.base[80],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[60],
              light: tokensDark.secondary[60],
            },
            neutral: {
              ...tokensLight.base,
              main: tokensDark.base[60],
            },
            background: {
              default: tokensDark.base[20],
              alt: tokensDark.base[100],
            },
          }),
    },
    typography: {
      fontFamily: ["Mukta", "sans-serif"].join(","),
      fontSize: 16,
      h1: {
        fontFamily: ["Ubuntu", "sans-serif"].join(","),
        fontSize: 60,
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontFamily: ["Ubuntu", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h3: {
        fontFamily: ["Ubuntu", "sans-serif"].join(","),
        fontSize: 28,
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h4: {
        fontFamily: ["Ubuntu", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h5: {
        fontFamily: ["Mukta", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 600,
      },
      h6: {
        fontFamily: ["Ubuntu", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 600,
      },
      a: {
        fontFamily: ["Mukta", "sans-serif"].join(","),
      },
      button: {
        fontFamily: ["Ubuntu", "sans-serif"].join(","),
        fontSize: 24,
        fontWeight: 700,

      },
    },
    button: {
      background: {
        main: tokensDark.primary[80],
         
      },
    },
  };
};
export default themeSettings;