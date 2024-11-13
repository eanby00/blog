export const getHTMLFromMD = (rawMD) => {
  return unified().use(markdown).use(remarkRehype).use(html).processSync(rawMD)
    .value;
};

export const unified = () => {
  return {
    use: () => {
      return {
        parse: (testcase) => {
          return testcase;
        },
        use: () => {
          return {
            use: () => {
              return {
                processSync: (rawMD) => {
                  return {
                    value: rawMD,
                  };
                },
              };
            },
          };
        },
      };
    },
  };
};
