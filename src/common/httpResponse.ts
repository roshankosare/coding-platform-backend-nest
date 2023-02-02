import { HttpStatus } from "@nestjs/common";

export class HttpResponse {
  success: boolean;
  message: string;
  statusCode: HttpStatus;
  data: {};
  constructor({ statusCode = HttpStatus.ACCEPTED, message = 'ok', success = true, data = {} }) {
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
    this.success = success;
  }
}
