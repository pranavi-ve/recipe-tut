function validateInput(schema) {
    return (req, res, next) => {
      try {
        const input = req.body;
        if (!schema) throw Error("Invalid Schema");
        const data = schema.validate(input);
        if (data.error) {
          const errors = data.error.details.map((item) => item.message);
          res.status(422).json({ message: data.errors });
        }
        next(data.value);
      } catch (error) {
        next(error);
      }
    };
  }
  
  module.exports = { validateInput };
  