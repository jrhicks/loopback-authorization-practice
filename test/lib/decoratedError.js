module.exports = function decoratedError(err, res) {
    if (res.body.error) {
      var decorated = err.message +
        "\n" +
        res.body.error.stack.split("\n")[0] +
        "\n" +
        res.body.error.stack.split("\n")[1]
      return new Error(decorated);
    } else {
      return err;
    }
  };
