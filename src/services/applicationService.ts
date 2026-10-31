export type GuestApplicationPayload = {
  full_name: string;
  work_email: string;
  phone: string;
  location: string;
  portfolio_url?: string;
  note?: string;
  resume: File;
};

export type GuestApplicationResponse = {
  id?: string | number;
  message?: string;
  status?: string;
};

export type GuestApplicationValidationDetail = {
  loc?: Array<string | number>;
  msg?: string;
  type?: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
};

export class GuestApplicationApiError extends Error {
  status: number;
  details?: GuestApplicationValidationDetail[];

  constructor(message: string, status: number, details?: GuestApplicationValidationDetail[]) {
    super(message);
    this.name = "GuestApplicationApiError";
    this.status = status;
    this.details = details;
  }
}

export async function submitGuestApplication(
  jobId: string | number,
  payload: GuestApplicationPayload,
): Promise<GuestApplicationResponse> {
  const endpoint = `/api/v1/applications/jobs/${jobId}/guest`;

  const formData = new FormData();
  formData.append("full_name", payload.full_name.trim());
  formData.append("work_email", payload.work_email.trim());
  formData.append("phone", payload.phone.trim());
  formData.append("location", payload.location.trim());

  if (payload.portfolio_url?.trim()) {
    formData.append("portfolio_url", payload.portfolio_url.trim());
  }

  if (payload.note?.trim()) {
    formData.append("note", payload.note.trim());
  }

  formData.append("resume", payload.resume, payload.resume.name);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    const data = await response.json().catch(() => null);

    if (response.status >= 200 && response.status < 300) {
      return (data ?? {
        message: "Application submitted successfully.",
      }) as GuestApplicationResponse;
    }

    const detailList = Array.isArray(data?.detail) ? data.detail : [];
    const validationMessage = detailList
      .map((item: GuestApplicationValidationDetail) => item?.msg || "Validation error")
      .join(". ");

    if (response.status === 422) {
      throw new GuestApplicationApiError(
        validationMessage || "Please review your application and try again.",
        response.status,
        detailList,
      );
    }

    const fallbackMessage =
      typeof data?.message === "string"
        ? data.message
        : "Something went wrong while submitting your application.";

    throw new GuestApplicationApiError(fallbackMessage, response.status);
  } catch (error) {
    if (error instanceof GuestApplicationApiError) {
      throw error;
    }

    throw new GuestApplicationApiError(
      "Unable to reach the server right now. Please try again later.",
      500,
    );
  }
}
