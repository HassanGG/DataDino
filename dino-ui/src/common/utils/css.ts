type ClassNameConditions = {
  readonly [key: string]: boolean | undefined;
};

/**
 * Conditionally include class names imported
 * from a CSS module into a single class name
 * string.
 *
 * Note: the order in which key/value pairs
 * are included in the [classNameConditions]
 * does *not* determine which is overriden, should
 * they both set the same attribute; rather
 * the order in which they appear in the CSS module
 * itself decides this priority. Therefore,
 * default styles must always appear before
 * non-default styles in CSS modules!
 *
 * @param classNameConditions mapping from
 * style object attribute to boolean.
 * @returns class name string.
 */
export const useStyle = (classNameConditions: ClassNameConditions) => {
  return Object.entries(classNameConditions).reduce(
    (acc, [className, condition]) =>
      !condition ? acc : `${acc} ${className}`.trimStart(),
    ""
  );
};
