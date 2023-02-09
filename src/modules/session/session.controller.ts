import { SERVICE_NAME } from "../../common/constants";
import { AbstractController } from "../../common/rest/rest.controller";
import authorizeMiddleware from "../../middleware/authen";

import { IRequest } from "../../common/rest/rest.interface";
import { SessionService } from "./session.service";
import SessionValidation from "./session.validation";

class SessionController extends AbstractController {
  private sessionService: SessionService;

  constructor(sessionService: SessionService) {
    super(`/${SERVICE_NAME}`);
    this.sessionService = sessionService;
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.get(
      `${this.path}/Session/get-Session-info`,
      authorizeMiddleware.allSource,
      this.asyncRouteFormatResponse(this.getSessionInfo)
    );

    this.router.post(
      `${this.path}/Sessions/create`,
      authorizeMiddleware.adminSource,
      this.asyncRouteFormatResponse(this.createSession)
    );
  }

  getSessionInfo = async (request: IRequest) => {
    const args = { ...request.query };
    const vArgs = await this.validation(
      args,
      SessionValidation.getSessionInforValidation
    );
    const query = vArgs;

    const response = await this.sessionService.getSessionInfo(query);
    return response;
  };

  createSession = async (request: IRequest) => {
    const args = { ...request.body };
    const vArgs = await this.validation(
      args,
      SessionValidation.createSessionValidation
    );
    const { date, start_time, total_time } = vArgs;

    const response = await this.sessionService.createNewSession({
      date,
      start_time,
      total_time,
    });
    return response;
  };
}

export default SessionController;