export const unified = () => {
  return {
    use: () => {
      return {
        parse: (testcase) => {
          return testcase;
        },
      };
    },
  };
};
