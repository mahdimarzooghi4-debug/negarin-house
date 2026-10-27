import { Controller, Get, Header, Query, Req, UseGuards } from "@nestjs/common";
import { AuthorizationGuard, type AuthorizedRequest } from "./authorization.guard.js";
import { parseOrderPage } from "./customer-orders.js";
import { SupportReportingService } from "./support-reporting.js";

type Request = AuthorizedRequest & { id: string };

@Controller("supporting-organization")
@UseGuards(AuthorizationGuard)
export class SupportingOrganizationSupportReportingController {
  constructor(private readonly reports: SupportReportingService) {}

  @Get("support-report")
  @Header("Cache-Control", "no-store")
  summary(@Req() r: Request) {
    return this.reports.summary(r.authorizationContext!, "organization");
  }

  @Get("support-activity")
  @Header("Cache-Control", "no-store")
  activity(@Req() r: Request, @Query() query: Record<string, unknown>) {
    const p = parseOrderPage(query);
    return this.reports.activity(r.authorizationContext!, "organization", p.page, p.pageSize);
  }
}

@Controller("artist")
@UseGuards(AuthorizationGuard)
export class ArtistSupportReportingController {
  constructor(private readonly reports: SupportReportingService) {}

  @Get("support-report")
  @Header("Cache-Control", "no-store")
  summary(@Req() r: Request) {
    return this.reports.summary(r.authorizationContext!, "artist");
  }

  @Get("support-activity")
  @Header("Cache-Control", "no-store")
  activity(@Req() r: Request, @Query() query: Record<string, unknown>) {
    const p = parseOrderPage(query);
    return this.reports.activity(r.authorizationContext!, "artist", p.page, p.pageSize);
  }
}

@Controller("admin")
@UseGuards(AuthorizationGuard)
export class AdminSupportReportingController {
  constructor(private readonly reports: SupportReportingService) {}

  @Get("support-report")
  @Header("Cache-Control", "no-store")
  summary(@Req() r: Request) {
    return this.reports.summary(r.authorizationContext!, "staff");
  }

  @Get("support-activity")
  @Header("Cache-Control", "no-store")
  activity(@Req() r: Request, @Query() query: Record<string, unknown>) {
    const p = parseOrderPage(query);
    return this.reports.activity(r.authorizationContext!, "staff", p.page, p.pageSize);
  }
}
