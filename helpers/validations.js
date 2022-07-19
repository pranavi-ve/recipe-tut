
function validateInput(schema, input) {
  try {
    if(!schema) throw Error("Invalid Schema");
    const data = schema.validate(input);
    if (data.error) {
      const errors = data.error.details.map((item) => item.message);
      return { hasError: true, errors };
    }
    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = { validateInput };
