class apiError {
  constructor(success = false, data, message, error) {
    this.success = success;
    this.data = data;
    this.message = message;
    this.error = error;
  }
}
module.exports = { apiError };
