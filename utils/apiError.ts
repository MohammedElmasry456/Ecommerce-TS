class ApiError extends Error {
  private status: string;
  isOperational: boolean;
  constructor(message: string, private statusCode: number) {
    super(message);
    this.status = `${this.statusCode}`.startsWith("4") ? "failed" : "error";
    this.isOperational = true;
  }
}

export default ApiError;
