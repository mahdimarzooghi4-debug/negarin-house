import { randomUUID } from "node:crypto";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from "@nestjs/common";

type RequestLike = {
  id?: string;
};

type ResponseLike = {
  status(code: number): ResponseLike;
  send(payload: unknown): void;
};

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const request = http.getRequest<RequestLike>();
    const response = http.getResponse<ResponseLike>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = "INTERNAL_ERROR";
    let message = "Unexpected error";

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      code = "HTTP_ERROR";
      const body = exception.getResponse();

      if (typeof body === "string") {
        message = body;
      } else if (body && typeof body === "object" && "message" in body) {
        const value = body.message;
        message = Array.isArray(value) ? value.join("; ") : String(value);
      }
    }

    if (exception && typeof exception === "object" && "code" in exception && exception.code === "FST_ERR_CTP_BODY_TOO_LARGE") {
      status = HttpStatus.PAYLOAD_TOO_LARGE;
      code = "PAYLOAD_TOO_LARGE";
      message = "Request body too large";
    }

    response.status(status).send({
      error: {
        code,
        message,
        requestId: request.id ?? randomUUID()
      }
    });
  }
}
