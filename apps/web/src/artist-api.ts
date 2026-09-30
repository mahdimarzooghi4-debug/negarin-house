import { cookies } from "next/headers";

export type ArtistProduct = {
  id: string;
  title: string;
  description: string | null;
  priceToman: string;
  publicationStatus: "draft" | "under_review" | "changes_requested" | "approved" | "published";
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PublicationReviewItem = {
  id: string;
  title: string;
  description: string | null;
  publicationStatus: "under_review";
  createdAt: string;
  media: Array<{ id: string; contentType: string; readUrl: string }>;
};

export type ServicePartnerAssignment = {
  assignmentId: string;
  requestId: string;
  title: string;
  summary: string | null;
  assignedAt: string;
  requestedAt: string;
  responseStatus: "awaiting_response" | "accepted" | "declined";
  history?: ServicePartnerAssignmentHistoryEvent[];
};

export type ServicePartnerAssignmentHistoryEvent = {
  type: "assigned" | "accepted" | "declined" | "deliverable_added" | "deliverable_submitted";
  createdAt: string;
  fileName?: string;
  uploadStatus?: "pending" | "ready";
};

export type ServicePartnerDeliverable = {
  id: string;
  fileName: string;
  contentType: string;
  contentLength: number;
  status: "pending" | "ready";
  readUrl: string | null;
  createdAt: string;
  submittedAt: string | null;
};

export type StaffServiceAssignmentOptions = {
  requests: Array<{ id: string; title: string; summary: string | null; createdAt: string }>;
  organizations: Array<{ id: string; displayName: string | null }>;
};

export type StaffServiceDeliverableSubmission = {
  deliverableId: string;
  assignmentId: string;
  title: string;
  summary: string | null;
  partnerOrganizationName: string | null;
  fileName: string;
  contentType: string;
  contentLength: number;
  uploadedAt: string;
  submittedAt: string;
  history: ServicePartnerAssignmentHistoryEvent[];
  readUrl: string;
};

const sessionCookieName = "negarin_session";
const maxJsonBodyBytes = 64 * 1024;

export type LimitedJsonBody =
  | { kind: "ready"; value: unknown }
  | { kind: "invalid" }
  | { kind: "too-large" };

/** Read a browser JSON body with a hard byte limit before parsing or forwarding it. */
export async function readLimitedJsonBody(request: Request): Promise<LimitedJsonBody> {
  const declaredLength = request.headers.get("content-length");
  if (declaredLength !== null) {
    if (!/^\d+$/.test(declaredLength)) return { kind: "invalid" };
    if (Number(declaredLength) > maxJsonBodyBytes) return { kind: "too-large" };
  }
  if (!request.body) return { kind: "invalid" };

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxJsonBodyBytes) {
        await reader.cancel().catch(() => undefined);
        return { kind: "too-large" };
      }
      chunks.push(value);
    }
  } catch {
    return { kind: "invalid" };
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return { kind: "ready", value: JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)) as unknown };
  } catch {
    return { kind: "invalid" };
  }
}

function apiOrigin() {
  const value = process.env.NEGARIN_API_URL ?? "http://127.0.0.1:4000";
  return new URL(value).origin;
}

export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  return origin !== null && origin === new URL(request.url).origin;
}

export async function requestArtistApi(path: string, init: RequestInit = {}) {
  const session = (await cookies()).get(sessionCookieName)?.value;
  if (!session) return { status: 401, data: null } as const;

  try {
    const headers = new Headers(init.headers);
    headers.set("Authorization", `Bearer ${session}`);
    if (init.body) headers.set("Content-Type", "application/json");
    const response = await fetch(`${apiOrigin()}/api/v1/${path.replace(/^\//, "")}`, {
      ...init,
      cache: "no-store",
      headers
    });
    const data = response.ok && response.status !== 204 ? await response.json() as unknown : null;
    return { status: response.status, data } as const;
  } catch {
    return { status: 503, data: null } as const;
  }
}

export async function loadArtistProducts() {
  const result = await requestArtistApi("artist/products?includeArchived=true");
  if (result.status === 200 && Array.isArray(result.data)) {
    return { kind: "ready", products: result.data as ArtistProduct[] } as const;
  }
  if (result.status === 401 || result.status === 403) return { kind: "connection-required" } as const;
  return { kind: "unavailable" } as const;
}

export async function loadPublicationReviews() {
  const result = await requestArtistApi("staff/publication-reviews");
  if (result.status === 200 && Array.isArray(result.data)) {
    return { kind: "ready", items: result.data as PublicationReviewItem[] } as const;
  }
  if (result.status === 401 || result.status === 403) return { kind: "connection-required" } as const;
  return { kind: "unavailable" } as const;
}

export async function loadServicePartnerAssignments() {
  const result = await requestArtistApi("service-partner/assignments");
  if (result.status === 200 && Array.isArray(result.data)) {
    return { kind: "ready", assignments: result.data as ServicePartnerAssignment[] } as const;
  }
  if (result.status === 401) return { kind: "connection-required" } as const;
  if (result.status === 403) return { kind: "access-denied" } as const;
  return { kind: "unavailable" } as const;
}

export async function loadServicePartnerAssignment(assignmentId: string) {
  const result = await requestArtistApi(`service-partner/assignments/${encodeURIComponent(assignmentId)}`);
  if (result.status === 200 && result.data && typeof result.data === "object") {
    return { kind: "ready", assignment: result.data as ServicePartnerAssignment } as const;
  }
  if (result.status === 401) return { kind: "connection-required" } as const;
  if (result.status === 403) return { kind: "access-denied" } as const;
  if (result.status === 404) return { kind: "not-found" } as const;
  return { kind: "unavailable" } as const;
}

export async function loadServicePartnerDeliverables(assignmentId: string) {
  const result = await requestArtistApi(
    `service-partner/assignments/${encodeURIComponent(assignmentId)}/deliverables`
  );
  if (result.status === 200 && Array.isArray(result.data)) {
    return { kind: "ready", deliverables: result.data as ServicePartnerDeliverable[] } as const;
  }
  if (result.status === 401) return { kind: "connection-required" } as const;
  if (result.status === 403) return { kind: "access-denied" } as const;
  if (result.status === 404) return { kind: "not-found" } as const;
  return { kind: "unavailable" } as const;
}

export async function loadStaffServiceAssignmentOptions() {
  const result = await requestArtistApi("admin/service-assignments/options");
  if (result.status === 200 && result.data && typeof result.data === "object") {
    const data = result.data as Partial<StaffServiceAssignmentOptions>;
    if (Array.isArray(data.requests) && Array.isArray(data.organizations)) {
      return { kind: "ready", options: data as StaffServiceAssignmentOptions } as const;
    }
  }
  if (result.status === 401) return { kind: "connection-required" } as const;
  if (result.status === 403) return { kind: "access-denied" } as const;
  return { kind: "unavailable" } as const;
}

export async function loadStaffServiceDeliverableSubmissions() {
  const result = await requestArtistApi("admin/service-deliverables");
  if (result.status === 200 && Array.isArray(result.data)) {
    return { kind: "ready", items: result.data as StaffServiceDeliverableSubmission[] } as const;
  }
  if (result.status === 401) return { kind: "connection-required" } as const;
  if (result.status === 403) return { kind: "access-denied" } as const;
  return { kind: "unavailable" } as const;
}
